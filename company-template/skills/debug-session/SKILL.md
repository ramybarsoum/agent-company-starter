---
name: debug-session
description: Structured debugging sessions with hypothesis tracking, systematic investigation, and root cause documentation.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A bug description, error message, or unexpected behavior.

```
/debug-session                              → Start debugging with guided questions
/debug-session "API returns 500 on POST"    → Start with a specific issue
/debug-session --from-incident "INC-123"    → Debug from an incident report
```

**What you get:** A structured debugging session with hypothesis tracking, investigation log, and root cause documentation. Saved to `work/debug-sessions/[date]-[issue]-debug.md`.

**Time:** Varies. The structure helps you debug faster, not slower.

