---
name: database-design
description: Design database schemas with ERDs, table definitions, indexes, migrations, and EF Core entity configurations following AllCare conventions.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A tech design, feature description, or data requirements.

```
/database-design                                    → Start from scratch
/database-design "Patient preferences storage"      → Start with a specific feature
/database-design --from "work/tech-designs/my-design.md" → Extract schema from tech design
/database-design --review                           → Review existing schema for issues
```

**What you get:** Complete database design with ERD, table definitions, indexes, migration plan, and EF Core configurations. Saved to `work/database-designs/[feature]-database-design.md`.

**Time:** 15-30 minutes.

