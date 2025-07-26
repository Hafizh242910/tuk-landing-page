# TUK Landing Page - Backend API

This document describes the backend API for the TUK Landing Page project, which provides CRUD operations for courses, schedules, and organizational structure.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Update the `.env` file with your MySQL configuration:

```env
DATABASE_URL="mysql://username:password@localhost:3306/tuk_landing_page"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

**Note**: Make sure MySQL is installed and running. See `MYSQL_SETUP.md` for detailed installation instructions.

### 3. Database Setup

Generate Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
```

### 4. Seed Database

Populate the database with initial data:

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

## 📊 Database Schema

### Models

#### User

- `id`: Unique identifier
- `email`: User email (unique)
- `name`: User full name
- `password`: Hashed password
- `role`: User role (ADMIN, USER)
- `createdAt`, `updatedAt`: Timestamps

#### Course

- `id`: Unique identifier
- `title`: Course full title
- `shortTitle`: Course abbreviation
- `description`: Course description
- `duration`: Course duration
- `category`: Course category
- `price`: Course price (optional)
- `isActive`: Course availability status
- `schedules`: Related schedules (relation)

#### Schedule

- `id`: Unique identifier
- `courseId`: Reference to course
- `startDate`: Training start date
- `endDate`: Training end date
- `time`: Training time
- `location`: Training location
- `seats`: Total available seats
- `available`: Available seats
- `status`: Schedule status (OPEN, LIMITED, FULL, CANCELLED)
- `color`, `textColor`: Calendar display colors
- `course`: Related course (relation)

#### OrganizationalStructure

- `id`: Unique identifier
- `name`: Person name
- `position`: Job position
- `department`: Department name
- `level`: Hierarchy level
- `parentId`: Reference to parent position
- `imageUrl`: Profile image URL
- `email`, `phone`: Contact information
- `isActive`: Active status
- `parent`, `children`: Hierarchical relations

## 🔐 Authentication

### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "USER"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response includes JWT token for authenticated requests.

## 📚 Course API

### Get All Courses

```http
GET /api/courses
GET /api/courses?category=penyambungan&isActive=true
```

### Get Course by ID

```http
GET /api/courses/{id}
```

### Create Course

```http
POST /api/courses
Content-Type: application/json

{
  "title": "Course Title",
  "shortTitle": "CT",
  "description": "Course description",
  "duration": "3 Hari",
  "category": "penyambungan",
  "price": 3500000,
  "isActive": true
}
```

### Update Course

```http
PUT /api/courses/{id}
Content-Type: application/json

{
  "title": "Updated Course Title",
  "price": 4000000
}
```

### Delete Course

```http
DELETE /api/courses/{id}
```

## 📅 Schedule API

### Get All Schedules

```http
GET /api/schedules
GET /api/schedules?courseId={id}&status=OPEN
GET /api/schedules?startDate=2024-12-01&endDate=2024-12-31
```

### Get Schedule by ID

```http
GET /api/schedules/{id}
```

### Create Schedule

```http
POST /api/schedules
Content-Type: application/json

{
  "courseId": "course-id",
  "startDate": "2024-12-15T00:00:00.000Z",
  "endDate": "2024-12-17T00:00:00.000Z",
  "time": "08:00 - 17:00 WIB",
  "location": "Jakarta",
  "seats": 20,
  "available": 20,
  "status": "OPEN",
  "color": "#3B82F6",
  "textColor": "#FFFFFF"
}
```

### Update Schedule

```http
PUT /api/schedules/{id}
Content-Type: application/json

{
  "available": 15,
  "status": "LIMITED"
}
```

### Delete Schedule

```http
DELETE /api/schedules/{id}
```

## 🏢 Organizational Structure API

### Get All Structure

```http
GET /api/organizational-structure
GET /api/organizational-structure?department=Operasional&level=2
```

### Get Structure by ID

```http
GET /api/organizational-structure/{id}
```

### Create Structure

```http
POST /api/organizational-structure
Content-Type: application/json

{
  "name": "John Doe",
  "position": "Manager",
  "department": "Operasional",
  "level": 2,
  "parentId": "parent-id",
  "email": "john@example.com",
  "phone": "+6281234567890",
  "isActive": true
}
```

### Update Structure

```http
PUT /api/organizational-structure/{id}
Content-Type: application/json

{
  "position": "Senior Manager",
  "level": 3
}
```

### Delete Structure

```http
DELETE /api/organizational-structure/{id}
```

## 🔧 API Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using Zod schemas
- **Error Handling**: Comprehensive error handling and logging
- **CORS Protection**: Built-in CORS protection
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🚀 Deployment

### Production Environment Variables

```env
DATABASE_URL="mysql://username:password@your-mysql-server:3306/tuk_landing_page"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

### Database Migration

```bash
npm run db:generate
npm run db:push
```

## 🧪 Testing

### Default Admin Credentials

After seeding the database:

- Email: `admin@tuk.com`
- Password: `admin123`

## 📝 Development Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔍 API Documentation

For detailed API documentation and testing, you can use tools like:

- Postman
- Insomnia
- Thunder Client (VS Code extension)

## 📞 Support

For questions or issues, please contact the development team.
