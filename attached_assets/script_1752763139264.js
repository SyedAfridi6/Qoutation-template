// Updated 2025 Indian Market Pricing
const HOURLY_RATES = {
  junior: 350, // ₹300-400 average
  mid: 800, // ₹700-900 average
  senior: 1350, // ₹1200-1500 average
  specialist: 1250, // ₹1000-1500 average
  designer: 1000,
  pm: 1200,
  qa: 600,
}

// Updated Base Costs with detailed time tracking (2025 rates)
const BASE_COSTS = {
  // Design costs with time tracking
  template: { hours: 24, role: "designer", cost: 11500 },
  custom: { hours: 40, role: "designer", cost: 30000 },
  premium: { hours: 60, role: "designer", cost: 45000 },

  // Branding with time tracking
  branding: { hours: 16, role: "designer", cost: 14000 },
  logo: { hours: 12, role: "designer", cost: 12000 },

  // Revisions with time tracking
  revisions_5: { hours: 8, role: "designer", cost: 5000 },
  revisions_unlimited: { hours: 20, role: "designer", cost: 15000 },

  // Accessibility & Interactive with time tracking
  accessibility: { hours: 14, role: "specialist", cost: 11500 },
  interactivePrototype: { hours: 12, role: "designer", cost: 9000 },

  // Detailed Features with specific hours and roles
  staticPages: { hours: 10, role: "junior", cost: 3500 },
  adminPanel: { hours: 15, role: "mid", cost: 12000 },
  roleBasedAccess: { hours: 10, role: "senior", cost: 13500 },
  wordpressCMS: { hours: 8, role: "junior", cost: 2800 },
  customCMS: { hours: 15, role: "mid", cost: 12000 },
  userAuth: { hours: 10, role: "mid", cost: 8000 },
  paymentGateway: { hours: 12, role: "senior", cost: 16200 },
  productManagement: { hours: 15, role: "senior", cost: 20250 },
  shoppingCart: { hours: 12, role: "senior", cost: 16200 },
  orderTracking: { hours: 10, role: "mid", cost: 8000 },
  invoiceGeneration: { hours: 6, role: "mid", cost: 4800 },
  crmIntegration: { hours: 15, role: "senior", cost: 20250 },
  blog: { hours: 6, role: "junior", cost: 2100 },
  booking: { hours: 8, role: "mid", cost: 6400 },
  pushNotifications: { hours: 5, role: "mid", cost: 4000 },
  newsletter: { hours: 4, role: "junior", cost: 1400 },
  chatbot: { hours: 6, role: "mid", cost: 4800 },
  analytics: { hours: 3, role: "junior", cost: 1050 },
  socialMediaLinks: { hours: 3, role: "junior", cost: 1050 },
  encryptionGDPR: { hours: 8, role: "senior", cost: 10800 },
  inventoryManagement: { hours: 10, role: "mid", cost: 8000 },
  seo: { hours: 6, role: "specialist", cost: 7500 },
  multilingual: { hours: 12, role: "senior", cost: 16200 },
  apiIntegrationMultiple: { hours: 10, role: "senior", cost: 13500 },
  responsiveTuning: { hours: 8, role: "mid", cost: 6400 },
  hostingDomainSetup: { hours: 4, role: "junior", cost: 1400 },

  // Legacy feature support
  contact: { hours: 4, role: "junior", cost: 1400 },
  search: { hours: 6, role: "mid", cost: 4800 },
  ecommerce: { hours: 20, role: "senior", cost: 27000 },
  cms: { hours: 12, role: "mid", cost: 9600 },

  // Content with time tracking
  contentCreation: { hours: 20, role: "specialist", cost: 15000 },
  stockPhotography: { hours: 8, role: "designer", cost: 8000 },

  // Performance & Security with time tracking
  basicPerf: { hours: 10, role: "senior", cost: 8000 },
  advancedPerf: { hours: 30, role: "senior", cost: 25000 },
  security: { hours: 15, role: "senior", cost: 12000 },
  backup: { hours: 6, role: "mid", cost: 5000 },
  hosting: { hours: 8, role: "senior", cost: 30000 },

  // Additional services with time tracking
  domainSetup: { hours: 2, role: "junior", cost: 2000 },
  migration: { hours: 20, role: "mid", cost: 15000 },
  training: { hours: 12, role: "mid", cost: 8000 },
  maintenance: { hours: 16, role: "mid", cost: 15000 },
  emailMarketing: { hours: 8, role: "mid", cost: 5500 },

  // Risk Buffers (no time tracking - buffer costs)
  apiIntegrationRisk: 20000,
  gdprComplianceRisk: 15000,
  scopeUncertaintyRisk: 10000,
  multiGatewayRisk: 7500,
  legacyIntegrationRisk: 18000,
}

// Technology stack time estimates
const TECH_TIME_ESTIMATES = {
  // Frontend Technologies (hours per technology)
  'HTML5': { hours: 8, role: "junior" },
  'CSS3': { hours: 12, role: "junior" },
  'JavaScript': { hours: 16, role: "mid" },
  'React': { hours: 24, role: "mid" },
  'Angular': { hours: 28, role: "mid" },
  'Vue': { hours: 24, role: "mid" },
  
  // Backend Technologies
  'Node.js': { hours: 20, role: "mid" },
  'Django': { hours: 24, role: "senior" },
  'Laravel': { hours: 22, role: "mid" },
  'Spring Boot': { hours: 28, role: "senior" },
  
  // Databases
  'MySQL': { hours: 8, role: "mid" },
  'PostgreSQL': { hours: 10, role: "mid" },
  'MongoDB': { hours: 12, role: "mid" },
  
  // Hosting Platforms
  'AWS': { hours: 12, role: "senior" },
  'DigitalOcean': { hours: 8, role: "mid" },
  'Vercel': { hours: 4, role: "junior" },
  'Heroku': { hours: 6, role: "mid" },
  
  // Development Tools
  'GitHub': { hours: 4, role: "junior" },
  'Figma': { hours: 6, role: "designer" },
  'Slack': { hours: 2, role: "junior" },
  'Postman': { hours: 4, role: "mid" },
  'Docker': { hours: 16, role: "senior" }
}

// Project complexity base hours
const PROJECT_BASE_HOURS = {
  'informational': 80,
  'ecommerce': 160,
  'booking': 120,
  'membership': 140,
  'dashboard': 180,
  'portfolio': 60,
  'webapp': 200
}

// Page count additional hours
const PAGE_HOURS = {
  '1-5': 0,
  '6-10': 16,
  '11-20': 32,
  '20+': 64
}

// Timeline multipliers for hours
const TIMELINE_HOUR_ADJUSTMENTS = {
  'normal': 1.0,
  'fast': 0.8, // Less detailed work
  'rush': 0.6  // Minimal viable product
}

// Target Audience Complexity Multipliers
const AUDIENCE_COMPLEXITY = {
  b2b: { multiplier: 1.1, buffer: 4500 },
  b2c: { multiplier: 1.2, buffer: 7500 },
  internal: { multiplier: 1.0, buffer: 3000 },
  international: { multiplier: 1.4, buffer: 15000 },
}

// Project Complexity Multipliers
const PROJECT_COMPLEXITY = {
  simple: { multiplier: 0.8, buffer: 5000 },
  moderate: { multiplier: 1.0, buffer: 8000 },
  complex: { multiplier: 1.3, buffer: 15000 },
  enterprise: { multiplier: 1.6, buffer: 25000 },
}

// Integration Complexity
const INTEGRATION_COMPLEXITY = {
  none: { multiplier: 1.0, buffer: 0 },
  basic: { multiplier: 1.1, buffer: 5000 },
  moderate: { multiplier: 1.2, buffer: 10000 },
  complex: { multiplier: 1.4, buffer: 20000 },
}

// Data Complexity
const DATA_COMPLEXITY = {
  simple: { multiplier: 1.0, buffer: 2000 },
  moderate: { multiplier: 1.1, buffer: 5000 },
  complex: { multiplier: 1.3, buffer: 12000 },
  enterprise: { multiplier: 1.5, buffer: 20000 },
}

const PAGE_MULTIPLIERS = {
  "1-5": 1,
  "6-10": 1.2,
  "11-20": 1.4,
  "20+": 1.8,
}

const TIMELINE_MULTIPLIERS = {
  normal: 1,
  fast: 1.25,
  rush: 1.5,
}

const PROJECT_TYPE_MULTIPLIERS = {
  informational: 1,
  ecommerce: 1.5,
  booking: 1.3,
  membership: 1.4,
  dashboard: 1.6,
  portfolio: 0.8,
  webapp: 1.8,
}

// Initialize event listeners when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Handle technology group toggles
  document.querySelectorAll('.checkbox-head input[type="checkbox"]').forEach((headCb) => {
    headCb.addEventListener("change", function () {
      const group = this.closest(".form-group")
      if (!group) return
      group.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach((cb) => {
        cb.disabled = !this.checked
        if (!this.checked) cb.checked = false
      })
    })
    // initial trigger to set the correct state on page load
    headCb.dispatchEvent(new Event("change"))
  })

  // Initialize calculator
  new QuotationCalculator()
})

class QuotationCalculator {
  constructor() {
    this.form = document.getElementById("quotationForm")
    this.resultSection = document.getElementById("quotationResult")
    this.initializeEventListeners()
  }

  initializeEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.calculateQuotation()
    })

    this.form.addEventListener("reset", () => {
      this.resultSection.style.display = "none"
    })

    document.getElementById("downloadPdf").addEventListener("click", () => {
      this.downloadPDF()
    })

    document.getElementById("exportExcel").addEventListener("click", () => {
      this.exportToExcel()
    })
  }

  calculateQuotation() {
    const formData = new FormData(this.form)
    const data = this.processFormData(formData)

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<div class="loading"></div> Calculating...'
    submitBtn.disabled = true

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const quotation = this.performCalculation(data)
      this.displayResults(data, quotation)

      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      // Scroll to results
      this.resultSection.scrollIntoView({ behavior: "smooth" })
    }, 1500)
  }

  processFormData(formData) {
    const data = {}

    // Process regular form fields
    for (const [key, value] of formData.entries()) {
      if (
        key === "features" ||
        key === "performance" ||
        key === "additional" ||
        key === "detailedFeatures" ||
        key === "risks" ||
        key === "frontendTech" ||
        key === "backendTech" ||
        key === "database" ||
        key === "hosting" ||
        key === "devTools" ||
        key === "devices"
      ) {
        if (!data[key]) data[key] = []
        data[key].push(value)
      } else {
        data[key] = value
      }
    }

    return data
  }

  // Enhanced calculation method with detailed timeline tracking
  performCalculation(data) {
    let baseCost = 40000 // Updated base project cost for 2025
    const phases = []
    let riskBuffer = 0
    let complexityBuffer = 0
    let totalHours = 0
    const timelineDetails = {
      phases: [],
      technologies: [],
      features: [],
      totalDays: 0,
      totalWeeks: 0,
      dailyHours: 8
    }

    // Ensure all values are numbers and not NaN
    const safeMultiply = (base, multiplier) => {
      const baseNum = parseFloat(base) || 0
      const multNum = parseFloat(multiplier) || 1
      return baseNum * multNum
    }

    const safeAdd = (base, addition) => {
      const baseNum = parseFloat(base) || 0
      const addNum = parseFloat(addition) || 0
      return baseNum + addNum
    }

    // Calculate base project hours based on type
    let baseHours = PROJECT_BASE_HOURS[data.projectType] || 80
    
    // Add page complexity hours
    baseHours += PAGE_HOURS[data.numberOfPages] || 0
    
    // Apply timeline adjustment
    const timelineAdjustment = TIMELINE_HOUR_ADJUSTMENTS[data.timeline] || 1.0
    baseHours *= timelineAdjustment
    
    totalHours += baseHours

    // Project type multiplier
    const projectMultiplier = PROJECT_TYPE_MULTIPLIERS[data.projectType] || 1
    baseCost = safeMultiply(baseCost, projectMultiplier)

    // Page count multiplier
    const pageMultiplier = PAGE_MULTIPLIERS[data.numberOfPages] || 1
    baseCost = safeMultiply(baseCost, pageMultiplier)

    // Timeline multiplier
    const timelineMultiplier = TIMELINE_MULTIPLIERS[data.timeline] || 1
    baseCost = safeMultiply(baseCost, timelineMultiplier)

    // Audience complexity
    const audienceComplexity = AUDIENCE_COMPLEXITY[data.targetAudience] || AUDIENCE_COMPLEXITY["b2c"]
    baseCost = safeMultiply(baseCost, audienceComplexity.multiplier)
    complexityBuffer = safeAdd(complexityBuffer, audienceComplexity.buffer)

    // Project complexity assessment
    const projectComplexity = PROJECT_COMPLEXITY[data.projectComplexity] || PROJECT_COMPLEXITY["moderate"]
    baseCost = safeMultiply(baseCost, projectComplexity.multiplier)
    complexityBuffer = safeAdd(complexityBuffer, projectComplexity.buffer)

    // Integration complexity
    const integrationComplexity = INTEGRATION_COMPLEXITY[data.integrationComplexity] || INTEGRATION_COMPLEXITY["none"]
    baseCost = safeMultiply(baseCost, integrationComplexity.multiplier)
    complexityBuffer = safeAdd(complexityBuffer, integrationComplexity.buffer)

    // Data complexity
    const dataComplexity = DATA_COMPLEXITY[data.dataComplexity] || DATA_COMPLEXITY["simple"]
    baseCost = safeMultiply(baseCost, dataComplexity.multiplier)
    complexityBuffer = safeAdd(complexityBuffer, dataComplexity.buffer)

    // Technology stack time calculation
    let techHours = 0
    let techCost = 0
    
    // Frontend technologies
    if (data.frontendTech) {
      data.frontendTech.forEach(tech => {
        if (TECH_TIME_ESTIMATES[tech]) {
          const techData = TECH_TIME_ESTIMATES[tech]
          techHours += techData.hours
          techCost += techData.hours * HOURLY_RATES[techData.role]
          timelineDetails.technologies.push({
            name: tech,
            type: 'Frontend',
            hours: techData.hours,
            role: techData.role,
            cost: techData.hours * HOURLY_RATES[techData.role]
          })
        }
      })
    }
    
    // Backend technologies
    if (data.backendTech) {
      data.backendTech.forEach(tech => {
        if (TECH_TIME_ESTIMATES[tech]) {
          const techData = TECH_TIME_ESTIMATES[tech]
          techHours += techData.hours
          techCost += techData.hours * HOURLY_RATES[techData.role]
          timelineDetails.technologies.push({
            name: tech,
            type: 'Backend',
            hours: techData.hours,
            role: techData.role,
            cost: techData.hours * HOURLY_RATES[techData.role]
          })
        }
      })
    }
    
    // Database technologies
    if (data.database) {
      data.database.forEach(tech => {
        if (TECH_TIME_ESTIMATES[tech]) {
          const techData = TECH_TIME_ESTIMATES[tech]
          techHours += techData.hours
          techCost += techData.hours * HOURLY_RATES[techData.role]
          timelineDetails.technologies.push({
            name: tech,
            type: 'Database',
            hours: techData.hours,
            role: techData.role,
            cost: techData.hours * HOURLY_RATES[techData.role]
          })
        }
      })
    }
    
    // Hosting and tools
    if (data.hosting) {
      data.hosting.forEach(tech => {
        if (TECH_TIME_ESTIMATES[tech]) {
          const techData = TECH_TIME_ESTIMATES[tech]
          techHours += techData.hours
          techCost += techData.hours * HOURLY_RATES[techData.role]
          timelineDetails.technologies.push({
            name: tech,
            type: 'Hosting',
            hours: techData.hours,
            role: techData.role,
            cost: techData.hours * HOURLY_RATES[techData.role]
          })
        }
      })
    }
    
    if (data.devTools) {
      data.devTools.forEach(tech => {
        if (TECH_TIME_ESTIMATES[tech]) {
          const techData = TECH_TIME_ESTIMATES[tech]
          techHours += techData.hours
          techCost += techData.hours * HOURLY_RATES[techData.role]
          timelineDetails.technologies.push({
            name: tech,
            type: 'Development Tools',
            hours: techData.hours,
            role: techData.role,
            cost: techData.hours * HOURLY_RATES[techData.role]
          })
        }
      })
    }
    
    totalHours += techHours

    // Design costs with updated pricing and time tracking
    let designCost = 0
    let designHours = 0
    
    // Base design type
    const designTypeData = BASE_COSTS[data.designType] || BASE_COSTS.template
    designCost = designTypeData.cost
    designHours += designTypeData.hours

    if (data.brandGuidelines === "no") {
      const brandingData = BASE_COSTS.branding
      designCost = safeAdd(designCost, brandingData.cost)
      designHours += brandingData.hours
    }

    if (data.logoDesign === "yes") {
      const logoData = BASE_COSTS.logo
      designCost = safeAdd(designCost, logoData.cost)
      designHours += logoData.hours
    }

    // Accessibility
    if (data.features && data.features.includes("accessibility")) {
      const accessData = BASE_COSTS.accessibility
      designCost = safeAdd(designCost, accessData.cost)
      designHours += accessData.hours
    }

    // Revision costs
    switch (data.designRevisions) {
      case "5":
        const rev5Data = BASE_COSTS.revisions_5
        designCost = safeAdd(designCost, rev5Data.cost)
        designHours += rev5Data.hours
        break
      case "unlimited":
        const revUnlimitedData = BASE_COSTS.revisions_unlimited
        designCost = safeAdd(designCost, revUnlimitedData.cost)
        designHours += revUnlimitedData.hours
        break
    }

    totalHours += designHours
    
    phases.push({
      name: "UI/UX Design & Branding",
      duration: `${Math.ceil(designHours / 8)} days`,
      developer: "Senior Designer",
      hours: designHours,
      rate: HOURLY_RATES.designer,
      cost: designCost,
    })
    
    timelineDetails.phases.push({
      name: "UI/UX Design & Branding",
      hours: designHours,
      days: Math.ceil(designHours / 8),
      role: "Senior Designer"
    })

    // Detailed feature costs using new structure
    let featureCost = 0
    let featureHours = 0

    // Process detailed features
    if (data.detailedFeatures) {
      data.detailedFeatures.forEach((feature) => {
        if (BASE_COSTS[feature]) {
          const featureData = BASE_COSTS[feature]
          featureCost = safeAdd(featureCost, featureData.cost)
          featureHours += featureData.hours

          phases.push({
            name: this.formatFeatureName(feature),
            duration: `${Math.ceil(featureData.hours / 8)} days`,
            developer: this.formatRole(featureData.role),
            hours: featureData.hours,
            rate: HOURLY_RATES[featureData.role],
            cost: featureData.cost,
          })
        }
      })
    }

    // Process main features
    if (data.features) {
      data.features.forEach((feature) => {
        if (BASE_COSTS[feature] && typeof BASE_COSTS[feature] === "object") {
          const featureData = BASE_COSTS[feature]
          featureCost = safeAdd(featureCost, featureData.cost)
          featureHours += featureData.hours

          phases.push({
            name: this.formatFeatureName(feature),
            duration: `${Math.ceil(featureData.hours / 8)} days`,
            developer: this.formatRole(featureData.role),
            hours: featureData.hours,
            rate: HOURLY_RATES[featureData.role],
            cost: featureData.cost,
          })
        }
      })
    }

    // Risk assessment
    if (data.risks) {
      data.risks.forEach((risk) => {
        const riskKey = risk + "Risk"
        if (BASE_COSTS[riskKey]) {
          riskBuffer = safeAdd(riskBuffer, BASE_COSTS[riskKey])
        }
      })
    }

    // Core development phases
    const frontendCost = safeMultiply(baseCost, 0.35)
    phases.push({
      name: "Frontend Development",
      duration: "8-12 days",
      developer: "Mid-level Developer",
      hours: 40,
      rate: HOURLY_RATES.mid,
      cost: frontendCost,
    })

    const backendCost = safeMultiply(baseCost, 0.4)
    phases.push({
      name: "Backend Development",
      duration: "10-15 days",
      developer: "Senior Developer",
      hours: 50,
      rate: HOURLY_RATES.senior,
      cost: backendCost,
    })

    // Performance and security
    let perfCost = 0
    if (data.performance) {
      data.performance.forEach((perf) => {
        if (BASE_COSTS[perf]) {
          perfCost = safeAdd(perfCost, BASE_COSTS[perf])
        }
      })
    }

    if (perfCost > 0) {
      phases.push({
        name: "Performance & Security",
        duration: "3-5 days",
        developer: "Senior Developer",
        hours: 25,
        rate: HOURLY_RATES.senior,
        cost: perfCost,
      })
    }

    // Content costs
    let contentCost = 0
    if (data.contentProvided === "no") {
      contentCost = safeAdd(contentCost, BASE_COSTS.contentCreation)
    }
    if (data.imagesProvided === "no") {
      contentCost = safeAdd(contentCost, BASE_COSTS.stockPhotography)
    }

    // CMS costs
    let cmsCost = 0
    if (data.cmsType === "custom") {
      cmsCost = safeAdd(cmsCost, BASE_COSTS.customCMS)
    } else if (data.cmsType === "wordpress") {
      cmsCost = safeAdd(cmsCost, BASE_COSTS.wordpressCMS)
    }

    if (data.adminDashboard === "yes") {
      cmsCost = safeAdd(cmsCost, BASE_COSTS.adminPanel)
    }

    if (cmsCost > 0) {
      phases.push({
        name: "CMS Development",
        duration: "3-5 days",
        developer: "Mid-level Developer",
        hours: Math.ceil(cmsCost / HOURLY_RATES.mid),
        rate: HOURLY_RATES.mid,
        cost: cmsCost,
      })
    }

    // Testing phase
    const testingCost = safeMultiply(baseCost, 0.15)
    phases.push({
      name: "Testing & Quality Assurance",
      duration: "4-6 days",
      developer: "QA Specialist",
      hours: 30,
      rate: HOURLY_RATES.qa,
      cost: testingCost,
    })

    // Deployment phase
    const deploymentCost = safeMultiply(baseCost, 0.1)
    phases.push({
      name: "Deployment & Launch Support",
      duration: "2-3 days",
      developer: "DevOps Engineer",
      hours: 15,
      rate: HOURLY_RATES.senior,
      cost: deploymentCost,
    })

    // Additional services
    let additionalCost = 0
    if (data.additional) {
      data.additional.forEach((service) => {
        if (BASE_COSTS[service]) {
          additionalCost = safeAdd(additionalCost, BASE_COSTS[service])
        }
      })
    }

    if (additionalCost > 0) {
      phases.push({
        name: "Additional Services",
        duration: "Variable",
        developer: "Various",
        hours: Math.ceil(additionalCost / HOURLY_RATES.mid),
        rate: HOURLY_RATES.mid,
        cost: additionalCost,
      })
    }

    // Calculate totals
    let subtotal = 0
    phases.forEach(phase => {
      subtotal = safeAdd(subtotal, phase.cost)
    })

    // Add content costs to subtotal
    subtotal = safeAdd(subtotal, contentCost)

    // Add buffers
    subtotal = safeAdd(subtotal, riskBuffer)
    subtotal = safeAdd(subtotal, complexityBuffer)

    // Calculate GST (18%)
    const gst = safeMultiply(subtotal, 0.18)
    const totalCost = safeAdd(subtotal, gst)

    // Payment terms
    const advancePayment = safeMultiply(totalCost, 0.4)
    const designPayment = safeMultiply(totalCost, 0.3)
    const finalPayment = safeMultiply(totalCost, 0.3)

    // Calculate detailed timeline
    timelineDetails.totalDays = Math.ceil(totalHours / timelineDetails.dailyHours)
    timelineDetails.totalWeeks = Math.ceil(timelineDetails.totalDays / 5) // 5 working days per week
    
    // Minimum timeline constraints
    timelineDetails.totalWeeks = Math.max(timelineDetails.totalWeeks, 3)
    timelineDetails.totalDays = Math.max(timelineDetails.totalDays, 15)

    return {
      phases,
      subtotal,
      gst,
      totalCost,
      riskBuffer,
      complexityBuffer,
      contentCost,
      advancePayment,
      designPayment,
      finalPayment,
      totalWeeks: timelineDetails.totalWeeks,
      totalHours,
      timelineDetails,
      techCost
    }
  }

  formatFeatureName(feature) {
    const nameMap = {
      staticPages: "Static Pages Development",
      roleBasedAccess: "Role-Based Access Control",
      productManagement: "Product Management System",
      shoppingCart: "Shopping Cart & Checkout",
      orderTracking: "Order Tracking System",
      invoiceGeneration: "Invoice/PDF Generation",
      inventoryManagement: "Inventory Management",
      pushNotifications: "Push Notifications",
      socialMediaLinks: "Social Media Integration",
      encryptionGDPR: "Data Encryption & GDPR",
      responsiveTuning: "Advanced Responsive Design",
      userAuth: "User Authentication System",
      booking: "Booking/Appointment System",
      chatbot: "Chatbot Integration",
      analytics: "Analytics Integration",
      seo: "SEO Optimization",
      multilingual: "Multilingual Support",
      contact: "Contact Forms",
      search: "Search Functionality",
      ecommerce: "E-commerce Features",
      cms: "Content Management System",
      blog: "Blog/News System"
    }
    return nameMap[feature] || feature
  }

  formatRole(role) {
    const roleMap = {
      junior: "Junior Developer",
      mid: "Mid-level Developer", 
      senior: "Senior Developer",
      specialist: "Specialist",
      designer: "Senior Designer",
      qa: "QA Specialist"
    }
    return roleMap[role] || role
  }

  formatCurrency(amount) {
    const num = parseFloat(amount) || 0
    return `₹${num.toLocaleString('en-IN')}`
  }

  displayResults(data, quotation) {
    const resultContent = document.getElementById("resultContent")
    
    resultContent.innerHTML = `
      <div class="client-info-result">
        <h3>Client Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Client Name:</span>
            <span class="info-value">${data.clientName || 'Not provided'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Company:</span>
            <span class="info-value">${data.companyName || 'Not provided'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">${data.email || 'Not provided'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Phone:</span>
            <span class="info-value">${data.phone || 'Not provided'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Project Title:</span>
            <span class="info-value">${data.projectTitle || 'Not provided'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Budget Range:</span>
            <span class="info-value">${data.budgetRange || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <div class="project-summary">
        <h3>Project Summary</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Project Type:</span>
            <span class="info-value">${this.formatProjectType(data.projectType)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Target Audience:</span>
            <span class="info-value">${this.formatTargetAudience(data.targetAudience)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Project Complexity:</span>
            <span class="info-value">${data.projectComplexity || 'moderate'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Integration Complexity:</span>
            <span class="info-value">${data.integrationComplexity || 'basic'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Data Complexity:</span>
            <span class="info-value">${data.dataComplexity || 'simple'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Number of Pages:</span>
            <span class="info-value">${data.numberOfPages || '1-5'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Design Type:</span>
            <span class="info-value">${this.formatDesignType(data.designType)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Timeline:</span>
            <span class="info-value">${this.formatTimeline(data.timeline)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Key Features:</span>
            <span class="info-value">${this.formatFeatures(data.features)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Detailed Features:</span>
            <span class="info-value">${this.formatFeatures(data.detailedFeatures)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Risk Factors:</span>
            <span class="info-value">${this.formatFeatures(data.risks)}</span>
          </div>
        </div>
      </div>

      <div class="detailed-timeline">
        <h3>Detailed Project Timeline</h3>
        <div class="timeline-summary">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Total Hours:</span>
              <span class="info-value">${quotation.totalHours || 0} hours</span>
            </div>
            <div class="info-item">
              <span class="info-label">Total Days:</span>
              <span class="info-value">${quotation.timelineDetails?.totalDays || 0} working days</span>
            </div>
            <div class="info-item">
              <span class="info-label">Total Weeks:</span>
              <span class="info-value">${quotation.totalWeeks || 0} weeks</span>
            </div>
            <div class="info-item">
              <span class="info-label">Daily Hours:</span>
              <span class="info-value">8 hours/day</span>
            </div>
          </div>
        </div>
        
        ${this.generateTechnologyTimeline(quotation.timelineDetails?.technologies || [])}
        ${this.generatePhaseTimeline(quotation.timelineDetails?.phases || [])}
      </div>

      <div class="breakdown-table">
        <h3>Cost Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Phase</th>
              <th>Duration</th>
              <th>Developer Level</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            ${quotation.phases.map(phase => `
              <tr>
                <td>${phase.name}</td>
                <td>${phase.duration}</td>
                <td>${phase.developer}</td>
                <td>${phase.hours}</td>
                <td>${this.formatCurrency(phase.rate)}/hr</td>
                <td class="currency">${this.formatCurrency(phase.cost)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="total-summary">
        <h3>Cost Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span class="currency">${this.formatCurrency(quotation.subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>GST (18%):</span>
          <span class="currency">${this.formatCurrency(quotation.gst)}</span>
        </div>
        <div class="summary-row">
          <span>Risk Buffer:</span>
          <span class="currency">${this.formatCurrency(quotation.riskBuffer)}</span>
        </div>
        <div class="summary-row">
          <span>Complexity Buffer:</span>
          <span class="currency">${this.formatCurrency(quotation.complexityBuffer)}</span>
        </div>
        <div class="summary-row total">
          <span>Total Project Cost:</span>
          <span class="currency">${this.formatCurrency(quotation.totalCost)}</span>
        </div>
      </div>

      <div class="timeline-info">
        <h3>Project Timeline</h3>
        <div class="summary-row">
          <span>Estimated Duration:</span>
          <span>${quotation.totalWeeks} weeks</span>
        </div>
        <div style="margin-top: 15px;">
          <strong>Project Phases:</strong><br>
          Week 1-2: Planning & Design<br>
          Week 3-${Math.max(4, quotation.totalWeeks-1)}: Development<br>
          Week ${quotation.totalWeeks}: Testing & Deployment
        </div>
      </div>

      <div class="payment-breakdown">
        <h3>Payment Terms</h3>
        <div class="payment-milestone">
          <span>Advance Payment (40%):</span>
          <span class="currency">${this.formatCurrency(quotation.advancePayment)}</span>
        </div>
        <div class="payment-milestone">
          <span>Design Approval (30%):</span>
          <span class="currency">${this.formatCurrency(quotation.designPayment)}</span>
        </div>
        <div class="payment-milestone">
          <span>Final Delivery (30%):</span>
          <span class="currency">${this.formatCurrency(quotation.finalPayment)}</span>
        </div>
      </div>
    `

    // Store data for Excel export
    this.lastQuotationData = { data, quotation }
    
    this.resultSection.style.display = "block"
    this.resultSection.classList.add("success-animation")
  }

  formatProjectType(type) {
    const typeMap = {
      informational: "Informational/Business Website",
      ecommerce: "E-Commerce Website", 
      booking: "Booking/Appointment System",
      membership: "Membership/Community Site",
      dashboard: "Internal Tool/Dashboard",
      portfolio: "Portfolio/Blog",
      webapp: "Custom Web Application"
    }
    return typeMap[type] || type || 'Not specified'
  }

  formatTargetAudience(audience) {
    const audienceMap = {
      b2b: "B2B (Business to Business)",
      b2c: "B2C (Business to Consumer)",
      internal: "Internal Use",
      international: "International/Multilingual"
    }
    return audienceMap[audience] || audience || 'Not specified'
  }

  formatDesignType(type) {
    const designMap = {
      template: "Template Based",
      custom: "Custom Design",
      premium: "Premium Custom Design"
    }
    return designMap[type] || type || 'Template Based'
  }

  formatTimeline(timeline) {
    const timelineMap = {
      normal: "Normal (4-6 weeks)",
      fast: "Fast Track (2-3 weeks)",
      rush: "Rush (Under 10 days)"
    }
    return timelineMap[timeline] || timeline || 'Normal (4-6 weeks)'
  }

  formatFeatures(features) {
    if (!features || !Array.isArray(features) || features.length === 0) {
      return 'None selected'
    }
    return features.slice(0, 3).join(', ') + (features.length > 3 ? ` and ${features.length - 3} more` : '')
  }

  downloadPDF() {
    // Simple HTML to PDF conversion using browser's print functionality
    const printWindow = window.open('', '_blank')
    const content = document.getElementById('resultContent').innerHTML
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Project Quotation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h3 { color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f8f9fa; }
          .currency { font-weight: bold; color: #28a745; }
          .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .info-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <h1>Website Development Quotation</h1>
        ${content}
      </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.focus()
    
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  generateTechnologyTimeline(technologies) {
    if (!technologies || technologies.length === 0) return ''
    
    return `
      <div class="tech-timeline">
        <h4>Technology Stack Timeline</h4>
        <div class="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Technology</th>
                <th>Type</th>
                <th>Developer Role</th>
                <th>Hours</th>
                <th>Days</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              ${technologies.map(tech => `
                <tr>
                  <td>${tech.name}</td>
                  <td>${tech.type}</td>
                  <td>${this.formatRole(tech.role)}</td>
                  <td>${tech.hours}</td>
                  <td>${Math.ceil(tech.hours / 8)}</td>
                  <td class="currency">${this.formatCurrency(tech.cost)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  generatePhaseTimeline(phases) {
    if (!phases || phases.length === 0) return ''
    
    return `
      <div class="phase-timeline">
        <h4>Development Phases Timeline</h4>
        <div class="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Developer Role</th>
                <th>Hours</th>
                <th>Days</th>
                <th>Week</th>
              </tr>
            </thead>
            <tbody>
              ${phases.map((phase, index) => `
                <tr>
                  <td>${phase.name}</td>
                  <td>${phase.role}</td>
                  <td>${phase.hours}</td>
                  <td>${phase.days}</td>
                  <td>Week ${Math.floor(index / 2) + 1}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  async exportToExcel() {
    if (!this.lastQuotationData) {
      alert("No quotation data available. Please generate a quotation first.")
      return
    }

    const { data, quotation } = this.lastQuotationData
    
    // Prepare data for server
    const exportData = {
      ...data,
      subtotal: quotation.subtotal,
      gstAmount: quotation.gst,
      totalCost: quotation.total,
      totalHours: quotation.totalHours,
      totalDays: quotation.totalDays,
      totalWeeks: quotation.totalWeeks,
      advancePayment: quotation.advancePayment,
      designPayment: quotation.designPayment,
      finalPayment: quotation.finalPayment
    }
    
    try {
      const response = await fetch('/save_quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData)
      })
      
      const result = await response.json()
      
      if (result.status === 'success') {
        alert('✅ Quotation data saved to Excel file successfully!')
      } else {
        alert('❌ Error saving data: ' + result.message)
      }
    } catch (error) {
      alert('❌ Error saving data: ' + error.message)
    }
  }

  prepareExcelData(data, quotation) {
    const rows = []
    
    // Header row
    rows.push([
      'Section', 'Field', 'Value', 'Hours', 'Days', 'Role', 'Cost', 'Notes'
    ])
    
    // Client Information
    rows.push(['Client Info', 'Client Name', data.clientName || '', '', '', '', '', ''])
    rows.push(['Client Info', 'Company', data.companyName || '', '', '', '', '', ''])
    rows.push(['Client Info', 'Email', data.email || '', '', '', '', '', ''])
    rows.push(['Client Info', 'Phone', data.phone || '', '', '', '', '', ''])
    rows.push(['Client Info', 'Project Title', data.projectTitle || '', '', '', '', '', ''])
    rows.push(['Client Info', 'Budget Range', data.budgetRange || '', '', '', '', '', ''])
    
    // Project Summary
    rows.push(['Project Summary', 'Project Type', data.projectType || '', '', '', '', '', ''])
    rows.push(['Project Summary', 'Target Audience', data.targetAudience || '', '', '', '', '', ''])
    rows.push(['Project Summary', 'Number of Pages', data.numberOfPages || '', '', '', '', '', ''])
    rows.push(['Project Summary', 'Timeline', data.timeline || '', '', '', '', '', ''])
    rows.push(['Project Summary', 'Project Complexity', data.projectComplexity || '', '', '', '', '', ''])
    
    // Technology Stack
    if (quotation.timelineDetails?.technologies) {
      quotation.timelineDetails.technologies.forEach(tech => {
        rows.push([
          'Technology Stack',
          tech.name,
          tech.type,
          tech.hours,
          Math.ceil(tech.hours / 8),
          this.formatRole(tech.role),
          tech.cost,
          `${tech.type} Technology`
        ])
      })
    }
    
    // Development Phases
    if (quotation.phases) {
      quotation.phases.forEach(phase => {
        rows.push([
          'Development Phase',
          phase.name,
          phase.duration,
          phase.hours,
          Math.ceil(phase.hours / 8),
          phase.developer,
          phase.cost,
          'Development Phase'
        ])
      })
    }
    
    // Features
    if (data.features) {
      data.features.forEach(feature => {
        rows.push(['Features', feature, 'Selected', '', '', '', '', 'Main Feature'])
      })
    }
    
    if (data.detailedFeatures) {
      data.detailedFeatures.forEach(feature => {
        rows.push(['Detailed Features', feature, 'Selected', '', '', '', '', 'Detailed Feature'])
      })
    }
    
    // Cost Summary
    rows.push(['Cost Summary', 'Subtotal', '', '', '', '', quotation.subtotal, ''])
    rows.push(['Cost Summary', 'GST (18%)', '', '', '', '', quotation.gst, ''])
    rows.push(['Cost Summary', 'Risk Buffer', '', '', '', '', quotation.riskBuffer, ''])
    rows.push(['Cost Summary', 'Complexity Buffer', '', '', '', '', quotation.complexityBuffer, ''])
    rows.push(['Cost Summary', 'Total Cost', '', '', '', '', quotation.totalCost, ''])
    
    // Payment Terms
    rows.push(['Payment Terms', 'Advance (40%)', '', '', '', '', quotation.advancePayment, ''])
    rows.push(['Payment Terms', 'Design Approval (30%)', '', '', '', '', quotation.designPayment, ''])
    rows.push(['Payment Terms', 'Final Delivery (30%)', '', '', '', '', quotation.finalPayment, ''])
    
    // Timeline Summary
    rows.push(['Timeline Summary', 'Total Hours', quotation.totalHours || 0, '', '', '', '', ''])
    rows.push(['Timeline Summary', 'Total Days', quotation.timelineDetails?.totalDays || 0, '', '', '', '', ''])
    rows.push(['Timeline Summary', 'Total Weeks', quotation.totalWeeks || 0, '', '', '', '', ''])
    
    return rows
  }

  convertToCSV(data) {
    return data.map(row => 
      row.map(field => {
        // Handle fields with commas, quotes, or line breaks
        if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
          return `"${field.replace(/"/g, '""')}"`
        }
        return field
      }).join(',')
    ).join('\n')
  }
}
