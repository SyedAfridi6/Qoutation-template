export interface QuotationBreakdown {
  item: string;
  hours: number;
  cost: number;
}

export interface QuotationResult {
  subtotal: number;
  gst: number;
  total: number;
  totalHours: number;
  breakdown: QuotationBreakdown[];
  timeline: {
    hours: number;
    days: number;
    weeks: number;
  };
  milestones: {
    name: string;
    percentage: number;
    amount: number;
  }[];
}

export class QuotationCalculator {
  private static readonly HOURLY_RATES = {
    junior: 350,
    mid: 800,
    senior: 1350,
    specialist: 1250,
    designer: 1000,
    pm: 1200,
    qa: 600,
  };

  private static readonly BASE_COSTS = {
    template: { hours: 24, role: "designer", cost: 11500 },
    custom: { hours: 40, role: "designer", cost: 30000 },
    premium: { hours: 60, role: "designer", cost: 45000 },
    branding: { hours: 16, role: "designer", cost: 14000 },
    logo: { hours: 12, role: "designer", cost: 12000 },
    revisions_5: { hours: 8, role: "designer", cost: 5000 },
    revisions_unlimited: { hours: 20, role: "designer", cost: 15000 },
    accessibility: { hours: 14, role: "specialist", cost: 11500 },
    userAuth: { hours: 10, role: "mid", cost: 8000 },
    contact: { hours: 4, role: "junior", cost: 1400 },
    search: { hours: 6, role: "mid", cost: 4800 },
    booking: { hours: 8, role: "mid", cost: 6400 },
    chatbot: { hours: 6, role: "mid", cost: 4800 },
    ecommerce: { hours: 20, role: "senior", cost: 27000 },
    cms: { hours: 12, role: "mid", cost: 9600 },
    blog: { hours: 6, role: "junior", cost: 2100 },
    multilingual: { hours: 12, role: "senior", cost: 16200 },
    analytics: { hours: 3, role: "junior", cost: 1050 },
    seo: { hours: 6, role: "specialist", cost: 7500 },
    basicPerf: { hours: 10, role: "senior", cost: 8000 },
    advancedPerf: { hours: 30, role: "senior", cost: 25000 },
    security: { hours: 15, role: "senior", cost: 12000 },
    backup: { hours: 6, role: "mid", cost: 5000 },
    hosting: { hours: 8, role: "senior", cost: 30000 },
    domainSetup: { hours: 2, role: "junior", cost: 2000 },
    migration: { hours: 20, role: "mid", cost: 15000 },
    training: { hours: 12, role: "mid", cost: 8000 },
    maintenance: { hours: 16, role: "mid", cost: 15000 },
  };

  private static readonly PROJECT_TYPE_MULTIPLIERS = {
    informational: 1,
    ecommerce: 1.5,
    booking: 1.3,
    membership: 1.4,
    dashboard: 1.6,
    portfolio: 0.8,
    webapp: 1.8,
  };

  private static readonly PAGE_MULTIPLIERS = {
    "1-5": 1,
    "6-10": 1.2,
    "11-20": 1.4,
    "20+": 1.8,
  };

  private static readonly TIMELINE_MULTIPLIERS = {
    normal: 1,
    fast: 1.25,
    rush: 1.5,
  };

  static calculate(formData: any): QuotationResult {
    let baseCost = 40000;
    let totalHours = 40;
    const breakdown: QuotationBreakdown[] = [];
    
    // Project type multiplier
    const projectMultiplier = this.PROJECT_TYPE_MULTIPLIERS[formData.projectType as keyof typeof this.PROJECT_TYPE_MULTIPLIERS] || 1;
    baseCost *= projectMultiplier;
    
    // Page count multiplier
    const pageMultiplier = this.PAGE_MULTIPLIERS[formData.numberOfPages as keyof typeof this.PAGE_MULTIPLIERS] || 1;
    baseCost *= pageMultiplier;
    
    // Timeline multiplier
    const timelineMultiplier = this.TIMELINE_MULTIPLIERS[formData.timeline as keyof typeof this.TIMELINE_MULTIPLIERS] || 1;
    baseCost *= timelineMultiplier;
    
    breakdown.push({
      item: 'Base Project Cost',
      hours: 40,
      cost: baseCost
    });
    
    // Add design costs
    const designCost = this.BASE_COSTS[formData.designType as keyof typeof this.BASE_COSTS] || this.BASE_COSTS.template;
    baseCost += designCost.cost;
    totalHours += designCost.hours;
    breakdown.push({
      item: `Design (${formData.designType})`,
      hours: designCost.hours,
      cost: designCost.cost
    });
    
    // Add logo design if needed
    if (formData.logoDesign === 'yes') {
      const logoCost = this.BASE_COSTS.logo;
      baseCost += logoCost.cost;
      totalHours += logoCost.hours;
      breakdown.push({
        item: 'Logo Design',
        hours: logoCost.hours,
        cost: logoCost.cost
      });
    }
    
    // Add revision costs
    const revisionKey = formData.designRevisions === 'unlimited' ? 'revisions_unlimited' : 'revisions_5';
    const revisionCost = this.BASE_COSTS[revisionKey];
    baseCost += revisionCost.cost;
    totalHours += revisionCost.hours;
    breakdown.push({
      item: `Design Revisions (${formData.designRevisions})`,
      hours: revisionCost.hours,
      cost: revisionCost.cost
    });
    
    // Add features
    if (formData.features && Array.isArray(formData.features)) {
      formData.features.forEach((feature: string) => {
        const featureCost = this.BASE_COSTS[feature as keyof typeof this.BASE_COSTS];
        if (featureCost) {
          baseCost += featureCost.cost;
          totalHours += featureCost.hours;
          breakdown.push({
            item: this.getFeatureName(feature),
            hours: featureCost.hours,
            cost: featureCost.cost
          });
        }
      });
    }
    
    // Add performance features
    if (formData.performance && Array.isArray(formData.performance)) {
      formData.performance.forEach((perf: string) => {
        const perfCost = this.BASE_COSTS[perf as keyof typeof this.BASE_COSTS];
        if (perfCost) {
          baseCost += perfCost.cost;
          totalHours += perfCost.hours;
          breakdown.push({
            item: this.getPerformanceName(perf),
            hours: perfCost.hours,
            cost: perfCost.cost
          });
        }
      });
    }
    
    // Add additional services
    if (formData.additional && Array.isArray(formData.additional)) {
      formData.additional.forEach((service: string) => {
        const serviceCost = this.BASE_COSTS[service as keyof typeof this.BASE_COSTS];
        if (serviceCost) {
          baseCost += serviceCost.cost;
          totalHours += serviceCost.hours;
          breakdown.push({
            item: this.getServiceName(service),
            hours: serviceCost.hours,
            cost: serviceCost.cost
          });
        }
      });
    }
    
    // Calculate taxes
    const subtotal = Math.round(baseCost);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    
    return {
      subtotal,
      gst,
      total,
      totalHours,
      breakdown,
      timeline: this.calculateTimeline(totalHours),
      milestones: this.calculateMilestones(total)
    };
  }

  private static calculateTimeline(hours: number) {
    const workingHoursPerDay = 8;
    const workingDaysPerWeek = 5;
    const totalDays = Math.ceil(hours / workingHoursPerDay);
    const totalWeeks = Math.ceil(totalDays / workingDaysPerWeek);
    
    return {
      hours,
      days: totalDays,
      weeks: totalWeeks
    };
  }

  private static calculateMilestones(total: number) {
    return [
      { name: 'Project Start', percentage: 25, amount: Math.round(total * 0.25) },
      { name: 'Design Approval', percentage: 25, amount: Math.round(total * 0.25) },
      { name: 'Development Complete', percentage: 25, amount: Math.round(total * 0.25) },
      { name: 'Project Delivery', percentage: 25, amount: Math.round(total * 0.25) }
    ];
  }

  private static getFeatureName(feature: string): string {
    const featureNames: { [key: string]: string } = {
      userAuth: 'User Authentication/Login',
      contact: 'Contact Forms',
      search: 'Search Functionality',
      booking: 'Booking/Appointment System',
      chatbot: 'Chatbot Integration',
      ecommerce: 'E-commerce (Cart, Payment)',
      cms: 'Content Management System',
      blog: 'Blog/News System',
      multilingual: 'Multilingual Support',
      analytics: 'Google Analytics Integration',
      seo: 'SEO Optimization',
      accessibility: 'Accessibility Compliance',
      security: 'Enhanced Security Features'
    };
    return featureNames[feature] || feature;
  }

  private static getPerformanceName(perf: string): string {
    const perfNames: { [key: string]: string } = {
      basicPerf: 'Basic Performance Optimization',
      advancedPerf: 'Advanced Performance (Core Web Vitals)'
    };
    return perfNames[perf] || perf;
  }

  private static getServiceName(service: string): string {
    const serviceNames: { [key: string]: string } = {
      backup: 'Automated Backup Setup',
      hosting: 'Hosting Setup Required',
      domainSetup: 'Domain Setup',
      migration: 'Content Migration',
      training: 'CMS Training',
      maintenance: 'Monthly Maintenance'
    };
    return serviceNames[service] || service;
  }
}
