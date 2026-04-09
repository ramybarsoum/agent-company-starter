---
name: code-review-skill
description: Structured code review for PRs and implementation phases, checking correctness, security, performance, and AllCare conventions.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A PR link, branch name, or set of changed files to review.

```
/code-review-skill                                → Review uncommitted changes in current branch
/code-review-skill --pr 123                       → Review a specific PR
/code-review-skill --branch feature/my-feature    → Review all changes on a branch
/code-review-skill --files "src/Api/**"           → Review specific files
/code-review-skill --phase 3                      → Review Phase 3 implementation against its plan
```

**What you get:** A structured code review with findings categorized by severity, plus an overall assessment. Saved to `work/code-reviews/[feature]-phase-[N]-review.md`.

**Time:** 10-20 minutes per review.

