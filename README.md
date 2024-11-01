## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:

- Docker is installed
- If want to run without docker it is needed to have latest node and pnpm installed

### Initialization
1. Clone the repository:
   ```shell
        git clone git@github.com:abduljabbarbcs/email-vault-frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd email-vault-frontend
   ```
3. Make an .env file at root level out of .example.env and set the Backend URL

### Project Structure
- At the base level it has necessary files like env, dockerfile, package.json, tailwind,  .gitignore and other configuration files
- Directories it contains are src/*, stores
- Src directory contains:
    - composable (for shared logic, fetch data from BE)
    - assets (static image building etc)
    - components (reusable components across application)
    - i18n (Keep text and translation if available)
    - pages (contain all the pages)
    - router (App routing)
    - types (defined custom types)
    - App.vue (Vue app file)
- stores directory contains:
    - app.ts (it contains app store only store for this application)

## Run using docker
- docker build -t email-vault-frontend .  
- docker run -p 5173:5173 -t email-vault-frontend 

## Run without docker
- pnpm install
- pnpm dev