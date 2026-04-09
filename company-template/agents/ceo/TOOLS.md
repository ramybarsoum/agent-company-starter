# CEO TOOLS — [COMPANY NAME]

Available tools and integrations for the CEO agent.

---

## Communication

| Tool | Purpose | Notes |
|------|---------|-------|
| Email CLI (`gog`) | Send/read emails to Founder | Only tool for email. Never use Gmail MCP for sending. |
| Task comments | Communicate with agents | Primary channel for agent coordination |
| [ESCALATION CHANNEL] | Urgent Founder contact | Discord, Slack, or other. For `[ESCALATE]` items. |

### Email Configuration

- Gmail account: `[GMAIL_ADDRESS]`
- Only monitor emails from: `[FOUNDER_EMAIL]`
- Sending address: `[GMAIL_ADDRESS]`
- Subject prefix: `[PREFIX]`

### Send email

```bash
gog gmail send --to "[FOUNDER_EMAIL]" --subject "[PREFIX] Subject here" --body "Message body"
```

### Check inbox

```bash
gog gmail search 'from:[FOUNDER_EMAIL] label:[LABEL] is:unread' --max 10
```

### Read thread

```bash
gog gmail thread get <threadId>
```

---

## Task Management

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/companies/{companyId}/dashboard` | GET | Company overview, cost summary |
| `/api/companies/{companyId}/issues` | GET | List tasks by status, assignee |
| `/api/issues` | POST | Create new task |
| `/api/issues/{issueId}` | PATCH | Update task status, tag |
| `/api/issues/{issueId}/checkout` | POST | Checkout before working |
| `/api/issues/{issueId}/comments` | POST | Post task comment |

### Company ID

`[COMPANY_ID]`

### Headers (on all mutating calls)

```
X-Run-Id: {runId}
Authorization: Bearer {token}
```

---

## Verification Tools

| Tool | When | How |
|------|------|-----|
| WebFetch | Check live URLs, APIs | Fetch URL and inspect response |
| Browser (dev-browser) | Visual verification | Open page, check rendering |
| CLI tools | Check deployments, services | Run status commands |

---

## File System

| Path | Purpose |
|------|---------|
| `agents/ceo/memory/` | Daily notes, decisions, logs |
| `agents/ceo/memory/daily-notes/` | YYYY-MM-DD.md format |
| `company/PROJECT-INVENTORY.md` | Source of truth for existing work |
| `company/VISION.md` | Company constitution |
| `company/CONTRIBUTING.md` | Commit conventions |

---

## Skills Available

| Skill | When to Use |
|-------|------------|
| `feature-spec-interview` | Writing feature specifications |
| `feature-doc-review-panel` | 7-perspective spec review |
| `competitor-analysis` | Competitive intelligence |
| `create-tickets` | Breaking specs into tickets |
| `launch-checklist` | Pre-launch readiness |
| `decision-doc` | Structured decision logging |

---

## API Keys and Secrets

**NEVER put API keys, passwords, or tokens in files.**

Secrets are managed via: `[SECRET_MANAGEMENT_SYSTEM]` (e.g., environment variables, vault, key management)
