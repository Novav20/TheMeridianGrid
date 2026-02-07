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
tested: false
blocking: 
blocked-by: 
implementation-notes: "Backend: Standardized AppError and Global Error Handler implemented. Frontend: ErrorBoundary + NotificationProvider + global error bus implemented, but user-friendly message catalog and audit are still pending."
last-updated: 2026-02-06
---

# USE-14: Error Feedback

All errors must be presented in plain language (no stack traces to UI).

**Justification:** "Something went wrong" is better than "NullPointerException" for Operators.
