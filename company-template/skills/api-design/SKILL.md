---
name: api-design
description: Design RESTful API contracts with endpoint specs, request/response schemas, error handling, versioning, and authentication patterns.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A tech design, feature description, or list of operations the API needs to support.

```
/api-design                                    → Start from scratch with guided questions
/api-design "CRUD for patient preferences"     → Start with a specific feature
/api-design --from "work/tech-designs/my-design.md" → Extract API from tech design
/api-design --review                           → Review existing API design for consistency
```

**What you get:** A complete API design with endpoint specs, request/response schemas, error codes, and examples. Saved to `work/api-designs/[feature]-api-design.md`. Based on `templates/api-design-template.md`.

**Time:** 15-30 minutes per API surface.

**Filename convention:** `[feature-name-kebab-case]-api-design.md`

