#!/bin/bash

# Fast CURL API Exploration
# Much faster than Node.js for quick endpoint testing
# Usage: ./curl-explore.sh /endpoint/path

ENDPOINT=${1:-"/event/query"}
INTENT=${2:-"fast exploration"}

echo "⚡ CURL-Based Fast API Exploration"
echo "═══════════════════════════════════"
echo ""
echo "📝 Endpoint: $ENDPOINT"
echo "🎯 Intent: $INTENT"

# Environment setup
BASE_URL=${BASE_URL:-"https://api-staging.testsys.io"}
IDENTITY_URL=${IDENTITY_URL:-"https://identity-staging.testsys.io"}
CLIENT_ID=${CLIENT_ID:-"your-client-id"}
CLIENT_SECRET=${CLIENT_SECRET:-"your-client-secret"}
PROGRAM_ID=${DEFAULT_PROGRAM_ID:-"238"}
INSTITUTION_ID=${PROGRAM_INSTITUTION_ID:-"1009048"}

echo "🌐 Base URL: $BASE_URL"
echo "─────────────────────────────────────────────────"

# Step 1: Get token (FAST with CURL)
echo ""
echo "🔐 Step 1: Getting access token with CURL..."
START=$(date +%s%3N)

TOKEN_RESPONSE=$(curl -s -X POST "$IDENTITY_URL/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&scope=its-next-gen-api" \
  --connect-timeout 5 --max-time 10)

TOKEN_TIME=$(($(date +%s%3N) - START))

if [ $? -eq 0 ] && echo "$TOKEN_RESPONSE" | grep -q "access_token"; then
  ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
  echo "✅ Token acquired in ${TOKEN_TIME}ms (CURL)"
else
  echo "❌ Token acquisition failed"
  echo "Response: $TOKEN_RESPONSE"
  exit 1
fi

# Step 2: Fast endpoint exploration
echo ""
echo "🔍 Step 2: Fast exploration strategies..."

declare -a strategies=(
  "No Parameters:"
  "Universal Parameters:?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID" 
  "With Active Filter:?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID&active-only=true"
  "With Limit:?program-id=$PROGRAM_ID&program-institution-id=$INSTITUTION_ID&limit=10"
)

SUCCESS_FOUND=false

for strategy in "${strategies[@]}"; do
  IFS=':' read -r name params <<< "$strategy"
  
  echo ""
  echo "   📋 Trying: $name"
  START=$(date +%s%3N)
  
  URL="$BASE_URL$ENDPOINT$params"
  
  # Make request with timing
  RESPONSE=$(curl -s -w "HTTPSTATUS:%{http_code};TIMING:%{time_total}" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Accept: application/json" \
    --connect-timeout 3 --max-time 8 \
    "$URL")
  
  REQUEST_TIME=$(($(date +%s%3N) - START))
  
  # Parse response
  HTTP_STATUS=$(echo "$RESPONSE" | grep -o 'HTTPSTATUS:[0-9]*' | cut -d: -f2)
  CURL_TIMING=$(echo "$RESPONSE" | grep -o 'TIMING:[0-9.]*' | cut -d: -f2)
  DATA=$(echo "$RESPONSE" | sed 's/HTTPSTATUS:[0-9]*;TIMING:[0-9.]*$//')
  
  # Convert seconds to milliseconds
  CURL_TIME_MS=$(echo "$CURL_TIMING * 1000" | bc 2>/dev/null || echo "$REQUEST_TIME")
  
  echo "      ⚡ CURL Response: HTTP $HTTP_STATUS (${CURL_TIME_MS%.*}ms)"
  
  if [ "$HTTP_STATUS" = "200" ]; then
    SUCCESS_FOUND=true
    echo "      ✅ SUCCESS! Strategy \"$name\" works"
    
    # Count data items
    if echo "$DATA" | grep -q '^\['; then
      # Array response
      ITEM_COUNT=$(echo "$DATA" | grep -o '},{' | wc -l)
      ITEM_COUNT=$((ITEM_COUNT + 1))
      echo "      📊 Data: $ITEM_COUNT items (array)"
    elif echo "$DATA" | grep -q '^{'; then
      # Object response  
      PROP_COUNT=$(echo "$DATA" | grep -o '":"[^"]*"' | wc -l)
      echo "      📊 Data: $PROP_COUNT properties (object)"
    else
      echo "      📊 Data: ${#DATA} bytes"
    fi
    
    # Business context
    case "$ENDPOINT" in
      *event*) CONTEXT="Educational test events and assessments" ;;
      *user*) CONTEXT="System users and permissions" ;;
      *examinee*) CONTEXT="Students/test-takers in the system" ;;
      *result*) CONTEXT="Test results and scores" ;;
      *) CONTEXT="API data" ;;
    esac
    
    echo "      💡 AI Interpretation: Found $CONTEXT using $name"
    break
    
  elif [ "$HTTP_STATUS" = "422" ]; then
    echo "      ⚠️ HTTP 422 - Need different parameters (business validation)"
  elif [ "$HTTP_STATUS" = "404" ]; then
    echo "      ❌ HTTP 404 - Endpoint not found"
  elif [ "$HTTP_STATUS" -ge "500" ]; then
    echo "      ❌ HTTP $HTTP_STATUS - Server error"
  else
    echo "      ❓ HTTP $HTTP_STATUS - Unexpected response"
  fi
done

# Summary
echo ""
echo "──────────────────────────────────────────────────"
if [ "$SUCCESS_FOUND" = true ]; then
  echo "🎉 EXPLORATION SUCCESSFUL"
  echo "✅ Found working parameter combination"
  echo "⚡ CURL exploration is significantly faster than Node.js HTTP"
else
  echo "🔍 EXPLORATION COMPLETE"
  echo "⚠️ No working parameter combination found"
fi

echo ""
echo "💡 CURL Advantages:"
echo "   • Native OS networking (no Node.js overhead)"
echo "   • Built-in HTTP/2 support"
echo "   • Superior timeout handling"  
echo "   • Direct shell execution"
echo "   • Perfect for rapid API discovery"
