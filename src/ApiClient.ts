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

interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

interface APIResponse<T = any> {
  status: number;
  headers: Record<string, string>;
  json?: T;
  text?: string;
}

export class ApiClient {
  private env: Record<string, string>;
  private tokenCache: { token: OAuthToken; expiresAt: number } | null = null;
  private debug: boolean;

  constructor() {
    this.env = this.loadEnvironment();
    this.debug = Boolean(process.env.DEBUG?.includes('api:'));
    
    if (this.debug) {
      console.log(`🔧 ApiClient initialized`);
      console.log(`   Base URL: ${this.env.baseURL}`);
      console.log(`   Program ID: ${this.env['program-id']}`);
    }
  }

  private loadEnvironment(): Record<string, string> {
    let envFilePath: string;

    // Resolve environment file path
    if (process.env.ENV_FILE) {
      envFilePath = path.resolve(process.env.ENV_FILE);
    } else if (process.env.ENV_NAME) {
      envFilePath = path.resolve(`./environments/${process.env.ENV_NAME}.json`);
    } else {
      envFilePath = path.resolve('./environments/238-stg.json');
    }

    const envContent = fs.readFileSync(envFilePath, 'utf8');
    const postmanEnv: PostmanEnvironment = JSON.parse(envContent);

    const env: Record<string, string> = {};
    postmanEnv.values.forEach(item => {
      if (item.enabled) {
        // Normalize key names
        const key = item.key === 'baseUrl' ? 'baseURL' : 
                   item.key === 'client-id' ? 'client_id' :
                   item.key === 'client-secret' ? 'client_secret' :
                   item.key === 'auth-url' ? 'token_url' :
                   item.key;
        env[key] = item.value;
      }
    });

    return env;
  }

  private async getAccessToken(): Promise<OAuthToken> {
    // Return cached token if still valid (with 30s buffer)
    if (this.tokenCache && Date.now() < this.tokenCache.expiresAt - 30000) {
      if (this.debug) console.log('🔑 Using cached OAuth token');
      return this.tokenCache.token;
    }

    if (this.debug) console.log('🔑 Fetching new OAuth token...');

    const tokenResponse = await fetch(this.env.token_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.env.client_id,
        client_secret: this.env.client_secret,
        scope: this.env.scope || ''
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`OAuth token request failed: ${tokenResponse.status} ${errorText}`);
    }

    const token = await tokenResponse.json() as OAuthToken;
    
    // Cache the token
    this.tokenCache = {
      token,
      expiresAt: Date.now() + (token.expires_in * 1000)
    };

    if (this.debug) console.log('🔑 OAuth token acquired successfully');
    return token;
  }

  async raw(path: string, options: RequestInit & { query?: Record<string, any> } = {}): Promise<APIResponse> {
    const token = await this.getAccessToken();
    
    // Build URL with query parameters
    let url = `${this.env.baseURL}${path}`;
    if (options.query) {
      const queryParams = new URLSearchParams();
      
      // Auto-inject program-id if not present
      if (!options.query['program-id'] && this.env['program-id']) {
        options.query['program-id'] = this.env['program-id'];
      }
      
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
    }
    
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token.access_token}`,
      'Accept': 'application/json',
      ...options.headers as Record<string, string>
    };

    if (this.debug) {
      console.log(`🚀 API call: ${options.method || 'GET'} ${url}`);
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let json: any;
    let text = '';

    try {
      text = await response.text();
      json = text ? JSON.parse(text) : null;
    } catch {
      // Not JSON, keep as text
    }

    return {
      status: response.status,
      headers: responseHeaders,
      json,
      text
    };
  }

  // Specific method for channel institutions query (from working pattern)
  async channelInstitutions_query(options: { query?: Record<string, any> } = {}): Promise<APIResponse> {
    return this.raw('/channel/institutions/query', {
      method: 'GET',
      query: options.query
    });
  }

  async dispose(): Promise<void> {
    this.tokenCache = null;
    if (this.debug) console.log('🧹 ApiClient disposed');
  }
}
