# 0.6: New note in Single page app diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: User submits form on browser. JavaScript code on browser sends JSON data of new note (instead of form data) and rerenders note list.
    activate server
    server-->>browser: Status Code: 201 Created
    Note right of browser: Server does not give a URL redirect
    deactivate server
```