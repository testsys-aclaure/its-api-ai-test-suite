import * as fs from 'fs';
import * as path from 'path';

interface PostmanEnvironment {
  id: string;
  name: string;
  values: Array<{
    key: string;
    value: string;
    enabled: boolean;
  }>;
}

interface APIEnvironment {
  baseURL: string;
  client_id: string;
  client_secret: string;
  scope?: string;
  token_url: string;
  'program-id': string;
  'vendor-id'?: string;
  'sponsor-id'?: string;
  [key: string]: string | undefined;
}

export class EnvironmentLoader {
  private static readonly DEFAULT_ENV_FILE = './environments/238-stg.json';

  /**
   * Load environment configuration with support for multiple sources
   * Priority: ENV_FILE > ENV_NAME > Default fallback
   */
  static load(): APIEnvironment {
    let envFilePath: string;

    // Resolve environment file path
    if (process.env.ENV_FILE) {
      envFilePath = path.resolve(process.env.ENV_FILE);
    } else if (process.env.ENV_NAME) {
      envFilePath = path.resolve(`./environments/${process.env.ENV_NAME}.json`);
    } else {
      envFilePath = path.resolve(this.DEFAULT_ENV_FILE);
    }

    console.log(`Loading environment from: ${envFilePath}`);

    // Load Postman environment
    let postmanEnv: PostmanEnvironment;
    try {
      const envContent = fs.readFileSync(envFilePath, 'utf8');
      postmanEnv = JSON.parse(envContent);
    } catch (error) {
      throw new Error(`Failed to load environment file ${envFilePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Convert Postman format to flat environment
    const env: APIEnvironment = {
      baseURL: '',
      client_id: '',
      client_secret: '',
      token_url: '',
      'program-id': ''
    };

    // Map Postman values to environment, normalizing key names
    postmanEnv.values.forEach(item => {
      if (!item.enabled) return;

      const key = item.key;
      const normalizedKey = this.normalizeKey(key);
      env[normalizedKey] = item.value;
    });

    // Merge with .env.local overrides if present
    this.mergeLocalEnv(env);

    // Validate required keys
    this.validateEnvironment(env);

    return env;
  }

  /**
   * Normalize Postman keys (hyphen -> underscore for some keys)
   */
  private static normalizeKey(key: string): string {
    const keyMappings: Record<string, string> = {
      'baseUrl': 'baseURL',
      'client-id': 'client_id',
      'client-secret': 'client_secret',
      'auth-url': 'token_url'
    };

    return keyMappings[key] || key;
  }

  /**
   * Merge .env.local file if it exists
   */
  private static mergeLocalEnv(env: APIEnvironment): void {
    const localEnvPath = path.resolve('.env.local');
    if (!fs.existsSync(localEnvPath)) return;

    try {
      const localContent = fs.readFileSync(localEnvPath, 'utf8');
      localContent.split('\\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const equalIndex = trimmed.indexOf('=');
        if (equalIndex === -1) return;

        const key = trimmed.substring(0, equalIndex).trim();
        const value = trimmed.substring(equalIndex + 1).trim();
        
        env[key] = value;
      });
      
      console.log('Merged .env.local overrides');
    } catch (error) {
      console.warn('Warning: Failed to load .env.local:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * Validate that all required environment variables are present
   */
  private static validateEnvironment(env: APIEnvironment): void {
    const required = ['baseURL', 'client_id', 'client_secret', 'token_url', 'program-id'];
    const missing = required.filter(key => !env[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Set production safety
    if (env.baseURL?.includes('production') || env.baseURL?.includes('prod')) {
      process.env.ALLOW_MUTATIONS = 'false';
      console.log('🔒 Production environment detected - mutations disabled');
    }
  }

  /**
   * Get the active environment name for logging
   */
  static getEnvironmentName(): string {
    if (process.env.ENV_FILE) {
      return `ENV_FILE=${process.env.ENV_FILE}`;
    } else if (process.env.ENV_NAME) {
      return `ENV_NAME=${process.env.ENV_NAME}`;
    } else {
      return 'default';
    }
  }
}
