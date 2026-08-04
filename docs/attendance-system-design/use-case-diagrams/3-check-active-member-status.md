# Use Case: Checking Active Member Status

Any RCC member can check their active-member status after authenticating. The status is calculated separately for each
semester.

To become an active member for a semester, a member must attend:

- At least **one Social event**, and
- At least **one Non-social event**.

The member can view the events they attended, see separate attendance counts for each category, review their progress
toward both requirements, and view their resulting active-member status. Attending two events in the same category does
not satisfy the requirement because both category checks must pass.

```mermaid
flowchart LR
    Member["RCC Member"]:::actor

    subgraph System["RCC Attendance Tracker"]
        direction TB

        ReviewAttendance([Review Attendance Status])
        Authenticate([Authenticate Member])
        SignIn([Sign In])
        ViewProgress([View Current-semester Progress])
        ViewCounts([View Social and Non-social Attendance Counts])
        ViewHistory([View Attended Events by Semester])
        ViewStatus([View Active-member Status])
        EvaluateRequirement([Evaluate Semester Active-member Requirement])
        VerifySocial([Verify at Least One Social Event])
        VerifyNonSocial([Verify at Least One Non-social Event])
    end

    Member --- ReviewAttendance

    ReviewAttendance -.->|«include»| Authenticate
    ReviewAttendance -.->|«include»| ViewProgress
    ReviewAttendance -.->|«include»| ViewCounts
    ReviewAttendance -.->|«include»| ViewHistory
    ReviewAttendance -.->|«include»| ViewStatus

    SignIn -.->|«extend»: no active session| Authenticate
    ViewProgress -.->|«include»| EvaluateRequirement
    ViewStatus -.->|«include»| EvaluateRequirement
    EvaluateRequirement -.->|«include»| VerifySocial
    EvaluateRequirement -.->|«include»| VerifyNonSocial

    classDef actor fill:none,stroke:#333,stroke-width:1.5px;
```
