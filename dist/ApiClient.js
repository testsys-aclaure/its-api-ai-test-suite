"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ApiClient {
    constructor() {
        this.tokenCache = null;
        this.env = this.loadEnvironment();
        this.debug = Boolean(process.env.DEBUG?.includes('api:'));
        if (this.debug) {
            console.log(`🔧 ApiClient initialized`);
            console.log(`   Base URL: ${this.env.baseURL}`);
            console.log(`   Program ID: ${this.env['program-id']}`);
        }
    }
    loadEnvironment() {
        let envFilePath;
        // Resolve environment file path
        if (process.env.ENV_FILE) {
            envFilePath = path.resolve(process.env.ENV_FILE);
        }
        else if (process.env.ENV_NAME) {
            envFilePath = path.resolve(`./environments/${process.env.ENV_NAME}.json`);
        }
        else {
            envFilePath = path.resolve('./environments/238-stg.json');
        }
        const envContent = fs.readFileSync(envFilePath, 'utf8');
        const postmanEnv = JSON.parse(envContent);
        const env = {};
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
    async getAccessToken() {
        // Return cached token if still valid (with 30s buffer)
        if (this.tokenCache && Date.now() < this.tokenCache.expiresAt - 30000) {
            if (this.debug)
                console.log('🔑 Using cached OAuth token');
            return this.tokenCache.token;
        }
        if (this.debug)
            console.log('🔑 Fetching new OAuth token...');
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
        const token = await tokenResponse.json();
        // Cache the token
        this.tokenCache = {
            token,
            expiresAt: Date.now() + (token.expires_in * 1000)
        };
        if (this.debug)
            console.log('🔑 OAuth token acquired successfully');
        return token;
    }
    async raw(path, options = {}) {
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
        const headers = {
            'Authorization': `Bearer ${token.access_token}`,
            'Accept': 'application/json',
            ...options.headers
        };
        if (this.debug) {
            console.log(`🚀 API call: ${options.method || 'GET'} ${url}`);
        }
        const response = await fetch(url, {
            ...options,
            headers
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });
        let json;
        let text = '';
        try {
            text = await response.text();
            json = text ? JSON.parse(text) : null;
        }
        catch {
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
    async channelInstitutions_query(options = {}) {
        return this.raw('/channel/institutions/query', {
            method: 'GET',
            query: options.query
        });
    }
    async dispose() {
        this.tokenCache = null;
        if (this.debug)
            console.log('🧹 ApiClient disposed');
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map