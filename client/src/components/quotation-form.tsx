import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { QuotationCalculator, type QuotationResult } from "@/services/quotation-calculator";
import { GoogleDriveService } from "@/services/google-drive";
import { CSVExportService } from "@/services/csv-export";
import { Calculator, User, FolderOpen, Palette, CheckSquare, Wrench, Loader2, FileText, Save, RotateCcw, Check, Download, FileSpreadsheet } from "lucide-react";

const quotationSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  projectTitle: z.string().min(1, "Project title is required"),
  budgetRange: z.string().optional(),
  projectGoals: z.string().min(1, "Project goals are required"),
  projectType: z.string().min(1, "Project type is required"),
  targetAudience: z.string().optional(),
  numberOfPages: z.string().optional(),
  timeline: z.string().optional(),
  projectComplexity: z.string().optional(),
  frontendTech: z.array(z.string()).default([]),
  backendTech: z.array(z.string()).default([]),
  database: z.array(z.string()).default([]),
  hosting: z.array(z.string()).default([]),
  devTools: z.array(z.string()).default([]),
  devices: z.array(z.string()).default([]),
  designType: z.string().optional(),
  brandGuidelines: z.string().optional(),
  logoDesign: z.string().optional(),
  designRevisions: z.string().optional(),
  features: z.array(z.string()).default([]),
  performance: z.array(z.string()).default([]),
  additional: z.array(z.string()).default([]),
});

type QuotationForm = z.infer<typeof quotationSchema>;

export function QuotationForm() {
  const [quotationResult, setQuotationResult] = useState<QuotationResult | null>(null);
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [googleDriveService] = useState(() => new GoogleDriveService());
  const { toast } = useToast();

  const form = useForm<QuotationForm>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      targetAudience: "b2b",
      numberOfPages: "1-5",
      timeline: "normal",
      projectComplexity: "simple",
      designType: "template",
      brandGuidelines: "no",
      logoDesign: "no",
      designRevisions: "5",
      frontendTech: [],
      backendTech: [],
      database: [],
      hosting: [],
      devTools: [],
      devices: [],
      features: [],
      performance: [],
      additional: [],
    },
  });

  const createQuotationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/quotations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Quotation created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create quotation",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: QuotationForm) => {
    const result = QuotationCalculator.calculate(data);
    setQuotationResult(result);

    // Save to backend
    const quotationData = {
      ...data,
      subtotal: result.subtotal,
      gst: result.gst,
      total: result.total,
      totalHours: result.totalHours,
    };

    createQuotationMutation.mutate(quotationData);
  };

  const handleGoogleDriveConnect = async () => {
    setIsConnecting(true);
    try {
      console.log('Connecting to Google Drive...');
      const success = await googleDriveService.authorize();
      if (success) {
        setIsGoogleDriveConnected(true);
        toast({
          title: "Connected",
          description: "Successfully connected to Google Drive",
        });
      } else {
        // Handle failed authorization (no error thrown)
        toast({
          title: "Domain Authorization Required",
          description: "Please add this domain to your Google Cloud Console authorized origins. Check the console for the exact domain.",
          variant: "destructive",
        });
        
        // Show the domain info in console for easy copy-paste
        console.log('==== GOOGLE OAUTH SETUP REQUIRED ====');
        console.log('1. Go to: https://console.developers.google.com/');
        console.log('2. Select your project');
        console.log('3. Go to Credentials > OAuth 2.0 Client IDs');
        console.log('4. Add this domain to "Authorized JavaScript origins":');
        console.log('   https://8f28eda1-59d8-43b0-b507-23f8e04f08f3-00-1buwwaqtzrc4d.janeway.replit.dev');
        console.log('5. Save and try connecting again');
        console.log('=====================================');
      }
    } catch (error: any) {
      console.error('Google Drive connection failed:', error);
      toast({
        title: "Google Drive Connection Failed",
        description: "Failed to connect to Google Drive. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveToGoogleDrive = async () => {
    if (!quotationResult) return;

    setIsSaving(true);
    try {
      const formData = form.getValues();
      const dataToSave = {
        ...formData,
        subtotal: quotationResult.subtotal,
        gst: quotationResult.gst,
        total: quotationResult.total,
        totalHours: quotationResult.totalHours,
      };

      await googleDriveService.createOrUpdateExcelFile(dataToSave);
      toast({
        title: "Saved",
        description: "Quotation saved to Google Drive successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save to Google Drive",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    if (!quotationResult) return;

    const formData = form.getValues();
    const dataToExport = {
      ...formData,
      subtotal: quotationResult.subtotal,
      gst: quotationResult.gst,
      total: quotationResult.total,
      totalHours: quotationResult.totalHours,
    };

    CSVExportService.exportQuotationAsCSV(dataToExport);
    toast({
      title: "Exported",
      description: "Quotation exported as CSV file successfully",
    });
  };

  const handleReset = () => {
    form.reset();
    setQuotationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm border-none shadow-xl">
          <CardHeader className="text-center py-8">
            <CardTitle className="text-4xl font-bold text-slate-800 mb-4">
              <Calculator className="inline-block mr-4 text-indigo-600" size={40} />
              Website Development Quotation Estimator
            </CardTitle>
            <p className="text-xl text-slate-600">Get accurate project estimates with detailed breakdowns</p>
          </CardHeader>
        </Card>

        {/* Main Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Client Information */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <User className="mr-3 text-indigo-600" size={24} />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="clientName" className="text-sm font-semibold text-slate-700">
                        Client Name *
                      </Label>
                      <Input
                        id="clientName"
                        {...form.register("clientName")}
                        className="mt-2"
                        placeholder="Enter client name"
                      />
                      {form.formState.errors.clientName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.clientName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="companyName" className="text-sm font-semibold text-slate-700">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        {...form.register("companyName")}
                        className="mt-2"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="mt-2"
                        placeholder="Enter email address"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        className="mt-2"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="projectTitle" className="text-sm font-semibold text-slate-700">
                        Project Title *
                      </Label>
                      <Input
                        id="projectTitle"
                        {...form.register("projectTitle")}
                        className="mt-2"
                        placeholder="Enter project title"
                      />
                      {form.formState.errors.projectTitle && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.projectTitle.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="budgetRange" className="text-sm font-semibold text-slate-700">
                        Budget Range
                      </Label>
                      <Select onValueChange={(value) => form.setValue("budgetRange", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="100000-200000">₹1,00,000 - ₹2,00,000</SelectItem>
                          <SelectItem value="200000-350000">₹2,00,000 - ₹3,50,000</SelectItem>
                          <SelectItem value="350000-500000">₹3,50,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="500000+">₹5,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Overview */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <FolderOpen className="mr-3 text-indigo-600" size={24} />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="projectGoals" className="text-sm font-semibold text-slate-700">
                        Project Goal *
                      </Label>
                      <Textarea
                        id="projectGoals"
                        {...form.register("projectGoals")}
                        className="mt-2"
                        rows={3}
                        placeholder="Describe the main objectives of your project"
                      />
                      {form.formState.errors.projectGoals && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.projectGoals.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="projectType" className="text-sm font-semibold text-slate-700">
                        Project Type *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("projectType", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informational">Informational/Business Website</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce Website</SelectItem>
                          <SelectItem value="booking">Booking/Appointment System</SelectItem>
                          <SelectItem value="membership">Membership/Community Site</SelectItem>
                          <SelectItem value="dashboard">Internal Tool/Dashboard</SelectItem>
                          <SelectItem value="portfolio">Portfolio/Blog</SelectItem>
                          <SelectItem value="webapp">Custom Web Application</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.projectType.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="targetAudience" className="text-sm font-semibold text-slate-700">
                        Target Audience
                      </Label>
                      <Select onValueChange={(value) => form.setValue("targetAudience", value)} defaultValue="b2b">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="b2b">B2B (Business to Business)</SelectItem>
                          <SelectItem value="b2c">B2C (Business to Consumer)</SelectItem>
                          <SelectItem value="internal">Internal Use</SelectItem>
                          <SelectItem value="international">International/Multilingual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="numberOfPages" className="text-sm font-semibold text-slate-700">
                        Number of Pages
                      </Label>
                      <Select onValueChange={(value) => form.setValue("numberOfPages", value)} defaultValue="1-5">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 Pages</SelectItem>
                          <SelectItem value="6-10">6-10 Pages</SelectItem>
                          <SelectItem value="11-20">11-20 Pages</SelectItem>
                          <SelectItem value="20+">20+ Pages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-sm font-semibold text-slate-700">
                        Preferred Timeline
                      </Label>
                      <Select onValueChange={(value) => form.setValue("timeline", value)} defaultValue="normal">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal (4-6 weeks)</SelectItem>
                          <SelectItem value="fast">Fast Track (2-3 weeks)</SelectItem>
                          <SelectItem value="rush">Rush (Under 10 days)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectComplexity" className="text-sm font-semibold text-slate-700">
                        Overall Project Complexity
                      </Label>
                      <Select onValueChange={(value) => form.setValue("projectComplexity", value)} defaultValue="simple">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple (Basic website)</SelectItem>
                          <SelectItem value="moderate">Moderate (Standard features)</SelectItem>
                          <SelectItem value="complex">Complex (E-commerce or advanced features)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (Custom solutions)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technology Requirements */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <CheckSquare className="mr-3 text-indigo-600" size={24} />
                    Technology & Project Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CheckboxGroup
                      title="Front-End Technologies"
                      options={[
                        { value: "HTML5", label: "HTML5" },
                        { value: "CSS3", label: "CSS3" },
                        { value: "JavaScript", label: "JavaScript" },
                        { value: "React", label: "React" },
                        { value: "Angular", label: "Angular" },
                        { value: "Vue", label: "Vue" },
                      ]}
                      value={form.watch("frontendTech")}
                      onChange={(value) => form.setValue("frontendTech", value)}
                    />

                    <CheckboxGroup
                      title="Back-End Technologies"
                      options={[
                        { value: "Node.js", label: "Node.js" },
                        { value: "Django", label: "Django" },
                        { value: "Laravel", label: "Laravel" },
                        { value: "Spring Boot", label: "Spring Boot" },
                      ]}
                      value={form.watch("backendTech")}
                      onChange={(value) => form.setValue("backendTech", value)}
                    />

                    <CheckboxGroup
                      title="Preferred Database"
                      options={[
                        { value: "MySQL", label: "MySQL" },
                        { value: "PostgreSQL", label: "PostgreSQL" },
                        { value: "MongoDB", label: "MongoDB" },
                      ]}
                      value={form.watch("database")}
                      onChange={(value) => form.setValue("database", value)}
                    />

                    <CheckboxGroup
                      title="Hosting Platform"
                      options={[
                        { value: "AWS", label: "AWS" },
                        { value: "DigitalOcean", label: "DigitalOcean" },
                        { value: "Vercel", label: "Vercel" },
                        { value: "Heroku", label: "Heroku" },
                      ]}
                      value={form.watch("hosting")}
                      onChange={(value) => form.setValue("hosting", value)}
                    />

                    <CheckboxGroup
                      title="Development Tools"
                      options={[
                        { value: "GitHub", label: "GitHub" },
                        { value: "Figma", label: "Figma" },
                        { value: "Slack", label: "Slack" },
                        { value: "Docker", label: "Docker" },
                      ]}
                      value={form.watch("devTools")}
                      onChange={(value) => form.setValue("devTools", value)}
                    />

                    <CheckboxGroup
                      title="Devices Supported"
                      options={[
                        { value: "Desktop", label: "Desktop" },
                        { value: "Tablet", label: "Tablet" },
                        { value: "Mobile", label: "Mobile" },
                      ]}
                      value={form.watch("devices")}
                      onChange={(value) => form.setValue("devices", value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Design Requirements */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <Palette className="mr-3 text-indigo-600" size={24} />
                    Design Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="designType" className="text-sm font-semibold text-slate-700">
                        Design Type
                      </Label>
                      <Select onValueChange={(value) => form.setValue("designType", value)} defaultValue="template">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template">Template Based</SelectItem>
                          <SelectItem value="custom">Custom Design</SelectItem>
                          <SelectItem value="premium">Premium Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="brandGuidelines" className="text-sm font-semibold text-slate-700">
                        Brand Guidelines Available?
                      </Label>
                      <Select onValueChange={(value) => form.setValue("brandGuidelines", value)} defaultValue="no">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="logoDesign" className="text-sm font-semibold text-slate-700">
                        Logo Design Needed?
                      </Label>
                      <Select onValueChange={(value) => form.setValue("logoDesign", value)} defaultValue="no">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="designRevisions" className="text-sm font-semibold text-slate-700">
                        Design Revisions
                      </Label>
                      <Select onValueChange={(value) => form.setValue("designRevisions", value)} defaultValue="5">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Up to 5 revisions</SelectItem>
                          <SelectItem value="unlimited">Unlimited revisions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features Selection */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <CheckSquare className="mr-3 text-indigo-600" size={24} />
                    Features & Functionality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800 text-lg mb-4">Basic Features</h3>
                      {[
                        { value: "userAuth", label: "User Authentication/Login" },
                        { value: "contact", label: "Contact Forms" },
                        { value: "search", label: "Search Functionality" },
                        { value: "booking", label: "Booking/Appointment System" },
                        { value: "chatbot", label: "Chatbot Integration" },
                      ].map((feature) => (
                        <div key={feature.value} className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                          <Checkbox
                            id={feature.value}
                            checked={form.watch("features").includes(feature.value)}
                            onCheckedChange={(checked) => {
                              const currentFeatures = form.watch("features");
                              if (checked) {
                                form.setValue("features", [...currentFeatures, feature.value]);
                              } else {
                                form.setValue("features", currentFeatures.filter(f => f !== feature.value));
                              }
                            }}
                          />
                          <Label htmlFor={feature.value} className="text-sm font-medium cursor-pointer">
                            {feature.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800 text-lg mb-4">Advanced Features</h3>
                      {[
                        { value: "ecommerce", label: "E-commerce (Cart, Payment)" },
                        { value: "cms", label: "Content Management System" },
                        { value: "blog", label: "Blog/News System" },
                        { value: "multilingual", label: "Multilingual Support" },
                        { value: "analytics", label: "Google Analytics Integration" },
                      ].map((feature) => (
                        <div key={feature.value} className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                          <Checkbox
                            id={feature.value}
                            checked={form.watch("features").includes(feature.value)}
                            onCheckedChange={(checked) => {
                              const currentFeatures = form.watch("features");
                              if (checked) {
                                form.setValue("features", [...currentFeatures, feature.value]);
                              } else {
                                form.setValue("features", currentFeatures.filter(f => f !== feature.value));
                              }
                            }}
                          />
                          <Label htmlFor={feature.value} className="text-sm font-medium cursor-pointer">
                            {feature.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800 text-lg mb-4">Optimization & Security</h3>
                      {[
                        { value: "seo", label: "SEO Optimization" },
                        { value: "accessibility", label: "Accessibility Compliance" },
                        { value: "security", label: "Enhanced Security Features" },
                      ].map((feature) => (
                        <div key={feature.value} className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                          <Checkbox
                            id={feature.value}
                            checked={form.watch("features").includes(feature.value)}
                            onCheckedChange={(checked) => {
                              const currentFeatures = form.watch("features");
                              if (checked) {
                                form.setValue("features", [...currentFeatures, feature.value]);
                              } else {
                                form.setValue("features", currentFeatures.filter(f => f !== feature.value));
                              }
                            }}
                          />
                          <Label htmlFor={feature.value} className="text-sm font-medium cursor-pointer">
                            {feature.label}
                          </Label>
                        </div>
                      ))}
                      
                      <h4 className="font-semibold text-slate-700 mt-4 mb-2">Performance</h4>
                      {[
                        { value: "basicPerf", label: "Basic Performance Optimization" },
                        { value: "advancedPerf", label: "Advanced Performance (Core Web Vitals)" },
                      ].map((feature) => (
                        <div key={feature.value} className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                          <Checkbox
                            id={feature.value}
                            checked={form.watch("performance").includes(feature.value)}
                            onCheckedChange={(checked) => {
                              const currentPerf = form.watch("performance");
                              if (checked) {
                                form.setValue("performance", [...currentPerf, feature.value]);
                              } else {
                                form.setValue("performance", currentPerf.filter(f => f !== feature.value));
                              }
                            }}
                          />
                          <Label htmlFor={feature.value} className="text-sm font-medium cursor-pointer">
                            {feature.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card className="bg-slate-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <Wrench className="mr-3 text-indigo-600" size={24} />
                    Additional Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { value: "backup", label: "Automated Backup Setup" },
                      { value: "hosting", label: "Hosting Setup Required" },
                      { value: "domainSetup", label: "Domain Setup" },
                      { value: "migration", label: "Content Migration" },
                      { value: "training", label: "CMS Training" },
                      { value: "maintenance", label: "Monthly Maintenance" },
                    ].map((service) => (
                      <div key={service.value} className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                        <Checkbox
                          id={service.value}
                          checked={form.watch("additional").includes(service.value)}
                          onCheckedChange={(checked) => {
                            const currentAdditional = form.watch("additional");
                            if (checked) {
                              form.setValue("additional", [...currentAdditional, service.value]);
                            } else {
                              form.setValue("additional", currentAdditional.filter(f => f !== service.value));
                            }
                          }}
                        />
                        <Label htmlFor={service.value} className="text-sm font-medium cursor-pointer">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Google Drive Integration */}
              <Card className="bg-slate-50 border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <Save className="mr-3 text-green-600" size={24} />
                    Google Drive Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg border ${isGoogleDriveConnected ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isGoogleDriveConnected ? (
                          <Check className="text-green-600" size={20} />
                        ) : (
                          <Save className="text-yellow-600" size={20} />
                        )}
                        <span className={`text-sm font-medium ${isGoogleDriveConnected ? 'text-green-800' : 'text-yellow-800'}`}>
                          {isGoogleDriveConnected ? 'Connected to Google Drive' : 'Connect to Google Drive to save quotation data automatically'}
                        </span>
                      </div>
                      
                      {!isGoogleDriveConnected && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGoogleDriveConnect}
                          disabled={isConnecting}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Connect Google Drive
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t-2 border-slate-200">
                <Button
                  type="submit"
                  disabled={createQuotationMutation.isPending}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {createQuotationMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Quotation
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="px-8 py-4 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Form
                </Button>
              </div>
            </form>

            {/* Results Section */}
            {quotationResult && (
              <Card className="mt-8 bg-slate-50 border-2 border-indigo-500">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <CardTitle className="text-3xl text-slate-800 flex items-center">
                      <FileText className="mr-3 text-indigo-600" size={32} />
                      Quotation Results
                    </CardTitle>
                    <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => window.print()}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={handleExportCSV}
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      
                      {isGoogleDriveConnected && (
                        <Button
                          variant="outline"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={handleSaveToGoogleDrive}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save to Drive
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Client Information */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-indigo-500">
                      Client Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Client:</strong> {form.watch("clientName") || 'N/A'}</div>
                      <div><strong>Company:</strong> {form.watch("companyName") || 'N/A'}</div>
                      <div><strong>Email:</strong> {form.watch("email") || 'N/A'}</div>
                      <div><strong>Phone:</strong> {form.watch("phone") || 'N/A'}</div>
                      <div><strong>Project:</strong> {form.watch("projectTitle") || 'N/A'}</div>
                      <div><strong>Budget:</strong> {form.watch("budgetRange") || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Project Summary */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-indigo-500">
                      Project Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Type:</strong> {form.watch("projectType") || 'N/A'}</div>
                      <div><strong>Pages:</strong> {form.watch("numberOfPages") || 'N/A'}</div>
                      <div><strong>Timeline:</strong> {form.watch("timeline") || 'N/A'}</div>
                      <div><strong>Complexity:</strong> {form.watch("projectComplexity") || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-indigo-500">
                      Cost Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-indigo-600 text-white">
                            <th className="px-4 py-3 text-left">Item</th>
                            <th className="px-4 py-3 text-right">Hours</th>
                            <th className="px-4 py-3 text-right">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quotationResult.breakdown.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-slate-50">
                              <td className="px-4 py-3">{item.item}</td>
                              <td className="px-4 py-3 text-right">{item.hours}h</td>
                              <td className="px-4 py-3 text-right">₹{item.cost.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Total Summary */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Total Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{quotationResult.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{quotationResult.gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/20">
                        <span>Total:</span>
                        <span>₹{quotationResult.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-indigo-500">
                      Timeline Estimate
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{quotationResult.timeline.hours}h</div>
                        <div className="text-sm text-slate-600">Total Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{quotationResult.timeline.days}</div>
                        <div className="text-sm text-slate-600">Working Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{quotationResult.timeline.weeks}</div>
                        <div className="text-sm text-slate-600">Weeks</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Milestones */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-indigo-500">
                      Payment Milestones
                    </h3>
                    <div className="space-y-3">
                      {quotationResult.milestones.map((milestone, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                          <div>
                            <div className="font-semibold">{milestone.name}</div>
                            <div className="text-sm text-slate-600">{milestone.percentage}% of total</div>
                          </div>
                          <div className="text-lg font-bold text-indigo-600">
                            ₹{milestone.amount.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
