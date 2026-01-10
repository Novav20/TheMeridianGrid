---
id: SEC-05
title: Encryption in Transit
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
---

# SEC-05: Encryption in Transit

All data transmission (HTTP/MQTT) must be encrypted via **TLS 1.2+** (HTTPS/MQTTS).

**Justification:** Mandatory for any modern web application; prevents man-in-the-middle attacks.
