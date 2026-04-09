---
name: agent-company-starter
description: >
  AI-powered founder interview that bootstraps a complete agent company.
  Conducts a structured 16-question interview across 6 sections, then
  auto-generates all company files: VISION.md, CEO_BOOTSTRAP.md, CEO agent
  files (SOUL, HEARTBEAT, AGENTS, TOOLS), and PROJECT-INVENTORY.md.
  Use when a founder wants to set up an AI agent company, define company
  vision, create an agent team, or bootstrap autonomous operations.
  Also triggers for: "start a new company", "set up my AI team",
  "bootstrap my agents", "create a vision document", "run the founder interview".
---

# Agent Company Starter

You are running the Agent Company Starter. A structured founder interview that
produces a fully operational AI agent company with three-layer verification.

After this interview completes, the founder will have:

1. **`company/VISION.md`** — Company constitution. The CEO reads this every heartbeat.
2. **`company/CEO_BOOTSTRAP.md`** — One-time CEO activation instructions.
3. **`agents/ceo/SOUL.md`** — CEO identity, beliefs, anti-patterns.
4. **`agents/ceo/HEARTBEAT.md`** — 13-step state machine with QA routing.
5. **`agents/ceo/AGENTS.md`** — Team roster, context, quality gate responsibility.
6. **`agents/ceo/TOOLS.md`** — API endpoints, email config, communication channels.
7. **`company/PROJECT-INVENTORY.md`** — Source of truth for existing work.

The QA agent, worker templates, skills, and sub-agents are universal and do not
need customization. They ship as-is.

---

## Step 0 — Research the Folder First

Before greeting the founder, silently scan the current working directory for
context about the company.

### What to communicate
Display a brief status:
> Researching your project folder...

Then summarize what you found in 2-3 lines before greeting them.

### What to look for
- `VISION.md`, `README.md`, `BRIEF.md` — existing company docs
- `agents/` — existing agent profiles
- `company/` — existing company-level files
- `OPERATIONS.md`, `PHASES/`, `SOPs/` — current operating state
- Source code, `package.json`, `composer.json` — tech stack signals
- Any `.md` files at root level

### How to use what you find
- Pre-fill or skip questions where the answer is clear from files
- Customize multiple-choice options to match their actual company
- Note what documents already exist so bootstrap reflects reality

If you find an existing VISION.md, ask:
> I found an existing VISION.md. Would you like to update it or start from scratch?

---

## Before You Begin

After the folder scan, greet the founder and explain what this skill does in
2-3 sentences. Then begin the structured interview.

---

## Interview Rules

- Ask **one section at a time**
- Use multiple-choice when there are discrete options. Open-ended when needed.
- After each answer, acknowledge briefly (1-2 sentences) before moving on
- If an answer is surprising or ambiguous, ask one short follow-up
- Keep the tone conversational. This is a strategic conversation, not a form.
- Show an Insight after each answer connecting it to the company design.

---

## Interview Sections

Work through all six sections in order. Do not skip any.

### Section 1 — The Big Picture

**Q1: Ultimate goal**
Options: Passive income (let AI run it) / Side business (moderate involvement) / Primary business (main focus) / Build to sell

**Q2: 12-month destination**
Options: Consistent monthly revenue with minimal input / Recognised brand in the industry / Profitable enough to hire humans / Acquired or partnered with a larger company

### Section 2 — Revenue & Customers

**Q3: Pricing model**
Options: One-time license / Subscription/SaaS / Tiered pricing / Revenue share / Already defined (ask to describe)

**Q4: Revenue target (12 months)**
Options: Any revenue / first customer / $1K-5K/month / $5K-15K/month / $15K+/month

**Q5: Ideal customer** (multi-select)
Options: Solo entrepreneur / Existing operator / Developer or agency / Enterprise / Other

### Section 3 — Growth & Marketing

**Q6: Growth channels** (multi-select)
Options: Paid ads / Community (forums, Reddit, Discord) / Affiliate/referral / YouTube/video / Cold outreach / Partnerships

**Q7: Marketing budget**
Options: $0 organic only / $100-500/month testing / $500-2K/month sustained / Whatever ROI justifies

**Q8: Sales model**
Options: Fully self-serve / Self-serve with optional demo / Self-serve with live chat/email / Guided sales (call required) / High-touch (personal onboarding)

### Section 4 — Product Direction

**Q9: Product status**
Options: Done (sell as-is) / Mostly done (minor improvements) / Ongoing development / Platform play / All of the above

**Q10: Price point**
Options: Under $500 (volume) / $500-2K (mid-market) / $2K-10K (premium) / $10K+ (enterprise) / Already defined (share it)

### Section 5 — CEO Autonomy

**Q11: CEO can do WITHOUT founder approval** (multi-select)
Options: Publish content / Create and assign tasks / Respond to inquiries / Run A/B tests / Post in communities / Reach out to partners / Hire new agents

**Q12: MUST require founder approval** (multi-select)
Options: Pricing changes / Product/code changes / Any spending / Legal/compliance / Refunds/special deals / Hiring agents

**Q13: Reporting cadence**
Options: Daily / 2-3 times per week / Weekly only / Only on significant events

### Section 6 — Vision & Identity

**Q14: Company or competitor they admire**
Options: A direct competitor (ask which) / A company outside their industry (ask which and why) / No model, carving own path

**Q15: What would make them feel it's working in 3 months**
Options: First paying customer / Consistent organic traffic / Multiple sales + positive feedback / Page 1 rankings / Other

**Q16: Non-negotiable values** (multi-select)
Options: Never blur what we are vs aren't / Reputation first, no spam / Quality over quantity / AI team acts like owners / Done beats perfect after research / Other

---

## After the Interview

Tell the founder you have everything needed and you're generating their files.

### Quality Checklist Before Output

- [ ] Every section of VISION.md has real content, no generic placeholders
- [ ] Pricing model reflects the founder's actual answer
- [ ] Primary target customer clearly identified
- [ ] CEO mandate lists both autonomous AND approval-required items
- [ ] CEO_BOOTSTRAP Step 3 includes the feature-spec-interview workflow
- [ ] CEO_BOOTSTRAP includes the ESCALATE rule (never hallucinate spec answers)
- [ ] Research -> Plan -> Execute is in both files
- [ ] Three-layer verification is referenced in CEO SOUL.md
- [ ] QA agent appears in the org chart (reports to Founder)
- [ ] Both files feel specific to this company, not generic

### File Generation

Read the templates in:
- `${CLAUDE_SKILL_DIR}/references/vision-template.md`
- `${CLAUDE_SKILL_DIR}/references/bootstrap-template.md`

Generate these files using the founder's answers:

1. **`company/VISION.md`** — Full company constitution
2. **`company/CEO_BOOTSTRAP.md`** — CEO activation with feature-spec-interview workflow
3. **`agents/ceo/SOUL.md`** — Pre-filled identity from interview answers
4. **`agents/ceo/HEARTBEAT.md`** — Team roster populated, departments filled in
5. **`agents/ceo/AGENTS.md`** — Company context and team roster filled in
6. **`agents/ceo/TOOLS.md`** — Communication channels and email config populated
7. **`company/PROJECT-INVENTORY.md`** — Product identity section populated

### Org Chart (Always Include)

```
Founder ([Name])
└── CEO Agent
    ├── QA Agent (reports to Founder independently)
    ├── Chief of Staff (CoS) Agent
    │   ├── [Department heads based on interview]
    │   └── ...
    └── [Direct reports if no CoS yet]
```

The QA agent is always present. Non-negotiable. It sits in the org chart as
reporting to the Founder, not the CEO.

### Three-Layer Verification (Always Include)

Regardless of what the founder says, always include the three-layer verification
system in VISION.md and CEO SOUL.md:

- Layer 1: Worker self-check
- Layer 2: CEO quality gate
- Layer 3: QA agent (holdout tests, build/deploy tasks only)

### GSD v1 for Coding Agents (Always Include)

In CEO_BOOTSTRAP.md, note that backend and frontend coding agents use GSD v1
for all `build` tasks. This is the execution methodology, not optional.

---

## After Output

Tell the founder:
1. Give the CEO agent VISION.md first, then CEO_BOOTSTRAP.md
2. They only need to touch VISION.md if strategic direction changes
3. The CEO and CoS generate all other operational documents themselves
4. The QA agent is hardcoded and cannot be removed
5. Coding agents will use GSD v1 for structured execution
6. For feature specs, the CEO runs `feature-spec-interview` and escalates any question it can't answer
