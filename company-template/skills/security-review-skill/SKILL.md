---
name: security-review-skill
description: HIPAA-focused security review for features, APIs, and data flows. Covers PHI handling, access control, audit logging, and compliance.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A tech design, PR, or feature description to review for security.

```
/security-review-skill                                    → Start a guided security review
/security-review-skill --from "work/tech-designs/my-design.md" → Review a tech design
/security-review-skill --pr 123                           → Review a PR for security issues
/security-review-skill --threat-model                     → Full STRIDE threat model
```

**What you get:** A security review covering HIPAA compliance, PHI handling, access control, and threat analysis. Saved to `work/security-reviews/[feature]-security-review.md`. Based on `templates/security-review-template.md`.

**Time:** 20-40 minutes for a thorough review.

