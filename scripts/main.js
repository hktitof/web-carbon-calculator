import tgwf from "https://cdn.skypack.dev/@tgwf/co2";

// using the Sustainable Web Design Model for calculations
const emissions = new tgwf.co2({ model: "swd"});

const localStorageKey = 'ecoDismissedData';
// todo: 10 minute for testing, to change this
const MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes

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
    const drivingDistance = (estimatedCO2 / 0.12).toFixed(2);

    console.log(`This page downloaded ${totalKB} KB (${totalBytes} bytes)`);
    console.log(`Estimated emissions: ${estimatedCO2} grams of CO2`);

    const message = `
<div class="toast-body-response">
<!--<p>This page downloaded <strong>${totalKB} KB</strong></p>-->
<p>Estimated emissions for this page: <strong>${estimatedCO2} g CO₂</strong>.</p>
<p>That's like driving a petrol car for <strong>${drivingDistance} meters</strong> just to load this page. 🚗</p>
<p><strong>Switching to Eco-Friendly Mode</strong> could reduce CO₂ emissions by up to <strong>70%</strong>!🌿</p>
</div>
`;
    updateToast(message);
}

function updateToast(html) {

    const toastBody = document.querySelector(".toast-body");
    if (toastBody) {
        toastBody.innerHTML = html;
    }
}

// Run after page load (and a delay for complete resource capture)
window.addEventListener("load", () => {

    const closeBtn = document.getElementById("co2ToastClose");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            const data = {
                timestamp: Date.now()
            };
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        });
    }

// below to remove to run and uncomment code after
    localStorage.removeItem(localStorageKey);



    if (shouldRunEmissionsScript()) {
// display toast
        const toast = document.querySelector(".co2-toast");
        toast.classList.add("show");
        setTimeout(calculatePageEmissions, 8000);
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

// !TODO: window.performance