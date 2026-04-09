---
name: design-review-notes
description: Capture and structure notes from tech design review meetings with decisions, action items, and required changes.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** Notes or transcript from a tech design review meeting.

```
/design-review-notes                              → Start with guided questions
/design-review-notes [paste notes/transcript]     → Process raw notes
/design-review-notes --for "work/tech-designs/my-design.md" → Link to specific design
```

**What you get:** Structured review notes with decisions made, action items, and required changes to the tech design. Saved to `work/analyses/[feature]-design-review-notes.md`.

**Time:** 10-15 minutes.

