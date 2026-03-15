import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { validate } from '../middlewares/validation.middleware';
import { 
  createItemSchema, 
  updateItemSchema, 
  addTransactionSchema 
} from '../schemas/inventory.schema';

const router = Router();
const inventoryController = new InventoryController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required: [name, unit]
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         category: { type: string }
 *         quantity: { type: number }
 *         unit: { type: string }
 *         criticalThreshold: { type: number }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     Transaction:
 *       type: object
 *       required: [itemId, type, amount]
 *       properties:
 *         id: { type: integer }
 *         itemId: { type: integer }
 *         type: { type: string, enum: [IN, OUT] }
 *         amount: { type: number }
 *         reason: { type: string }
 *         createdAt: { type: string, format: date-time }
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: lowStock
 *         schema: { type: boolean }
 *         description: If true, only returns items below critical threshold
 */
router.get('/', (req, res) => inventoryController.getAllItems(req, res));

/**
 * @swagger
 * /api/inventory/summary:
 *   get:
 *     summary: Get inventory dashboard summary
 *     tags: [Inventory]
 */
router.get('/summary', (req, res) => inventoryController.getSummary(req, res));

/**
 * @swagger
 * /api/inventory/alerts:
 *   get:
 *     summary: Get items below critical threshold
 *     tags: [Inventory]
 */
router.get('/alerts', (req, res) => inventoryController.getAlerts(req, res));

/**
 * @swagger
 * /api/inventory/transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: itemId
 *         schema: { type: integer }
 *         description: Optional filter by item ID
 */
router.get('/transactions', (req, res) => inventoryController.getTransactionHistory(req, res));

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.get('/:id', (req, res) => inventoryController.getItemById(req, res));

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 */
router.post('/', validate(createItemSchema), (req, res) => inventoryController.createItem(req, res));

/**
 * @swagger
 * /api/inventory/{id}:
 *   patch:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 */
router.patch('/:id', validate(updateItemSchema), (req, res) => inventoryController.updateItem(req, res));

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.delete('/:id', (req, res) => inventoryController.deleteItem(req, res));

/**
 * @swagger
 * /api/inventory/{id}/transaction:
 *   post:
 *     summary: Add a stock transaction (IN/OUT)
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, amount]
 *             properties:
 *               type: { type: string, enum: [IN, OUT] }
 *               amount: { type: number }
 *               reason: { type: string }
 */
router.post('/:id/transaction', validate(addTransactionSchema), (req, res) => inventoryController.addTransaction(req, res));

export default router;
