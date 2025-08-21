/**
 * API operation metadata for AI assistant consumption
 */
export interface OperationMetadata {
  id: string;
  name: string;
  semanticName: string;
  description: string;
  naturalLanguageDescription: string;
  category: string;
  endpoint: string;
  method: string;
  parameters: {
    required: string[];
    optional: string[];
    autoInjected: string[];
  };
  examples: OperationExample[];
  tags: string[];
  aiHints: string[];
}

/**
 * Usage example for an operation
 */
export interface OperationExample {
  title: string;
  description: string;
  input: Record<string, any>;
  expectedOutput: string;
  naturalLanguageQuery: string;
}

/**
 * Semantic search result
 */
export interface SemanticMatch {
  operation: OperationMetadata;
  relevanceScore: number;
  matchReason: string;
}

/**
 * Operation registry that provides AI-friendly metadata about all available API operations
 * Enables natural language discovery and intelligent operation selection
 */
export class OperationRegistry {
  private operations: Map<string, OperationMetadata> = new Map();
  private semanticIndex: Map<string, string[]> = new Map(); // keyword -> operation IDs
  private categoryIndex: Map<string, string[]> = new Map(); // category -> operation IDs

  constructor() {
    this.initializeOperations();
    this.buildSemanticIndex();
  }

  /**
   * Initialize all known operations from Phase 1 artifacts
   * Based on the 41 read-only operations documented in plan.readonly.json
   */
  private initializeOperations(): void {
    // Channel/Institution Operations
    this.addOperation({
      id: 'channel-institution-query',
      name: 'channelInstitutionQuery',
      semanticName: 'findInstitutionsByChannel',
      description: 'Query institutions by delivery channel',
      naturalLanguageDescription: 'Find all schools and institutions that offer programs through a specific delivery method like online, campus-based, or hybrid learning',
      category: 'institutions',
      endpoint: '/channel/institutions/query',
      method: 'GET',
      parameters: {
        required: ['program-id'],
        optional: ['program-institution-id', 'channel', 'include-inactive'],
        autoInjected: ['program-id', 'program-institution-id']
      },
      examples: [
        {
          title: 'Find online institutions',
          description: 'Get all institutions offering online programs',
          input: { channel: 'online' },
          expectedOutput: 'List of institutions with online delivery channels',
          naturalLanguageQuery: 'What schools offer online programs?'
        },
        {
          title: 'Find campus institutions',
          description: 'Get all institutions offering campus-based programs',
          input: { channel: 'campus' },
          expectedOutput: 'List of institutions with campus delivery channels',
          naturalLanguageQuery: 'Which schools have physical campuses?'
        }
      ],
      tags: ['institutions', 'channels', 'delivery', 'schools'],
      aiHints: [
        'Use "online", "campus", or "hybrid" for channel parameter',
        'Results include institution details and available programs',
        'Useful for comparing delivery options across schools'
      ]
    });

    // Add more operations as we discover them from API exploration
    // This is a foundation that will grow as we test more endpoints
    
    // Programs Operations (placeholder for future expansion)
    this.addOperation({
      id: 'programs-query',
      name: 'programsQuery',
      semanticName: 'findPrograms',
      description: 'Query available programs',
      naturalLanguageDescription: 'Search for academic programs, degrees, and courses offered by institutions',
      category: 'programs',
      endpoint: '/programs/query',
      method: 'GET',
      parameters: {
        required: ['program-id'],
        optional: ['program-institution-id', 'active-only', 'include-details'],
        autoInjected: ['program-id', 'program-institution-id']
      },
      examples: [
        {
          title: 'Find all programs',
          description: 'Get complete list of available programs',
          input: {},
          expectedOutput: 'List of programs with details',
          naturalLanguageQuery: 'What programs are available?'
        }
      ],
      tags: ['programs', 'degrees', 'courses', 'academic'],
      aiHints: [
        'Returns program details including requirements and descriptions',
        'Use active-only to filter out inactive programs',
        'Include-details provides comprehensive program information'
      ]
    });
  }

  /**
   * Add a new operation to the registry
   */
  private addOperation(metadata: OperationMetadata): void {
    this.operations.set(metadata.id, metadata);
  }

  /**
   * Build semantic index for natural language search
   */
  private buildSemanticIndex(): void {
    for (const [id, operation] of this.operations.entries()) {
      // Index by semantic name words
      const semanticWords = operation.semanticName.toLowerCase().split(/(?=[A-Z])|[\s-_]/);
      this.indexWords(semanticWords, id);

      // Index by description words
      const descWords = operation.naturalLanguageDescription.toLowerCase().split(/\s+/);
      this.indexWords(descWords, id);

      // Index by tags
      this.indexWords(operation.tags, id);

      // Index by category
      if (!this.categoryIndex.has(operation.category)) {
        this.categoryIndex.set(operation.category, []);
      }
      this.categoryIndex.get(operation.category)!.push(id);
    }
  }

  /**
   * Index words for semantic search
   */
  private indexWords(words: string[], operationId: string): void {
    for (const word of words) {
      const cleanWord = word.toLowerCase().trim();
      if (cleanWord.length > 2) { // Skip very short words
        if (!this.semanticIndex.has(cleanWord)) {
          this.semanticIndex.set(cleanWord, []);
        }
        if (!this.semanticIndex.get(cleanWord)!.includes(operationId)) {
          this.semanticIndex.get(cleanWord)!.push(operationId);
        }
      }
    }
  }

  /**
   * Get operation metadata by ID
   * AI Assistant Usage: Get detailed information about a specific operation
   */
  getOperation(id: string): OperationMetadata | undefined {
    return this.operations.get(id);
  }

  /**
   * Get operation by semantic name
   * AI Assistant Usage: Look up operations using semantic method names
   */
  getOperationBySemanticName(semanticName: string): OperationMetadata | undefined {
    for (const operation of this.operations.values()) {
      if (operation.semanticName === semanticName) {
        return operation;
      }
    }
    return undefined;
  }

  /**
   * Search operations using natural language
   * AI Assistant Usage: Find relevant operations based on natural language queries
   */
  searchOperations(query: string): SemanticMatch[] {
    const queryWords = query.toLowerCase().split(/\s+/);
    const matches: Map<string, { score: number; reasons: string[] }> = new Map();

    for (const word of queryWords) {
      // Direct word matches
      if (this.semanticIndex.has(word)) {
        for (const operationId of this.semanticIndex.get(word)!) {
          if (!matches.has(operationId)) {
            matches.set(operationId, { score: 0, reasons: [] });
          }
          matches.get(operationId)!.score += 1;
          matches.get(operationId)!.reasons.push(`matches "${word}"`);
        }
      }

      // Partial word matches for typos or variations
      for (const [indexWord, operationIds] of this.semanticIndex.entries()) {
        if (indexWord.includes(word) || word.includes(indexWord)) {
          for (const operationId of operationIds) {
            if (!matches.has(operationId)) {
              matches.set(operationId, { score: 0, reasons: [] });
            }
            matches.get(operationId)!.score += 0.5;
            matches.get(operationId)!.reasons.push(`partially matches "${word}" via "${indexWord}"`);
          }
        }
      }
    }

    // Convert to semantic matches and sort by relevance
    const results: SemanticMatch[] = [];
    for (const [operationId, match] of matches.entries()) {
      const operation = this.operations.get(operationId);
      if (operation) {
        results.push({
          operation,
          relevanceScore: match.score,
          matchReason: match.reasons.join(', ')
        });
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Get operations by category
   * AI Assistant Usage: Browse operations by functional category
   */
  getOperationsByCategory(category: string): OperationMetadata[] {
    const operationIds = this.categoryIndex.get(category) || [];
    return operationIds.map(id => this.operations.get(id)!).filter(Boolean);
  }

  /**
   * Get all available categories
   * AI Assistant Usage: Discover what types of operations are available
   */
  getCategories(): string[] {
    return Array.from(this.categoryIndex.keys()).sort();
  }

  /**
   * Get all operations
   * AI Assistant Usage: Browse complete API surface
   */
  getAllOperations(): OperationMetadata[] {
    return Array.from(this.operations.values()).sort((a, b) => a.semanticName.localeCompare(b.semanticName));
  }

  /**
   * Get operation suggestions based on similar operations
   * AI Assistant Usage: Discover related operations that might be useful
   */
  getSimilarOperations(operationId: string, limit = 5): OperationMetadata[] {
    const operation = this.operations.get(operationId);
    if (!operation) return [];

    const similar: Map<string, number> = new Map();

    // Find operations with same category
    const sameCategory = this.getOperationsByCategory(operation.category);
    for (const op of sameCategory) {
      if (op.id !== operationId) {
        similar.set(op.id, (similar.get(op.id) || 0) + 2);
      }
    }

    // Find operations with shared tags
    for (const tag of operation.tags) {
      const taggedOperations = this.searchOperations(tag);
      for (const match of taggedOperations) {
        if (match.operation.id !== operationId) {
          similar.set(match.operation.id, (similar.get(match.operation.id) || 0) + 1);
        }
      }
    }

    // Sort by similarity score and return top results
    const sortedSimilar = Array.from(similar.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.operations.get(id)!)
      .filter(Boolean);

    return sortedSimilar;
  }

  /**
   * Get operation usage examples
   * AI Assistant Usage: Learn how to use an operation with real examples
   */
  getOperationExamples(operationId: string): OperationExample[] {
    const operation = this.operations.get(operationId);
    return operation?.examples || [];
  }

  /**
   * Add new operation discovered during runtime
   * AI Assistant Usage: Teach the system about new operations found in the API
   */
  registerNewOperation(metadata: OperationMetadata): void {
    this.addOperation(metadata);
    this.buildSemanticIndex(); // Rebuild index to include new operation
  }
}
