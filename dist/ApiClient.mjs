import * as fs from 'fs';
import * as path from 'path';

interface ApiClientResponse {
  status: number;
  data: any;
  headers: any;
}

export class ApiClient {
  private baseUrl: string = '';
  private programId: string = '';
  private clientId: string = '';
  private clientSecret: string = '';
  private tokenUrl: string = '';
  private accessToken: string | null = null;
  private tokenExpires: number = 0;

  constructor(envFile?: string) {
    const environment = this.loadEnvironment(envFile || './environments/238-stg.json');
    
    this.baseUrl = environment.base_url || '';
    this.programId = environment.program_id || '';
    this.clientId = environment.client_id || '';
    this.clientSecret = environment.client_secret || '';
    this.tokenUrl = environment.token_url || '';
  }

  private loadEnvironment(envFile: string): Record<string, any> {
    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file not found: ${envFile}`);
    }

    const envData = JSON.parse(fs.readFileSync(envFile, 'utf8'));
    const environment: Record<string, any> = {};

    if (envData.values) {
      for (const item of envData.values) {
        if (item.key && item.value) {
          const normalizedKey = item.key.toLowerCase().replace(/-/g, '_');
          environment[normalizedKey] = item.value;
        }
      }
    }

    return environment;
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    
    if (this.accessToken && now < this.tokenExpires - 30000) {
      return this.accessToken;
    }

    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth token request failed: ${response.status} ${response.statusText}`);
    }

    const tokenData = await response.json();
    this.accessToken = tokenData.access_token;
    this.tokenExpires = now + (tokenData.expires_in * 1000);

    return this.accessToken;
  }

  async raw(method: string, endpoint: string, params?: Record<string, any>, headers?: Record<string, any>): Promise<ApiClientResponse> {
    const token = await this.getAccessToken();
    
    let url = `${this.baseUrl}${endpoint}`;
    const requestHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...headers
    };

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      
      if (this.programId && !params['program-id'] && !params['programId']) {
        searchParams.append('program-id', this.programId);
      }
      
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      }
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    } else if (this.programId) {
      url += `?program-id=${encodeURIComponent(this.programId)}`;
    }

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: requestHeaders,
    });

    let data;
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      data: data,
      headers: Object.fromEntries(response.headers.entries())
    };
  }

  async channelInstitutions_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/channel/institutions', params);
  }
  
  async eventAuthorizations_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/event/authorizations', params);
  }
  
  async eventClassExaminees_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/event-class/examinees', params);
  }
  
  async examineeAudit_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/examinee/audit', params);
  }
  
  async examineeEvents_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/examinee/events', params);
  }
  
  async examineeLongitudinalSegmentDetail_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/examinee/longitudinal-segment-detail', params);
  }
  
  async examineeLongitudinalSegments_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/examinee/longitudinal-segments', params);
  }
  
  async examineeRecord_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/examinee/record', params);
  }
  
  async formDefinition_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/form/definition', params);
  }
  
  async formReports_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/form/reports', params);
  }
  
  async formResFiles_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/form/res-files', params);
  }
  
  async iwToolExportTests_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/iw-tool/export/tests', params);
  }
  
  async iwToolImport_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/iw-tool/import', params);
  }
  
  async longitudinalGroupExaminees_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/longitudinal-group/examinees', params);
  }
  
  async packageForms_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/package/forms', params);
  }
  
  async remoteAdminUrls_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/admin-urls', params);
  }
  
  async remoteExamineeData_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/examinee-data', params);
  }
  
  async remotePracticeChecks_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/practice-checks', params);
  }
  
  async remoteSessionData_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/session-data', params);
  }
  
  async remoteSessions_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/sessions', params);
  }
  
  async remoteSystemChecks_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/remote/system-checks', params);
  }
  
  async secureBrowserErrors_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/secure-browser/errors', params);
  }
  
  async testForms_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/test/forms', params);
  }
  
  async testPretestReferences_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/test/pretest-references', params);
  }
  
  async userAccess_query(params?: Record<string, any>): Promise<ApiClientResponse> {
    return this.raw('GET', '/user/access', params);
  }
}
