# Self-Check

A mandatory verification skill for worker agents. Ensures every agent checks their own work before marking a task as done.

## Description

The Self-Check is the first layer of verification in the two-layer quality system. Every worker agent must run this checklist before marking any task as "done" — no exceptions, not even for "small changes."

## Procedure

### Generic checks (all roles)

- [ ] The deliverable exists at the expected location
- [ ] The deliverable is accessible (can be opened/loaded/viewed)
- [ ] The deliverable matches what was requested in the task description
- [ ] No placeholder content or TODO markers remain
- [ ] I have not recreated something that already existed (check PROJECT-INVENTORY.md)

### Role-specific checks

Customize per agent role. The check must be concrete and verifiable — not "code works" but "code runs without errors, all acceptance criteria met, no secrets committed."

### Anti-patterns tracking

Maintain a living table of past mistakes:

| Anti-Pattern | What Went Wrong | Check |
|-------------|----------------|-------|
| *[Added as issues arise]* | *[Description]* | *[What to verify]* |

A mistake that happens once is a bug. Twice is a process failure. Three times means the instructions are not clear enough — rewrite them.

## Applicable Roles

- All worker agents

## Tags

- verification
- self-check
- mandatory
