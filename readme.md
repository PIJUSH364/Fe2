# Student Management Dashboard

## Description

A student management dashboard with essential functionalities like pagination, student detail view, and record management.

## Features

### Dashboard Features:

- Basic search functionality.
- Pagination with configurable page size.
- When no student data is found, a message is displayed.
- export student data to excel.

### Student Detail View:

- Display of basic student information.
- Marks and performance overview.
- "Last updated" timestamp.
- "Created on" date.

### Student Action Buttons:

- Update student information.
- Delete student record.
- View marks.

### New Student Workflow:

- Form with validation.
- Success and error states with user-friendly toast messages.

### Additional Features:

- If an invalid URL is entered, the user is redirected to a "Not Found" page.
- Responsive webpage across all mobile devices and desktops.

## Database Schema Design

The system follows a normalized database schema with the following tables:

### Students Table

- `id` (Primary Key)
- `name`
- `email`
- `created_at`
- `updated_at`

### Marks Table

- `id` (Primary Key)
- `student_id` (Foreign Key referencing Students Table)
- `subject`
- `marks`
- `created_at`
- `updated_at`

## API Endpoints

### Base URL

```
VITE_BASE_URL/api/v1/
```

### Student APIs

- **Create Student:** `POST /student/create_student`
- **Update Student:** `PUT /student/update_student`
- **Delete Student:** `DELETE /student/delete_student`
- **Get Student By ID:** `GET /student/get_student/:id`
- **Get All Students:** `GET /student/get_all_students`
- **Search Student Details:** `POST /student/search_student_details`
- **Filter Student Data:** `POST /student/filter_student_data`
- **Pagination Data:** `GET /student/get_student_data`

### Mark APIs

- **Create Mark:** `POST /mark/create_mark`
- **Update Mark:** `PUT /mark/update_mark`
- **Delete Mark:** `DELETE /mark/delete_mark`
- **Get Mark By ID:** `GET /mark/get_mark/:id`

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/PIJUSH364/Machine_FE.git
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

Create a `.env` file in the root directory and add the following:

### Add your base URL

```
VITE_BASE_URL=http://localhost:3000
```

## Running the Project

### Development Mode

To start the project in development mode with hot-reloading enabled, run the following command:

```sh
npm run development
```

## Tech Stack

- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Sequelize (ORM)
- **UI Library:** TailwindCSS CSS Framework
