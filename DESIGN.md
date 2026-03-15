# School Nutrition Vault (Student Side Inventory) - Design Document

## 1. Background & Motivation
This project is part of the MBG (Makan Bergizi Gratis) program's logistics simulation. The "School Nutrition Vault" is a student-side inventory system for schools to manage stocks of milk and supplements stored in the UKS.

## 2. Scope & Impact
The API will provide a robust backend to:
- **Manage Inventory:** Create, Read, Update, and Delete (CRUD) for items.
- **Track Stock:** Handle incoming and outgoing stock with transaction logs.
- **Alert System:** Identify items that fall below a critical threshold.
- **Containerization:** Ensure the system is easily deployable using Docker.
- **Documentation:** Provide auto-generated Swagger documentation.

## 3. Proposed Solution
### Tech Stack
- **Framework:** Express (Node.js, TypeScript preferred for better maintainability).
- **ORM:** Prisma (for seamless PostgreSQL integration).
- **Database:** PostgreSQL (via Docker).
- **Containerization:** Docker & Docker Compose.
- **Documentation:** `swagger-ui-express` and `swagger-jsdoc`.

### Database Schema (Prisma)
- `Item`:
  - `id`: Int (PK)
  - `name`: String
  - `quantity`: Float (Current stock)
  - `unit`: String (e.g., "bottles", "boxes")
  - `criticalThreshold`: Float (Minimum quantity before alert)
  - `createdAt`: DateTime
  - `updatedAt`: DateTime
- `Transaction`:
  - `id`: Int (PK)
  - `itemId`: Int (FK)
  - `type`: Enum (IN, OUT)
  - `amount`: Float
  - `reason`: String (Optional)
  - `createdAt`: DateTime

### Key Endpoints
- `GET /api/inventory`: List items (Optional filter: `?lowStock=true`).
- `POST /api/inventory`: Register a new item.
- `GET /api/inventory/:id`: Get detailed info for a specific item.
- `PATCH /api/inventory/:id`: Update item details (name, threshold, etc.).
- `DELETE /api/inventory/:id`: Remove an item type.
- `POST /api/inventory/:id/transaction`: Record a stock change (IN/OUT).
- `GET /api/inventory/alerts`: Quick view for all items below their critical threshold.

## 4. Phased Implementation Plan
- **Phase 1: Project Initialization**
  - Setup Node.js/TypeScript environment.
  - Configure Prisma with PostgreSQL connection.
  - Setup Docker and Docker Compose.
- **Phase 2: Schema & Database**
  - Define Prisma models.
  - Run initial migrations.
- **Phase 3: Core CRUD API**
  - Implement basic item management endpoints.
- **Phase 4: Transactions & Alerts**
  - Implement stock adjustment logic.
  - Add "Low Stock Alert" detection.
- **Phase 5: Documentation & Containerization**
  - Integrate Swagger for API docs.
  - Finalize Docker configurations for production-ready deployment.
- **Phase 6: Testing & Validation**
  - Add unit and integration tests.

## 5. Visuals & Aesthetics
- The Swagger UI will serve as the primary visual interface for this phase, providing a clean, professional, and interactive way to test the API.

## 6. Verification
- **Automated Tests:** Using Jest and Supertest.
- **Docker Validation:** Ensure `docker-compose up` brings up a fully functional system.
- **Swagger Verification:** Confirm all endpoints are correctly documented and testable via the UI.
