# Backend Server Architecture Diagram

## High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           GDG Backend Server (FastAPI)                         │
│                              Port: 8000                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CORS Middleware                                   │
│  • Origins: localhost:3000, v0-google-developer-group-app.vercel.app          │
│  • Methods: All (*)                                                           │
│  • Headers: All (*)                                                           │
│  • Credentials: True                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FastAPI Application                              │
│  • Auto-generated OpenAPI docs at /docs                                       │
│  • Health check endpoint at /                                                 │
│  • Database schema auto-creation on startup                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Router Layer                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ /workshops  │  │   /admin    │  │ /students   │  │  /register  │          │
│  │             │  │             │  │             │  │             │          │
│  │ • GET /     │  │ • POST /    │  │ • POST /    │  │ • POST /    │          │
│  │ • GET /{id} │  │ • POST /login│  │ • GET /     │  │ • GET /     │          │
│  │ • POST /    │  │             │  │             │  │             │          │
│  │ • PUT /{id} │  │             │  │             │  │             │          │
│  │ • DELETE /{id}│             │  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            Authentication Layer                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        JWT Token System                                │    │
│  │  • Algorithm: HS256                                                   │    │
│  │  • Expiry: 30 minutes                                                 │    │
│  │  • Claims: sub (username), role (admin), exp (expiry)                 │    │
│  │  • Secret: JWT_SECRET_KEY from environment                            │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Password Security                               │    │
│  │  • Algorithm: bcrypt                                                   │    │
│  │  • Library: passlib with CryptContext                                 │    │
│  │  • Auto-handles deprecated hash formats                               │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        OAuth2 Integration                              │    │
│  │  • OAuth2PasswordBearer for token extraction                          │    │
│  │  • OAuth2PasswordRequestForm for login endpoint                       │    │
│  │  • Bearer token validation                                            │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            Repository Layer                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ workshops.py│  │   admin.py  │  │ students.py │  │ register.py │          │
│  │             │  │             │  │             │  │             │          │
│  │ • get_all() │  │ • create_   │  │ • student   │  │ • register_ │          │
│  │ • get_single│  │   admin()   │  │   SignUp()  │  │   workshop()│          │
│  │ • create_   │  │ • login()   │  │ • getAll    │  │ • get_all_  │          │
│  │   post()    │  │             │  │   Students()│  │   attendees()│         │
│  │ • update_   │  │             │  │             │  │             │          │
│  │   workshop()│  │             │  │             │  │             │          │
│  │ • delete()  │  │             │  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            Data Validation Layer                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Pydantic Schemas                                │    │
│  │  • Input validation for all API endpoints                             │    │
│  │  • Output serialization with from_attributes=True                     │    │
│  │  • Type safety and automatic documentation generation                  │    │
│  │                                                                       │    │
│  │  Schemas:                                                             │    │
│  │  • WorkShopsBase, Workshops, ShowWorkShops                           │    │
│  │  • RegisStudentOut, ShowRegisStudent                                 │    │
│  │  • StudentsSignUp, AdminLogin                                        │    │
│  │  • Token, TokenData                                                  │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            Database Layer                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        SQLAlchemy ORM                                  │    │
│  │  • Declarative Base for model definitions                             │    │
│  │  • Session management with dependency injection                       │    │
│  │  • Relationship mapping (one-to-many)                                │    │
│  │  • Auto-commit/rollback handling                                      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Database Models                                 │    │
│  │  • Workshops: workshops-db table                                      │    │
│  │  • Student: students-db table                                         │    │
│  │  • Registration: regis-db table                                       │    │
│  │  • Admin: admins-db table                                             │    │
│  │                                                                       │    │
│  │  Relationships:                                                       │    │
│  │  • Workshops ←→ Registration (one-to-many)                           │    │
│  │  • Foreign Key: workshops_id in Registration                         │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            Database Engine                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Database Connection                             │    │
│  │  • URL: DATABASE_URL from environment variables                       │    │
│  │  • Engine: create_engine() with connection pooling                    │    │
│  │  • Session Factory: SessionLocal with autoflush=False                 │    │
│  │  • Dependency: get_db() yields session, ensures cleanup               │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        External Database                               │    │
│  │  • Primary: Supabase PostgreSQL (production)                          │    │
│  │  • Local: SQLite (development)                                        │    │
│  │  • Driver: psycopg2 for PostgreSQL                                    │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            External Services                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Email Service (Optional)                        │    │
│  │  • SMTP: Gmail (smtp.gmail.com:587)                                   │    │
│  │  • Authentication: EMAIL_USER, EMAIL_PASS                             │    │
│  │  │  • TLS encryption for secure transmission                          │    │
│  │  • Purpose: Workshop notifications, admin alerts                      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

## Technology Stack & Dependencies

### Core Framework
- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **Python 3.13**: Runtime environment

### Database & ORM
- **SQLAlchemy**: Python SQL toolkit and Object-Relational Mapping
- **psycopg2**: PostgreSQL adapter for Python
- **Alembic**: Database migration tool (not currently used)

### Authentication & Security
- **PyJWT**: JSON Web Token implementation
- **passlib**: Password hashing library
- **bcrypt**: Password hashing algorithm
- **python-multipart**: For handling form data

### Data Validation
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management

### Testing
- **pytest**: Testing framework
- **pytest-asyncio**: Async testing support

### Development Tools
- **python-dotenv**: Environment variable loading
- **smtplib**: Email sending capabilities

## Data Flow Architecture

```
Client Request
     │
     ▼
┌─────────────┐
│ CORS Check  │
└─────────────┘
     │
     ▼
┌─────────────┐
│ FastAPI App │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Router      │
│ (Endpoint)  │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Auth Check  │
│ (if needed) │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Repository  │
│ (Business   │
│  Logic)     │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Pydantic    │
│ Validation  │
└─────────────┘
     │
     ▼
┌─────────────┐
│ SQLAlchemy  │
│ ORM         │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Database    │
│ (PostgreSQL │
│  / SQLite)  │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Response    │
│ Serialization│
└─────────────┘
     │
     ▼
┌─────────────┐
│ JSON        │
│ Response    │
└─────────────┘
```

## Environment Variables Required

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database
# or for local development:
DATABASE_URL=sqlite:///./gdg.db

# JWT Security
JWT_SECRET_KEY=your-secret-key-here

# Email Service (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## API Endpoints Summary

### Workshops
- `GET /workshops` - List all workshops
- `GET /workshops/{id}` - Get specific workshop
- `POST /workshops` - Create new workshop
- `PUT /workshops/{id}` - Update workshop
- `DELETE /workshops/{id}` - Delete workshop

### Admin
- `POST /admin` - Create admin user
- `POST /admin/login` - Admin login (returns JWT)

### Students
- `POST /students` - Student signup
- `GET /students` - List all students

### Registration
- `POST /register` - Register for workshop
- `GET /register` - List all registrations

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Stateless authentication with expiry
3. **CORS Protection**: Restricted origins
4. **Input Validation**: Pydantic schema validation
5. **SQL Injection Protection**: SQLAlchemy ORM parameterized queries
6. **Environment Variables**: Sensitive data externalized

## Deployment Considerations

- **Production Database**: Supabase PostgreSQL
- **Environment**: Docker containerization ready
- **Scaling**: Stateless design allows horizontal scaling
- **Monitoring**: FastAPI automatic OpenAPI documentation
- **Security**: JWT tokens, CORS, input validation
