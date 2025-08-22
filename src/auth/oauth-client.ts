import { request } from 'undici';

/**
 * OAuth2 Client Credentials authentication for ITS API
 */
export class OAuthClient {
  private token: string | null = null;
  private tokenExpiry: number = 0;
  
  constructor(
    private clientId: string,
    private clientSecret: string,
    private tokenUrl: string
  ) {}

  /**
   * Get a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }
    
    await this.refreshToken();
    return this.token!;
  }

  /**
   * Refresh the access token using client credentials
   */
  private async refreshToken(): Promise<void> {
    const tokenData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    });

    const response = await request(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenData.toString()
    });

    if (response.statusCode !== 200) {
      throw new Error(`OAuth token request failed: ${response.statusCode}`);
    }

    const data = await response.body.json() as {
      access_token: string;
      expires_in: number;
    };

    this.token = data.access_token;
    // Set expiry to 5 minutes before actual expiry for safety
    this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  }
}

// Global OAuth client instance
let oauthClient: OAuthClient | null = null;

/**
 * Initialize the OAuth client with environment configuration
 */
export function initializeOAuth(): void {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenUrl = process.env.TOKEN_URL || 'https://oauth-staging.testsys.io/oauth2/token';

  if (!clientId || !clientSecret) {
    throw new Error('CLIENT_ID and CLIENT_SECRET must be set in environment');
  }

  oauthClient = new OAuthClient(clientId, clientSecret, tokenUrl);
}

/**
 * Make an authenticated HTTP request to the ITS API
 */
export async function authenticatedRequest(method: string, url: string, options: any = {}): Promise<any> {
  if (!oauthClient) {
    initializeOAuth();
  }

  const token = await oauthClient!.getAccessToken();
  
  const response = await request(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    },
    ...options
  });

  return {
    ok: response.statusCode >= 200 && response.statusCode < 300,
    status: response.statusCode,
    json: async () => response.body.json(),
    text: async () => response.body.text()
  };
}
