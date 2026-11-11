# Agentic-readiness implementation state

This folder tracks the work that closes the findings of the agentic-readiness audit. The audit reports
themselves live in [`../agentic-readiness-report/`](../agentic-readiness-report/README.md).

| File | What it is |
|---|---|
| `digital-assistant-sdk-agentic-readiness-state.json` | The state: every queued finding, its status, the owner's skips, deferrals and preferences, and a log. The source of truth. |
| `digital-assistant-sdk-agentic-readiness-STATE.md` | A rendering of the JSON for people. Generated; never edit it by hand. |

## How to resume

1. Read `digital-assistant-sdk-agentic-readiness-STATE.md` first.
2. Respect every preference in it. A skipped finding is final until the owner unskips it.
3. Work one theme per branch, `agentic-readiness/<phase>-<slug>`, created from `dev`.
4. Record every status change with the framework's `implement/tools/progress.py`, on the same branch as the
   change. Never edit the JSON by hand.
