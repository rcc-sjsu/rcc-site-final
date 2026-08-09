---
title: Database ER Diagram
---
```mermaid
erDiagram
Student {
int id PK
string full_name "NOT NULL"
string preferred_name "NOT NULL"
string family_name
string preferred_email UK "NOT NULL"
string school_email UK
string phone
string pronouns
string major
string discord_username UK
date expected_graduation
}
Team {
int id PK
string team_name "NOT NULL"
string description
}
Ambassador {
int student FK
int team FK
string role "NOT NULL"
linkedin_url varchar,
headshot_url varchar
}
User |o..|| Ambassador : is
Ambassador }o..|| Team : "works on"
```
