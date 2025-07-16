class BackgroundManager {
  constructor() {
    this.init();
  }

  init() {
    // Listen for messages from content script and popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      // Return true if you want to send a response asynchronously. This is not needed here.
    });

    // Handle tab updates (e.g., when a page reloads)
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.url) {
        this.handleTabUpdate(tabId, tab);
      }
    });

    // Handle tab activation (e.g., when you switch tabs)
    chrome.tabs.onActivated.addListener(activeInfo => {
      this.handleTabActivation(activeInfo.tabId);
    });
  }

  // This function decides what to do based on the message received
  async handleMessage(request, sender) {
    switch (request.action) {
      case "updateBadge":
        // The content script has new data, so we update the badge
        if (sender.tab) {
          await this.updateBadge(sender.tab.id, request.data);
        }
        break;

      case "updateShowBadge":
        // The user changed the "Show Badge" setting in the popup
        await this.updateShowBadgeSetting(request.enabled);
        break;

      default:
      // We ignore messages we don't know about
      // console.warn('Unknown message action:', request.action);
    }
  }

  // When a tab is reloaded or navigated, clear its old badge
  async handleTabUpdate(tabId, tab) {
    if (this.isValidUrl(tab.url)) {
      await this.clearBadge(tabId);
    }
  }

  // THIS IS THE PART WE'RE FINISHING
  // When the user clicks on a different tab, show the data for THAT tab
  async handleTabActivation(tabId) {
    try {
      // Check if we have saved data for this tab
      const key = `emissions_${tabId}`;
      const result = await chrome.storage.local.get([key]);

      if (result[key]) {
        // If we have data, update the badge with it
        await this.updateBadge(tabId, result[key]);
      } else {
        // If there's no data, clear the badge
        await this.clearBadge(tabId);
      }
    } catch (error) {
      console.error("Error handling tab activation:", error);
    }
  }

  // The main function to set the badge text on the icon
  async updateBadge(tabId, data) {
    try {
      const settings = await chrome.storage.local.get(["showBadge"]);
      // Only show the badge if the setting is true (or not set yet)
      if (settings.showBadge !== false) {
        // ---- START OF NEW LOGIC ----

        const co2Value = parseFloat(data.estimatedCO2);
        let badgeText = "";

        if (co2Value > 0 && co2Value < 1) {
          // Format as .XXg (e.g., .98g)
          // .slice(1) removes the leading "0" from "0.98"
          badgeText = co2Value.toFixed(2).slice(1) + "g";
        } else if (co2Value >= 1 && co2Value < 10) {
          // Format as X.Xg (e.g., 1.0g or 7.2g)
          badgeText = co2Value.toFixed(1) + "g";
        } else if (co2Value >= 10 && co2Value < 1000) {
          // Format as XXg (e.g., 15g or 150g)
          badgeText = Math.round(co2Value) + "g";
        } else if (co2Value >= 1000) {
          // Handle very large numbers
          badgeText = "999+";
        }
        // If it's 0, text remains empty ''

        // ---- END OF NEW LOGIC ----

        // Set the text
        await chrome.action.setBadgeText({
          tabId: tabId,
          text: badgeText,
        });

        // Set the color of the badge
        await chrome.action.setBadgeBackgroundColor({
          tabId: tabId,
          color: "#fbbf24", // A nice amber color
        });
      }
    } catch (error) {
      console.error("Error updating badge:", error);
    }
  }

  // Function to clear the badge text
  async clearBadge(tabId) {
    try {
      await chrome.action.setBadgeText({ tabId: tabId, text: "" });
    } catch (error) {
      // This can fail if the tab is closed, which is fine.
    }
  }

  // Function to update the setting for showing the badge
  async updateShowBadgeSetting(enabled) {
    // If the user turned badges off, we need to clear the current one.
    if (!enabled) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await this.clearBadge(tab.id);
      }
    }
  }

  // Helper to make sure we don't run on chrome:// pages
  isValidUrl(url) {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  }
}

// Initialize the background manager
new BackgroundManager();
