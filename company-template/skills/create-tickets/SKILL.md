---
name: create-tickets
description: Create tickets via Linear/Jira MCP or generate formatted ticket text
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

# Create Tickets Skill

Generate engineering tickets from the Feature Doc. The Feature Doc is the source of truth — it contains scope, use cases (Section 5), handshake matrix, and compliance rules. Supports direct creation via Linear/Jira MCP or formatted text output.

**Timing:** PM runs this immediately after the Feature Doc is approved — before handing off to Engineering. Engineering receives the Feature Doc and the Linear Issues at the same time. Do not wait for the Tech Design or Implementation Plan.

## Quick Start

1. Point me to the Feature Doc (the source of truth for ticket creation)
2. I break it down into well-structured tickets with acceptance criteria sourced from Section 5 use cases
3. Each ticket gets an effort estimate, dependencies, and component label
4. If Linear MCP is connected, I create issues directly in the parent Linear Project from the PRD; otherwise, I generate copy-paste text
5. I provide a dependency summary and sprint assignment suggestion

**Example:** "Create tickets from projects/ai-concierge/05-feature-doc-request-classification.md"

**Output:** Issues created in the Linear Project (linked in PRD Meta table), or saved to `work/analyses/[feature]-tickets.md`

**Time:** 15-30 minutes depending on Feature Doc complexity

## When to Use This Skill

- Right after Feature Doc approval — before Engineering handoff
- Breaking down Feature Docs into implementation tickets
- Converting Section 5 use cases into testable engineering tasks
- Generating ticket text for manual entry when Linear MCP is not connected

## Prerequisites

**Optional but Recommended:**

- Linear MCP configured (for direct ticket creation)
- Jira MCP configured (for direct ticket creation)

**Fallback:**

- Generates formatted ticket text for manual copy-paste

## Workflow

### Step 1: Gather Context

Ask the PM:

1. **Source document:** Feature Doc (always — this is the only source for tickets)
2. **Target system:** Linear, Jira, or text output?
3. **Project/Team:** Which project/team should receive tickets?
4. **Ticket type:** Story, Task, Bug, Epic?
5. **Priority level:** High, Medium, Low?

### Step 2: Analyze Source Material

Read the source document and identify:

- **User-facing features** (frontend work)
- **API/Backend work** (backend work)
- **Data migrations** (data engineering)
- **Infrastructure changes** (DevOps)
- **Testing requirements** (QA)
- **Documentation needs** (docs)

### Step 3: Create Ticket Structure

For each ticket, generate:

**Title Format:**

```
[Component] Action: Brief description
```

Examples:

- `[API] Add endpoint for user preferences`
- `[Frontend] Build preference selection UI`
- `[DB] Create user_preferences table`

**Ticket Body:**

```markdown
## Context

[Link to PRD or parent epic]

## Objective

[What this ticket accomplishes]

## Acceptance Criteria

- [ ] Specific outcome 1
- [ ] Specific outcome 2
- [ ] Specific outcome 3

## Technical Notes

[API contracts, data schemas, edge cases]

## Dependencies

- Blocked by: [Other ticket]
- Blocks: [Other ticket]

## Testing Requirements

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual QA steps

## Resources

- Design: [Figma link]
- API Spec: [Swagger/OpenAPI]
- Related PRD: [Link]
```

### Step 4: Create or Output Tickets

**If Linear MCP available:**

```
Use Linear MCP to create tickets directly
Set project, team, priority, labels
Link related tickets
```

**If Jira MCP available:**

```
Use Jira MCP to create tickets
Set epic, sprint, story points
Add components and labels
```

**Fallback - Text Output:**

```
Generate formatted ticket text
Number tickets sequentially
Provide copy-paste instructions
```

## Bulk Creation

When creating 5+ tickets:

1. **Create Epic first** (if applicable)
2. **Group by component** (Frontend, Backend, Data, etc.)
3. **Order by dependency** (foundation tickets first)
4. **Add estimates** (if PM provides sizing)
5. **Link tickets** (blockers, related work)

## Effort Estimation Framework

For each ticket, include an effort estimate using T-shirt sizing:

| Size   | Time      | Description                               | Example                             |
| ------ | --------- | ----------------------------------------- | ----------------------------------- |
| **XS** | <2 hours  | Config change, copy update, simple fix    | Update error message text           |
| **S**  | Half day  | Single-file change, straightforward logic | Add input validation to a form      |
| **M**  | 1-2 days  | Multi-file change, moderate complexity    | Build a new API endpoint with tests |
| **L**  | 3-5 days  | Cross-component work, integration needed  | Build complete CRUD feature with UI |
| **XL** | 1-2 weeks | Large scope, multiple systems involved    | New authentication system           |

**Estimation rules:**

- If the PM provides estimates, use them. If not, suggest one based on typical complexity for the work type.
- Always flag **XL tickets as candidates for splitting.** Suggest how to break them down: "This XL ticket could be split into [DB migration (M)] + [API layer (M)] + [Frontend (L)]."
- Include estimate in the ticket metadata, not buried in the body.
- When in doubt, round up. Underestimates erode trust; overestimates create buffer.

### Alternative: Story Points

Some teams prefer story points over T-shirt sizes. If the team uses story points:

| Points | Complexity                            | Roughly Equivalent To |
| ------ | ------------------------------------- | --------------------- |
| 1      | Trivial change, well-understood       | XS (few hours)        |
| 2      | Small change, minimal unknowns        | S (half day - 1 day)  |
| 3      | Medium change, some unknowns          | M (1-2 days)          |
| 5      | Significant change, moderate unknowns | L (3-5 days)          |
| 8      | Large change, many unknowns           | XL (1-2 weeks)        |
| 13     | Very large, high uncertainty          | Split this ticket     |

**Which to use:** Ask the PM or check existing tickets in the project management tool. Default to T-shirt sizes if unknown -- they're more intuitive for non-engineers.

**Ticket format with estimate:**

```
=== TICKET 1 ===
Title: [API] Add CRUD endpoints for user preferences
Estimate: M (1-2 days)
...
```

## Sprint/Milestone Assignment

If the PM has a target launch date, work backwards from the deadline to suggest sprint assignments.

**Sprint grouping logic:**

```
Sprint 1 (Foundation & Blockers):
- Database migrations
- API contracts and core endpoints
- Infrastructure/DevOps setup
- Tickets that block everything else

Sprint 2 (Core Functionality):
- Frontend components
- Business logic implementation
- Integration between frontend and backend
- Core user flow working end-to-end

Sprint 3 (Polish & Edge Cases):
- Error handling and edge cases
- Performance optimization
- Accessibility fixes
- Documentation and help content
- QA and testing tickets
```

**Capacity check:**

- Assume 6-8 productive hours per developer per day
- Assume 80% utilization (meetings, reviews, context-switching)
- Sum ticket estimates per sprint and compare to available developer-days
- If estimated effort exceeds sprint capacity, flag: "Sprint 2 is overloaded by ~3 days. Consider moving [ticket X] to Sprint 3 or adding capacity."

## Handling Early-Stage or Partial PRDs

When the Feature Doc is at an early stage (requirements are still fuzzy):

**Adjust ticket creation:**

- Create "Spike" tickets for areas with high uncertainty: "[Spike] Investigate feasibility of [unclear requirement] -- Timebox: 2 days"
- Mark fuzzy requirements with a [TBD] tag: "Acceptance criteria TBD pending design review"
- Use wider T-shirt size ranges: "M-L (1-5 days) -- depends on API complexity once spike is complete"
- Add a "Requirements Checkpoint" ticket: "Review updated PRD with engineering before starting implementation"

**What NOT to do:**

- Don't create detailed acceptance criteria for fuzzy requirements (they'll change)
- Don't estimate with false precision (don't say "3 days" when you mean "1-2 weeks, maybe")
- Don't skip the tickets entirely -- even fuzzy work needs tracking

**Flag it:** Start the ticket breakdown with: "Note: Feature Doc is at [Stage] stage. Some tickets have [TBD] acceptance criteria that will be refined as requirements solidify."

## Dependency Mapping

Identify and mark dependencies between tickets. Use explicit notation in each ticket:

```
## Dependencies
- **Blocked by:** TICKET-3 (DB schema must exist before API can be built)
- **Blocks:** TICKET-7 (Frontend needs this API to integrate)
```

**After generating all tickets, provide a dependency summary:**

```
## Dependency Summary

TICKET-1 [DB Schema] --> TICKET-3 [API Endpoints] --> TICKET-5 [Frontend Integration]
TICKET-2 [Auth Setup] --> TICKET-4 [Protected Routes] --> TICKET-5 [Frontend Integration]
TICKET-5 [Frontend Integration] --> TICKET-6 [E2E Tests]

Critical path: TICKET-1 --> TICKET-3 --> TICKET-5 --> TICKET-6
Estimated critical path duration: 7-10 days

Independent tickets (can be done in parallel):
- TICKET-7 [Documentation] -- no blockers
- TICKET-8 [Analytics instrumentation] -- no blockers
```

**Dependency rules:**

- Every ticket should state its dependencies (even if "None")
- Circular dependencies are a red flag -- restructure the tickets
- If a ticket has 3+ blockers, consider whether it should be split

## Ticket Quality Checklist

Before creating tickets, verify:

- ✅ Title is clear and specific
- ✅ Acceptance criteria are testable
- ✅ Technical context is sufficient for engineers
- ✅ Dependencies are identified
- ✅ Edge cases are documented
- ✅ Testing requirements are clear
- ✅ Links to designs/specs included

## Common Ticket Patterns

### Feature Work

```
Epic: User Preferences System
  ├── [DB] Create user_preferences table
  ├── [API] Add CRUD endpoints for preferences
  ├── [Frontend] Build preferences UI
  └── [QA] Test preferences end-to-end
```

### Bug Fixes

```
Title: [Component] Fix: Description of bug
Body:
  - Current behavior: [What's broken]
  - Expected behavior: [What should happen]
  - Repro steps: [How to reproduce]
  - Root cause: [If known]
```

### Infrastructure

```
Title: [DevOps] Setup: Description
Body:
  - Current state: [What exists]
  - Desired state: [What we need]
  - Migration plan: [How to get there]
  - Rollback plan: [How to revert if needed]
```

## Integration Examples

### Linear MCP

```python
# Create epic
epic = linear.create_issue({
  "title": "User Preferences System",
  "description": "[Epic description]",
  "teamId": "team_id",
  "priority": 1
})

# Create child tickets
for ticket in tickets:
  linear.create_issue({
    "title": ticket.title,
    "description": ticket.body,
    "teamId": "team_id",
    "parentId": epic.id,
    "priority": ticket.priority
  })
```

### Jira MCP

```python
# Create epic
epic = jira.create_issue({
  "project": "PROJ",
  "issuetype": "Epic",
  "summary": "User Preferences System",
  "description": "[Epic description]"
})

# Create stories
for ticket in tickets:
  jira.create_issue({
    "project": "PROJ",
    "issuetype": "Story",
    "summary": ticket.title,
    "description": ticket.body,
    "epic_link": epic.key
  })
```

## Pro Tips

1. **One ticket, one thing:** Avoid "also do X" tickets
2. **Size appropriately:** 1-3 days ideal, split if larger
3. **Clear acceptance criteria:** Engineers know when done
4. **Link liberally:** PRDs, designs, related tickets
5. **Front-load context:** Engineers shouldn't hunt for info
6. **Call out edge cases:** "What happens if X?"
7. **Include examples:** API requests, UI states, data samples

## Output Format (Text Fallback)

```
=== TICKET 1 ===
Title: [Component] Action: Description
Project: [Project Name]
Type: Story
Priority: Medium

[Full ticket body]

=== TICKET 2 ===
...
```

## Common Mistakes to Avoid

❌ Vague titles: "Fix preferences"
✅ Specific titles: "[API] Fix: Preferences endpoint returns 500 on missing user"

❌ No acceptance criteria
✅ Clear checklist of outcomes

❌ Missing dependencies
✅ "Blocked by PROJ-123, Blocks PROJ-125"

❌ No technical context
✅ API contracts, data schemas, edge cases documented

❌ Orphan tickets (no epic/parent)
✅ Linked to parent epic or PRD

## Questions to Ask Before Creating

1. **Scope clarity:** Is this ticket too big/small?
2. **Dependencies clear:** What must happen first?
3. **Edge cases documented:** What could go wrong?
4. **Testing defined:** How will we verify this works?
5. **Rollback plan:** Can we undo if needed?

Remember: Great tickets save engineering hours. Invest time upfront to create clear, actionable work items.

