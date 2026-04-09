---
name: tech-design
description: Guide through creating a Tech Design Doc from a PRD, covering architecture, data model, flows, security, reliability, and observability.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A Feature Doc (PRD), problem statement, or rough brief describing what needs to be built.

```
/tech-design                                    → Start from scratch with guided questions
/tech-design [paste PRD or feature brief]       → Skip questions you already answered
/tech-design --from "projects/my-prd.md"    → Load a PRD file directly
/tech-design --review                           → Review an existing tech design for gaps
```

**What you get:** A complete tech design document with 9 sections: Architecture, Data Design, Flows, Security/HIPAA, Reliability, Observability, Migration, Risks, and Appendix. Saved to `work/tech-designs/[feature]-tech-design.md`. Based on `templates/tech-design-template.md`.

**Time:** 30-60 minutes for first draft. Then iterate with review feedback.

**Filename convention:** `[feature-name-kebab-case]-tech-design.md`

---

## Step 1: Read the Feature Doc

Before writing anything:

1. Find the Feature Doc in `projects/`
2. Read all sections
3. Read every use case in Section 5
4. Note: what data does this need? What systems does it touch? What are the edge cases?

If anything is unclear, flag it to the PM before proceeding. Do not make assumptions that block implementation.

---

## Step 2: Encode Decision Boundaries Before Writing

Run this in a fresh AI session before drafting. It surfaces the implicit rules Engineering will need to make correct judgment calls — what to decide autonomously, what to escalate, what the tradeoff hierarchy is. Output feeds directly into your Tech Design's Risks, Trade-offs, and Open Questions sections.

```
<role>
You are an organizational intent architect. You extract implicit decision-making logic — judgment calls, tradeoff resolutions, escalation triggers — and encode them into structured frameworks that AI agents and engineers can act on without asking.
</role>

<instructions>
PHASE 1 — SCOPE
Ask: "What system or component does this Tech Design cover? What are the main architectural decisions you need to make?"
Wait for response.

PHASE 2 — INTENT EXTRACTION
Ask in groups of 2-3, wait between groups.

GROUP A — Tradeoffs:
- "When build speed and architectural correctness conflict, how do you resolve it? Give a specific example."
- "What would you cut if you had to reduce scope by 30%? What is non-negotiable in the architecture?"

GROUP B — Decision Boundaries:
- "What architectural decisions can the engineer make without checking with PM or DoE?"
- "What decisions MUST be escalated? Name specific trigger conditions — not 'big decisions,' but concrete examples."

GROUP C — Failure Modes:
- "What's the most likely way this implementation goes wrong — not in code quality, but in architectural direction?"
- "What would make the PM look at the built system and say 'technically correct but wrong'?"

GROUP D — Constraints:
- "What existing system contracts, data models, or API shapes must this design comply with?"
- "What approaches are explicitly off the table — for technical, compliance, or organizational reasons?"

PHASE 3 — OUTPUT
Produce a Decision Framework for this Tech Design:

DECISION AUTHORITY
Decide autonomously: [decisions + boundary conditions]
Decide with PM notification: [decisions + who to notify]
Escalate before acting: [decisions + trigger conditions + who to escalate to]

TRADEOFF HIERARCHY
When these conflict, resolve in this order:
1. [Highest priority — always wins]
2. [Second priority]
3. [Default optimization target]

EXPLICIT CONSTRAINTS
Must comply with: [list]
Explicitly prohibited: [list]

COMMON FAILURE MODES
[Numbered list: mistake → why it happens → correct approach]
</instructions>

<guardrails>
- Push for specificity. "We value correctness" is not useful. "We'd rather delay a sprint than ship without FacilityId isolation" is useful.
- Mark inferred intent with [INFERRED — VERIFY]
- If stated values and described behavior seem inconsistent, flag it
</guardrails>
```

Paste the Decision Framework into your Tech Design under Risks & Trade-offs and Open Questions.

---

## Step 3: Draft the Tech Design

Use the template at `templates/tech-design-template.md`. Key sections:

1. **Architecture** — system components and how they connect
2. **Data Design** — new tables, modified columns, indexes, relationships
3. **Flows** — sequence diagrams or step-by-step for key flows
4. **Security / HIPAA** — auth, RBAC, PHI handling, audit logging, facility isolation
5. **Reliability** — failure handling at each layer
6. **Observability** — logging, metrics, alerting
7. **Migration** — how to safely ship without breaking production
8. **Risks & Trade-offs** — what could go wrong, what was deprioritized and why
9. **Open Questions** — unresolved technical decisions with owners

---

## Step 4: Security Checklist (AllCare HIPAA Requirements)

Before submitting for review:
- [ ] PHI never logged (use opaque PatientId only)
- [ ] PHI never in URLs or query params
- [ ] Audit logging on every PHI read/write/delete
- [ ] Authorization checked on every endpoint
- [ ] FacilityId filter on every query that touches patient data
- [ ] Secrets from Key Vault, not hardcoded
- [ ] TLS 1.2+ for all external calls
- [ ] 42 CFR Part 2 consent checked if substance abuse data involved

---

## Step 5: Output

Save to `work/tech-designs/[feature-name-kebab-case]-tech-design.md`.

Confirm:
- "Tech Design saved to `[path]`"
- "Next: share with DoE for review. PM also reviews to confirm it aligns with product intent. Once approved, run `/implementation-plan`."

