# Agent Company Starter

A complete starter kit for running an AI agent company. Framework-agnostic. Works with any agent orchestration layer (Paperclip, LangGraph, CrewAI, custom).

Two things in one repo:

1. **Template repo** you can browse and copy (`company-template/`)
2. **Vision interview skill** that auto-generates all company files from a 16-question founder interview

Three-layer verification baked in. Worker self-check, CEO quality gate, independent QA agent.

## Quick Start

### Path 1: Automated (recommended)

Run the Vision interview skill. It conducts a 16-question founder interview, then auto-generates `VISION.md`, `CEO_BOOTSTRAP.md`, and initial project inventory.

```bash
# Install the skill, then run:
/paperclip-vision
```

The interview covers company purpose, product definition, team structure, quality standards, and operating constraints. Every answer feeds directly into the generated files.

### Path 2: Manual

```bash
cp -r company-template/ your-company/
```

Open each file in `your-company/company/` and fill in the `[BRACKETS]`.

## Directory Structure

```
agent-company-starter/
├── company-template/           # Copy this to start a new company
│   ├── agents/
│   │   ├── ceo/                # CEO with 13-step heartbeat loop
│   │   ├── qa/                 # Independent QA agent (hardcoded standards)
│   │   └── worker/             # Template for any worker role
│   ├── company/
│   │   ├── VISION.md           # Company purpose, product, constraints
│   │   ├── CEO_BOOTSTRAP.md    # CEO operating instructions
│   │   ├── PROJECT-INVENTORY.md
│   │   └── CONTRIBUTING.md
│   ├── skills/                 # 26 production skills
│   ├── references/             # Reference docs for agents
│   └── _system/sub-agents/     # 13 review panel sub-agents
├── skill/                      # Vision interview skill
│   └── references/             # Templates for generated files
├── playbook/                   # Philosophy, anti-patterns, lessons
└── docs/plans/                 # Design documents
```

## Three-Layer Verification

Every piece of work passes through up to three checks before it ships.

| Layer | Who | What | When |
|-------|-----|------|------|
| 1 | Worker | Self-check (generic + role-specific criteria) | Every task |
| 2 | CEO | Quality gate (verify deliverable, red flag table) | Every task |
| 3 | QA Agent | Holdout test scenarios, binary pass/fail | `build` and `deploy` tasks only |

Key details:

- QA only activates for `build` and `deploy` tasks. `ops` tasks use 2-layer verification.
- QA reports to the Founder (not the CEO). This prevents failure suppression.
- QA standards are hardcoded. The CEO cannot relax them.

## Skills (26 total)

Organized by lifecycle phase.

| Phase | Skills |
|-------|--------|
| **Spec Writing** | `feature-spec-interview` (61 question groups, NLSpec format) |
| **Spec Review** | `feature-doc-review-panel` (7 perspectives: eng, design, exec, legal, UXR, skeptic, customer) |
| **Strategy** | `competitor-analysis` |
| **Execution** | `create-tickets`, `launch-checklist`, `decision-doc` |
| **Architecture** | `tech-design`, `api-design`, `database-design`, `implementation-plan`, `site-architecture` |
| **Quality** | `code-review-skill`, `security-review-skill`, `performance-analysis`, `deployment-checklist`, `debug-session`, `incident-postmortem`, `tech-debt-assessment` |
| **Prototyping** | `prototype`, `generate-ai-prototype`, `napkin-sketch`, `design-review-notes`, `brand-tokens` |
| **Agent Ops** | `feedback-loop`, `quality-control`, `self-check` |

## Review Panel (13 Sub-Agents)

The `_system/sub-agents/` directory contains 13 specialized reviewers that can be spawned for multi-perspective review:

`engineer`, `designer`, `executive`, `legal-advisor`, `uxr-analyst`, `skeptic`, `customer-voice`, `architecture`, `data`, `devops`, `performance`, `security`, `testing`

## The Feature Spec Workflow

```
Vision Interview --> VISION.md + CEO_BOOTSTRAP.md
                         |
                    CEO runs feature-spec-interview
                         |
              Can't answer? --> ESCALATE to Founder (never hallucinate)
                         |
                    feature-doc-review-panel (7 perspectives)
                         |
                    create-tickets
```

## GSD v1 Integration

Backend and frontend coding agents use GSD v1 (`get-shit-done-cc`) for all `build` tasks:

- Structured planning with atomic task decomposition
- Wave-based parallel execution
- Built-in verification (separate from executor)
- Global learnings, codebase intelligence, code review
- Boundary maps and append-only decisions register

GSD handles execution. The agent company framework handles specification, quality, and coordination.

## Anti-Patterns

Things that will break your agent company:

- Letting the CEO relax QA standards (that is why QA is hardcoded)
- Skipping the Vision interview and filling templates with vague answers
- Running `build` tasks without the 3-layer check
- Letting agents hallucinate answers instead of escalating to the Founder

## Credits

Built on patterns from:

- **Paperclip Vision** (founder interview methodology)
- **Paperclip Company Playbook** by @aronprins (CEO heartbeat, worker templates, quality gates)
- **GSD v1** by gsd-build (execution methodology)
- Production lessons from running autonomous agent teams at scale

## License

MIT
