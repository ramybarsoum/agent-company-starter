---
name: performance-analysis
description: Analyze and optimize performance with profiling, query analysis, load testing, and SLO tracking for AllCare services.
disable-model-invocation: false
user-invocable: true
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

## Quick Start

**What to provide:** A performance concern, endpoint to optimize, or baseline metrics to establish.

```
/performance-analysis                              → Start with guided questions
/performance-analysis "Encounter list is slow"     → Start with a specific issue
/performance-analysis --baseline                   → Establish performance baselines
/performance-analysis --review "work/tech-designs/my-design.md" → Review design for perf issues
```

**What you get:** Performance analysis with bottleneck identification, optimization recommendations, and SLO tracking. Saved to `work/performance-reports/[feature]-performance-analysis.md`.

**Time:** 20-40 minutes.

