import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { TransactionType } from '@prisma/client';

const inventoryService = new InventoryService();

export class InventoryController {
  async getAllItems(req: Request, res: Response) {
    try {
      const lowStock = req.query.lowStock === 'true';
      const items = await inventoryService.getAllItems(lowStock);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const item = await inventoryService.getItemById(id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createItem(req: Request, res: Response) {
    try {
      const newItem = await inventoryService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedItem = await inventoryService.updateItem(id, req.body);
      res.json(updatedItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await inventoryService.deleteItem(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async addTransaction(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id);
      const { type, amount, reason } = req.body;
      const transaction = await inventoryService.addTransaction(itemId, type as TransactionType, amount, reason);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAlerts(req: Request, res: Response) {
    try {
      const alerts = await inventoryService.getLowStockAlerts();
      res.json(alerts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTransactionHistory(req: Request, res: Response) {
    try {
      const itemId = req.query.itemId ? parseInt(req.query.itemId as string) : undefined;
      const history = await inventoryService.getTransactionHistory(itemId);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSummary(req: Request, res: Response) {
    try {
      const summary = await inventoryService.getSummary();
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
