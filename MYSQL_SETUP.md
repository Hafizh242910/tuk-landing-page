# MySQL Database Setup Guide

This guide will help you set up MySQL database for the TUK Landing Page project.

## 🗄️ Prerequisites

### 1. Install MySQL

#### Windows

1. Download MySQL Installer from [MySQL Official Website](https://dev.mysql.com/downloads/installer/)
2. Run the installer and follow the setup wizard
3. Choose "Developer Default" or "Server only" installation
4. Set root password during installation
5. Complete the installation

#### macOS

```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Install MySQL Workbench (Optional but Recommended)

- Download from [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- Provides GUI for database management

## 🚀 Database Setup

### 1. Create Database

Connect to MySQL as root:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE tuk_landing_page CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create a dedicated user (recommended for production):

```sql
CREATE USER 'tuk_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON tuk_landing_page.* TO 'tuk_user'@'localhost';
FLUSH PRIVILEGES;
```

Exit MySQL:

```sql
EXIT;
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp env.example .env
```

Update the `.env` file with your MySQL credentials:

#### For Development (using root):

```env
DATABASE_URL="mysql://root:your_root_password@localhost:3306/tuk_landing_page"
```

#### For Development (using dedicated user):

```env
DATABASE_URL="mysql://tuk_user:your_secure_password@localhost:3306/tuk_landing_page"
```

#### For Production:

```env
DATABASE_URL="mysql://username:password@your-mysql-server:3306/tuk_landing_page"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Schema to Database

```bash
npm run db:push
```

### 6. Seed Database

```bash
npm run db:seed
```

## 🔧 Database Management Commands

### Generate Prisma Client

```bash
npm run db:generate
```

### Push Schema Changes

```bash
npm run db:push
```

### Create Migration (for production)

```bash
npm run db:migrate
```

### Reset Database

```bash
npm run db:reset
```

### Seed Database

```bash
npm run db:seed
```

### Open Prisma Studio (Database GUI)

```bash
npm run db:studio
```

## 📊 Database Schema

The MySQL database includes the following tables:

### Users Table

- `id`: Unique identifier (CUID)
- `email`: User email (unique, VARCHAR 255)
- `name`: User full name (VARCHAR 255)
- `password`: Hashed password (VARCHAR 255)
- `role`: User role (ADMIN, USER)
- `createdAt`, `updatedAt`: Timestamps

### Courses Table

- `id`: Unique identifier (CUID)
- `title`: Course title (VARCHAR 500)
- `shortTitle`: Course abbreviation (VARCHAR 50, unique)
- `description`: Course description (TEXT)
- `duration`: Course duration (VARCHAR 100)
- `category`: Course category (VARCHAR 100)
- `price`: Course price (FLOAT, optional)
- `isActive`: Active status (BOOLEAN)
- `createdAt`, `updatedAt`: Timestamps

### Schedules Table

- `id`: Unique identifier (CUID)
- `courseId`: Reference to course (VARCHAR 191)
- `startDate`: Training start date (DATETIME)
- `endDate`: Training end date (DATETIME)
- `time`: Training time (VARCHAR 100)
- `location`: Training location (VARCHAR 255)
- `seats`: Total seats (INT)
- `available`: Available seats (INT)
- `status`: Schedule status (ENUM: OPEN, LIMITED, FULL, CANCELLED)
- `color`: Calendar color (VARCHAR 7, optional)
- `textColor`: Text color (VARCHAR 7, optional)
- `createdAt`, `updatedAt`: Timestamps

### Organizational Structures Table

- `id`: Unique identifier (CUID)
- `name`: Person name (VARCHAR 255)
- `position`: Job position (VARCHAR 255)
- `department`: Department (VARCHAR 255, optional)
- `level`: Hierarchy level (INT)
- `parentId`: Parent reference (VARCHAR 191, optional)
- `imageUrl`: Profile image URL (VARCHAR 500, optional)
- `email`: Contact email (VARCHAR 255, optional)
- `phone`: Contact phone (VARCHAR 50, optional)
- `isActive`: Active status (BOOLEAN)
- `createdAt`, `updatedAt`: Timestamps

## 🔍 Troubleshooting

### Common Issues

#### 1. Connection Refused

```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql
```

#### 2. Access Denied

```bash
# Reset root password if needed
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Character Set Issues

```sql
-- Set proper character set
ALTER DATABASE tuk_landing_page CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 4. Prisma Client Generation Issues

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Reinstall dependencies
npm install

# Regenerate client
npm run db:generate
```

### 5. Database Reset

If you need to completely reset the database:

```bash
# Drop and recreate database
mysql -u root -p
DROP DATABASE tuk_landing_page;
CREATE DATABASE tuk_landing_page CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Reset Prisma
npm run db:push
npm run db:seed
```

## 🚀 Production Deployment

### 1. Production Database Setup

```sql
-- Create production database
CREATE DATABASE tuk_landing_page_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create production user
CREATE USER 'tuk_prod_user'@'%' IDENTIFIED BY 'strong_production_password';
GRANT ALL PRIVILEGES ON tuk_landing_page_prod.* TO 'tuk_prod_user'@'%';
FLUSH PRIVILEGES;
```

### 2. Environment Variables

```env
DATABASE_URL="mysql://tuk_prod_user:strong_production_password@your-mysql-server:3306/tuk_landing_page_prod"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

### 3. Database Migration

```bash
npm run db:migrate
npm run db:seed
```

## 📞 Support

If you encounter any issues with MySQL setup, please check:

1. MySQL service is running
2. Database credentials are correct
3. Database exists and has proper permissions
4. Character set is set to utf8mb4

For additional help, refer to:

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Prisma Documentation](https://www.prisma.io/docs/)
