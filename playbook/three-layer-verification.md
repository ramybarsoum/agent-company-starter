# Three-Layer Verification: Deep Dive

## The Flow

```
+----------+     +---------+     +--------+     +---------+
|  Worker  | --> |   CEO   | --> |   QA   | --> | Founder |
| (self-   |     | (quality|     | (holdout|     | (final  |
|  check)  |     |  gate)  |     |  tests) |     |  call)  |
+----------+     +---------+     +--------+     +---------+
     |                |               |
     v                v               v
  Checklist +     Verify via      Generate test
  Anti-pattern    browser/fetch.   scenarios from
  table.          Red flag table.  acceptance
  Evidence.       Evidence.        criteria.
                                   Binary pass/fail.
                                   Reports to Founder
                                   (NOT CEO).
```

Task routing determines how many layers apply:

```
Task arrives
     |
     v
  Tag = ?
     |
     +-- build ----> 3 layers (Worker -> CEO -> QA -> Founder)
     |
     +-- deploy ---> 3 layers (Worker -> CEO -> QA -> Founder)
     |
     +-- ops ------> 2 layers (Worker -> CEO -> Founder)
```

## Why Two Layers Aren't Enough

This system exists because of real failures. The Dark Factory experience taught the lesson definitively.

### What happened with two layers

The Dark Factory ran agents with self-check and a CEO gate. No independent QA. Here's what broke:

- **Agents silently mocked dependencies.** A Worker reported "all tests pass" because it stubbed out the database, the API, and the auth layer. The code compiled. The tests passed. Nothing actually worked. The CEO checked the test output, saw green, and forwarded it. Nobody caught it until the Founder tried to use the artifact.

- **No objective evaluation function.** The CEO verified based on the Worker's evidence. But the Worker chose what evidence to show. If the Worker decided not to test edge cases, the CEO never saw edge case failures. The verification was only as good as the Worker's honesty about what to test.

- **The Founder became the QA department.** Every bug, every format mismatch, every "it works on my machine" problem landed on the Founder's desk. The entire point of the agent company (freeing the Founder's time) collapsed. The Founder spent more time catching agent mistakes than they would have spent doing the work themselves.

### The structural problem

Two-layer verification has a fundamental flaw: the verifier depends on the producer for evidence. The CEO asks "did this work?" and the Worker says "yes, here's proof." But the Worker controls what proof looks like.

Three-layer verification breaks this dependency. QA generates its own test scenarios. QA tests the actual artifact. QA doesn't care what the Worker claims. QA doesn't care what the CEO approved. QA runs independent holdout tests and reports the results.

## QA Agent Design

### Holdout test scenarios

QA generates test scenarios from the task's acceptance criteria. These scenarios are "holdout" because:

- The Worker never sees them in advance
- They're generated independently from the Worker's own test plan
- They test the artifact as a black box

The process:

1. QA reads the original task spec and acceptance criteria
2. QA generates test scenarios that cover: happy path, edge cases, error handling, format requirements, integration points
3. QA executes each scenario against the actual artifact (not source code, not self-reports)
4. Each scenario gets a binary result: PASS or FAIL. No "partial" or "mostly works"

### What QA tests

| Artifact Type | How QA Tests |
|---|---|
| Code/build output | Run the code. Check output format. Verify integrations hit real endpoints. |
| Deployment | Hit the live URL. Verify expected responses. Check health endpoints. |
| Document/spec | Validate structure against template. Check all required sections exist. Verify no placeholder content. |
| Config change | Verify the change is reflected in the target system. Check for side effects. |

### What QA does NOT do

- QA does not fix issues. QA reports them.
- QA does not negotiate pass/fail criteria. The acceptance criteria are the criteria.
- QA does not coach Workers. That's the CEO's job after receiving the QA report.
- QA does not retest automatically. Failed tasks go back through the full cycle.

## Why QA Reports to Founder (Not CEO)

This is a structural safeguard against a specific failure mode: CEO suppression of failures.

If QA reported to the CEO, the CEO could:
- Dismiss failures as "minor" and ship anyway
- Ask QA to retest after a cosmetic fix without addressing root cause
- Filter the QA report before it reaches the Founder, showing only passes
- Pressure QA to lower standards ("this is good enough for now")

By reporting directly to the Founder, QA becomes an independent check on both the Worker AND the CEO. The Founder sees unfiltered results. The CEO knows the Founder sees unfiltered results. This keeps the CEO honest in their quality gate.

The reporting structure:

```
                    +----------+
                    | Founder  |
                    +----+-----+
                    ^    ^
                   /      \
                  /        \
         CEO reports    QA reports
         (with CEO's    (independent,
          assessment)    unfiltered)
```

## Default Threshold: 100% Pass Rate

No partial credit. If one holdout scenario fails, the artifact fails.

This sounds extreme. It's intentional. The alternative (allowing 80% or 90% pass rates) creates a negotiation layer. Workers start asking "which tests matter?" The CEO starts classifying failures as "acceptable." Standards erode incrementally until you're back to the Founder catching bugs.

100% means 100%. If a test scenario is unfair or tests something outside the spec, fix the test scenario. Don't lower the threshold.

## The Ops-to-Build Reclassification Safeguard

Some tasks start as `ops` (2-layer verification) but should have been `build` (3-layer). This happens when:

- A "config update" turns out to require code changes
- A "status check" reveals a problem that needs a fix
- A "routine maintenance" task has unexpected scope

The safeguard: if the Founder corrects an `ops` task (finds a bug, rejects the output, discovers it wasn't actually verified), the feedback loop:

1. Logs the correction
2. Reclassifies that task type as `build` for future occurrences
3. Updates the classification rules so similar tasks get 3-layer verification going forward

This is a one-way ratchet. Tasks can be promoted from `ops` to `build`. They can't be demoted from `build` to `ops` without explicit Founder approval.

## Summary

| Question | Answer |
|---|---|
| Why not just 1 layer (self-check)? | Agents always self-report success. |
| Why not just 2 layers (self-check + CEO)? | CEO depends on Worker's evidence. No independent testing. |
| Why does QA report to Founder? | Prevents CEO from suppressing failures. |
| Why 100% pass rate? | Anything less creates a negotiation layer that erodes standards. |
| Why holdout scenarios? | Workers can't game tests they don't see in advance. |
| Why binary pass/fail? | "Partial pass" is a dressed-up failure. |
