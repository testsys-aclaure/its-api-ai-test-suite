import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Environment configuration for the API wrapper
 */
export interface Environment {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  programId?: string;
  programInstitutionId?: string;
  scope?: string;
}

/**
 * OAuth2 token response
 */
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

/**
 * Cached token with expiration
 */
interface CachedToken {
  token: string;
  expiresAt: number;
  type: string;
}

/**
 * Authentication manager with intelligent caching and error handling
 * Designed for AI assistant consumption - handles all OAuth2 complexity transparently
 */
export class AuthenticationManager {
  private environment: Environment;
  private cachedToken: CachedToken | null = null;
  private readonly BUFFER_TIME_MS = 60000; // 1 minute buffer before expiration

  constructor(environmentPath?: string) {
    // Will be initialized in loadEnvironment()
    this.environment = {} as Environment;
  }

  /**
   * Load environment configuration from file
   * AI Assistant Usage: Automatically loads from ./environments/238-stg.json by default
   */
  async loadEnvironment(environmentPath = './environments/238-stg.json'): Promise<void> {
    try {
      const envFile = await readFile(environmentPath, 'utf-8');
      this.environment = JSON.parse(envFile);
      
      if (!this.environment.tokenEndpoint || !this.environment.clientId || !this.environment.clientSecret) {
        throw new Error('Environment file missing required OAuth2 configuration');
      }
      
      console.log(`🔐 Authentication environment loaded: ${environmentPath}`);
    } catch (error) {
      throw new Error(`Failed to load environment from ${environmentPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get valid access token, automatically handling refresh if needed
   * AI Assistant Usage: Call this method to get authenticated headers for API requests
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && Date.now() < this.cachedToken.expiresAt) {
      return this.cachedToken.token;
    }

    // Request new token
    await this.refreshToken();
    
    if (!this.cachedToken) {
      throw new Error('Failed to obtain access token');
    }

    return this.cachedToken.token;
  }

  /**
   * Get authentication headers ready for API requests
   * AI Assistant Usage: Use this to get properly formatted headers for HTTP requests
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getAccessToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get environment configuration for parameter injection
   * AI Assistant Usage: Access program-id and program-institution-id for automatic injection
   */
  getEnvironment(): Environment {
    return this.environment;
  }

  /**
   * Refresh the OAuth2 token using client credentials flow
   * Private method - AI assistants don't need to call this directly
   */
  private async refreshToken(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.environment.clientId,
      client_secret: this.environment.clientSecret,
      ...(this.environment.scope && { scope: this.environment.scope })
    });

    try {
      const response = await fetch(this.environment.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OAuth2 token request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const tokenData = await response.json() as TokenResponse;
      
      this.cachedToken = {
        token: tokenData.access_token,
        type: tokenData.token_type || 'Bearer',
        expiresAt: Date.now() + (tokenData.expires_in * 1000) - this.BUFFER_TIME_MS
      };

      console.log(`🔄 OAuth2 token refreshed, expires in ${Math.round(tokenData.expires_in / 60)} minutes`);
    } catch (error) {
      console.error('❌ Failed to refresh OAuth2 token:', error);
      throw error;
    }
  }

  /**
   * Check if authentication is properly configured
   * AI Assistant Usage: Call this to validate setup before making API requests
   */
  isConfigured(): boolean {
    return !!(this.environment.tokenEndpoint && 
              this.environment.clientId && 
              this.environment.clientSecret && 
              this.environment.baseUrl);
  }

  /**
   * Get base URL for API requests
   * AI Assistant Usage: Use this for constructing API endpoint URLs
   */
  getBaseUrl(): string {
    return this.environment.baseUrl;
  }

  /**
   * Clear cached token (useful for testing or forced refresh)
   * AI Assistant Usage: Call this if you suspect token issues
   */
  clearCache(): void {
    this.cachedToken = null;
    console.log('🗑️ Authentication cache cleared');
  }
}
