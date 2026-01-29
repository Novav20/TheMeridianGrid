---
id: USE-14
title: Error Feedback
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Partial
week-completed: 
frontend-status: Partial
backend-status: Complete
tested: true
blocking: 
blocked-by: 
implementation-notes: "Backend: Standardized AppError and Global Error Handler implemented. Frontend: Basic Snackbar alerts active, but comprehensive Error Boundaries planned for Week 6."
last-updated: 2026-01-29
---

# USE-14: Error Feedback

All errors must be presented in plain language (no stack traces to UI).

**Justification:** "Something went wrong" is better than "NullPointerException" for Operators.
