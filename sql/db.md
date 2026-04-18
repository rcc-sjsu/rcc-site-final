---
title: Database ER Diagram
---
erDiagram
    User {
        string student_id PK
        string first_name "NOT NULL"
        string last_name "NOT NULL"
        string preferred_name
        string preferred_email
        string school_email "NOT NULL"
        string phone
        string major
        string discord_username UK
        date expected_graduation
    }
    Team {
        int team_id PK
        string team_name "NOT NULL"
        string description
    }
    Ambassador {
        string student_id FK
        int team_id FK
        string role "NOT NULL"
    }
    User |o..|| Ambassador : is
    Ambassador }o..|| Team : "works on"
