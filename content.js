class CarbonCalculator {
  constructor() {
    this.emissions = new co2.co2({ model: "swd" });
    this.CAR_EMISSIONS_GPM = 0.143; // grams per meter
    this.isCalculating = false;

    this.init();
  }

  init() {
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "calculateEmissions") {
        this.calculatePageEmissions()
          .then(result => {
            sendResponse(result);
          })
          .catch(error => {
            sendResponse({ success: false, error: error.message });
          });
        return true; // Keep message channel open for async response
      }
    });

    // Check if auto-calculate is enabled
    this.checkAutoCalculate();
  }

  async checkAutoCalculate() {
    try {
      const result = await chrome.storage.local.get(["autoCalculate"]);
      const autoCalculate = result.autoCalculate !== false; // Default to true

      if (autoCalculate) {
        // Wait for page to fully load
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => this.autoCalculateEmissions(), 3000);
          });
        } else {
          setTimeout(() => this.autoCalculateEmissions(), 3000);
        }
      }
    } catch (error) {
      console.error("Error checking auto-calculate setting:", error);
    }
  }

  async autoCalculateEmissions() {
    try {
      const data = await this.calculatePageEmissions();

      if (data.success) {
        // Send to background script to update badge
        chrome.runtime.sendMessage({
          action: "updateBadge",
          data: data.data,
        });
      }
    } catch (error) {
      console.error("Auto-calculate error:", error);
    }
  }

  async calculatePageEmissions() {
    if (this.isCalculating) {
      return { success: false, error: "Calculation already in progress" };
    }

    this.isCalculating = true;

    try {
      // Check if performance API is available
      if (!window.performance || !performance.getEntriesByType) {
        throw new Error("Performance API not supported");
      }

      let totalBytes = 0;

      // Get navigation entry (main document)
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        totalBytes += navEntry.transferSize || 0;
      }

      // Get resource entries (CSS, JS, images, etc.)
      const resources = performance.getEntriesByType("resource");
      resources.forEach(resource => {
        if (resource.transferSize) {
          totalBytes += resource.transferSize;
        }
      });

      // If no transfer size data available, estimate based on encoded body size
      if (totalBytes === 0) {
        if (navigationEntries.length > 0) {
          totalBytes += navigationEntries[0].encodedBodySize || 0;
        }
        resources.forEach(resource => {
          if (resource.encodedBodySize) {
            totalBytes += resource.encodedBodySize;
          }
        });
      }

      // Calculate metrics
      const totalKB = (totalBytes / 1024).toFixed(2);
      const greenHost = await this.checkGreenHosting();
      const estimatedCO2 = this.emissions.perByte(totalBytes, greenHost).toFixed(3);
      const drivingDistance = (estimatedCO2 / this.CAR_EMISSIONS_GPM).toFixed(2);

      const result = {
        success: true,
        data: {
          totalBytes,
          totalKB,
          estimatedCO2,
          drivingDistance,
          greenHost,
          url: window.location.href,
          timestamp: Date.now(),
        },
      };

      return result;
    } catch (error) {
      console.error("Error calculating emissions:", error);
      return {
        success: false,
        error: error.message,
      };
    } finally {
      this.isCalculating = false;
    }
  }

  async checkGreenHosting() {
    try {
      const hostname = window.location.hostname;

      // Simple check - in a real implementation, you'd use the Green Web Foundation API
      // For now, return false as default
      return false;
    } catch (error) {
      console.error("Error checking green hosting:", error);
      return false;
    }
  }

  // Helper method to format bytes
  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Method to get detailed breakdown
  getDetailedBreakdown() {
    const resources = performance.getEntriesByType("resource");
    const breakdown = {
      images: 0,
      scripts: 0,
      stylesheets: 0,
      fonts: 0,
      other: 0,
    };

    resources.forEach(resource => {
      const size = resource.transferSize || 0;
      const type = this.getResourceType(resource);
      breakdown[type] += size;
    });

    return breakdown;
  }

  getResourceType(resource) {
    const url = resource.name.toLowerCase();

    if (url.includes(".js") || resource.initiatorType === "script") {
      return "scripts";
    } else if (url.includes(".css") || resource.initiatorType === "css") {
      return "stylesheets";
    } else if (
      url.includes(".png") ||
      url.includes(".jpg") ||
      url.includes(".jpeg") ||
      url.includes(".gif") ||
      url.includes(".svg") ||
      url.includes(".webp") ||
      resource.initiatorType === "img"
    ) {
      return "images";
    } else if (
      url.includes(".woff") ||
      url.includes(".woff2") ||
      url.includes(".ttf") ||
      url.includes(".otf") ||
      url.includes(".eot")
    ) {
      return "fonts";
    } else {
      return "other";
    }
  }
}

// Initialize the calculator when script loads
const calculator = new CarbonCalculator();
