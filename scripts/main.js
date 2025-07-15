import tgwf from "https://esm.sh/@tgwf/co2";

// using the Sustainable Web Design Model for calculations
const emissions = new tgwf.co2({ model: "swd"});

const localStorageKey = 'ecoDismissedData';
// todo: 10 minute for testing, to change this
const MAX_AGE_MS = 10 * (60 * (1000)); // 10 minutes
const CAR_EMISSIONS_GPM = 0.143

function calculatePageEmissions() {
    if (!window.performance || !performance.getEntriesByType) {
    // todo: handle error properly
        console.log("⚠️ Your browser does not support the CO₂ calculator.");
        return;
    }

    if (!emissions) {
    // todo: handle error properly
        console.log("⚠️ Oops! Something went wrong with the CO₂ calculator.");
        return;
    }

    // get resources loaded
    const resources = performance.getEntriesByType("resource");
    let totalBytes = 0;

    // get transfer size
    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0) {
        totalBytes += navigationEntries[0].transferSize;
    }

    resources.forEach(resource => {
        if (resource.transferSize) {
            totalBytes += resource.transferSize;
        }
    });

    const totalKB = (totalBytes / 1024).toFixed(2);
    const greenHost = false;
    const estimatedCO2 = emissions.perByte(totalBytes, greenHost).toFixed(3);
    const drivingDistance = (estimatedCO2 / CAR_EMISSIONS_GPM).toFixed(2);

    console.log(`This page downloaded ${totalKB} KB (${totalBytes} bytes)`);
    console.log(`Estimated emissions: ${estimatedCO2} grams of CO2`);

    updateToast(totalKB, estimatedCO2, drivingDistance);
}

function updateToast(totalKB, estimatedCO2, drivingDistance) {
    const toastBody = document.querySelector(".toast-body");
    if (toastBody) {
        let container = document.createElement("div");
        container.classList.add("toast-body-response");
        
            let pageSizeLine = document.createElement("p");

            let kb = document.createElement("strong");
            kb.textContent = `${totalKB} KB`;

            pageSizeLine.appendChild(document.createTextNode("This page downloaded "));
            pageSizeLine.append(kb);
            pageSizeLine.appendChild(document.createTextNode("."));
        
        
            let emissionsLine = document.createElement("p");
            emissionsLine.appendChild(document.createTextNode("Estimated emissions for this page: "));

            let co2 = document.createElement("strong");
            co2.textContent = `${estimatedCO2} g CO`;
            let sub = document.createElement("sub");
            sub.textContent = "2";
            co2.appendChild(sub);
            emissionsLine.appendChild(co2);
            
            emissionsLine.appendChild(document.createTextNode("."));
        
        
            let carComparisonLine = document.createElement("p");

            carComparisonLine.appendChild(document.createTextNode("That's like driving a petrol car for "));

            let metres = document.createElement("strong");
            metres.textContent = `${drivingDistance} metres`;
            carComparisonLine.appendChild(metres);

            carComparisonLine.appendChild(document.createTextNode(" just to load this page. 🚗"));
        
        container.append(pageSizeLine, emissionsLine, carComparisonLine);
        toastBody.append(container)

        // display toast
        const toast = document.querySelector(".co2-toast");
        toast.hidden = false;
    }
}

// Run after page load (and a delay for complete resource capture)
window.addEventListener("load", () => {
    localStorage.removeItem(localStorageKey);

    const closeBtn = document.getElementById("co2ToastClose");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            const data = {
                timestamp: Date.now()
            };
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        });
    }

    if (shouldRunEmissionsScript()) {
        setTimeout(calculatePageEmissions, 5000);
    }
});

function shouldRunEmissionsScript() {
    const saved = localStorage.getItem(localStorageKey);
    if (!saved) return true; // No record → go ahead and run

    try {
        const parsed = JSON.parse(saved);
        const lastClosedTime = parsed.timestamp;

        // If less than MAX_AGE_MS has passed, don't run
        if (Date.now() - lastClosedTime < MAX_AGE_MS) {
            return false;
        }

        // Otherwise, clear and allow running again
        localStorage.removeItem(localStorageKey);
        return true;

    } catch (e) {
        // In case of corrupted data, reset and run
        localStorage.removeItem(localStorageKey);
        return true;
    }
}