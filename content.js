class CarbonCalculator {
  constructor() {
    this.emissions = new co2.co2({ model: "swd" });
    this.CAR_EMISSIONS_GPM = 0.143;
    this.isCalculating = false;
    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "calculateEmissions") {
        this.calculatePageEmissions()
          .then(result => {
            sendResponse(result);
          })
          .catch(error => {
            sendResponse({ success: false, error: error.message });
          });
        return true;
      }
    });
    this.checkAutoCalculate();
  }

  async checkAutoCalculate() {
    try {
      const result = await chrome.storage.local.get(["autoCalculate"]);
      if (result.autoCalculate !== false) {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => setTimeout(() => this.autoCalculateEmissions(), 3000));
        } else {
          setTimeout(() => this.autoCalculateEmissions(), 3000);
        }
      }
    } catch (e) {
      console.error("Error checking auto-calculate setting:", e);
    }
  }

  async autoCalculateEmissions() {
    try {
      const data = await this.calculatePageEmissions();
      if (data.success) {
        chrome.runtime.sendMessage({
          action: "updateBadge",
          data: data.data,
        });
      }
    } catch (e) {
      console.error("Auto-calculate error:", e);
    }
  }

  async calculatePageEmissions() {
    if (this.isCalculating) {
      return { success: false, error: "Calculation in progress" };
    }
    this.isCalculating = true;
    try {
      let totalBytes = 0;
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        totalBytes += navigationEntries[0].transferSize || 0;
      }
      const resources = performance.getEntriesByType("resource");
      resources.forEach(r => (totalBytes += r.transferSize || 0));

      const totalKB = (totalBytes / 1024).toFixed(2);

      // This now sends a message instead of calling the API directly
      const greenHost = await this.checkGreenHosting();

      const estimatedCO2 = this.emissions.perByte(totalBytes, greenHost).toFixed(3);
      const drivingDistance = (estimatedCO2 / this.CAR_EMISSIONS_GPM).toFixed(2);

      return {
        success: true,
        data: {
          totalKB,
          estimatedCO2,
          drivingDistance,
          greenHost,
        },
      };
    } catch (e) {
      console.error("Error calculating emissions:", e);
      return { success: false, error: e.message };
    } finally {
      this.isCalculating = false;
    }
  }

  // --- THIS IS THE FIXED FUNCTION ---
  async checkGreenHosting() {
    try {
      const hostname = window.location.hostname;
      // Send a message to the background script and wait for the response
      const response = await chrome.runtime.sendMessage({
        action: "checkGreenHosting",
        hostname: hostname,
      });

      if (response.success) {
        return response.isGreen; // Return the answer from the background script
      } else {
        console.error("Green hosting check failed:", response.error);
        return false; // Default to false if there was an error
      }
    } catch (error) {
      console.error("Error sending message to background script:", error);
      // This will catch the "Receiving end does not exist" error
      return false;
    }
  }
}

new CarbonCalculator();
