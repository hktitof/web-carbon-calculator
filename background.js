class BackgroundManager {
  constructor() {
    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      // --- THIS IS THE NEW PART ---
      // We check if the request is for our new green hosting check
      if (request.action === "checkGreenHosting") {
        this.handleGreenHostingCheck(request.hostname)
          .then(isGreen => sendResponse({ success: true, isGreen: isGreen }))
          .catch(error => sendResponse({ success: false, error: error.message }));

        // Return true to indicate we will send a response asynchronously
        return true;
      }
      // --- END OF NEW PART ---

      // This is the old code for handling badge updates
      this.handleMessage(request, sender);
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.url) {
        this.handleTabUpdate(tabId, tab);
      }
    });

    chrome.tabs.onActivated.addListener(activeInfo => {
      this.handleTabActivation(activeInfo.tabId);
    });
  }

  // --- NEW FUNCTION TO HANDLE THE API CALL ---
  async handleGreenHostingCheck(hostname) {
    // This is where the actual API call now lives.
    // We need to import the co2.js script here as well.
    try {
      importScripts("./co2.js");
      const hosting = new co2.hosting();
      return await hosting.check(hostname);
    } catch (e) {
      console.error("Error in background hosting check:", e);
      return false;
    }
  }

  // The rest of the file is mostly the same
  async handleMessage(request, sender) {
    switch (request.action) {
      case "updateBadge":
        if (sender.tab) {
          await this.updateBadge(sender.tab.id, request.data);
        }
        break;
      case "updateShowBadge":
        await this.updateShowBadgeSetting(request.enabled);
        break;
    }
  }

  async handleTabUpdate(tabId, tab) {
    if (this.isValidUrl(tab.url)) {
      await this.clearBadge(tabId);
    }
  }

  async handleTabActivation(tabId) {
    try {
      const key = `emissions_${tabId}`;
      const result = await chrome.storage.local.get([key]);
      if (result[key]) {
        await this.updateBadge(tabId, result[key]);
      } else {
        await this.clearBadge(tabId);
      }
    } catch (error) {
      console.error("Error handling tab activation:", error);
    }
  }

  async updateBadge(tabId, data) {
    try {
      const settings = await chrome.storage.local.get(["showBadge"]);
      if (settings.showBadge !== false) {
        const co2Value = parseFloat(data.estimatedCO2);
        let badgeText = "";
        if (co2Value > 0 && co2Value < 1) {
          badgeText = co2Value.toFixed(2).slice(1) + "g";
        } else if (co2Value >= 1 && co2Value < 10) {
          badgeText = co2Value.toFixed(1) + "g";
        } else if (co2Value >= 10 && co2Value < 1000) {
          badgeText = Math.round(co2Value) + "g";
        } else if (co2Value >= 1000) {
          badgeText = "999+";
        }
        await chrome.action.setBadgeText({ tabId: tabId, text: badgeText });
        await chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: "#fbbf24" });
      }
    } catch (error) {
      console.error("Error updating badge:", error);
    }
  }

  async clearBadge(tabId) {
    try {
      await chrome.action.setBadgeText({ tabId: tabId, text: "" });
    } catch (error) {}
  }

  async updateShowBadgeSetting(enabled) {
    if (!enabled) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await this.clearBadge(tab.id);
      }
    }
  }

  isValidUrl(url) {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  }
}

new BackgroundManager();
