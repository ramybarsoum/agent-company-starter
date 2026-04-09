---
name: incident-postmortem
description: Document incident postmortems with timeline, root cause analysis, impact assessment, and action items following blameless methodology.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** An incident to document, or raw notes from an incident.

```
/incident-postmortem                              → Start from scratch with guided questions
/incident-postmortem "INC-2025-001"               → Start with an incident ID
/incident-postmortem --from-debug "work/debug-sessions/my-debug.md" → Convert debug session
```

**What you get:** A blameless postmortem with timeline, root cause, impact analysis, and action items. Saved to `work/postmortems/[date]-[incident]-postmortem.md`. Based on `templates/incident-postmortem-template.md`.

**Time:** 30-60 minutes.

