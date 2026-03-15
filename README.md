# School Nutrition Vault (Student Side Inventory)

Backend system for schools to monitor nutritional stock (milk, supplements) for students.

## Features
- **CRUD Inventory:** Manage items with category and unit.
- **Stock Movement:** Record IN/OUT transactions with automatic quantity adjustment.
- **Low Stock Alerts:** Monitor items below critical thresholds.
- **Dashboard Summary:** Quick overview of total items, transactions, and alerts.
- **Interactive API Docs:** Built-in Swagger UI.
- **Validation:** Robust data validation using Zod.

## Tech Stack
- **Node.js** with **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Docker & Docker Compose**

## Quick Start (Docker)

1. **Clone the repository.**
2. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
3. **Database Setup (First time):**
   In a separate terminal, run:
   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   docker-compose exec app npm run prisma:seed
   ```
4. **Access the API:**
   - **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)

## Core API Endpoints

### 1. Create New Item
**Endpoint:** `POST /api/inventory`  
**Description:** Register a new item in the inventory.

**Payload (JSON):**
```json
{
  "name": "Full Cream Milk",
  "category": "Dairy",
  "unit": "Bottle",
  "quantity": 100,
  "criticalThreshold": 20
}
```

### 2. Record Stock Transaction (IN/OUT)
**Endpoint:** `POST /api/inventory/:id/transaction`  
**Description:** Record movement of stock. Use `IN` for adding stock and `OUT` for distributing/removing stock.

**Payload (JSON):**
```json
{
  "type": "OUT",
  "amount": 10,
  "reason": "Distributed to Class 1A"
}
```

### 3. Inventory Management
- `GET /api/inventory` - Get all items.
- `GET /api/inventory/summary` - Get dashboard stats (Total items, low stock alerts, recent transactions).
- `GET /api/inventory/alerts` - Get all items currently below their critical threshold.
- `GET /api/inventory/:id` - Get item details including full transaction history.
- `PATCH /api/inventory/:id` - Update item details (name, category, threshold).
- `DELETE /api/inventory/:id` - Remove an item from the system.

### 4. Transaction History
- `GET /api/inventory/transactions` - View history of all stock movements across all items.

## Development

If you want to run locally without Docker:

1. Install dependencies: `npm install`
2. Set up `.env` (use `.env.example` as reference)
3. Run migrations: `npx prisma migrate dev`
4. Run development server: `npm run dev`
