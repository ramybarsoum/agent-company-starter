---
name: deployment-checklist
description: Generate deployment checklists for releases with pre-deploy verification, rollback plans, and monitoring setup.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A feature or release to deploy, or point to an implementation plan.

```
/deployment-checklist                                    → Start with guided questions
/deployment-checklist "Patient Preferences v1"           → Start with a specific release
/deployment-checklist --from "work/implementation-plans/my-plan.md" → Generate from plan
```

**What you get:** A complete deployment checklist with pre-deploy, deploy, post-deploy, and rollback steps. Saved to `work/deployment-checklists/[feature]-deploy-checklist.md`. Based on `templates/deployment-checklist-template.md`.

**Time:** 10-20 minutes.

