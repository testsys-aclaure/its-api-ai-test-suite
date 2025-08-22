# Fast CURL API Exploration (PowerShell)
# Much faster than Node.js for quick endpoint testing
# Usage: .\curl-explore.ps1 "/endpoint/path"

param(
    [string]$Endpoint = "/event/query",
    [string]$Intent = "fast exploration"
)

Write-Host "⚡ CURL-Based Fast API Exploration" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════"
Write-Host ""
Write-Host "📝 Endpoint: $Endpoint"
Write-Host "🎯 Intent: $Intent"

# Environment setup  
$BASE_URL = $env:BASE_URL ?? "https://api-staging.testsys.io"
$IDENTITY_URL = $env:IDENTITY_URL ?? "https://identity-staging.testsys.io"
$CLIENT_ID = $env:CLIENT_ID ?? "your-client-id" 
$CLIENT_SECRET = $env:CLIENT_SECRET ?? "your-client-secret"
$PROGRAM_ID = $env:DEFAULT_PROGRAM_ID ?? "238"
$INSTITUTION_ID = $env:PROGRAM_INSTITUTION_ID ?? "1009048"

Write-Host "🌐 Base URL: $BASE_URL"
Write-Host "─────────────────────────────────────────────────"

# Step 1: Get token (FAST with CURL)
Write-Host ""
Write-Host "🔐 Step 1: Getting access token with CURL..."
$StartTime = Get-Date

$TokenCmd = "curl -s -X POST `"$IDENTITY_URL/connect/token`" " +
    "-H `"Content-Type: application/x-www-form-urlencoded`" " +
    "-d `"grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&scope=its-next-gen-api`" " +
    "--connect-timeout 5 --max-time 10"

try {
    $TokenResponse = Invoke-Expression $TokenCmd
    $TokenTime = [int]((Get-Date) - $StartTime).TotalMilliseconds
    
    $TokenData = $TokenResponse | ConvertFrom-Json
    if ($TokenData.access_token) {
        Write-Host "✅ Token acquired in ${TokenTime}ms (CURL)" -ForegroundColor Green
        $AccessToken = $TokenData.access_token
    } else {
        throw "No access token received"
    }
} catch {
    Write-Host "❌ Token acquisition failed: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Fast endpoint exploration
Write-Host ""
Write-Host "🔍 Step 2: Fast exploration strategies..."

$Strategies = @(
    @{Name="No Parameters"; Params=""}
    @{Name="Universal Parameters"; Params="?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID"}
    @{Name="With Active Filter"; Params="?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID&active-only=true"}
    @{Name="With Limit"; Params="?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID&limit=10"}
)

$SuccessFound = $false

foreach ($Strategy in $Strategies) {
    Write-Host ""
    Write-Host "   📋 Trying: $($Strategy.Name)"
    $StartTime = Get-Date
    
    $Url = "$BASE_URL$Endpoint$($Strategy.Params)"
    
    $ApiCmd = "curl -s -w `"HTTPSTATUS:%{http_code};TIMING:%{time_total}`" " +
        "-H `"Authorization: Bearer $AccessToken`" " +
        "-H `"Accept: application/json`" " +
        "--connect-timeout 3 --max-time 8 " +
        "`"$Url`""
    
    try {
        $Response = Invoke-Expression $ApiCmd
        $RequestTime = [int]((Get-Date) - $StartTime).TotalMilliseconds
        
        # Parse response
        if ($Response -match "HTTPSTATUS:(\d+)") {
            $HttpStatus = $Matches[1]
        } else {
            $HttpStatus = "0"
        }
        
        if ($Response -match "TIMING:([\d.]+)") {
            $CurlTiming = [int]([decimal]$Matches[1] * 1000)
        } else {
            $CurlTiming = $RequestTime
        }
        
        $Data = $Response -replace "HTTPSTATUS:\d+;TIMING:[\d.]+$", ""
        
        Write-Host "      ⚡ CURL Response: HTTP $HttpStatus (${CurlTiming}ms)" -ForegroundColor Yellow
        
        if ($HttpStatus -eq "200") {
            $SuccessFound = $true
            Write-Host "      ✅ SUCCESS! Strategy `"$($Strategy.Name)`" works" -ForegroundColor Green
            
            # Count data items
            try {
                $JsonData = $Data | ConvertFrom-Json
                if ($JsonData -is [Array]) {
                    $ItemCount = $JsonData.Count
                    Write-Host "      📊 Data: $ItemCount items (array)"
                } else {
                    $PropCount = ($JsonData | Get-Member -MemberType Properties).Count
                    Write-Host "      📊 Data: $PropCount properties (object)"
                }
            } catch {
                Write-Host "      📊 Data: $($Data.Length) bytes"
            }
            
            # Business context
            $Context = switch -Regex ($Endpoint) {
                "event" { "Educational test events and assessments" }
                "user" { "System users and permissions" }
                "examinee" { "Students/test-takers in the system" }
                "result" { "Test results and scores" }
                default { "API data" }
            }
            
            Write-Host "      💡 AI Interpretation: Found $Context using $($Strategy.Name)"
            break
            
        } elseif ($HttpStatus -eq "422") {
            Write-Host "      ⚠️ HTTP 422 - Need different parameters (business validation)" -ForegroundColor DarkYellow
        } elseif ($HttpStatus -eq "404") {
            Write-Host "      ❌ HTTP 404 - Endpoint not found" -ForegroundColor Red
        } elseif ([int]$HttpStatus -ge 500) {
            Write-Host "      ❌ HTTP $HttpStatus - Server error" -ForegroundColor Red
        } else {
            Write-Host "      ❓ HTTP $HttpStatus - Unexpected response" -ForegroundColor Magenta
        }
        
    } catch {
        Write-Host "      ❌ CURL failed: $_" -ForegroundColor Red
    }
}

# Summary
Write-Host ""
Write-Host "──────────────────────────────────────────────────"
if ($SuccessFound) {
    Write-Host "🎉 EXPLORATION SUCCESSFUL" -ForegroundColor Green
    Write-Host "✅ Found working parameter combination"
    Write-Host "⚡ CURL exploration is significantly faster than Node.js HTTP"
} else {
    Write-Host "🔍 EXPLORATION COMPLETE" -ForegroundColor DarkYellow
    Write-Host "⚠️ No working parameter combination found"
}

Write-Host ""
Write-Host "💡 CURL Advantages:" -ForegroundColor Cyan
Write-Host "   • Native OS networking (no Node.js overhead)"
Write-Host "   • Built-in HTTP/2 support"
Write-Host "   • Superior timeout handling"
Write-Host "   • Direct shell execution"
Write-Host "   • Perfect for rapid API discovery"
