# Lessons from Production

Every rule in this template exists because something broke without it. This document catalogs the 13 anti-patterns we encountered and the structural fixes that prevent them.

---

## Anti-Pattern 1: CEO as Postman

**What happened:** The CEO received Worker output and forwarded it to the Founder without checking. Workers shipped broken artifacts, wrong formats, incomplete deliverables. The CEO added no value.

**Root cause:** No verification step in the CEO heartbeat. The CEO treated "Worker says done" as sufficient evidence.

**Fix:** Quality Control Gate (CEO Heartbeat Step 4). The CEO must verify via WebFetch or browser that the artifact actually works. Red flag table catches common submission failures before they reach the Founder or QA.

---

## Anti-Pattern 2: Agents Don't Test Their Work

**What happened:** Workers reported completion without running their output. Code that didn't compile. Deployments that didn't start. Documents with placeholder content.

**Root cause:** No self-check requirement. Workers optimized for speed of reporting, not correctness.

**Fix:** Self-Check (Worker Heartbeat Step 3). Every Worker runs a generic checklist plus role-specific checks before reporting. The anti-patterns table forces Workers to check for known failure modes in their domain.

---

## Anti-Pattern 3: Same Mistake Three Times

**What happened:** The Founder corrected a mistake. The agent acknowledged it. Then made the exact same mistake on the next task. And the one after that.

**Root cause:** Corrections were acknowledged but not encoded into instructions. The agent's behavior didn't actually change.

**Fix:** Feedback Loop (CEO Heartbeat Step 9). After every Founder correction, three mandatory actions: (1) log the correction, (2) update the relevant instructions to prevent recurrence, (3) verify the update would catch the original error. The loop doesn't close until all three are done.

---

## Anti-Pattern 4: Agents Create Busywork

**What happened:** With no tasks in the queue, agents started "improving" things. Reorganizing file structures nobody asked to change. Writing documentation for internal tooling. Creating "enhancement" tasks. The Founder spent time reviewing work they never requested.

**Root cause:** Agents interpreted idle time as failure. They generated activity to appear productive.

**Fix:** "Idle is success" principle in the SOUL document, plus the Pre-Creation Gate. The SOUL explicitly states that doing nothing when there's nothing to do is correct behavior. The Pre-Creation Gate requires four checks before any new task gets created, including "Did the Founder ask for this?"

---

## Anti-Pattern 5: Identity Drift

**What happened:** Over time, the CEO started behaving more like a Worker (doing tasks directly instead of delegating). Workers started behaving like the CEO (making strategic decisions, reprioritizing work). Roles blurred. Accountability disappeared.

**Root cause:** No identity anchor. As context windows filled with varied interactions, agents lost track of their role boundaries.

**Fix:** SOUL "What We Are" section plus Anti-Drift Check (CEO Heartbeat Step 12). The SOUL defines the company's identity and each role's boundaries. The anti-drift check periodically compares current behavior against SOUL principles and flags deviations.

---

## Anti-Pattern 6: Duplicate Work

**What happened:** Two Workers built the same feature. One Worker rewrote a component that another Worker was actively modifying. Tasks conflicted because nobody checked what was already in progress.

**Root cause:** No central inventory of active work and existing artifacts.

**Fix:** PROJECT-INVENTORY.md plus Pre-Creation Gate. The inventory tracks all active projects, their status, and assigned Workers. The Pre-Creation Gate checks the inventory before creating any new task ("Does this already exist?" and "Does this conflict with active work?").

---

## Anti-Pattern 7: Founder Finds All the Bugs

**What happened:** The Founder reviewed every deliverable and found problems the agents should have caught. Missing edge cases. Broken integrations. Wrong output formats. The agent company was supposed to save the Founder time. Instead, the Founder became the quality department.

**Root cause:** Only one verification layer (or no real verification at all). Agents self-reported success. The CEO rubber-stamped it.

**Fix:** Three-layer verification. Worker self-checks catch obvious issues. CEO quality gate catches submission-level problems. QA holdout tests catch everything else. By the time something reaches the Founder, it's been independently verified three times. The Founder's role shifts from "find bugs" to "approve direction."

---

## Anti-Pattern 8: Mocked Dependencies Pass Self-Check

**What happened:** A Worker built a feature, stubbed out the database and external API, ran tests, and reported "all tests pass." The CEO checked the test output. Green across the board. The Founder deployed it. Nothing worked because every dependency was mocked.

**Root cause:** Self-check and CEO verification both relied on the Worker's test setup. If the Worker decided to mock dependencies, the mocks looked like success.

**Fix:** QA agent with holdout scenarios. QA generates its own test scenarios from acceptance criteria. QA tests the actual artifact against real integrations (or at minimum verifies that dependencies are real, not mocked). QA doesn't trust the Worker's test infrastructure.

---

## Anti-Pattern 9: Format Mismatches

**What happened:** Task asked for Markdown. Worker delivered HTML. Task asked for a JSON config. Worker delivered YAML. Task asked for a production-ready component. Worker delivered a prototype with inline styles.

**Root cause:** Format requirements were in the spec but not in the self-check. Workers focused on functionality and ignored format constraints.

**Fix:** Format-specific self-check items plus the anti-patterns table. The generic self-check includes "Does the output match the requested format?" The anti-patterns table includes known format mismatches for each Worker type. The CEO red flag table also catches format issues as a second layer.

---

## Anti-Pattern 10: Explorations Shipped as Final

**What happened:** A Worker explored an approach, generated a rough prototype or proof-of-concept, and submitted it as the final deliverable. The CEO, not knowing the difference, forwarded it. The Founder received a sketch when they expected a finished product.

**Root cause:** No clear Definition of Done. "Done" meant different things to the Worker, CEO, and Founder.

**Fix:** Definition of Done requires final deliverables. The DoD explicitly states what "done" looks like for each task type. Explorations and prototypes are valid intermediate artifacts but cannot be submitted as completions. The CEO red flag table includes "Worker says done but output is a plan, not a deliverable."

---

## Anti-Pattern 11: Feedback Loops Don't Close

**What happened:** The Founder corrected something. The CEO acknowledged the correction. The instructions got updated. But nobody verified that the updated instructions would actually prevent the original error. Two weeks later, same mistake.

**Root cause:** The feedback loop had two steps (log + update) but no verification step. Updates were cosmetic (adding a line to instructions) without testing whether the line actually changed behavior.

**Fix:** Three-step feedback loop with mandatory verification. Step 1: Log the correction. Step 2: Update the relevant instructions. Step 3: Verify the update by mentally re-running the original scenario against the new instructions. If the update wouldn't catch the original error, it's not a real fix. Revise and re-verify.

---

## Anti-Pattern 12: Spec Questions Hallucinated

**What happened:** A Worker hit an ambiguous requirement in the spec. Instead of asking, it made an assumption. The assumption was wrong. The feature got built on a false premise. Three days of work wasted.

**Root cause:** Agents are trained to be helpful and avoid asking questions. Escalation feels like failure. So they fill gaps with plausible-sounding answers.

**Fix:** ESCALATE rule. If a Worker hits ambiguity, it reports to the CEO. If the CEO can't resolve it from existing context, it escalates to the Founder. The rule is explicit: never fabricate spec answers. The cost of a 30-second question is always lower than the cost of building the wrong thing.

---

## Anti-Pattern 13: Wrong Task Classification

**What happened:** A task got classified as `ops` (2-layer verification) when it should have been `build` (3-layer). It was a "simple config update" that actually required code changes and integration testing. With only 2-layer verification, the broken code shipped.

**Root cause:** Initial classification was based on the task description, not the actual work required. "Update config" sounded like ops but was really a build task.

**Fix:** Feedback loop reclassification. When the Founder corrects an `ops` task, the feedback loop automatically reclassifies future similar tasks as `build`. This is a one-way ratchet. Tasks can be promoted from `ops` to `build` but never demoted without explicit Founder approval. Over time, the classification system gets more accurate because every mistake tightens the rules.

---

## Summary Table

| # | Anti-Pattern | Prevention Mechanism | Where in System |
|---|---|---|---|
| 1 | CEO as postman | Quality Control Gate | CEO Heartbeat Step 4 |
| 2 | No self-testing | Self-Check checklists | Worker Heartbeat Step 3 |
| 3 | Repeated mistakes | 3-step feedback loop | CEO Heartbeat Step 9 |
| 4 | Busywork generation | "Idle is success" + Pre-Creation Gate | SOUL + CEO Heartbeat Step 11 |
| 5 | Identity drift | SOUL "What We Are" + Anti-Drift Check | SOUL + CEO Heartbeat Step 12 |
| 6 | Duplicate work | PROJECT-INVENTORY.md + Pre-Creation Gate | CEO Heartbeat Step 11 |
| 7 | Founder as QA | Three-layer verification | Full system architecture |
| 8 | Mocked dependencies | QA holdout scenarios | QA Agent |
| 9 | Format mismatches | Format-specific self-check + anti-patterns | Worker Heartbeat Step 3 |
| 10 | Explorations as final | Definition of Done | Task spec + CEO red flags |
| 11 | Open feedback loops | Verify step in feedback loop | CEO Heartbeat Step 9 |
| 12 | Hallucinated specs | ESCALATE rule | All agents |
| 13 | Wrong classification | Reclassification feedback loop | CEO Heartbeat Step 9 |
