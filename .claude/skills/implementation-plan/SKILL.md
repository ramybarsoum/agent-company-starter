---
name: implementation-plan
description: Create phased Implementation Plans from Tech Designs, breaking features into incremental, testable phases with clear acceptance criteria.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A Tech Design Doc, or point to one in `work/tech-designs/`.

```
/implementation-plan                                    → Start from scratch with guided questions
/implementation-plan [paste tech design summary]        → Skip questions you already answered
/implementation-plan --from "work/tech-designs/my-design.md" → Load a tech design directly
/implementation-plan --review                           → Review an existing implementation plan for gaps
```

**What you get:** A phased implementation plan with incremental delivery, each phase adding one testable capability. Saved to `work/implementation-plans/[feature]-implementation-plan.md`. Based on `templates/implementation-plan-template.md`.

**Time:** 20-40 minutes for first draft. Then iterate with review feedback.

**Filename convention:** `[feature-name-kebab-case]-implementation-plan.md`

---

## Step 1: Read the Tech Design

Before phasing:

1. Find the Tech Design in `work/tech-designs/`
2. Read the full architecture, data model, and system flows
3. Identify: what can be built incrementally? What are the dependencies between parts?
4. Identify: what can be tested independently after each phase?

---

## Step 2: Specify Each Phase Before Writing

Run this in a fresh AI session for each phase before writing it into the plan. It produces a precise, testable phase spec — task decomposition, acceptance criteria, and definition of done — that an AI coding agent can execute against without clarification.

```
<role>
You are a specification engineer. You turn vague implementation ideas into precise, complete phase specifications that autonomous AI coding agents can execute against over hours without human intervention. Each phase spec is a contract: the agent knows exactly what to build, what done looks like, and when to stop and ask.
</role>

<instructions>
PHASE 1 — INTAKE
Ask: "What phase are we specifying? Give me: (1) the phase name, (2) the capability it adds — what can be demoed after this phase that couldn't be demoed before, (3) which Feature Doc use cases it covers."
Wait for response.
Then ask: "(1) What is the estimated scope — hours or days? (2) What phases must be complete before this one can start?"
Wait for response.

PHASE 2 — DEEP INTERVIEW
Ask in groups of 2-3, wait for answers.

AREA A — Tasks and Scope:
- What are the discrete tasks in this phase? List them. What comes first?
- What existing code, schema, or API does this phase touch or extend?

AREA B — Edge Cases:
- What's the hardest part of this phase — where does it usually go wrong?
- What should happen if the expected data or dependency isn't available?

AREA C — Tradeoffs:
- If time is short, what gets cut from this phase? What is non-negotiable?
- Where is "good enough" acceptable? Where must it be exact?

AREA D — Constraints:
- What must this phase NOT do?
- What patterns, conventions, or contracts must it comply with?

When done: "I think I have enough. Anything else before I write the spec?"

PHASE 3 — OUTPUT
Produce the phase spec:

### Phase [N]: [Name]

**Capability added:** [what can be demoed after this phase]
**Feature Doc use cases covered:** [UC-N list]
**Depends on:** [Phase X] or None
**Estimated scope:** [S/M/L]

**Tasks:**
- [ ] [specific task]
- [ ] [specific task]

**Acceptance Criteria:**
- PASS: [specific, observable, verifiable outcome]
- PASS: [another specific outcome]
- FAIL: [specific failure condition]

**Constraint Architecture:**
Must Do: [non-negotiable requirements]
Must Not Do: [explicit prohibitions]
Escalate: [conditions where the agent must stop and ask the engineer]

**Definition of Done:** [unambiguous — what merged + passing means for this phase]

**PR:** `feature/[name]/phase-[N]`
</instructions>

<guardrails>
- Every AC must be verifiable by someone who wasn't in this conversation
- "Works correctly" and "looks good" are not acceptance criteria — operationalize them
- Mark assumptions with [ASSUMPTION: ...] so the engineer can confirm
- If the phase scope exceeds 3 days, recommend splitting
</guardrails>
```

Run one session per phase. Paste output into the plan's Detailed Phases section.

---

## Step 3: Define Phases

**Rules for phasing:**
- Each phase must add exactly one testable capability
- Each phase must be completable and reviewable on its own
- Each phase = 1 PR
- Phases are ordered by dependency
- Aim for phases that take 1–3 days each

---

## Step 4: Map Use Cases to Phases

After drafting phases, map each Feature Doc use case to the phase where it gets implemented. This helps Engineering and QA know when each use case can be tested.

---

## Step 5: Output

Save to `work/implementation-plans/[feature-name-kebab-case]-implementation-plan.md`.

Confirm:
- "Implementation Plan saved to `[path]`"
- "Next: share with DoE, EM, and PM for sign-off. Once approved, implement phase by phase. After each phase, run `/implementation-progress`."

