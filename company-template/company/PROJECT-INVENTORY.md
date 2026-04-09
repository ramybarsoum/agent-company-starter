# PROJECT-INVENTORY.md — [Company Name]

*Source of truth for what exists. Every agent reads this before starting work. If it's not in this file, check before creating it.*

**Last updated:** [DATE]

---

## Product Identity

| Field | Value |
|-------|-------|
| Product name | [NAME] |
| Domain | [DOMAIN] |
| What we are | [DESCRIPTION] |
| What we are NOT | [EXPLICIT BOUNDARY] |
| Tech stack | [STACK] |
| Primary repo | [REPO URL] |

---

## Existing Deliverables

| Deliverable | Location | Status | Owner |
|-------------|----------|--------|-------|
| [NAME] | [PATH/URL] | [live/staging/draft] | [AGENT] |

---

## Directory Ownership

| Directory | Owner | Purpose |
|-----------|-------|---------|
| `agents/ceo/` | CEO | CEO agent files and memory |
| `agents/qa/` | QA Agent | QA agent files and memory |
| `agents/[role]/` | [Role Agent] | Worker agent files |
| `company/` | CEO | Company-level documents |
| `docs/` | Shared | Documentation |

---

## Current Phase

**Phase:** [NUMBER — NAME]
**Goal:** [WHAT THIS PHASE ACHIEVES]
**Status:** [in-progress / complete / planning]

---

## Rules for All Agents

1. **Read this file before creating anything.** If a deliverable exists, do not recreate it.
2. **Update this file** when you create, move, or delete a deliverable.
3. **Product name is sacred.** Always use the exact product name from the table above.
4. **Directory ownership is enforced.** Only the owner agent writes to their directory.
