# QZM Ecommerce App

[Link to hosting](https://fs18-java-frontend.vercel.app/games)

## Description

This is a frontend project for an e-commerce clothing store, created as part of the Integrify Academy Full Stack course. It works with a custom backend API found [here](https://github.com/rokuzzz/fs18_CSharp_FullStack_Backend). The store is fully functional but uses mock data - no real products or transactions are involved. It's designed to showcase e-commerce functionality in a simulated environment.

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
    - `auth`: Authentication-related components and logic.
    - `cart`: Shopping cart functionality.
    - `products`: Product listing and details (+ categories).
    - `shared`: Shared components and utilities.
    - `users`: User management features (+ orders).
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

- Fork this repository and clone your fork to your local machine.
- Pull all the data from your fork.
- Run `npm install`.
- Run `npm run start`.

**Important:** Before running this project, you need to set up and run the backend. Please visit the backend repository and follow the installation instructions provided there. The frontend won't function properly without the backend running.

## Tech Stack

This project was implemented using React and the following packages:

- [ky]([https://www.npmjs.com/package/axios](https://github.com/sindresorhus/ky) for fetching data from the server
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
