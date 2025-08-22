/**
 * Enhanced Direct API Tools - AI-NATIVE with Intelligence Integration
 * Extends Phase 2 DirectAPITools with comprehensive endpoint intelligence
 * 
 * Phase 3 Enhancements:
 * - All 37 GET endpoints accessible through natural language
 * - Business intelligence context for every response
 * - Semantic endpoint discovery and categorization
 * - Universal parameter validation and injection
 * - Richardson Level 3 hypermedia with intelligent suggestions
 * - Test-informed intelligence for adaptive behavior
 * - One-off exploration capabilities for troubleshooting
 */

import { DirectAPITools as BaseDirectAPITools, APIResponse } from './DirectAPITools.js';
import { IntelligenceIntegrator, EndpointIntelligence } from '../intelligence/IntelligenceIntegrator.js';
import { TestInformedIntelligence, TestResult, AIGuidance } from '../intelligence/TestInformedIntelligence.js';
import { EnvironmentConfig } from '../config/EnvironmentConfig.js';

export interface EnhancedAPIResponse<T = any> extends APIResponse<T> {
  intelligence?: {
    endpointInfo: EndpointIntelligence;
    businessDomain: string;
    semanticTags: string[];
    relatedEndpoints: string[];
    parameterGuidance: Array<{
      parameter: string;
      required: boolean;
      description: string;
      examples?: string[];
    }>;
  };
  aiInterpretation?: {
    testInformed: boolean;
    guidance: AIGuidance | null;
    suggestions: Array<{params: Record<string, any>, reason: string}>;
    expectedBehavior: boolean;
    businessMeaning: string;
    appliedFix?: {params: Record<string, any>, reason: string};
    explorationSuccessful?: boolean;
    explorationAttempted?: boolean;
    suggestionsTriedCount?: number;
    conclusion?: string;
  };
  explorationCapability?: {
    canExplore: boolean;
    exploreCommand: string;
  };
}

/**
 * AI-NATIVE Enhanced Direct API Tools with Intelligence Integration
 * Provides comprehensive access to all educational testing platform endpoints
 */
export class EnhancedDirectAPITools extends BaseDirectAPITools {
  private static intelligenceInitialized = false;

  /**
   * Enhanced initialization with intelligence loading
   */
  static async initialize(): Promise<void> {
    await super.initialize();
    
    if (!this.intelligenceInitialized) {
      await IntelligenceIntegrator.initialize();
      await TestInformedIntelligence.initialize();
      this.intelligenceInitialized = true;
      
      console.log('✅ Enhanced Direct API Tools with Intelligence initialized');
    }
  }

  /**
   * Intelligent API call with test-informed behavior
   * Uses test results to provide smart error handling and guidance
   */
  static async intelligentCall(
    endpoint: string, 
    params: Record<string, any> = {},
    userIntent: string = 'general query'
  ): Promise<EnhancedAPIResponse> {
    try {
      // Get test-informed intelligence for this endpoint
      const intelligence = TestInformedIntelligence.getEndpointBehavior(endpoint);
      
      // Make the API call
      const result = await this.makeRequest(endpoint, 'GET', params);
      
      if (result.success) {
        // Update test intelligence with successful result
        TestInformedIntelligence.updateFromTestRun({
          endpoint,
          params,
          result: { success: true, status: result.metadata?.httpStatus || 200, data: result.data },
          timestamp: new Date(),
          userIntent
        });

        return this.addAIInterpretation(result, intelligence, true);
      } else {
        // Handle failure with intelligence
        return this.createIntelligentErrorResponse(result, intelligence, params, userIntent);
      }
    } catch (error) {
      // Handle unexpected errors
      const errorResult: APIResponse = {
        success: false,
        data: null,
        error: (error as Error).message,
        metadata: {
          endpoint,
          method: 'GET',
          responseTime: 0,
          httpStatus: 500,
          timestamp: new Date().toISOString()
        }
      };

      return this.createIntelligentErrorResponse(errorResult, null, params, userIntent);
    }
  }

  /**
   * Exploration mode for troubleshooting and discovery
   * When normal intelligent calls don't work, this explores the endpoint
   */
  static async explore(endpoint: string, userIntent: string = 'exploration'): Promise<EnhancedAPIResponse> {
    console.log(`🔍 Exploring ${endpoint} for: ${userIntent}`);
    
    const explorationResults: TestResult[] = [];
    
    // Step 1: Try basic call with just universal parameters
    console.log(`   📝 Step 1: Basic call with universal parameters`);
    const basicResult = await this.intelligentCall(endpoint, {}, `${userIntent} - basic exploration`);
    
    if (basicResult.success) {
      console.log(`   ✅ Success with basic parameters`);
      return {
        ...basicResult,
        explorationCapability: {
          canExplore: false,
          exploreCommand: `Already working - no exploration needed`
        }
      };
    }

    // Step 2: If it fails, try to fix based on error response
    console.log(`   📝 Step 2: Analyzing error and applying fixes`);
    const suggestions = TestInformedIntelligence.getFixSuggestions(endpoint, basicResult.data);
    
    for (const suggestion of suggestions) {
      console.log(`   🧪 Trying fix: ${suggestion.reason}`);
      const fixResult = await this.intelligentCall(
        endpoint, 
        suggestion.params, 
        `${userIntent} - fix attempt: ${suggestion.reason}`
      );
      
      if (fixResult.success) {
        console.log(`   ✅ Success with fix: ${JSON.stringify(suggestion.params)}`);
        return {
          ...fixResult,
          aiInterpretation: {
            ...fixResult.aiInterpretation!,
            appliedFix: suggestion,
            explorationSuccessful: true
          }
        };
      }
      
      if (fixResult.metadata?.httpStatus === 403) {
        console.log(`   ℹ️ Access denied but parameters correct - expected behavior`);
        return {
          ...fixResult,
          aiInterpretation: {
            ...fixResult.aiInterpretation!,
            expectedBehavior: true,
            businessMeaning: 'Access restricted for this endpoint - parameters are correct but access denied'
          }
        };
      }
    }

    // Step 3: If fixes don't work, return exploration summary
    console.log(`   📋 Exploration complete - no working solution found`);
    return {
      ...basicResult,
      aiInterpretation: {
        ...basicResult.aiInterpretation!,
        explorationAttempted: true,
        suggestionsTriedCount: suggestions.length,
        conclusion: 'Endpoint requires parameters or access not available in test environment'
      },
      explorationCapability: {
        canExplore: false,
        exploreCommand: `Exploration completed - endpoint may require specific business context`
      }
    };
  }

  /**
   * AI-NATIVE: Enhanced natural language query with full endpoint intelligence
   */
  static async query(naturalLanguageQuery: string): Promise<EnhancedAPIResponse> {
    await this.initialize();
    
    console.log(`🤖 Enhanced query processing: "${naturalLanguageQuery}"`);
    
    // Check for specific query patterns first to ensure good demos
    const specificMappings: Record<string, string> = {
      'active events': '/event/query',
      'test events': '/event/query',
      'events': '/event/query',
      'event query': '/event/query'
    };
    
    const normalizedQuery = naturalLanguageQuery.toLowerCase().trim();
    if (specificMappings[normalizedQuery]) {
      const endpoint = specificMappings[normalizedQuery];
      console.log(`🎯 Direct mapping to: GET ${endpoint}`);
      
      // Find intelligence for this specific endpoint
      const allEndpoints = IntelligenceIntegrator.getGetEndpoints();
      const intelligence = allEndpoints.find(ep => 
        this.extractEndpointPath(ep) === endpoint
      );
      
      return await this.makeEnhancedRequest(endpoint, 'GET', {}, intelligence);
    }
    
    // Try semantic search through intelligence
    const semanticMatches = IntelligenceIntegrator.searchEndpointsBySemantics(naturalLanguageQuery);
    
    if (semanticMatches.length > 0) {
      const bestMatch = this.selectBestEndpoint(semanticMatches, naturalLanguageQuery);
      console.log(`🎯 Intelligence matched: ${bestMatch.method} ${bestMatch.name}`);
      
      return await this.makeEnhancedRequest(
        this.extractEndpointPath(bestMatch),
        bestMatch.method as any,
        {},
        bestMatch
      );
    }
    
    // Fallback to base implementation
    console.log('🔄 Using base query implementation as fallback');
    const baseResponse = await super.query(naturalLanguageQuery);
    
    return this.enhanceResponse(baseResponse);
  }

  /**
   * AI-NATIVE: Enhanced direct API request with intelligence
   */
  static async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    additionalParams?: Record<string, any>
  ): Promise<EnhancedAPIResponse> {
    await this.initialize();
    
    // Find intelligence for this endpoint
    const allEndpoints = IntelligenceIntegrator.getGetEndpoints();
    const endpointIntelligence = allEndpoints.find(e => 
      this.extractEndpointPath(e) === endpoint ||
      endpoint.includes(e.name.toLowerCase().replace(/\s+/g, ''))
    );
    
    if (endpointIntelligence) {
      return await this.makeEnhancedRequest(endpoint, method, additionalParams, endpointIntelligence);
    }
    
    // Fallback to base implementation
    const baseResponse = await super.makeRequest(endpoint, method, additionalParams);
    return this.enhanceResponse(baseResponse);
  }

  /**
   * AI-NATIVE: Get all available endpoints organized by business domain
   */
  static async getEndpointsByDomain(): Promise<Record<string, Array<{
    name: string;
    method: string;
    endpoint: string;
    description: string;
    naturalLanguageExamples: string[];
  }>>> {
    await this.initialize();
    
    const allEndpoints = IntelligenceIntegrator.getGetEndpoints();
    const domains: Record<string, any[]> = {};
    
    for (const endpoint of allEndpoints) {
      const domain = endpoint.businessDomain || 'General';
      
      if (!domains[domain]) {
        domains[domain] = [];
      }
      
      domains[domain].push({
        name: endpoint.name,
        method: endpoint.method,
        endpoint: this.extractEndpointPath(endpoint),
        description: endpoint.businessContext,
        naturalLanguageExamples: endpoint.naturalLanguageAliases.slice(0, 3)
      });
    }
    
    return domains;
  }

  /**
   * AI-NATIVE: Discover endpoints by business intent
   */
  static async discoverEndpoints(businessIntent: string): Promise<Array<{
    endpoint: EndpointIntelligence;
    relevanceScore: number;
    suggestedQuery: string;
  }>> {
    await this.initialize();
    
    const matches = IntelligenceIntegrator.searchEndpointsBySemantics(businessIntent);
    
    return matches.map(endpoint => ({
      endpoint,
      relevanceScore: this.calculateRelevanceScore(endpoint, businessIntent),
      suggestedQuery: this.generateSuggestedQuery(endpoint)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * AI-NATIVE: Get comprehensive API catalog for AI assistants
   */
  static async getAICatalog(): Promise<{
    summary: {
      totalEndpoints: number;
      businessDomains: string[];
      universalParameters: string[];
      readinessScore: number;
    };
    domains: Record<string, Array<{
      name: string;
      naturalLanguageQueries: string[];
      businessPurpose: string;
      expectedResponseType: string;
    }>>;
    quickStart: {
      basicQueries: string[];
      advancedExamples: Array<{ query: string; purpose: string }>;
    };
  }> {
    await this.initialize();
    
    const intelligence = IntelligenceIntegrator.getIntelligenceReport();
    const domainEndpoints = await this.getEndpointsByDomain();
    
    // Transform for AI consumption
    const domains: Record<string, any[]> = {};
    
    for (const [domainName, endpoints] of Object.entries(domainEndpoints)) {
      domains[domainName] = endpoints.map(ep => ({
        name: ep.name,
        naturalLanguageQueries: ep.naturalLanguageExamples,
        businessPurpose: ep.description,
        expectedResponseType: this.inferResponseType(ep.name)
      }));
    }
    
    return {
      summary: {
        totalEndpoints: intelligence.metadata.totalEndpoints,
        businessDomains: intelligence.metadata.businessDomains,
        universalParameters: Array.from(Object.keys(IntelligenceIntegrator.getUniversalParameterRequirements())),
        readinessScore: intelligence.readinessScore
      },
      domains,
      quickStart: {
        basicQueries: [
          'active events',
          'students',
          'test results',
          'institutions',
          'programs'
        ],
        advancedExamples: [
          { query: 'event management', purpose: 'Find all event-related operations' },
          { query: 'student progress tracking', purpose: 'Access student performance data' },
          { query: 'institutional reporting', purpose: 'Generate institution-level reports' }
        ]
      }
    };
  }

  // Enhanced helper methods
  private static async makeEnhancedRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    additionalParams: Record<string, any> = {},
    intelligence?: EndpointIntelligence
  ): Promise<EnhancedAPIResponse> {
    
    const baseResponse = await super.makeRequest(endpoint, method, additionalParams);
    
    if (!intelligence) {
      return this.enhanceResponse(baseResponse);
    }
    
    // Add intelligence information
    const enhanced: EnhancedAPIResponse = {
      ...baseResponse,
      intelligence: {
        endpointInfo: intelligence,
        businessDomain: intelligence.businessDomain,
        semanticTags: intelligence.semanticTags,
        relatedEndpoints: this.findRelatedEndpoints(intelligence),
        parameterGuidance: this.generateParameterGuidance(intelligence)
      }
    };
    
    // Enhance business context
    if (enhanced.metadata) {
      enhanced.metadata.businessContext = intelligence.businessContext || enhanced.metadata.businessContext;
    }
    
    // Enhance hypermedia with intelligent suggestions
    if (enhanced.hypermedia) {
      enhanced.hypermedia.related = [
        ...enhanced.hypermedia.related,
        ...this.generateIntelligentHypermediaLinks(intelligence)
      ];
    }
    
    return enhanced;
  }

  private static enhanceResponse(baseResponse: APIResponse): EnhancedAPIResponse {
    return baseResponse as EnhancedAPIResponse;
  }

  private static selectBestEndpoint(matches: EndpointIntelligence[], query: string): EndpointIntelligence {
    // Score endpoints and prefer those that work with just universal parameters
    const scoredMatches = matches.map(endpoint => {
      const score = this.calculateRelevanceScore(endpoint, query);
      
      // Boost score for endpoints that only require universal parameters
      const hasOnlyUniversalParams = endpoint.requiredQueryParams.every(param =>
        param === 'program-id' || param === 'program-institution-id'
      );
      
      const boostScore = hasOnlyUniversalParams ? 10 : 0;
      
      return {
        endpoint,
        score: score + boostScore
      };
    });
    
    // Return the highest scoring endpoint
    return scoredMatches.reduce((best, current) => 
      current.score > best.score ? current : best
    ).endpoint;
  }

  private static calculateRelevanceScore(endpoint: EndpointIntelligence, query: string): number {
    const normalizedQuery = query.toLowerCase();
    let score = 0;
    
    // Exact name match
    if (endpoint.name.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    // Semantic tag matches
    score += endpoint.semanticTags
      .filter(tag => normalizedQuery.includes(tag))
      .length * 5;
    
    // Natural language alias matches
    score += endpoint.naturalLanguageAliases
      .filter(alias => normalizedQuery.includes(alias))
      .length * 3;
    
    // Business context matches
    if (endpoint.businessContext.toLowerCase().includes(normalizedQuery)) {
      score += 2;
    }
    
    return score;
  }

  private static generateSuggestedQuery(endpoint: EndpointIntelligence): string {
    if (endpoint.naturalLanguageAliases.length > 0) {
      return endpoint.naturalLanguageAliases[0];
    }
    
    return endpoint.name.toLowerCase();
  }

  private static extractEndpointPath(endpoint: EndpointIntelligence): string {
    return endpoint.url?.pathString || `/${endpoint.name.toLowerCase().replace(/\s+/g, '')}`;
  }

  private static findRelatedEndpoints(intelligence: EndpointIntelligence): string[] {
    const allEndpoints = IntelligenceIntegrator.getGetEndpoints();
    
    return allEndpoints
      .filter(ep => 
        ep.businessDomain === intelligence.businessDomain && 
        ep.name !== intelligence.name
      )
      .slice(0, 3)
      .map(ep => this.extractEndpointPath(ep));
  }

  private static generateParameterGuidance(intelligence: EndpointIntelligence): Array<{
    parameter: string;
    required: boolean;
    description: string;
    examples?: string[];
  }> {
    const guidance: Array<{ parameter: string; required: boolean; description: string; examples?: string[] }> = [];
    
    // Universal parameters
    const universalParams = IntelligenceIntegrator.getUniversalParameterRequirements();
    for (const [param, requirement] of Object.entries(universalParams)) {
      guidance.push({
        parameter: param,
        required: true,
        description: requirement.examples[0]?.description || 'Universal parameter',
        examples: requirement.examples.slice(0, 2).map(ex => ex.description)
      });
    }
    
    // Endpoint-specific parameters
    for (const param of intelligence.queryParameters) {
      if (!guidance.some(g => g.parameter === param.key)) {
        guidance.push({
          parameter: param.key,
          required: intelligence.requiredQueryParams.includes(param.key),
          description: param.description || 'Endpoint parameter',
        });
      }
    }
    
    return guidance;
  }

  private static generateIntelligentHypermediaLinks(intelligence: EndpointIntelligence): Array<{
    rel: string;
    href: string;
    description: string;
  }> {
    const baseUrl = EnvironmentConfig.getBaseUrl();
    const links: Array<{ rel: string; href: string; description: string }> = [];
    
    // Add domain-related endpoints
    const relatedEndpoints = this.findRelatedEndpoints(intelligence);
    
    relatedEndpoints.forEach((endpoint, index) => {
      links.push({
        rel: `related-${index + 1}`,
        href: `${baseUrl}${endpoint}`,
        description: `Related ${intelligence.businessDomain} operation`
      });
    });
    
    return links;
  }

  private static inferResponseType(endpointName: string): string {
    const name = endpointName.toLowerCase();
    
    if (name.includes('query') || name.includes('list') || name.includes('search')) {
      return 'array of objects';
    }
    
    if (name.includes('get') || name.includes('retrieve')) {
      return 'single object';
    }
    
    if (name.includes('create') || name.includes('update')) {
      return 'operation result';
    }
    
    return 'data object';
  }

  /**
   * Add AI interpretation to successful responses
   */
  private static addAIInterpretation(
    result: APIResponse, 
    intelligence: any, 
    success: boolean
  ): EnhancedAPIResponse {
    const guidance = intelligence ? TestInformedIntelligence.getAIGuidance(intelligence.endpoint) : null;
    
    return {
      ...result,
      aiInterpretation: {
        testInformed: !!intelligence,
        guidance,
        suggestions: [],
        expectedBehavior: success,
        businessMeaning: success ? 'API call successful' : 'API call failed'
      }
    };
  }

  /**
   * Create intelligent error response with guidance
   */
  private static createIntelligentErrorResponse(
    result: APIResponse,
    intelligence: any,
    params: Record<string, any>,
    userIntent: string
  ): EnhancedAPIResponse {
    const endpoint = result.metadata?.endpoint || 'unknown';
    
    // Update test intelligence with failed result
    TestInformedIntelligence.updateFromTestRun({
      endpoint,
      params,
      result: { 
        success: false, 
        status: result.metadata?.httpStatus || 500, 
        error: result.error || result.data 
      },
      timestamp: new Date(),
      userIntent
    });

    // Get AI guidance for this error
    const guidance = TestInformedIntelligence.getAIGuidance(endpoint, result.data);
    const suggestions = TestInformedIntelligence.getFixSuggestions(endpoint, result.data);
    
    const isExpectedFailure = result.metadata?.httpStatus === 403 || 
                             (result.metadata?.httpStatus === 422 && suggestions.length > 0);
    
    return {
      ...result,
      aiInterpretation: {
        testInformed: !!intelligence,
        guidance,
        suggestions,
        expectedBehavior: isExpectedFailure,
        businessMeaning: this.interpretBusinessMeaning(result.metadata?.httpStatus, result.data)
      },
      explorationCapability: {
        canExplore: true,
        exploreCommand: `explore('${endpoint}', '${userIntent}')`
      }
    };
  }

  /**
   * Interpret business meaning of API responses
   */
  private static interpretBusinessMeaning(status: number = 500, data: any): string {
    switch (status) {
      case 200:
        return 'Request successful - data retrieved';
      case 204:
        return 'Request successful - no content returned (normal for some endpoints)';
      case 422:
        return 'Missing required parameters - can be fixed by adding correct parameters';
      case 403:
        return 'Access denied - may be expected behavior given test context';
      case 404:
        return 'Endpoint or resource not found';
      case 500:
        return 'Server error - may indicate API issue';
      default:
        return `HTTP ${status} response - check API documentation`;
    }
  }
}
