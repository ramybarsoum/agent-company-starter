# CLAUDE.md — Agent Company Starter

This file is automatically read by Claude Code in every session. It defines how AI agents should operate within this company.

---

## Knowledge Architecture

Before starting a new task, review existing rules and hypotheses for this domain.
Apply rules by default. Check if any hypothesis can be tested with today's work.

At the end of each task, extract insights. Store them in domain folders, e.g.:
  /knowledge/pricing/         (or /onboarding/, /competitors/)
    knowledge.md  (facts and patterns)
    hypotheses.md (need more data)
    rules.md      (confirmed, apply by default)

Maintain a /knowledge/INDEX.md that routes to each domain folder.
Create the structure if it doesn't exist yet.
When a hypothesis gets confirmed 3+ times, promote it to a rule.
When a rule gets contradicted by new data, demote it back to hypothesis.

## Decision Journal

When about to make a decision that affects more than today's task, first grep /decisions/ for prior decisions in that area. Follow them unless new information invalidates the reasoning.

If no prior decision exists, or you're replacing one, log it:

File: /decisions/YYYY-MM-DD-{topic}.md

Format:
  ## Decision: {what you decided}
  ## Context: {why this came up}
  ## Alternatives considered: {what else was on the table}
  ## Reasoning: {why this option won}
  ## Trade-offs accepted: {what you gave up}
  ## Supersedes: {link to prior decision, if replacing}

## Quality Gate

Before marking any task complete, evaluate it against the quality criteria for this project:

File: /quality/criteria.md

Format:
  ## Category: {area, e.g. API design, UI, data}
  ## Criteria:
    - {specific, testable check}
    - {specific, testable check}
  ## Severity: blocking | warning
  ## Source: {where this criterion came from}
  ## Last triggered: {date, or "never"}

If /quality/criteria.md doesn't exist, create it with initial criteria based on the project's domain and standards. Ask the Founder to review.

After evaluation, update criteria:
  - Criteria that caught a real issue: note the date
  - Criteria triggered 3+ times: promote to "always check" (run automatically, don't just list)
  - Criteria never triggered after 10+ evaluations: suggest pruning
  - New failure pattern found: flag it and propose a new criterion. Don't add silently.

## System Review Schedule

Last system review: not yet

Periodically, suggest a system review. Check the date above. If 2+ weeks have passed or the project just hit a milestone, suggest it before starting the next task:
  - Prune stale rules in /knowledge/ that haven't been applied in 30+ days
  - Check if any hypothesis has enough evidence to promote or enough contradictions to discard
  - Review decision outcomes. Did the trade-offs play out as expected?
  - Evaluate quality criteria: promote frequent triggers, flag never-triggered for pruning
  - Report what changed and why
  - Update "Last system review" date above

Don't run this automatically. Suggest it. The Founder decides when the time is right.

---

## Three-Layer Verification

Every deliverable passes through up to three layers of verification before reaching the Founder:

1. **Layer 1: Worker Self-Check.** The agent who built it runs generic + role-specific checks.
2. **Layer 2: CEO Quality Gate.** The CEO verifies the deliverable independently (WebFetch, browser, API calls).
3. **Layer 3: QA Agent.** For `build` and `deploy` tasks only. Generates holdout test scenarios from acceptance criteria. Tests the actual artifact. Binary PASS/FAIL.

Tasks tagged `ops` (admin, docs, research, content) use Layers 1 and 2 only.
Tasks tagged `build` or `deploy` must pass all three layers.

The QA agent reports to the Founder, not the CEO. This prevents suppression of failures.

## Task Tagging

Every task gets one of three tags at creation:

| Tag | When | Layers |
|-----|------|--------|
| `build` | Code, features, integrations, infrastructure | 3 (worker + CEO + QA) |
| `deploy` | Production ships, environment changes | 3 (worker + CEO + QA) |
| `ops` | Admin, docs, comms, research, planning | 2 (worker + CEO) |

If the Founder corrects an `ops` task that should have been `build`, the feedback loop reclassifies similar future tasks.

## GSD v1 Execution (Coding Agents Only)

Backend and frontend workers use GSD v1 (`get-shit-done-cc`) for all `build` tasks:

- `/gsd:discuss-phase` for gray areas
- `/gsd:plan-phase` for atomic task decomposition
- `/gsd:execute-phase` for implementation with atomic commits
- `/gsd:verify-work` for verification (separate from executor)

GSD v1's internal verification is a bonus Layer 0 before the worker self-check. Non-coding agents do not use GSD.

## Feature Spec Workflow

1. Run `feature-spec-interview` for each product feature
2. If CEO cannot answer a question from existing context: mark `[ESCALATE]` and message the Founder. Never hallucinate. Never synthesize.
3. After all questions answered: submit to `feature-doc-review-panel` (7-perspective review)
4. After review passes: `create-tickets`

## Design Token Rule

Finalize the design system before writing any UI code. Every size, color, font, radius, spacing, and shadow must reference a design token. No hardcoded values in view/component files. Ever.

- Define tokens first in the project's design system file (e.g. `tokens.css`, `theme.ts`, `AppTheme.swift`)
- All UI code references tokens only
- If a token doesn't exist for a value, add it to the design system. Don't hardcode inline.

## Deep Module Design Principles

### Ousterhout's Deep Modules

A "deep module" has a simple interface but hides significant complexity behind it. A "shallow module" has a complex interface relative to the little it does. Prefer deep modules.

### Information Hiding

Hide complexity. Expose intent. Method names should describe what something does, not how.

### Beck's 4 Rules of Simple Design

In priority order:

1. **Passes all tests.** Code that doesn't work isn't simple, it's broken.
2. **Reveals intention.** A reader should understand what the code does without reading the implementation.
3. **No duplication.** But don't deduplicate prematurely. Wait for 3 occurrences before extracting.
4. **Fewest elements.** Remove anything that doesn't serve rules 1-3.

### KISS: Keep It Simple

Prefer the straightforward solution. Complexity should be earned by real requirements, not hypothetical ones.

### YAGNI: You Aren't Gonna Need It

Don't build for hypothetical future requirements. Build for what's needed now.

**Exceptions worth investing upfront:**
- Logging and observability
- Authentication and authorization
- Audit trails
- Multi-tenancy isolation

### When to Abstract

Extract a shared abstraction when:
- You have 3+ concrete implementations (not 2)
- The abstraction simplifies client code (not just consolidates it)
- The interface is stable

### Comment Discipline

Write comments that explain WHY, not WHAT. The code already shows what it does.

Don't add comments to code you didn't write or change. Don't add comments that restate obvious type signatures or method names.

## Writing Rules

- **No em dashes.** Replace every instance with a period, comma, or parentheses. No exceptions.
- Blunt, directive, confident. No filler, hedging, buzzwords, or motivational content.
- Vary sentence length. Use contractions. Write so AI detectors would not flag it.
- Bullets over paragraphs. Numbers and impact first for executive audiences.
- No "delve," "leverage," "utilize," "unlock," "harness," "streamline," "robust," "cutting-edge."

## Skills

This repo ships with 27 skills in `.claude/skills/` and 13 sub-agents in `.claude/sub-agents/`. They are available as slash commands in Claude Code.

**Key skills:**
- `/agent-company-starter` — Bootstrap a new company via founder interview
- `/feature-spec-interview` — 61-question spec interview (replaces PRDs)
- `/feature-doc-review-panel` — 7-perspective spec review
- `/tech-design` — Architecture, data model, flows, security
- `/code-review-skill` — Structured code review
- `/debug-session` — Hypothesis-driven debugging
- `/deployment-checklist` — Pre-deploy, deploy, post-deploy, rollback

## Agent Files

Agent definitions live in `company-template/agents/`:

| Agent | Files | Role |
|-------|-------|------|
| CEO | SOUL.md, HEARTBEAT.md, AGENTS.md, TOOLS.md | Strategy, coordination, Layer 2 quality gate |
| QA | AGENTS.md, HEARTBEAT.md | Independent Layer 3 verification. Reports to Founder. |
| Worker | AGENTS.md, HEARTBEAT.md | Execution. Uses GSD v1 for `build` tasks. |

## Company Files

| File | Purpose |
|------|---------|
| `company/VISION.md` | Company constitution. CEO reads every heartbeat. |
| `company/CEO_BOOTSTRAP.md` | One-time CEO activation instructions. |
| `company/PROJECT-INVENTORY.md` | Source of truth for existing work. |
| `company/CONTRIBUTING.md` | Commit conventions and branch strategy. |
