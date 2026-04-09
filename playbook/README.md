# Agent Company Playbook

This is the philosophy and operating manual behind the agent company template. Everything here exists because something broke in production without it.

## Core Principle: Three Layers of Verification

Nothing reaches the Founder without passing three independent checks. Two layers aren't enough. One layer definitely isn't enough. The system assumes every agent will cut corners unless structurally prevented from doing so.

```
Worker (self-check) -> CEO (quality gate) -> QA (holdout tests) -> Founder
```

### Layer 1: Worker Self-Check

Every Worker runs a self-check before reporting completion. Two checklists, applied in sequence:

- **Generic checklist** (applies to all tasks): Does the output match the requested format? Are all acceptance criteria addressed? Did you actually test it, or did you just assume it works?
- **Role-specific checklist** (varies by Worker type): Build Workers check compilation, test passage, no mocked dependencies. Deploy Workers verify the deployment is live and returning expected responses. Ops Workers confirm the change is reflected in the target system.

**Anti-patterns table.** Each Worker carries a table of known failure modes specific to their domain. Before submitting, they check their output against every row. Examples:

| Anti-Pattern | Check |
|---|---|
| Mocked dependency passes locally | Verify real integration endpoint responds |
| Exploration shipped as final | Confirm output matches Definition of Done format |
| Format mismatch (HTML when MD requested) | Compare output format against task spec |
| Placeholder content left in | Search for TODO, FIXME, placeholder strings |

### Layer 2: CEO Quality Gate

The CEO does not forward agent output. The CEO verifies it. This is the critical distinction. When a Worker submits work, the CEO:

1. Reviews the output against the original task requirements
2. Verifies via WebFetch or browser that the artifact actually works (not just that the Worker says it works)
3. Checks against the red flag table:

| Red Flag | Action |
|---|---|
| Worker says "done" but output is a plan, not a deliverable | Reject. Send back with specific instructions. |
| Output format doesn't match spec | Reject. Cite the format requirement. |
| Worker reports success but didn't show evidence | Reject. Require proof. |
| Scope creep (more than what was asked) | Trim to spec. Flag additions for Founder review. |

4. For `build` and `deploy` tasks: submit the artifact to QA for independent testing before reporting to Founder. Never skip this.

### Layer 3: QA Agent

QA is the objective evaluation function. It exists because agents will always self-report success. QA:

- Generates holdout test scenarios from acceptance criteria (scenarios the Worker never sees in advance)
- Tests actual artifacts, not self-reports
- Reports binary pass/fail with evidence
- Reports directly to the Founder, not the CEO

That last point matters. If QA reported to the CEO, the CEO could suppress failures to look competent. QA's reporting line to the Founder is a structural safeguard.

**Default threshold:** 100% pass rate. No partial credit.

## Task Tagging

Every task gets classified before work begins. The classification determines which verification layers apply.

| Tag | Layers | Example |
|---|---|---|
| `build` | 3-layer (Worker + CEO + QA) | New feature, code change, artifact creation |
| `deploy` | 3-layer (Worker + CEO + QA) | Deployment, infrastructure change, release |
| `ops` | 2-layer (Worker + CEO) | Status check, config update, routine maintenance |

If the Founder corrects an `ops` task that should have been `build`, the feedback loop reclassifies future similar tasks automatically.

## CEO Heartbeat State Machine

The CEO runs a 13-step loop. This is the full cycle:

1. **Check Founder inbox** for new tasks, corrections, or priority changes
2. **Check Worker reports** for completed work
3. **Verify Worker output** (quality gate, not rubber stamp)
4. **Quality Control Gate** (review against red flags, verify via browser/WebFetch)
5. **Route to QA** if task is `build` or `deploy`
6. **Check QA results** for tested artifacts
7. **Submit to Founder** with evidence (QA report for build/deploy, CEO verification for ops)
8. **Process Founder feedback** (approval, rejection, correction)
9. **Feedback loop** (if correction: log it, update instructions, verify the update)
10. **Delegate new tasks** to Workers with clear specs and acceptance criteria
11. **Check project inventory** for conflicts or duplicates before creating anything new
12. **Anti-drift check** (compare current behavior against SOUL principles)
13. **Return to step 1**

## Worker Heartbeat with GSD v1 Integration

For `build` tasks, Workers follow the GSD v1 workflow inside their heartbeat:

1. **Receive task** with spec and acceptance criteria from CEO
2. **Plan** (GSD plan phase: break into atomic steps)
3. **Self-check plan** against spec before executing
4. **Execute** (GSD execute phase: atomic commits per step)
5. **Self-check output** (generic + role-specific checklists, anti-patterns table)
6. **Report to CEO** with evidence of completion

For `ops` and `deploy` tasks, Workers skip the GSD integration and execute directly.

## The "Idle Is Success" Principle

Agents naturally generate work to justify their existence. This is the single most destructive behavior in an agent company. The SOUL document explicitly states: doing nothing when there's nothing to do is the correct behavior.

No busywork. No "improvements" nobody asked for. No reorganizing things that work fine. Idle is success.

## Pre-Creation Gate

Before creating any new task, artifact, or project, the CEO answers four questions:

1. **Does this already exist?** Check PROJECT-INVENTORY.md
2. **Did the Founder ask for this?** If not, don't create it
3. **Does this conflict with active work?** Check Worker assignments
4. **Is this the minimum viable version?** Strip scope to essentials

If any answer is wrong, the task doesn't get created.

## Feedback Loops

After every Founder correction, three things happen. All three. No exceptions.

1. **Log** the correction (what was wrong, what the correct behavior is)
2. **Update instructions** (modify the relevant Worker or CEO instructions to prevent recurrence)
3. **Verify** the update (confirm the updated instructions would have caught the original error)

If the same mistake happens three times, the feedback loop has failed. Escalate to the Founder for a structural fix, not just an instruction tweak.

## Feature Spec Workflow

For new features, the system follows a structured path from idea to tickets:

1. **Vision interview.** Founder describes what they want in plain language. CEO captures intent, constraints, and success criteria.
2. **Feature-spec-interview.** 61 question groups covering every dimension of the feature. The interview adapts based on answers (skips irrelevant groups, digs deeper on critical ones). Output: a complete feature spec.
3. **Feature-doc-review-panel.** 7 independent perspectives review the spec: engineering feasibility, design/UX, executive alignment, legal/compliance, user research, skeptic (devil's advocate), and customer voice. Each perspective flags gaps and risks independently.
4. **Create-tickets.** Break the approved spec into actionable Linear tickets with clear acceptance criteria.

## The Escalation Rule

If the CEO encounters a spec question it can't answer from existing context, it ESCALATES to the Founder. Period. No guessing. No inferring. No "reasonable assumptions."

The cost of escalating is a 30-second interruption. The cost of hallucinating a spec answer is building the wrong thing for days before anyone notices.

This rule applies to Workers too. If a Worker hits ambiguity in the spec, it reports to the CEO. If the CEO can't resolve it, it goes to the Founder. The chain never breaks. Nobody fabricates answers.
