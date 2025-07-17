import { quotations, users, type User, type InsertUser, type Quotation, type InsertQuotation } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuotation(quotation: InsertQuotation): Promise<Quotation>;
  getQuotations(): Promise<Quotation[]>;
  getQuotationById(id: number): Promise<Quotation | undefined>;
  updateQuotation(id: number, quotation: Partial<InsertQuotation>): Promise<Quotation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotations: Map<number, Quotation>;
  private currentUserId: number;
  private currentQuotationId: number;

  constructor() {
    this.users = new Map();
    this.quotations = new Map();
    this.currentUserId = 1;
    this.currentQuotationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuotation(insertQuotation: InsertQuotation): Promise<Quotation> {
    const id = this.currentQuotationId++;
    const quotation: Quotation = { 
      id, 
      createdAt: new Date(),
      clientName: insertQuotation.clientName,
      companyName: insertQuotation.companyName || null,
      email: insertQuotation.email,
      phone: insertQuotation.phone || null,
      projectTitle: insertQuotation.projectTitle,
      budgetRange: insertQuotation.budgetRange || null,
      projectGoals: insertQuotation.projectGoals,
      projectType: insertQuotation.projectType,
      targetAudience: insertQuotation.targetAudience || null,
      numberOfPages: insertQuotation.numberOfPages || null,
      timeline: insertQuotation.timeline || null,
      projectComplexity: insertQuotation.projectComplexity || null,
      frontendTech: (insertQuotation.frontendTech as string[]) || null,
      backendTech: (insertQuotation.backendTech as string[]) || null,
      database: (insertQuotation.database as string[]) || null,
      hosting: (insertQuotation.hosting as string[]) || null,
      devTools: (insertQuotation.devTools as string[]) || null,
      devices: (insertQuotation.devices as string[]) || null,
      designType: insertQuotation.designType || null,
      brandGuidelines: insertQuotation.brandGuidelines || null,
      logoDesign: insertQuotation.logoDesign || null,
      designRevisions: insertQuotation.designRevisions || null,
      features: (insertQuotation.features as string[]) || null,
      performance: (insertQuotation.performance as string[]) || null,
      additional: (insertQuotation.additional as string[]) || null,
      subtotal: insertQuotation.subtotal || null,
      gst: insertQuotation.gst || null,
      total: insertQuotation.total || null,
      totalHours: insertQuotation.totalHours || null,
      googleDriveFileId: insertQuotation.googleDriveFileId || null,
    };
    this.quotations.set(id, quotation);
    return quotation;
  }

  async getQuotations(): Promise<Quotation[]> {
    return Array.from(this.quotations.values()).sort((a, b) => 
      b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getQuotationById(id: number): Promise<Quotation | undefined> {
    return this.quotations.get(id);
  }

  async updateQuotation(id: number, updates: Partial<InsertQuotation>): Promise<Quotation | undefined> {
    const existing = this.quotations.get(id);
    if (!existing) return undefined;
    
    const updated: Quotation = { 
      ...existing, 
      ...updates,
      frontendTech: (updates.frontendTech as string[]) || existing.frontendTech,
      backendTech: (updates.backendTech as string[]) || existing.backendTech,
      database: (updates.database as string[]) || existing.database,
      hosting: (updates.hosting as string[]) || existing.hosting,
      devTools: (updates.devTools as string[]) || existing.devTools,
      devices: (updates.devices as string[]) || existing.devices,
      features: (updates.features as string[]) || existing.features,
      performance: (updates.performance as string[]) || existing.performance,
      additional: (updates.additional as string[]) || existing.additional,
    };
    this.quotations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
