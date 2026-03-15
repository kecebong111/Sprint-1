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

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/summary` - Get dashboard stats
- `GET /api/inventory/alerts` - Get low stock items
- `POST /api/inventory` - Create new item
- `GET /api/inventory/:id` - Get item details with transaction history
- `PATCH /api/inventory/:id` - Update item details
- `DELETE /api/inventory/:id` - Delete item

### Transactions
- `POST /api/inventory/:id/transaction` - Record stock movement (IN/OUT)
- `GET /api/inventory/transactions` - View all transaction history

## Development

If you want to run locally without Docker:

1. Install dependencies: `npm install`
2. Set up `.env` (use `.env.example` as reference)
3. Run migrations: `npx prisma migrate dev`
4. Run development server: `npm run dev`
