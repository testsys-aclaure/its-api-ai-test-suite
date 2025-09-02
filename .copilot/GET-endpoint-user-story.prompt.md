---
mode: agent
tools: ['qa-sandbox', 'openapi-tools']
description:  Author an Azure Boards User Story for an API endpoint based on a pasted text specification. Output must contain human-readable sections (title, description, acceptance criteria)and a machine-readable AI Test Anchors YAML block.Post Description and Acceptance Criteria as separate fields in Azure Boards. Set tags explicitly using the System.Tags fieldDo not generate test cases or hardcoded parameter values.

---


# Task

Given a raw text specification for an API endpoint, create a new **User Story** in Azure Boards  
(project=QA, area=QA\API Sandbox, iteration=QA).  

**To ensure correct Feature linkage, you may include the Feature name or ID at the top of your prompt (before the endpoint requirements). If provided, the User Story will be linked as a child of that Feature.**

Fill out both the **human-facing story sections** and the **AI Test Anchors** machine-readable block.

## Steps

1. Parse the provided text spec:
   - Extract the endpoint path, HTTP method, purpose/description, authentication type, and parameters (required + optional).
   - Capture any rules (e.g. XOR params, bounds, defaults).
   - Capture response structure and type (array, object, schema fields if given).

2. Generate the User Story content (**DO NOT ECHO THIS IN CHAT**):
   - **Title**: `GET <endpoint>` (or `POST/PUT/etc.` as appropriate).
   - **Description (HTML)**:
       - Human-readable summary of the endpoint’s purpose, domain, and value.
       - Endpoint Details table (endpoint, purpose, auth, category/domain, last audited).
       - AI Testing Metadata list (endpoint, method, auth type, required IDs, response type, priority).
       - Test Data Requirements section.
       - <strong>AI Test Anchors YAML block</strong> (place at the end of Description). Example:
         ```
         endpoint: /endpoint/path
         method: GET
         auth:
           scheme: bearer
           header: Authorization
           token_env: API_TOKEN
         runtime:
           base_url_env: API_BASE_URL
           env_files: [".env.local", ".env", ".vscode/env/.env.qa"]
         params:
           required:
             - { name: program-id, type: integer, format: int64 }
         rules:
           xor: [["before-id","after-id"]]
         response:
           shape: array
         artifacts_dir: ".artifacts"
         ```
       - Use **env key names only** e(.g. `API_BASE_URL`, `API_TOKEN`, `PROGRAM_ID`).  
         Never hardcode real values.
   - **Acceptance Criteria (HTML)**:
       - Authentication & Authorization expectations.
       - Required Parameters with rules.
       - Optional Parameters with constraints.
       - Response validation (structure, codes, invariants, and <strong>full enumeration of all response fields, types, nullability, constraints (length, enum, min/max, business rules, etc.) as described in the input</strong>). For any response field that is a bitflag or enum, <strong>include a table or list of all possible values and their meanings as described in the input specification</strong>.
       - AI Testing Notes (validation, boundary cases, automation linkage).
...
3. Post to Azure Boards in three steps:
   1. Create the work item with `mcp_ado_wit_create_work_item`:
      - project: "QA"
      - workItemType: "User Story"
      - fields:
        - `System.AreaPath`: "QA\\API Sandbox"
        - `System.IterationPath`: "QA"
        - `System.Title`: derived from endpoint and method
        - `System.State`: "New"
        - `Microsoft.VSTS.Common.Priority`: 2
   2. Update the work item with `mcp_ado_wit_update_work_item` to set the Description:
      - id: (work item id from previous step)
      - updates:
        - op: "add"
          path: "/fields/System.Description"
          value: full HTML description block with anchors
   3. Update the work item with `mcp_ado_wit_update_work_item` to set Acceptance Criteria:
      - id: (work item id from previous step)
      - updates:
        - op: "add"
          path: "/fields/Microsoft.VSTS.Common.AcceptanceCriteria"
          value: HTML block

4. After creating the User Story:
   1. Search Azure Boards for a Feature work item whose title or tags match the endpoint’s domain (such as "Event", "Result", "Examinee") using `mcp_ado_search_workitem` with workItemType "Feature".
   2. If a matching Feature is found, link the new User Story as a child of that Feature using `mcp_ado_wit_work_items_link` (set the Feature as parent, User Story as child, type "parent").
   3. If no matching Feature is found, proceed without linking, but note this in the work item’s history or comments.

---

# Input

Use an ingest block for the raw endpoint spec, e.g.:

    /event/query
    Method: GET
    Auth: Bearer Token
    Parameters: ...
    Responses: ...

---

# Output Expectations

- The created work item has:
  - Readable HTML sections for business/QA users.
  - An exact AI Test Anchors YAML block at the end of Description.
  - <strong>Acceptance Criteria must enumerate every response field, its type, nullability, constraints, and business rules as described in the input spec. For any bitflag or enum field, include a table or list of all possible values and their meanings as described in the input. Do not summarize or omit fields.</strong>
  - YAML references env keys and env files, not literal secrets or IDs.
  - No test cases, no automated tests, no hardcoded data.
  - Do not set tags. Tags will be managed manually.
