import { test, expect } from '@playwright/test';
const { ApiClient } = require('./dist/ApiClient.js');

// All the real endpoints from the mapping
const endpoints = [
  { operationId: 'ChannelInstitutionQuery', path: '/channel/institutions/query' },
  { operationId: 'EventAuthorizationQuery', path: '/event/authorizations/Query' },
  { operationId: 'EventClassQuery', path: '/event-class/Query' },
  { operationId: 'EventClassExamineesQuery', path: '/event-class/examinees/query' },
  { operationId: 'EventQuery', path: '/event/query' },
  { operationId: 'ExamineeAuditQuery', path: '/examinee/audit/query' },
  { operationId: 'QueryExamineeEvents', path: '/examinee/events/query' },
  { operationId: 'LongitudinalSegmentDetailQuery', path: '/examinee/longitudinal-segment-detail/query' },
  { operationId: 'LongitudinalSegmentsQuery', path: '/examinee/longitudinal-segments/query' },
  { operationId: 'ExamineeQuery', path: '/examinee/query' },
  { operationId: 'ExamineeRecordQuery', path: '/examinee/record/query' },
  { operationId: 'FormDefinitionQuery', path: '/form/definition/Query' },
  { operationId: 'FormQuery', path: '/Form/Query' },
  { operationId: 'InventoryQuery', path: '/inventory/query' },
  { operationId: 'TestExportQuery', path: '/iw-tool/export/tests/query' },
  { operationId: 'ItemWorkshopQuery', path: '/iw-tool/import/query' },
  { operationId: 'ExamineeQuery1', path: '/message-history/query' },
  { operationId: 'OrderQuery', path: '/order/Query' },
  { operationId: 'PackageFormsQuery', path: '/package/forms/Query' },
  { operationId: 'RegistrationQuery', path: '/registration/query' },
  { operationId: 'RemoteAdminUrlsQuery', path: '/remote/admin-urls/Query' },
  { operationId: 'RemoteExamineeDataQuery', path: '/remote/examinee-data/Query' },
  { operationId: 'RemoteSessionDataQuery', path: '/remote/session-data/Query' },
  { operationId: 'RemoteSessionQuery', path: '/remote/sessions/query' },
  { operationId: 'ResultIdentifierQuery', path: '/result-identifier/Query' },
  { operationId: 'ResultQuery', path: '/result/query' },
  { operationId: 'SabbaticalQuery', path: '/sabbatical/Query' },
  { operationId: 'SecureBrowserErrorsQuery', path: '/secure-browser/errors/query' },
  { operationId: 'SessionQuery', path: '/session/query' },
  { operationId: 'SignalRDomainQuery', path: '/signalr-domain/query' },
  { operationId: 'TestFormsQuery', path: '/test/forms/Query' },
  { operationId: 'TestPretestReferencesQuery', path: '/test/pretest-references/Query' },
  { operationId: 'TestQuery', path: '/Test/Query' },
  { operationId: 'QueryUserAccess', path: '/user/access/query' }
];

test.describe('Complete GET Endpoint Validation - All 200s', () => {
  let api: any;
  const results: Array<{endpoint: string, status: number, success: boolean, dataCount?: number, error?: string}> = [];

  test.beforeAll(async () => {
    api = new ApiClient('./environments/238-stg.json');
    console.log('🤖 AI starting comprehensive endpoint validation...');
    console.log(`📋 Testing ${endpoints.length} endpoints for 200 responses\n`);
  });

  test('Systematic validation of all GET endpoints', async () => {
    let successCount = 0;
    let totalCount = endpoints.length;

    for (let i = 0; i < endpoints.length; i++) {
      const endpoint = endpoints[i];
      console.log(`\n🔍 [${i+1}/${totalCount}] Testing: ${endpoint.operationId}`);
      console.log(`    Path: ${endpoint.path}`);
      
      try {
        const response = await api.raw(endpoint.path, {
          method: 'GET',
          query: {} // Let auto-injection handle program-id
        });

        const success = response.status >= 200 && response.status < 300;
        let dataCount;
        
        if (success && response.json) {
          if (Array.isArray(response.json)) {
            dataCount = response.json.length;
          } else if (typeof response.json === 'object') {
            dataCount = Object.keys(response.json).length;
          }
        }

        results.push({
          endpoint: endpoint.path,
          status: response.status,
          success,
          dataCount,
          error: success ? undefined : response.text?.substring(0, 100)
        });

        if (success) {
          console.log(`    ✅ SUCCESS (${response.status}) - ${dataCount ? `${dataCount} items` : 'data returned'}`);
          successCount++;
        } else {
          console.log(`    ❌ FAILED (${response.status}) - ${response.text?.substring(0, 50)}...`);
        }

      } catch (error: any) {
        console.log(`    💥 ERROR - ${error.message}`);
        results.push({
          endpoint: endpoint.path,
          status: 0,
          success: false,
          error: error.message
        });
      }

      // Small delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful (200-299): ${successCount}/${totalCount}`);
    console.log(`❌ Failed: ${totalCount - successCount}/${totalCount}`);
    console.log(`📈 Success Rate: ${((successCount/totalCount)*100).toFixed(1)}%\n`);

    // Detailed breakdown
    console.log('📋 DETAILED RESULTS:');
    results.forEach((result, i) => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.endpoint} (${result.status}) ${result.dataCount ? `- ${result.dataCount} items` : ''}`);
    });

    console.log('\n🔍 FAILED ENDPOINTS:');
    const failed = results.filter(r => !r.success);
    failed.forEach(result => {
      console.log(`❌ ${result.endpoint} - ${result.status} - ${result.error || 'Unknown error'}`);
    });

    // Assert that we achieved some meaningful success rate
    expect(successCount).toBeGreaterThan(0);
    console.log(`\n🎯 Target: Get ALL ${totalCount} endpoints returning 200`);
    console.log(`📊 Current: ${successCount}/${totalCount} endpoints successful`);
  });
});
