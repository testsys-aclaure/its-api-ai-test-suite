import json

with open('tool-list.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

tool_names = [tool['name'] for tool in data['tools']]
tool_count = {}

for name in tool_names:
    tool_count[name] = tool_count.get(name, 0) + 1

for name in sorted(tool_count.keys()):
    print(f"{name}: {tool_count[name]}")
print(f"Total tools: {len(tool_names)}")