class PopupManager {
  constructor() {
    this.elements = {
      loading: document.getElementById("loading"),
      error: document.getElementById("error"),
      content: document.getElementById("content"),
      websiteUrl: document.getElementById("websiteUrl"),
      pageSize: document.getElementById("pageSize"),
      co2Emissions: document.getElementById("co2Emissions"),
      greenHosting: document.getElementById("greenHosting"),
      drivingDistance: document.getElementById("drivingDistance"),
      calculateBtn: document.getElementById("calculateBtn"),
      detailsBtn: document.getElementById("detailsBtn"),
      autoCalculateToggle: document.getElementById("autoCalculateToggle"),
      showBadgeToggle: document.getElementById("showBadgeToggle"),
    };

    this.init();
  }

  async init() {
    // Load settings
    await this.loadSettings();

    // Setup event listeners
    this.setupEventListeners();

    // Get current tab and load data
    await this.loadCurrentPageData();
  }

  setupEventListeners() {
    // Calculate button
    this.elements.calculateBtn.addEventListener("click", () => {
      this.calculateEmissions();
    });

    // Details button
    this.elements.detailsBtn.addEventListener("click", () => {
      this.showDetails();
    });

    // Auto-calculate toggle
    this.elements.autoCalculateToggle.addEventListener("click", () => {
      this.toggleAutoCalculate();
    });

    // Show badge toggle
    this.elements.showBadgeToggle.addEventListener("click", () => {
      this.toggleShowBadge();
    });
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get(["autoCalculate", "showBadge"]);
      const autoCalculate = result.autoCalculate !== false; // Default to true
      const showBadge = result.showBadge !== false; // Default to true

      this.elements.autoCalculateToggle.classList.toggle("active", autoCalculate);
      this.elements.showBadgeToggle.classList.toggle("active", showBadge);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }

  async loadCurrentPageData() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab) {
        this.showError("Unable to access current tab");
        return;
      }

      // Update URL display
      this.elements.websiteUrl.textContent = new URL(tab.url).hostname;

      // Check if we have cached data
      const result = await chrome.storage.local.get([`emissions_${tab.id}`]);
      const cachedData = result[`emissions_${tab.id}`];

      if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
        // Use cached data if less than 5 minutes old
        this.displayResults(cachedData);
      } else {
        // Request fresh calculation
        this.calculateEmissions();
      }
    } catch (error) {
      console.error("Error loading page data:", error);
      this.showError("Unable to load page data");
    }
  }

  async calculateEmissions() {
    try {
      this.showLoading();

      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab) {
        this.showError("Unable to access current tab");
        return;
      }

      // Send message to content script to calculate emissions
      const response = await chrome.tabs.sendMessage(tab.id, { action: "calculateEmissions" });

      if (response && response.success) {
        this.displayResults(response.data);

        // Cache the results
        await chrome.storage.local.set({
          [`emissions_${tab.id}`]: {
            ...response.data,
            timestamp: Date.now(),
          },
        });
      } else {
        this.showError(response?.error || "Calculation failed");
      }
    } catch (error) {
      console.error("Error calculating emissions:", error);
      this.showError("Unable to calculate emissions");
    }
  }

  displayResults(data) {
    // Hide loading and error states
    this.elements.loading.classList.add("hidden");
    this.elements.error.classList.add("hidden");

    // Show content
    this.elements.content.classList.remove("hidden");

    // Update values
    this.elements.pageSize.textContent = `${data.totalKB} KB`;
    this.elements.co2Emissions.textContent = `${data.estimatedCO2} g`;
    this.elements.greenHosting.textContent = data.greenHost ? "✅ Yes" : "❌ No";
    this.elements.drivingDistance.textContent = data.drivingDistance;

    // Add animation
    this.elements.content.classList.add("fade-in");
  }

  showLoading() {
    this.elements.loading.classList.remove("hidden");
    this.elements.error.classList.add("hidden");
    this.elements.content.classList.add("hidden");
  }

  showError(message) {
    this.elements.loading.classList.add("hidden");
    this.elements.content.classList.add("hidden");
    this.elements.error.classList.remove("hidden");
    this.elements.error.querySelector("p").textContent = message;
  }

  async toggleAutoCalculate() {
    const isActive = this.elements.autoCalculateToggle.classList.toggle("active");

    await chrome.storage.local.set({ autoCalculate: isActive });

    // Send message to background script to update setting
    chrome.runtime.sendMessage({
      action: "updateAutoCalculate",
      enabled: isActive,
    });
  }

  async toggleShowBadge() {
    const isActive = this.elements.showBadgeToggle.classList.toggle("active");

    await chrome.storage.local.set({ showBadge: isActive });

    // Send message to background script to update badge display
    chrome.runtime.sendMessage({
      action: "updateShowBadge",
      enabled: isActive,
    });
  }

  showDetails() {
    // Create a detailed view (could be expanded)
    const detailsWindow = window.open("", "_blank", "width=500,height=600");
    detailsWindow.document.write(`
            <html>
                <head>
                    <title>Carbon Footprint Details</title>
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            margin: 20px;
                            background: #f5f5f5;
                        }
                        .detail-card {
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                            margin-bottom: 20px;
                        }
                        h2 { color: #333; margin-top: 0; }
                        .metric { display: flex; justify-content: space-between; margin: 10px 0; }
                        .value { font-weight: bold; color: #667eea; }
                    </style>
                </head>
                <body>
                    <div class="detail-card">
                        <h2>🌍 Carbon Footprint Analysis</h2>
                        <div class="metric">
                            <span>Page Size:</span>
                            <span class="value">${this.elements.pageSize.textContent}</span>
                        </div>
                        <div class="metric">
                            <span>CO₂ Emissions:</span>
                            <span class="value">${this.elements.co2Emissions.textContent}</span>
                        </div>
                        <div class="metric">
                            <span>Green Hosting:</span>
                            <span class="value">${this.elements.greenHosting.textContent}</span>
                        </div>
                        <div class="metric">
                            <span>Car Equivalent:</span>
                            <span class="value">${this.elements.drivingDistance.textContent} metres</span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <h2>💡 Tips to Reduce Carbon Footprint</h2>
                        <ul>
                            <li>Choose websites with green hosting</li>
                            <li>Use ad blockers to reduce data transfer</li>
                            <li>Close unused tabs</li>
                            <li>Use mobile-optimized sites when possible</li>
                            <li>Clear cache regularly</li>
                        </ul>
                    </div>
                </body>
            </html>
        `);
  }
}

// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PopupManager();
});
