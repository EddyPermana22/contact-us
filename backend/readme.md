# Contact Us Service Backend

## Description

This is a backend service for handling contact form submissions. It's built with Node.js, Express, and TypeScript, using Prisma as an ORM for database operations.

## Features

- RESTful API for contact form submissions
- Data validation using Zod
- Database integration with Prisma
- Logging with Winston
- Security enhancements with Helmet and rate limiting
- CORS support
- Error handling middleware
- Environment-based configuration

## Prerequisites

- Node.js (version 14 or higher recommended)
- PostgreSQL database
- npm or yarn

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

- Copy `.env.example` to `.env`
- Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string

3. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

4. Run database migrations:

   ```bash
   npm run prisma:migrate
   ```

## Running the Application

- For development:

  ```bash
  npm run dev
  ```

- For production:

  ```bash
    npm run build && npm start
  ```

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint and fix issues
- `npm run format`: Format code with Prettier
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Port number for the server (default: 4000)

## API Endpoints

### 1. Submit Contact Form

Submit a new contact form entry.

- **URL:** `/contact-us`
- **Method:** `POST`
- **Auth required:** No

#### Request

##### Headers

| Name         | Required | Description      |
| ------------ | -------- | ---------------- |
| Content-Type | Yes      | application/json |

##### Body

| Field   | Type   | Required | Constraints         | Description                    |
| ------- | ------ | -------- | ------------------- | ------------------------------ |
| name    | string | Yes      | Max 100 characters  | Name of the person contacting  |
| email   | string | Yes      | Valid email format  | Email address of the contact   |
| subject | string | Yes      | Max 200 characters  | Subject of the contact message |
| message | string | Yes      | Max 1000 characters | Content of the contact message |

##### Example Request

```json
POST /contact-us
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Inquiry about Services",
  "message": "Hello, I would like to know more about your services."
}
```

##### Responses

###### Successful Response

Code: 201 Created
Content:

```json
{
  "message": "Submission created successfully",
  "submission": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Inquiry about Services",
    "message": "Hello, I would like to know more about your services.",
    "submissionTime": "2023-03-15T14:30:00Z"
  }
}
```

###### Error Responses

- Validation Error
  Code: 400 Bad Request
  Content:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "message",
      "message": "Message should be less than 1000 characters"
    }
  ]
}
```

- Server Error
  Code: 500 Internal Server Error
  Content:

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred"
}
```

**Notes**

- The submissionTime in the response is in ISO 8601 format.
- The server may include additional fields like ipAddress and userAgent in the stored submission, but these are not required in the request payload.
- Rate limiting may be applied to this endpoint to prevent abuse.
