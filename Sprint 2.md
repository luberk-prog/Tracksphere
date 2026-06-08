Continue building TrackSphere from the existing Sprint 1 foundation.

IMPORTANT:
Do NOT recreate the project.
Extend the current codebase.

=========================================
SPRINT 2 - AUTHENTICATION & PROFILE SYSTEM
=========================================

Project Name:
TrackSphere

Tech Stack:

Frontend:
- Next.js 15
- TypeScript
- Tailwind CSS
- ShadCN UI
- TanStack Query
- Zustand
- React Hook Form
- Zod

Backend:
- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Bcrypt

=========================================
BACKEND REQUIREMENTS
=========================================

Create complete authentication system.

API Base:

/api/v1

-----------------------------------------
AUTH ROUTES
-----------------------------------------

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/me

POST /api/v1/auth/logout

-----------------------------------------
REGISTER FLOW
-----------------------------------------

Input:

{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "Password123!"
}

Validation:

- Username required
- Username unique
- Email required
- Email unique
- Password minimum 8 characters
- Password must contain:
  - uppercase
  - lowercase
  - number

Process:

- Validate with Zod
- Hash password using bcrypt
- Create User
- Automatically create Profile
- Generate JWT access token
- Return user data

-----------------------------------------
LOGIN FLOW
-----------------------------------------

Input:

{
  "email": "john@example.com",
  "password": "Password123!"
}

Process:

- Find user
- Compare bcrypt password
- Generate JWT token
- Return user information

-----------------------------------------
JWT MIDDLEWARE
-----------------------------------------

Create authentication middleware.

Protect routes requiring login.

Token must be passed using:

Authorization: Bearer TOKEN

-----------------------------------------
AUTH ME ROUTE
-----------------------------------------

GET /api/v1/auth/me

Returns:

{
  "success": true,
  "user": {}
}

Uses JWT middleware.

-----------------------------------------
PROFILE ROUTES
-----------------------------------------

GET /api/v1/profile

PATCH /api/v1/profile

Profile Fields:

- fullName
- bio
- avatarUrl
- country
- city

Authenticated users can update profile.

-----------------------------------------
FOLLOW SYSTEM
-----------------------------------------

Create:

POST /api/v1/users/:id/follow

DELETE /api/v1/users/:id/follow

GET /api/v1/users/:id/followers

GET /api/v1/users/:id/following

-----------------------------------------
FRIENDSHIP LOGIC
-----------------------------------------

When:

User A follows User B

and

User B follows User A

Automatically create friendship.

Create Friendship model:

Friendship
- id
- userOneId
- userTwoId
- createdAt

Prevent duplicate friendships.

=========================================
DATABASE
=========================================

Update Prisma schema.

Models:

User
Profile
Follow
Friendship

Relations must be properly configured.

Add indexes where appropriate.

Add migration.

=========================================
FRONTEND REQUIREMENTS
=========================================

Create authentication pages.

-----------------------------------------
REGISTER PAGE
-----------------------------------------

Route:

/register

Fields:

- Username
- Email
- Password
- Confirm Password

Features:

- React Hook Form
- Zod Validation
- Password visibility toggle
- Loading state
- Error messages

After successful registration:

Redirect to dashboard.

-----------------------------------------
LOGIN PAGE
-----------------------------------------

Route:

/login

Fields:

- Email
- Password

Features:

- React Hook Form
- Validation
- Loading state
- Error handling

After login:

Redirect to dashboard.

-----------------------------------------
AUTH STORE
-----------------------------------------

Create Zustand Auth Store.

Store:

- user
- token
- login()
- logout()
- register()

Persist authentication state.

=========================================
DASHBOARD
=========================================

Route:

/dashboard

Protected Route.

Only authenticated users can access.

Layout includes:

Welcome Back

Stats Cards:

- Total Distance
- Activities Completed
- Average Speed
- Friends

Use placeholder data for now.

=========================================
PROFILE PAGE
=========================================

Route:

/profile

Display:

- Profile Picture
- Username
- Full Name
- Bio
- Country
- City

Allow editing profile information.

Save changes using API.

=========================================
UI DESIGN
=========================================

Use existing TrackSphere theme.

Design Style:

- Premium fitness platform
- Dark background
- Neon green accents
- Smooth animations
- Mobile responsive
- Professional dashboard appearance

=========================================
CODE QUALITY
=========================================

Use:

- Feature-based architecture
- TypeScript types
- Reusable components
- Error handling
- Clean API structure
- Environment variables

Generate all necessary:

- Controllers
- Services
- Routes
- Middleware
- Prisma updates
- Zustand stores
- API hooks
- Forms
- Protected route logic

Output production-ready code with no placeholders except dashboard statistics.