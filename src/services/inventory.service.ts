import prisma from '../utils/prisma';
import { TransactionType } from '@prisma/client';

export class InventoryService {
  async getAllItems(lowStock?: boolean) {
    if (lowStock) {
      return this.getLowStockAlerts();
    }
    return prisma.item.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getItemById(id: number) {
    return prisma.item.findUnique({
      where: { id },
      include: { 
        transactions: { 
          take: 50, 
          orderBy: { createdAt: 'desc' } 
        } 
      },
    });
  }

  async createItem(data: { name: string; category?: string; unit: string; criticalThreshold?: number; quantity?: number }) {
    return prisma.item.create({
      data,
    });
  }

  async updateItem(id: number, data: { name?: string; category?: string; unit?: string; criticalThreshold?: number }) {
    return prisma.item.update({
      where: { id },
      data,
    });
  }

  async deleteItem(id: number) {
    return prisma.item.delete({
      where: { id },
    });
  }

  async addTransaction(itemId: number, type: TransactionType, amount: number, reason?: string) {
    return prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({ where: { id: itemId } });
      if (!item) throw new Error('Item not found');

      const newQuantity = type === TransactionType.IN 
        ? item.quantity + amount 
        : item.quantity - amount;

      if (newQuantity < 0) throw new Error('Insufficient stock for withdrawal');

      const transaction = await tx.transaction.create({
        data: { itemId, type, amount, reason },
        include: { 
          item: {
            select: { name: true, unit: true, quantity: true }
          }
        }
      });

      await tx.item.update({
        where: { id: itemId },
        data: { quantity: newQuantity },
      });

      return transaction;
    });
  }

  async getLowStockAlerts() {
    // Standard query for prototype. For larger datasets, use raw SQL or field comparisons.
    const allItems = await prisma.item.findMany();
    return allItems.filter(item => item.quantity <= item.criticalThreshold);
  }

  async getTransactionHistory(itemId?: number) {
    if (itemId) {
      return prisma.transaction.findMany({
        where: { itemId },
        orderBy: { createdAt: 'desc' },
        include: { item: true }
      });
    }
    return prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { item: true }
    });
  }

  async getSummary() {
    const totalItems = await prisma.item.count();
    const lowStockItems = await this.getLowStockAlerts();
    const totalTransactions = await prisma.transaction.count();
    
    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { item: { select: { name: true } } }
    });

    return {
      totalItems,
      lowStockCount: lowStockItems.length,
      totalTransactions,
      recentTransactions,
      lowStockItems: lowStockItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        threshold: item.criticalThreshold,
        unit: item.unit
      }))
    };
  }
}
