# QZM Ecommerce App

[Deployment link](https://qzeromarket-v3.netlify.app/)

## Description

This is a frontend project for an e-commerce clothing store, created as part of the Integrify Academy Full Stack course. It works with a custom backend API found [here](https://github.com/rokuzzz/qzeromarket-v3-aspnet-api). The store is fully functional but uses mock data - no real products or transactions are involved. It's designed to showcase e-commerce functionality in a simulated environment.

This project was an excellent opportunity to sharpen my skills in building complex e-commerce applications with React. It challenged me to work effectively under pressure, simulating a real-world scenario where I had to deliver a functional product within a very limited timeframe.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#techstack)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Project Structure

- `src`: The main source code directory.
  - `modules`: Contains feature-specific modules.
    - `auth`
    - `cart`
    - `categories`
    - `orders`
    - `products`
    - `shared`: Shared components and utilities.
    - `users`
  - `App.tsx`: The main React component.
  - `index.css`: Global CSS styles.
  - `index.tsx`: Entry point of the React application.
 
### Module Structure

Each module typically contains:
- `api/`: API calls
- `components/`: Reusable components
- `types/`: TypeScript definitions
- Main feature components (e.g., `Login.tsx`, `CartSheet.tsx`)

Some modules include a `context/` for state management.

## Installation
1. Fork this repository and clone your fork to your local machine.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run start`.

**Important!** This project uses a deployed API by default. If the deployed API becomes inaccessible, you'll need to switch to a local backend:
1. Set up and run the backend locally from the backend repository (available at [qzeromarket-v3-aspnet-api](https://github.com/rokuzzz/qzeromarket-v3-aspnet-api))
2. Update the API endpoint in `src/modules/api/apiClient.ts` to point to your local backend

For local development setup, please refer to the backend repository's installation instructions.

## Tech Stack

This project was implemented using React and the following packages:

- [ky](https://github.com/sindresorhus/ky) for fetching data from the server
- [TanStack Query](https://tanstack.com/query/latest) for server state management
- [Shadcn/UI](https://ui.shadcn.com/) for UI/UX
- [React-Router-Dom](https://reactrouter.com/en/main) for routing
- [TailwindCSS](https://tailwindcss.com/) for styling
- [React-Hook-Form](https://react-hook-form.com/) for managing forms
- [Zod](https://zod.dev/) for form validation

## Credits

This project was created independently as an assignment for [Integrify Academy](https://www.integrify.io/).

## License

This project was created for educational purposes only. You are free to copy, edit, and contribute to it. No commercial use is allowed.
