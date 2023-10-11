# React Kanban App

A Kanban app built with vite-React and Firebase. This is the React version of an originally Vanilla JS-built Kanban app. Optionally styled with Bootstrap.


## Prerequisites

- Node.js and npm
- Firebase account

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourGithubName/react-join-kanban.git
    ```

2. **Install dependencies**

    ```bash
    cd react-join-kanban
    npm install
    ```

3. **Configure Firebase**

    - Create a new project in the Firebase Console.
    - Add your Firebase configuration details to `.env`.

    ```javascript

    VITE_REACT_APP_FIREBASE_API_KEY=...
    VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=...
    VITE_REACT_APP_FIREBASE_PROJECT_ID=...
    VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=...
    VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_REACT_APP_FIREBASE_APP_ID=...

    ```

4. **(Optional) Bootstrap**

    Bootstrap is already installed. If you don't wish to use it, you can remove it from the `src/app.js` file.

## Usage

**Development mode**

```bash
npm start
  ```

**Production builde**

```bash
npm run build
  ```
  
## Features

Login
Add, edit, and delete tasks
Add, edit, and delete lists
drag-and-drop support
