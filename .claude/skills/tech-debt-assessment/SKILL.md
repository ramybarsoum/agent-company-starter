---
name: tech-debt-assessment
description: Assess and prioritize technical debt with impact analysis, remediation plans, and business case for addressing debt.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A codebase area, service, or specific concern about technical debt.

```
/tech-debt-assessment                              → Start with guided questions
/tech-debt-assessment "Patient API service"        → Assess a specific service
/tech-debt-assessment --from-review "work/code-reviews/my-review.md" → From code review findings
/tech-debt-assessment --full                       → Full codebase tech debt audit
```

**What you get:** A prioritized tech debt assessment with business impact, remediation plan, and recommendation for what to address now vs later. Saved to `work/analyses/[area]-tech-debt-assessment.md`.

**Time:** 30-60 minutes for a service-level assessment.

