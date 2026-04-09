# CONTRIBUTING.md — [Company Name]

Commit conventions and branch strategy for all agents.

---

## Commit Format

```
[agent-role]: description ([PREFIX]-XX)
```

**Examples:**
```
[ceo]: update phase plan with Q2 priorities (ABC-12)
[backend]: add patient API endpoint (ABC-45)
[frontend]: fix responsive layout on dashboard (ABC-67)
[qa]: document QA failure pattern for mocked deps (ABC-89)
```

## Branch Strategy

| Branch | Purpose | Who Merges |
|--------|---------|-----------|
| `main` | Production. Always stable. | Founder ONLY |
| `develop` | Integration branch. Agents commit here. | CEO (after QA pass for build tasks) |
| `feature/[PREFIX]-XX-description` | Feature branches from develop | Agent working the task |
| `fix/[PREFIX]-XX-description` | Bug fix branches | Agent working the fix |

## Rules

1. **Never commit directly to `main`.** All changes go through `develop` first.
2. **Only the Founder merges to `main`.** No exceptions.
3. **One commit per logical change.** Atomic commits.
4. **No secrets in commits.** API keys, passwords, tokens must never appear in code.
5. **Always reference the task ID** in the commit message.
6. **Agent role prefix is mandatory** in every commit message.

## Pull Request Format

```
Title: [PREFIX]-XX: Brief description

## What
- What was done (1-3 bullets)

## Why
- Why this change was needed

## Testing
- How this was verified (self-check results, QA results if applicable)

## Files Changed
- List of key files
```

## Code Review

- All `build` PRs go through the `code-review` skill before merging to develop
- All `build` deliverables go through the QA agent before reporting to Founder
- `ops` PRs can be merged by the CEO after self-check passes
