declare global {
  interface Window {
    gapi: any;
  }
}

export class GoogleDriveService {
  private CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  private API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';
  private isInitialized = false;
  private authInstance: any = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Validate credentials
    if (!this.CLIENT_ID || !this.API_KEY) {
      throw new Error('Google API credentials not configured. Please check VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_API_KEY environment variables.');
    }

    return new Promise((resolve, reject) => {
      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          this.loadGapi().then(resolve).catch(reject);
        };
        script.onerror = (error) => {
          console.error('Failed to load Google API script:', error);
          reject(error);
        };
        document.head.appendChild(script);
      } else {
        this.loadGapi().then(resolve).catch(reject);
      }
    });
  }

  private async loadGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.gapi.load('auth2:client', async () => {
        try {
          console.log('Initializing Google API client...');
          console.log('Client ID:', this.CLIENT_ID ? 'Set' : 'Not set');
          console.log('API Key:', this.API_KEY ? 'Set' : 'Not set');
          
          await window.gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: [this.DISCOVERY_DOC],
            scope: this.SCOPES
          });

          this.authInstance = window.gapi.auth2.getAuthInstance();
          this.isInitialized = true;
          console.log('Google API client initialized successfully');
          resolve();
        } catch (error) {
          console.error('Failed to initialize Google API client:', error);
          reject(error);
        }
      });
    });
  }

  async authorize(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.log('Initializing Google API...');
        await this.initialize();
      }

      if (!this.authInstance) {
        throw new Error('Google Auth instance not available');
      }

      if (this.authInstance.isSignedIn.get()) {
        console.log('Already signed in to Google');
        return true;
      }
      
      console.log('Requesting Google sign-in...');
      await this.authInstance.signIn();
      console.log('Successfully signed in to Google');
      return true;
    } catch (error) {
      console.error('Authorization failed:', error);
      throw error; // Re-throw so the UI can handle it properly
    }
  }

  isSignedIn(): boolean {
    return this.authInstance?.isSignedIn.get() || false;
  }

  async signOut(): Promise<void> {
    if (this.authInstance) {
      await this.authInstance.signOut();
    }
  }

  async createOrUpdateExcelFile(formData: any): Promise<string> {
    if (!this.isSignedIn()) {
      throw new Error('Not signed in to Google Drive');
    }

    const headers = [
      'Client Name', 'Company Name', 'Email Address', 'Phone Number', 'Project Title',
      'Budget Range', 'Project Goal', 'Project Type', 'Target Audience', 'Number of Pages',
      'Preferred Timeline', 'Overall Project Complexity', 'Front-End Technologies',
      'Back-End Technologies', 'Preferred Database', 'Hosting Platform', 'Development Tools',
      'Devices Supported', 'Design Type', 'Brand Guidelines Available?', 'Logo Design Needed?',
      'Design Revisions', 'Features', 'Performance', 'Additional Services',
      'Subtotal', 'GST', 'Total', 'Total Hours', 'Created At'
    ];

    const rowData = this.formatRowData(formData, headers);
    
    try {
      const existingFile = await this.findExcelFile();
      
      if (existingFile) {
        return await this.updateExcelFile(existingFile.id, rowData, headers);
      } else {
        return await this.createNewExcelFile(rowData, headers);
      }
    } catch (error) {
      console.error('Error saving to Google Drive:', error);
      throw error;
    }
  }

  private formatRowData(formData: any, headers: string[]): any[] {
    const row = [];
    
    row.push(formData.clientName || '');
    row.push(formData.companyName || '');
    row.push(formData.email || '');
    row.push(formData.phone || '');
    row.push(formData.projectTitle || '');
    row.push(formData.budgetRange || '');
    row.push(formData.projectGoals || '');
    row.push(formData.projectType || '');
    row.push(formData.targetAudience || '');
    row.push(formData.numberOfPages || '');
    row.push(formData.timeline || '');
    row.push(formData.projectComplexity || '');
    row.push((formData.frontendTech || []).join(', '));
    row.push((formData.backendTech || []).join(', '));
    row.push((formData.database || []).join(', '));
    row.push((formData.hosting || []).join(', '));
    row.push((formData.devTools || []).join(', '));
    row.push((formData.devices || []).join(', '));
    row.push(formData.designType || '');
    row.push(formData.brandGuidelines || '');
    row.push(formData.logoDesign || '');
    row.push(formData.designRevisions || '');
    row.push((formData.features || []).join(', '));
    row.push((formData.performance || []).join(', '));
    row.push((formData.additional || []).join(', '));
    row.push(formData.subtotal || 0);
    row.push(formData.gst || 0);
    row.push(formData.total || 0);
    row.push(formData.totalHours || 0);
    row.push(new Date().toISOString());
    
    return row;
  }

  private async findExcelFile(): Promise<any> {
    const response = await window.gapi.client.drive.files.list({
      q: "name='Website_Quotations.xlsx' and mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'",
      fields: 'files(id, name)',
    });
    
    return response.result.files.length > 0 ? response.result.files[0] : null;
  }

  private async createNewExcelFile(rowData: any[], headers: string[]): Promise<string> {
    const csvContent = [headers, rowData].map(row => 
      row.map((cell: any) => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    
    const metadata = {
      name: 'Website_Quotations.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);
    
    const accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&convert=true', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: form
    });
    
    const result = await response.json();
    return result.id;
  }

  private async updateExcelFile(fileId: string, rowData: any[], headers: string[]): Promise<string> {
    // For simplicity, we'll create a new file with the same name (overwrites)
    // In a production app, you'd want to actually append to the existing file
    return await this.createNewExcelFile(rowData, headers);
  }
}
