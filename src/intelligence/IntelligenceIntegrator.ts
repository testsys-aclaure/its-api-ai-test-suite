/**
 * Intelligence Integration - AI-NATIVE
 * Loads and integrates business intelligence from existing JSON files
 * 
 * AI-Native Features:
 * - Dynamic endpoint discovery with business context
 * - Parameter validation and requirements mapping
 * - Semantic endpoint categorization
 * - Self-describing API operations
 * - Universal parameter detection and injection
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export interface EndpointIntelligence {
  name: string;
  method: string;
  businessDomain: string;
  folderPath: string;
  description: string;
  url: {
    raw: string;
    pathString: string;
  };
  queryParameters: Array<{
    key: string;
    value?: string;
    description?: string;
    disabled?: boolean;
  }>;
  requiredQueryParams: string[];
  optionalQueryParams: string[];
  requestBody?: any;
  semanticTags: string[];
  businessContext: string;
  naturalLanguageAliases: string[];
}

export interface ParameterRequirement {
  parameter: string;
  frequency: number;
  percentage: string;
  examples: Array<{
    endpoint: string;
    description: string;
  }>;
  isUniversal: boolean;
  validationRules?: string[];
}

export interface IntelligenceMetadata {
  loadedAt: Date;
  totalEndpoints: number;
  totalParameters: number;
  universalParameters: number;
  businessDomains: string[];
  coverage: {
    withDescriptions: number;
    withParameters: number;
    readyForAI: number;
  };
}

/**
 * AI-NATIVE Intelligence Integration System
 * Provides semantic access to endpoint business intelligence
 */
export class IntelligenceIntegrator {
  private static endpoints: Map<string, EndpointIntelligence> = new Map();
  private static parameters: Map<string, ParameterRequirement> = new Map();
  private static universalParams: Set<string> = new Set();
  private static metadata: IntelligenceMetadata | null = null;
  private static initialized = false;

  /**
   * Initialize intelligence from JSON files
   */
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.loadEndpointIntelligence();
      await this.loadParameterRequirements();
      this.generateMetadata();
      this.enhanceEndpoints();
      
      this.initialized = true;
      console.log(`✅ Intelligence integrated: ${this.metadata?.totalEndpoints} endpoints, ${this.metadata?.totalParameters} parameters`);
      
    } catch (error) {
      console.error('❌ Failed to initialize intelligence:', error);
      throw error;
    }
  }

  /**
   * Load endpoint intelligence from JSON file
   */
  private static async loadEndpointIntelligence(): Promise<void> {
    const filePath = resolve(process.cwd(), 'endpoint-intelligence.json');
    
    if (!existsSync(filePath)) {
      console.warn('⚠️ Endpoint intelligence file not found:', filePath);
      return;
    }

    try {
      const intelligenceData = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      for (const endpoint of intelligenceData.endpoints) {
        // Extract meaningful endpoint path
        const endpointPath = this.extractEndpointPath(endpoint);
        
        if (endpointPath) {
          const enhanced: EndpointIntelligence = {
            ...endpoint,
            semanticTags: this.generateSemanticTags(endpoint),
            businessContext: this.generateBusinessContext(endpoint),
            naturalLanguageAliases: this.generateNaturalLanguageAliases(endpoint)
          };
          
          this.endpoints.set(endpointPath, enhanced);
        }
      }
      
      console.log(`✅ Loaded ${this.endpoints.size} endpoint definitions`);
      
    } catch (error) {
      console.error('❌ Failed to load endpoint intelligence:', error);
      throw error;
    }
  }

  /**
   * Load parameter requirements from JSON file
   */
  private static async loadParameterRequirements(): Promise<void> {
    const filePath = resolve(process.cwd(), 'parameter-requirements-intelligence.json');
    
    if (!existsSync(filePath)) {
      console.warn('⚠️ Parameter requirements file not found:', filePath);
      return;
    }

    try {
      const paramData = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      // Load universal required parameters
      for (const param of paramData.universalRequiredParameters || []) {
        const requirement: ParameterRequirement = {
          ...param,
          isUniversal: true,
          validationRules: this.generateValidationRules(param)
        };
        
        this.parameters.set(param.parameter, requirement);
        this.universalParams.add(param.parameter);
      }
      
      // Load other parameter definitions (if present in the file)
      if (paramData.parameterDefinitions) {
        for (const param of paramData.parameterDefinitions) {
          if (!this.parameters.has(param.parameter)) {
            this.parameters.set(param.parameter, {
              ...param,
              isUniversal: false
            });
          }
        }
      }
      
      console.log(`✅ Loaded ${this.parameters.size} parameter requirements (${this.universalParams.size} universal)`);
      
    } catch (error) {
      console.error('❌ Failed to load parameter requirements:', error);
      throw error;
    }
  }

  /**
   * Generate metadata about loaded intelligence
   */
  private static generateMetadata(): void {
    const domains = Array.from(new Set(Array.from(this.endpoints.values()).map(e => e.businessDomain)));
    
    const withDescriptions = Array.from(this.endpoints.values())
      .filter(e => e.description && e.description.trim().length > 0).length;
    
    const withParameters = Array.from(this.endpoints.values())
      .filter(e => e.queryParameters && e.queryParameters.length > 0).length;
    
    const readyForAI = Array.from(this.endpoints.values())
      .filter(e => e.semanticTags.length > 0 && e.businessContext.length > 0).length;
    
    this.metadata = {
      loadedAt: new Date(),
      totalEndpoints: this.endpoints.size,
      totalParameters: this.parameters.size,
      universalParameters: this.universalParams.size,
      businessDomains: domains,
      coverage: {
        withDescriptions,
        withParameters,
        readyForAI
      }
    };
  }

  /**
   * Enhance endpoints with AI-native features
   */
  private static enhanceEndpoints(): void {
    for (const [path, endpoint] of this.endpoints) {
      // Add parameter intelligence to each endpoint
      for (const param of endpoint.queryParameters) {
        if (this.parameters.has(param.key)) {
          const paramInfo = this.parameters.get(param.key)!;
          param.description = param.description || paramInfo.examples[0]?.description || 'Parameter description';
        }
      }
      
      // Ensure universal parameters are marked as required
      for (const universalParam of this.universalParams) {
        if (!endpoint.requiredQueryParams.includes(universalParam)) {
          endpoint.requiredQueryParams.push(universalParam);
        }
      }
    }
  }

  /**
   * AI-NATIVE: Get endpoints by business domain
   */
  static getEndpointsByDomain(domain: string): EndpointIntelligence[] {
    this.ensureInitialized();
    
    return Array.from(this.endpoints.values())
      .filter(endpoint => endpoint.businessDomain.toLowerCase() === domain.toLowerCase());
  }

  /**
   * AI-NATIVE: Search endpoints by semantic tags
   */
  static searchEndpointsBySemantics(query: string): EndpointIntelligence[] {
    this.ensureInitialized();
    
    let normalizedQuery = query.toLowerCase();
    
    // Apply semantic mappings for educational testing domain
    const semanticMappings: Record<string, string[]> = {
      'student': ['examinee', 'test taker', 'participant'],
      'students': ['examinees', 'test takers', 'participants'],
      'test': ['exam', 'assessment', 'evaluation'],
      'session': ['event', 'test session'],
      'score': ['result', 'outcome'],
      'institution': ['school', 'organization'],
      'administration': ['management', 'admin']
    };
    
    // Expand query with semantic equivalents
    const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 2);
    const expandedTerms = [...queryTerms];
    
    queryTerms.forEach(term => {
      if (semanticMappings[term]) {
        expandedTerms.push(...semanticMappings[term]);
      }
    });
    
    return Array.from(this.endpoints.values())
      .filter(endpoint => {
        // Check if any expanded query term matches semantic tags, aliases, or business context
        return expandedTerms.some(term => 
          endpoint.semanticTags.some(tag => tag.toLowerCase().includes(term)) ||
          endpoint.naturalLanguageAliases.some(alias => alias.toLowerCase().includes(term)) ||
          endpoint.businessContext.toLowerCase().includes(term) ||
          endpoint.businessDomain.toLowerCase().includes(term) ||
          endpoint.name.toLowerCase().includes(term)
        ) ||
        // Also check full query match
        endpoint.semanticTags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
        endpoint.naturalLanguageAliases.some(alias => alias.toLowerCase().includes(normalizedQuery)) ||
        endpoint.businessContext.toLowerCase().includes(normalizedQuery) ||
        endpoint.businessDomain.toLowerCase().includes(normalizedQuery) ||
        endpoint.name.toLowerCase().includes(normalizedQuery);
      })
      .sort((a, b) => {
        // Sort by relevance - exact matches first
        const aExact = a.name.toLowerCase().includes(normalizedQuery) ? 2 : 0;
        const bExact = b.name.toLowerCase().includes(normalizedQuery) ? 2 : 0;
        
        const aPartial = expandedTerms.filter(term => 
          a.semanticTags.some(tag => tag.includes(term)) ||
          a.naturalLanguageAliases.some(alias => alias.includes(term))
        ).length;
        
        const bPartial = expandedTerms.filter(term => 
          b.semanticTags.some(tag => tag.includes(term)) ||
          b.naturalLanguageAliases.some(alias => alias.includes(term))
        ).length;
        
        return (bExact + bPartial) - (aExact + aPartial);
      });
  }

  /**
   * AI-NATIVE: Get all GET endpoints for Phase 3 expansion
   */
  static getGetEndpoints(): EndpointIntelligence[] {
    this.ensureInitialized();
    
    return Array.from(this.endpoints.values())
      .filter(endpoint => endpoint.method.toUpperCase() === 'GET')
      .sort((a, b) => a.businessDomain.localeCompare(b.businessDomain));
  }

  /**
   * AI-NATIVE: Get universal parameters with their requirements
   */
  static getUniversalParameterRequirements(): Record<string, ParameterRequirement> {
    this.ensureInitialized();
    
    const universal: Record<string, ParameterRequirement> = {};
    
    for (const param of this.universalParams) {
      const requirement = this.parameters.get(param);
      if (requirement) {
        universal[param] = requirement;
      }
    }
    
    return universal;
  }

  /**
   * AI-NATIVE: Get business intelligence report
   */
  static getIntelligenceReport(): {
    metadata: IntelligenceMetadata;
    domains: Array<{ name: string; endpointCount: number; examples: string[] }>;
    universalParameters: Array<{ name: string; frequency: number; percentage: string }>;
    readinessScore: number;
  } {
    this.ensureInitialized();
    
    if (!this.metadata) {
      throw new Error('Intelligence metadata not available');
    }
    
    // Domain analysis
    const domainMap = new Map<string, string[]>();
    for (const endpoint of this.endpoints.values()) {
      if (!domainMap.has(endpoint.businessDomain)) {
        domainMap.set(endpoint.businessDomain, []);
      }
      domainMap.get(endpoint.businessDomain)!.push(endpoint.name);
    }
    
    const domains = Array.from(domainMap.entries()).map(([name, endpoints]) => ({
      name,
      endpointCount: endpoints.length,
      examples: endpoints.slice(0, 3)
    }));
    
    // Universal parameters analysis
    const universalParameters = Array.from(this.universalParams)
      .map(param => {
        const req = this.parameters.get(param);
        return {
          name: param,
          frequency: req?.frequency || 0,
          percentage: req?.percentage || '0%'
        };
      });
    
    // Calculate readiness score
    const readinessScore = Math.round(
      (this.metadata.coverage.readyForAI / this.metadata.totalEndpoints) * 100
    );
    
    return {
      metadata: this.metadata,
      domains,
      universalParameters,
      readinessScore
    };
  }

  // Helper methods for enhancement
  private static extractEndpointPath(endpoint: any): string | null {
    if (endpoint.url && endpoint.url.pathString) {
      return endpoint.url.pathString;
    }
    
    if (endpoint.url && endpoint.url.raw) {
      // Extract path from raw URL
      try {
        const url = endpoint.url.raw.replace(/\{\{[^}]+\}\}/g, ''); // Remove template variables
        if (url.startsWith('/')) {
          return url;
        }
      } catch {
        // Ignore parsing errors
      }
    }
    
    return null;
  }

  private static generateSemanticTags(endpoint: any): string[] {
    const tags: Set<string> = new Set();
    
    // Add business domain
    if (endpoint.businessDomain) {
      tags.add(endpoint.businessDomain.toLowerCase());
    }
    
    // Add method
    tags.add(endpoint.method.toLowerCase());
    
    // Add tags from name
    if (endpoint.name) {
      const nameWords = endpoint.name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((word: string) => word.length > 2);
      
      nameWords.forEach((word: string) => tags.add(word));
    }
    
    // Add tags from description
    if (endpoint.description) {
      const descWords = endpoint.description.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((word: string) => word.length > 3);
      
      descWords.slice(0, 5).forEach((word: string) => tags.add(word)); // Limit to 5 most relevant
    }
    
    return Array.from(tags);
  }

  private static generateBusinessContext(endpoint: any): string {
    const contexts = [
      endpoint.businessDomain && `${endpoint.businessDomain} operations`,
      endpoint.method === 'GET' && 'data retrieval',
      endpoint.method === 'POST' && 'data creation',
      endpoint.method === 'PUT' && 'data updates',
      endpoint.method === 'DELETE' && 'data removal'
    ].filter(Boolean);
    
    if (endpoint.description && endpoint.description.length > 0) {
      return endpoint.description;
    }
    
    return contexts.join(', ') || 'API operation';
  }

  private static generateNaturalLanguageAliases(endpoint: any): string[] {
    const aliases: Set<string> = new Set();
    
    if (endpoint.name) {
      aliases.add(endpoint.name.toLowerCase());
    }
    
    if (endpoint.businessDomain) {
      aliases.add(endpoint.businessDomain.toLowerCase());
    }
    
    // Generate common aliases based on endpoint patterns
    const path = this.extractEndpointPath(endpoint);
    if (path) {
      const pathParts = path.split('/').filter(part => part && !part.match(/^\{.*\}$/));
      pathParts.forEach(part => aliases.add(part));
    }
    
    return Array.from(aliases);
  }

  private static generateValidationRules(param: any): string[] {
    const rules: string[] = [];
    
    if (param.parameter === 'program-id') {
      rules.push('Must be a valid program identifier');
      rules.push('Typically numeric');
    }
    
    if (param.parameter === 'program-institution-id') {
      rules.push('Must be a valid institution identifier');
      rules.push('Associated with the program');
    }
    
    return rules;
  }

  private static ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('❌ IntelligenceIntegrator not initialized. Call IntelligenceIntegrator.initialize() first.');
    }
  }
}
