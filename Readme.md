# User Management Dashboard

## Description

A user management dashboard with essential functionalities like filtering, sorting, pagination, user detail view, and account actions.

[Live URL](https://admin-fe.netlify.app/)

## Features

### Dashboard Features:

- Filterable and sortable user list.
- Clear display of user status (Active/Inactive).
- Basic search functionality.
- Pagination with configurable page size.
- When no user data is found, a message is displayed.
- Filtering and sorting functionality is disabled when no user data is available.

### User Detail View:

- Display of basic user information.
- Role assignment dropdown.
- Account status toggle.
- "Last active" timestamp.
- "Created on" date.

### User Action Buttons:

- Deactivate/Activate account.
- Delete account.
- Edit permissions.

### New User Workflow:

- Form with validation.
- Role selection.
- Success and error states with user-friendly toast messages.

### Additional Features:

- If an invalid URL is entered, the user is redirected to a "Not Found" page.
- Responsive webpage across all mobile devices and desktops (excluding tablets).

## API Endpoints

### Base URL

```
hostUrl/api/v1/
```

### User APIs

- **Create User:** `POST /user/create_user`
- **Update User:** `PUT /user/update_user`
- **Delete User:** `DELETE /user/delete_user`
- **Get User By ID:** `GET /user/get_user/:id`
- **Get All Users:** `GET /user/get_all_users`
- **Search User Details:** `POST /user/search_user_details`
- **Filter User Data:** `POST /user/filter_user_data`
- **Pagination Data:** `GET /user/get_user_data`

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PIJUSH364/assignment_FE.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-project-name
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

To configure environment variables, follow these steps:

create a .env file in the root directory and add the following:

### add your base url

```
VITE_BASE_URL=http://localhost:3000

```

## Running the Project

### Development Mode

To start the project in development mode with hot-reloading enabled, run the following command:

```sh
npm run dev
```

## Tech Stack

- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Sequelize (ORM)
- **UI Library:** TailwindCSS CSS Framework
