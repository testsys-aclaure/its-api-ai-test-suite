import json
import re

import os
# Load GET endpoints from POSTMAN_TO_MCP_TOOL_MAP.json
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_path = os.path.join(BASE, 'src', 'POSTMAN_TO_MCP_TOOL_MAP.json')
tracker_path = os.path.join(BASE, 'docs', 'ENDPOINT_WORKITEM_TRACKER.md')
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
get_endpoints = [
    (item['tool_name'], item['endpoint'])
    for item in data
    if item.get('method', '').upper() == 'GET'
]

    
# Load tracked endpoints from ENDPOINT_WORKITEM_TRACKER.md
with open(tracker_path, 'r', encoding='utf-8') as f:
    tracker = f.read()
tracked = set(re.findall(r'(/\S+)', tracker))

# Find missing GET endpoints
missing = [(tool, endpoint) for tool, endpoint in get_endpoints if endpoint not in tracked]

print('ALL GET ENDPOINTS:')
for tool, endpoint in get_endpoints:
    print(f'{tool}: {endpoint}')
print(f'\nTotal GET endpoints: {len(get_endpoints)}')

print('\nMISSING FROM TRACKER:')
for tool, endpoint in missing:
    print(f'{tool}: {endpoint}')
print(f'\nTotal missing: {len(missing)}')
