## 2025-10-27 - [Unverified Data Integrity Mechanism]
**Vulnerability:** The state persistence system calculated and stored checksums during save operations but failed to verify them during load operations, allowing tampered data to be ingested.
**Learning:** Security mechanisms often have "dangling ends" during implementation. A feature like checksumming is useless if the verification step is omitted. Always trace the full lifecycle of a security control.
**Prevention:** When implementing data integrity controls, implement a specific test case that attempts to load corrupted data to ensure the verification logic is active and effective.
