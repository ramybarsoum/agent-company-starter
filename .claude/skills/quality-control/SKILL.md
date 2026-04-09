# Quality Control Gate

A mandatory verification skill for CEO agents. Ensures every deliverable is personally verified before reporting to the Founder.

## Description

The Quality Control Gate is the highest-impact step in the CEO heartbeat. It prevents the CEO from acting as a postman who forwards agent output unchecked. Every "done" report must include verification evidence.

## Procedure

### 1. Verify the deliverable yourself

- [ ] Open the live URL / file / artifact via WebFetch or dev-browser
- [ ] Confirm the page loads without errors
- [ ] Confirm the content/feature is visible and correctly formatted
- [ ] Check for 404s, empty states, broken layouts
- [ ] For visual work: check on desktop (1280px), tablet (768px), mobile (375px)
- [ ] Check browser console for errors (if applicable)
- [ ] Compare against the original task requirements / design spec

### 2. Red flags — automatic FAIL

| Red Flag | Example |
|----------|---------|
| Page returns 404 or 500 | Deployed URL does not load |
| Raw markup/code visible to users | `##`, `**`, `{{variable}}` in rendered content |
| Missing template file | Wrong template loads |
| Broken links | Internal links go to 404 |
| Console errors | JavaScript errors in production |
| Content mismatch | What is live does not match what was requested |

### 3. Decision

- **ALL checks pass:** Report to Founder with evidence (URL checked, what was verified, what was seen)
- **ANY check fails:** Do NOT email the Founder. Reopen the issue, comment with what failed, reassign to the agent.

## Applicable Roles

- CEO

## Tags

- verification
- quality-gate
- mandatory
