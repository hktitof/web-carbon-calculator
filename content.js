class CarbonCalculator {
    constructor() {
        this.emissions = new co2.co2({ model: "swd" });
        this.CAR_EMISSIONS_GPM = 0.143; // grams per meter
        this.isCalculating = false;
        
        this.init();
    }

    init() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'calculateEmissions') {
                this.calculatePageEmissions().then(result => {
                    sendResponse(result);
                }).catch(error => {
                    sendResponse({ success: false, error: error.message });
                });
                return true; // Keep message channel open for async response
            }
        });

        this.checkAutoCalculate();
    }

    async checkAutoCalculate() {
        try {
            const result = await chrome.storage.local.get(['autoCalculate']);
            const autoCalculate = result.autoCalculate !== false;
            
            if (autoCalculate) {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        setTimeout(() => this.autoCalculateEmissions(), 3000);
                    });
                } else {
                    setTimeout(() => this.autoCalculateEmissions(), 3000);
                }
            }
        } catch (error) {
            console.error('Error checking auto-calculate setting:', error);
        }
    }

    async autoCalculateEmissions() {
        try {
            const data = await this.calculatePageEmissions();
            
            if (data.success) {
                chrome.runtime.sendMessage({
                    action: 'updateBadge',
                    data: data.data
                });
            }
        } catch (error) {
            console.error('Auto-calculate error:', error);
        }
    }

    async calculatePageEmissions() {
        if (this.isCalculating) {
            return { success: false, error: 'Calculation already in progress' };
        }
        this.isCalculating = true;
        try {
            if (!window.performance || !performance.getEntriesByType) {
                throw new Error('Performance API not supported');
            }
            let totalBytes = 0;
            const navigationEntries = performance.getEntriesByType("navigation");
            if (navigationEntries.length > 0) {
                totalBytes += navigationEntries[0].transferSize || 0;
            }
            const resources = performance.getEntriesByType("resource");
            resources.forEach(resource => {
                if (resource.transferSize) {
                    totalBytes += resource.transferSize;
                }
            });

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
                    timestamp: Date.now()
                }
            };
            return result;
        } catch (error) {
            console.error('Error calculating emissions:', error);
            return { success: false, error: error.message };
        } finally {
            this.isCalculating = false;
        }
    }

    // --- THIS FUNCTION IS NOW FIXED ---
    async checkGreenHosting() {
        try {
            const hostname = window.location.hostname;
            // The fix is to remove the extra ".check"
            return await co2.hosting(hostname);
        } catch (error) {
            console.error('Error checking green hosting:', error);
            return false;
        }
    }
}

// Initialize the calculator when script loads
const calculator = new CarbonCalculator();