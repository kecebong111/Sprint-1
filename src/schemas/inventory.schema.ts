import { z } from 'zod';
import { TransactionType } from '@prisma/client';

export const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    category: z.string().optional(),
    unit: z.string().min(1),
    criticalThreshold: z.number().min(0).optional(),
    quantity: z.number().min(0).optional(),
  }),
});

export const updateItemSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    category: z.string().optional(),
    unit: z.string().min(1).optional(),
    criticalThreshold: z.number().min(0).optional(),
  }),
});

export const addTransactionSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    type: z.nativeEnum(TransactionType),
    amount: z.number().gt(0),
    reason: z.string().max(255).optional(),
  }),
});
