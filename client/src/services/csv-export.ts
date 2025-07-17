export class CSVExportService {
  static exportQuotationAsCSV(formData: any) {
    const headers = [
      'Client Name', 'Company Name', 'Email Address', 'Phone Number', 'Project Title',
      'Budget Range', 'Project Goal', 'Project Type', 'Target Audience', 'Number of Pages',
      'Preferred Timeline', 'Overall Project Complexity', 'Front-End Technologies',
      'Back-End Technologies', 'Preferred Database', 'Hosting Platform', 'Development Tools',
      'Devices Supported', 'Design Type', 'Brand Guidelines Available?', 'Logo Design Needed?',
      'Design Revisions', 'User Authentication/Login', 'Contact Forms', 'Search Functionality',
      'Booking/Appointment System', 'Chatbot Integration', 'E-commerce (Cart, Payment)',
      'Content Management System', 'Blog/News System', 'Multilingual Support',
      'Google Analytics Integration', 'SEO Optimization', 'Accessibility Compliance',
      'Basic Performance Optimization', 'Advanced Performance (Core Web Vitals)',
      'Enhanced Security Features', 'Automated Backup Setup', 'Hosting Setup Required',
      'Complex API Integration Required', 'GDPR/PII Compliance Needed', 'Scope Requirements Unclear',
      'Multiple Payment Gateways', 'Legacy System Integration', 'Static Pages (5+ pages)',
      'Role-Based Access Control', 'Product Management System', 'Shopping Cart & Checkout',
      'Order Tracking System', 'Invoice/PDF Generation', 'Inventory Management',
      'Push Notifications', 'Social Media Integration', 'Data Encryption & GDPR',
      'Advanced Responsive Design', 'Third-party Integrations', 'Data Management Complexity',
      'Domain Setup', 'Content Migration', 'CMS Training', 'Monthly Maintenance',
      'Email Marketing Setup', 'CRM Integration', 'Subtotal', 'GST', 'Total', 'Total Hours', 'Created At'
    ];

    const rowData = this.formatRowData(formData);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      rowData.map(cell => `"${cell}"`).join(',')
    ].join('\n');

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quotation_${formData.clientName || 'client'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private static formatRowData(formData: any): string[] {
    const features = formData.features || [];
    const performance = formData.performance || [];
    const additional = formData.additional || [];

    const row = [
      formData.clientName || '',
      formData.companyName || '',
      formData.email || '',
      formData.phone || '',
      formData.projectTitle || '',
      formData.budgetRange || '',
      formData.projectGoals || '',
      formData.projectType || '',
      formData.targetAudience || '',
      formData.numberOfPages || '',
      formData.timeline || '',
      formData.projectComplexity || '',
      (formData.frontendTech || []).join(', '),
      (formData.backendTech || []).join(', '),
      (formData.database || []).join(', '),
      (formData.hosting || []).join(', '),
      (formData.devTools || []).join(', '),
      (formData.devices || []).join(', '),
      formData.designType || '',
      formData.brandGuidelines || '',
      formData.logoDesign || '',
      formData.designRevisions || '',
      
      // Individual feature flags
      features.includes('userAuth') ? 'Yes' : 'No',
      features.includes('contact') ? 'Yes' : 'No',
      features.includes('search') ? 'Yes' : 'No',
      features.includes('booking') ? 'Yes' : 'No',
      features.includes('chatbot') ? 'Yes' : 'No',
      features.includes('ecommerce') ? 'Yes' : 'No',
      features.includes('cms') ? 'Yes' : 'No',
      features.includes('blog') ? 'Yes' : 'No',
      features.includes('multilingual') ? 'Yes' : 'No',
      features.includes('analytics') ? 'Yes' : 'No',
      features.includes('seo') ? 'Yes' : 'No',
      features.includes('accessibility') ? 'Yes' : 'No',
      
      // Performance features
      performance.includes('basicPerf') ? 'Yes' : 'No',
      performance.includes('advancedPerf') ? 'Yes' : 'No',
      performance.includes('security') ? 'Yes' : 'No',
      
      // Additional services
      additional.includes('backup') ? 'Yes' : 'No',
      additional.includes('hosting') ? 'Yes' : 'No',
      additional.includes('apiIntegration') ? 'Yes' : 'No',
      additional.includes('gdprCompliance') ? 'Yes' : 'No',
      additional.includes('scopeUncertainty') ? 'Yes' : 'No',
      additional.includes('multiGateway') ? 'Yes' : 'No',
      additional.includes('legacyIntegration') ? 'Yes' : 'No',
      additional.includes('staticPages') ? 'Yes' : 'No',
      additional.includes('roleAccess') ? 'Yes' : 'No',
      additional.includes('productManagement') ? 'Yes' : 'No',
      additional.includes('shoppingCart') ? 'Yes' : 'No',
      additional.includes('orderTracking') ? 'Yes' : 'No',
      additional.includes('invoiceGeneration') ? 'Yes' : 'No',
      additional.includes('inventoryManagement') ? 'Yes' : 'No',
      additional.includes('pushNotifications') ? 'Yes' : 'No',
      additional.includes('socialMedia') ? 'Yes' : 'No',
      additional.includes('dataEncryption') ? 'Yes' : 'No',
      additional.includes('responsiveDesign') ? 'Yes' : 'No',
      additional.includes('thirdPartyIntegration') ? 'Yes' : 'No',
      additional.includes('dataManagement') ? 'Yes' : 'No',
      additional.includes('domainSetup') ? 'Yes' : 'No',
      additional.includes('migration') ? 'Yes' : 'No',
      additional.includes('training') ? 'Yes' : 'No',
      additional.includes('maintenance') ? 'Yes' : 'No',
      additional.includes('emailMarketing') ? 'Yes' : 'No',
      additional.includes('crmIntegration') ? 'Yes' : 'No',
      
      // Totals
      formData.subtotal || 0,
      formData.gst || 0,
      formData.total || 0,
      formData.totalHours || 0,
      new Date().toISOString()
    ];
    
    return row.map(cell => String(cell));
  }
}