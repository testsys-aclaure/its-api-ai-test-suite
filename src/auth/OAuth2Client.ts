/**
 * OAuth2 Authentication Client - AI-NATIVE
 * Handles secure authentication flow for educational testing platform API
 * 
 * AI-Native Features:
 * - Self-managing token lifecycle with intelligent refresh
 * - Built-in retry logic with exponential backoff
 * - Comprehensive error handling with business context
 * - Performance monitoring and troubleshooting guidance
 * - Environment-driven configuration (no hardcoded values)
 */

import { EnvironmentConfig } from '../config/EnvironmentConfig.js';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export interface TokenCache {
  token: string;
  expiresAt: number;
  scope: string;
  acquiredAt: Date;
}

export interface AuthenticationMetadata {
  lastAuthentication: Date;
  tokenAcquisitionTime: number;
  retryAttempts: number;
  environmentSource: string;
}

/**
 * AI-NATIVE OAuth2 Client for Educational Testing Platform
 * Provides secure, self-managing authentication with intelligent error handling
 */
export class OAuth2Client {
  private static tokenCache: TokenCache | null = null;
  private static metadata: AuthenticationMetadata = {
    lastAuthentication: new Date(0),
    tokenAcquisitionTime: 0,
    retryAttempts: 0,
    environmentSource: 'unknown'
  };

  /**
   * Get a valid access token, refreshing if necessary
   * AI-NATIVE: Self-managing with performance monitoring
   */
  static async getAccessToken(): Promise<string> {
    const startTime = Date.now();

    try {
      // Check if we have a valid cached token
      if (this.tokenCache && this.isTokenValid(this.tokenCache)) {
        console.log('✅ Using cached access token');
        return this.tokenCache.token;
      }

      // Acquire new token
      console.log('🔄 Acquiring new access token...');
      const token = await this.acquireNewToken();
      
      // Update performance metrics
      this.metadata.tokenAcquisitionTime = Date.now() - startTime;
      this.metadata.lastAuthentication = new Date();
      
      console.log(`✅ Access token acquired in ${this.metadata.tokenAcquisitionTime}ms`);
      
      return token;

    } catch (error) {
      this.metadata.tokenAcquisitionTime = Date.now() - startTime;
      
      throw new Error(`❌ Authentication failed after ${this.metadata.tokenAcquisitionTime}ms: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Acquire a new access token from the OAuth2 endpoint
   * AI-NATIVE: Comprehensive error handling with business context
   */
  private static async acquireNewToken(): Promise<string> {
    await EnvironmentConfig.initialize();
    
    const tokenUrl = EnvironmentConfig.getTokenUrl();
    const clientId = EnvironmentConfig.getClientId();
    const clientSecret = EnvironmentConfig.getClientSecret();
    const scope = EnvironmentConfig.getScope();

    // Prepare OAuth2 client credentials request
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: scope
    });

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Authentication attempt ${attempt}/${maxRetries} to ${tokenUrl}`);
        
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: body.toString()
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const tokenData: TokenResponse = await response.json();
        
        if (!tokenData.access_token) {
          throw new Error('No access token in response');
        }

        // Cache the token with expiration
        this.tokenCache = {
          token: tokenData.access_token,
          expiresAt: Date.now() + ((tokenData.expires_in - 60) * 1000), // 1 minute buffer
          scope: tokenData.scope || scope,
          acquiredAt: new Date()
        };

        this.metadata.retryAttempts = attempt - 1;
        this.metadata.environmentSource = 'oauth2-server';

        return tokenData.access_token;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`⚠️ Authentication attempt ${attempt} failed:`, lastError.message);
        
        // Exponential backoff for retries
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`⏱️ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed
    this.metadata.retryAttempts = maxRetries;
    
    throw new Error(
      `Authentication failed after ${maxRetries} attempts. Last error: ${lastError?.message || 'Unknown error'}\n` +
      `🔍 Troubleshooting:\n` +
      `- Check client credentials in .env or 238-stg.json\n` +
      `- Verify token URL: ${tokenUrl}\n` +
      `- Ensure network connectivity to identity server\n` +
      `- Check if staging environment is accessible`
    );
  }

  /**
   * Check if a cached token is still valid
   * AI-NATIVE: Smart validation with buffer time
   */
  private static isTokenValid(cache: TokenCache): boolean {
    const now = Date.now();
    const isValid = now < cache.expiresAt;
    
    if (!isValid) {
      console.log('🔄 Cached token expired, will refresh');
    }
    
    return isValid;
  }

  /**
   * AI-NATIVE: Get authentication metadata for transparency and troubleshooting
   */
  static getAuthenticationStatus(): {
    isAuthenticated: boolean;
    tokenStatus: string;
    lastAuthentication: string;
    performance: {
      acquisitionTime: number;
      retryAttempts: number;
    };
    configuration: {
      tokenUrl: string;
      scope: string;
      clientId: string;
    };
    troubleshooting?: string[];
  } {
    const now = Date.now();
    const hasValidToken = this.tokenCache && this.isTokenValid(this.tokenCache);
    
    const status: {
      isAuthenticated: boolean;
      tokenStatus: string;
      lastAuthentication: string;
      performance: {
        acquisitionTime: number;
        retryAttempts: number;
      };
      configuration: {
        tokenUrl: string;
        scope: string;
        clientId: string;
      };
      troubleshooting?: string[];
    } = {
      isAuthenticated: !!hasValidToken,
      tokenStatus: this.getTokenStatusDescription(),
      lastAuthentication: this.metadata.lastAuthentication.toISOString(),
      performance: {
        acquisitionTime: this.metadata.tokenAcquisitionTime,
        retryAttempts: this.metadata.retryAttempts
      },
      configuration: {
        tokenUrl: '',
        scope: '',
        clientId: ''
      }
    };

    // Add configuration if available
    try {
      status.configuration = {
        tokenUrl: EnvironmentConfig.getTokenUrl(),
        scope: EnvironmentConfig.getScope(),
        clientId: EnvironmentConfig.getClientId().substring(0, 8) + '...' // Partial for security
      };
    } catch (error) {
      // Environment not initialized
    }

    // Add troubleshooting guidance if needed
    const troubleshooting: string[] = [];
    
    if (!hasValidToken) {
      troubleshooting.push('No valid access token - authentication required');
    }
    
    if (this.metadata.tokenAcquisitionTime > 5000) {
      troubleshooting.push('Slow token acquisition - check network connectivity');
    }
    
    if (this.metadata.retryAttempts > 0) {
      troubleshooting.push(`Required ${this.metadata.retryAttempts} retry attempts - check credentials`);
    }
    
    if (troubleshooting.length > 0) {
      status.troubleshooting = troubleshooting;
    }

    return status;
  }

  /**
   * Get human-readable token status description
   */
  private static getTokenStatusDescription(): string {
    if (!this.tokenCache) {
      return 'No token cached';
    }
    
    const now = Date.now();
    const timeToExpiry = this.tokenCache.expiresAt - now;
    
    if (timeToExpiry <= 0) {
      return 'Token expired';
    }
    
    const minutesToExpiry = Math.floor(timeToExpiry / 60000);
    return `Valid for ${minutesToExpiry} minutes`;
  }

  /**
   * AI-NATIVE: Clear cached token for testing or troubleshooting
   */
  static clearTokenCache(): void {
    this.tokenCache = null;
    console.log('🗑️ Token cache cleared');
  }

  /**
   * AI-NATIVE: Validate authentication configuration without making requests
   */
  static async validateConfiguration(): Promise<{
    isValid: boolean;
    issues: string[];
    configuration: Record<string, any>;
  }> {
    const issues: string[] = [];
    
    try {
      await EnvironmentConfig.initialize();
      
      const required = {
        tokenUrl: EnvironmentConfig.getTokenUrl(),
        clientId: EnvironmentConfig.getClientId(),
        clientSecret: EnvironmentConfig.getClientSecret(),
        scope: EnvironmentConfig.getScope()
      };

      // Check for missing values
      for (const [key, value] of Object.entries(required)) {
        if (!value || value.trim() === '') {
          issues.push(`Missing ${key} in environment configuration`);
        }
      }

      // Validate URL format
      try {
        new URL(required.tokenUrl);
      } catch {
        issues.push('Invalid token URL format');
      }

      return {
        isValid: issues.length === 0,
        issues,
        configuration: {
          ...required,
          clientSecret: required.clientSecret ? '[REDACTED]' : '[MISSING]'
        }
      };

    } catch (error) {
      issues.push(`Configuration error: ${error instanceof Error ? error.message : String(error)}`);
      
      return {
        isValid: false,
        issues,
        configuration: {}
      };
    }
  }
}
