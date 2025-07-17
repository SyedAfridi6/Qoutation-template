import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuotationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create quotation
  app.post("/api/quotations", async (req, res) => {
    try {
      const validatedData = insertQuotationSchema.parse(req.body);
      const quotation = await storage.createQuotation(validatedData);
      res.json(quotation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to create quotation" 
        });
      }
    }
  });

  // Get all quotations
  app.get("/api/quotations", async (req, res) => {
    try {
      const quotations = await storage.getQuotations();
      res.json(quotations);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch quotations" 
      });
    }
  });

  // Get quotation by ID
  app.get("/api/quotations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quotation = await storage.getQuotationById(id);
      
      if (!quotation) {
        res.status(404).json({ 
          message: "Quotation not found" 
        });
        return;
      }
      
      res.json(quotation);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch quotation" 
      });
    }
  });

  // Update quotation (for Google Drive file ID)
  app.patch("/api/quotations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const quotation = await storage.updateQuotation(id, updates);
      
      if (!quotation) {
        res.status(404).json({ 
          message: "Quotation not found" 
        });
        return;
      }
      
      res.json(quotation);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to update quotation" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
