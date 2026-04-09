# Feedback Loop

A mandatory skill for closing the loop after every Founder correction. Ensures mistakes are logged, instructions updated, and fixes verified.

## Description

When the Founder points out a mistake, this skill ensures the correction is permanently captured in agent instructions, preventing the same error from recurring. Without this, corrections are acknowledged but not embedded — leading to repeated failures.

## Procedure

### After every Founder correction (MANDATORY)

1. **Identify root cause.** Why did this happen?
2. **Update the relevant agent's HEARTBEAT.md.** Add the failure to their anti-patterns table.
3. **Update the relevant agent's AGENTS.md** if the Definition of Done needs a new criterion.
4. **Update PROJECT-INVENTORY.md** if deliverables changed.
5. **Verify the fix.** On the next similar task, check that the same mistake does not recur.
6. **Log it.** Daily notes: what went wrong, what was updated, what to watch for.

### Severity levels

- **Once:** A bug. Fix it, log it.
- **Twice:** A process failure. The instructions need updating.
- **Three times:** The instructions are not clear enough. Rewrite them entirely.

## Applicable Roles

- CEO
- All agents (as recipients of instruction updates)

## Tags

- feedback
- learning
- anti-patterns
- mandatory
