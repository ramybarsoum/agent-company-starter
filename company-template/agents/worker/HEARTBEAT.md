# Worker Agent HEARTBEAT — [ROLE NAME]

Run this checklist every heartbeat, in order. Do not skip steps.

---

## Step 1 — Get Assignments

- [ ] Fetch assigned issues. Work `in_progress` first, then `todo`.
- [ ] If no assignments: exit. Post a comment: "No assigned tasks. Queue empty." Do NOT generate work.
- [ ] Checkout before working: always checkout the task before starting.
- [ ] Read `company/PROJECT-INVENTORY.md`. Check if this work already exists.

---

## Step 2 — Execute Task

### For `build` tasks: Use GSD v1

GSD v1 provides structured execution with planning, verification, and atomic commits.

**2a. Discuss (optional)**
```
/gsd:discuss-phase
```
Identify gray areas. Capture decisions before planning.

**2b. Plan**
```
/gsd:plan-phase
```
Decompose into atomic tasks. Each task must fit one context window. Include:
- Must-haves (observable verification criteria)
- Boundary maps (what this phase produces and consumes)
- Decisions register entries for architectural choices

**2c. Execute**
```
/gsd:execute-phase
```
Implement with atomic commits. Mark progress with `[DONE:n]` markers.

**2d. Verify**
```
/gsd:verify-work
```
Separate verifier agent checks actual outcomes against must-haves:
- Static: files exist, exports present, wiring connected, not stubs
- Command: tests pass, build succeeds, lint clean
- Behavioral: API responses correct, browser flows work
- Human: ask the user only when you genuinely cannot verify yourself

### For `ops` tasks: Execute Directly

No GSD overhead. Just do the work.

- [ ] Read the task description and acceptance criteria
- [ ] Execute the work
- [ ] Verify the deliverable exists and meets the criteria

### For `deploy` tasks: Use Deployment Checklist

- [ ] Run `deployment-checklist` skill
- [ ] Follow pre-deploy, deploy, post-deploy steps
- [ ] Verify the deployment is live and functioning

---

## Step 3 — Self-Check (MANDATORY)

**Never skip this step. Not even for "small changes."**

### Generic Checks (All Roles)

- [ ] The deliverable exists at the expected location
- [ ] The deliverable is accessible (can be opened/loaded/viewed)
- [ ] The deliverable matches what was requested in the task description
- [ ] No placeholder content or TODO markers remain
- [ ] I have not recreated something that already existed (check PROJECT-INVENTORY.md)
- [ ] No secrets (API keys, passwords, tokens) in committed code

### Role-Specific Checks

**Backend Engineers:**
- [ ] Code runs without errors
- [ ] All acceptance criteria from the task are met
- [ ] Tests written and passing
- [ ] No debug/console.log statements left in
- [ ] Tested with actual data, not just happy path
- [ ] No mocked dependencies without explicit documentation
- [ ] API contracts match the spec

**Frontend Engineers:**
- [ ] Page loads without JavaScript errors
- [ ] Content stays within page container
- [ ] All links tested and working
- [ ] No raw template syntax visible
- [ ] Responsive layout tested at 375px, 768px, 1280px
- [ ] Accessibility basics checked (alt text, keyboard nav, contrast)

**Content Writers:**
- [ ] Content is in the correct format (HTML for CMS, not raw markdown)
- [ ] No raw markdown syntax in the output
- [ ] All internal links point to correct URLs
- [ ] No placeholder text or internal notes remain

**Designers:**
- [ ] Design specified at 3 breakpoints (desktop, tablet, mobile)
- [ ] Color codes, spacing, and typography explicitly specified
- [ ] Design is a FINAL deliverable, not "explorations" or "options"
- [ ] Implementation specs are clear enough to build without guessing

### Anti-Patterns Check

Review the anti-patterns table in AGENTS.md. Check that none of the documented failure patterns are present in this deliverable.

---

## Step 4 — Complete Task

- [ ] Post completion comment with:
  - What was done
  - Where the deliverable lives (file paths, URLs)
  - Self-check results (all passed / issues found)
  - For `build` tasks: GSD verification results
- [ ] Mark task as done (or ready for review, depending on workflow)
- [ ] Inform manager via task comment

---

## Step 5 — Exit

- [ ] Always post a comment before exiting a heartbeat
- [ ] If interrupted mid-task: write a `continue.md` file with:
  - What is done so far
  - What remains
  - Decisions made and why
  - Exact next action to resume

---

## Critical Rules

1. **Always checkout before working.**
2. **Never generate work when your queue is empty.** Exit and tell the CEO.
3. **Always run the self-check before marking work as done.**
4. **Never skip the self-check "because this is a small change."**
5. **For `build` tasks, use GSD v1.** Do not skip the planning phase.
6. **Never mock a dependency without documenting it and flagging the CEO.**
7. **Before starting any task, check PROJECT-INVENTORY.md for existing work.**
8. **Always post a comment before exiting a heartbeat.**
9. **If you can't answer a spec question: escalate. Never fabricate.**
