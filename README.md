# React Kanban App

A Kanban app built with React and Firebase. This is the React version of an originally Vanilla JS-built Kanban app. Optionally styled with Bootstrap.


## Prerequisites

- Node.js and npm
- Firebase account

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourGithubName/react-kanban.git
    ```

2. **Install dependencies**

    ```bash
    cd react-kanban
    npm install
    ```

3. **Configure Firebase**

    - Create a new project in the Firebase Console.
    - Add your Firebase configuration details to `src/firebaseConfig.js`.

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      // ...additional settings
    };

    export default firebaseConfig;
    ```

4. **(Optional) Bootstrap**

    Bootstrap is already installed. If you don't wish to use it, you can remove it from the `src/index.js` file.

## Usage

**Development mode**

```bash
npm start

**Production builde**

```bash
npm run build

## Features

Login
Add, edit, and delete tasks
Add, edit, and delete lists
drag-and-drop support
