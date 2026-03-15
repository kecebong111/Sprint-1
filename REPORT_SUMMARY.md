# School Nutrition Vault - Sprint 1 Report

## 1. Project Overview
A containerized Express.js API designed to manage school inventory for the Makan Bergizi Gratis (MBG) program.

## 2. Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Documentation:** Swagger UI
- **Containerization:** Docker, Docker Compose

## 3. ERD (Entity Relationship Diagram)
- **Item**
  - `id` (PK, Int)
  - `name` (String, Unique): Name of the item (e.g., "Full Cream Milk").
  - `quantity` (Float): Current available stock.
  - `unit` (String): Measurement unit (e.g., "Box", "Bottle").
  - `criticalThreshold` (Float): Minimum quantity before alert is triggered.
  - `createdAt`, `updatedAt` (DateTime)
- **Transaction**
  - `id` (PK, Int)
  - `itemId` (FK, Item): Reference to the Item.
  - `type` (Enum: IN, OUT): Stock direction.
  - `amount` (Float): Quantity moved.
  - `reason` (String, Optional): Note for the transaction.
  - `createdAt` (DateTime)

**Relationship:** `Item` (1) --- (N) `Transaction`. One item can have multiple stock movement records.

## 4. API Testing Guide
1. **Run with Docker:**
   ```bash
   docker-compose up --build
   ```
2. **Access Swagger UI:**
   Navigate to `http://localhost:3000/api-docs` to interact with all endpoints directly.
3. **Core Endpoints:**
   - `POST /api/inventory`: Create new item.
   - `POST /api/inventory/:id/transaction`: Record stock movement.
   - `GET /api/inventory/alerts`: Check items with low stock.

## 5. Verification
The system has been verified through manual testing of all endpoints and validation of the containerized environment.
