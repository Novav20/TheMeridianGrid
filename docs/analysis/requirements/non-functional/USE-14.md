---
id: USE-14
title: Error Feedback
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
moscow: MUST
status_backend: Done
status_frontend: Backlog
status_test: Verified
implementation_notes: "Global Error Handler provides standardized error messages."
---

# USE-14: Error Feedback

All errors must be presented in plain language (no stack traces to UI).

**Justification:** "Something went wrong" is better than "NullPointerException" for Operators.
