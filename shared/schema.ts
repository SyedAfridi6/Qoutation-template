import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quotations = pgTable("quotations", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  projectTitle: text("project_title").notNull(),
  budgetRange: text("budget_range"),
  projectGoals: text("project_goals").notNull(),
  projectType: text("project_type").notNull(),
  targetAudience: text("target_audience"),
  numberOfPages: text("number_of_pages"),
  timeline: text("timeline"),
  projectComplexity: text("project_complexity"),
  frontendTech: json("frontend_tech").$type<string[]>(),
  backendTech: json("backend_tech").$type<string[]>(),
  database: json("database").$type<string[]>(),
  hosting: json("hosting").$type<string[]>(),
  devTools: json("dev_tools").$type<string[]>(),
  devices: json("devices").$type<string[]>(),
  designType: text("design_type"),
  brandGuidelines: text("brand_guidelines"),
  logoDesign: text("logo_design"),
  designRevisions: text("design_revisions"),
  features: json("features").$type<string[]>(),
  performance: json("performance").$type<string[]>(),
  additional: json("additional").$type<string[]>(),
  subtotal: integer("subtotal"),
  gst: integer("gst"),
  total: integer("total"),
  totalHours: integer("total_hours"),
  googleDriveFileId: text("google_drive_file_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuotationSchema = createInsertSchema(quotations).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertQuotation = z.infer<typeof insertQuotationSchema>;
export type Quotation = typeof quotations.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
