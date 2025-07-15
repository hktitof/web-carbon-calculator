/**
 * =============================================================================
 * Created by Abdellatif Anaflous by the help of AI on 11:33 AM, 24 Apr 2025, the beautiful Thursday
 * =============================================================================
 *
 *
 * =============================================================================
 * CO₂ Footprint Calculator Script (CO-2-Calculator.js - Asset #1641279)
 * =============================================================================
 *
 * Purpose:
 * --------
 * This script calculates an estimated CO₂ footprint (in grams) for the current
 * page load based on the active theme ('light' or 'eco'). It then stores this
 * calculated value in a theme-specific browser cookie:
 *  - `co2_light`: Stores the baseline CO₂ for the 'light' theme.
 *  - `co2_eco`:   Stores the CO₂ footprint for the 'eco' theme.
 * These values can be used later to display estimated CO₂ savings.
 *
 * The calculation relies on the CO2.js library (@tgwf/co2) developed by
 * The Green Web Foundation.
 *
 * How it Works:
 * -------------
 * 1.  **Event Trigger:** Waits for the `window.load` event.
 * 2.  **Theme Check:** Determines the active theme ('light' or 'eco') from the 'theme' cookie.
 * 3.  **Library Check & Instantiation:** Checks if the global `co2` object (from the
 *     IIFE build of CO2.js) and its constructor `co2.co2` are available. If so,
 *     instantiates the calculator (`new co2.co2()`).
 * 4.  **Byte Estimation:** Uses the `Performance API` to estimate the total bytes
 *     transferred for the current page load.
 * 5.  **CO₂ Calculation:** If bytes > 0, calls `emissions.perByte(totalBytes, false)`
 *     to get the estimated CO₂ in grams.
 * 6.  **Conditional Cookie Storage:**
 *     - If the active theme is 'light', the calculated CO₂ value is stored in the
 *       `co2_light` cookie.
 *     - If the active theme is 'eco', the calculated CO₂ value is stored in the
 *       `co2_eco` cookie.
 *     - Cookies are set to expire in 30 days and overwrite previous values for
 *       the respective cookie name.
 * 7.  **Initialization:** This script sets the `co2_light` or `co2_eco` cookie
 *     whenever a page loads with the corresponding theme active.
 *
 * Dependencies:
 * -------------
 * - **`CO-2.js` (Asset #1641280):** IIFE build of CO2.js (provides global `co2` object). MUST load before this script.
 * - **`Cookie-definition-creation.js` (Asset #1641313):** Provides global `getCookie()` & `setCookie()`. MUST load before this script.
 * - **Browser `Performance API`:** Required for byte estimation.
 * - **`theme` Cookie:** Expected to be 'light' or 'eco'.
 *
 * =============================================================================
 */

// --- NO MORE getCookie/setCookie definitions here ---
// Rely on the globally defined ones from Cookie-definition-creation.js #1641313

// --- Core Logic: Update co2_light or co2_eco based on theme ---

function performCo2Calculation() {
    console.log("Attempting performCo2Calculation on window.load...");

    // Determine the effective theme value using the cookie directly
    let theme = getCookie("theme");
    if (theme !== 'light' && theme !== 'eco') {
        console.warn(`Calculator: Invalid or missing theme cookie ('${theme}'). Defaulting to 'light' for this check.`);
        theme = "light"; // Default to light if invalid or missing
    }

    console.log("Calculator: Effective theme determined for this page:", theme);

    // Proceed only if a theme is identified (light or eco)
    // Check if the CO2.js library loaded using the CORRECT global variable 'co2'
    if (typeof co2 !== "undefined" && typeof co2.co2 === "function") {
        console.log("Calculator: 'co2' library object found.");
        try {
            // Instantiate the library
            const emissions = new co2.co2(); // Uses SWD model by default
            console.log("Calculator: new co2.co2() instantiated.");

            // Estimate bytes transferred (Common logic for both themes)
            let totalBytes = 0;
            let resources = [];
            let navEntry = null;

            if (window.performance && typeof window.performance.getEntriesByType === "function") {
                resources = window.performance.getEntriesByType("resource");
                navEntry = window.performance.getEntriesByType("navigation")[0];

                console.log(`Calculator: Found ${resources.length} resource entries.`);
                resources.forEach((resource, index) => {
                    let size = resource.transferSize || resource.encodedBodySize || 0;
                    totalBytes += size;
                });

                if (navEntry) {
                    let navSize = navEntry.transferSize || navEntry.encodedBodySize || 0;
                    totalBytes += navSize;
                    console.log(`Calculator: Navigation entry size: ${navSize}`);
                } else {
                    console.warn("Calculator: Navigation Timing API L2 entry not found.");
                }

                console.log(`Calculator: Estimated total bytes transferred for page: ${totalBytes}`);

            } else {
                console.warn("Calculator: Performance API not fully supported. Cannot estimate page size.");
                totalBytes = 0; // Ensure it's 0 if API fails
            }

            // Proceed only if bytes were calculated
            if (totalBytes > 0) {
                console.log(`Calculator: Calculating CO2 for ${totalBytes} bytes...`);
                const isGreenHost = false; // Assume not green
                const estimatedCO2 = emissions.perByte(totalBytes, isGreenHost);
                const roundedCO2 = estimatedCO2.toFixed(3); // Calculated CO2 value

                // --- Store in the correct cookie based on the theme ---
                if (theme === "light") {
                    console.log(`Calculator: Calculated Light Mode CO₂: ${roundedCO2} grams.`);
                    const currentCookieVal = getCookie("co2_light");
                    console.log(`Calculator: Value of 'co2_light' cookie BEFORE setting: ${currentCookieVal}`);
                    setCookie("co2_light", roundedCO2.toString(), 30);
                    console.log(`Calculator: setCookie('co2_light', '${roundedCO2.toString()}', 30) called.`);
                    // Optional: Verify after delay
                    // setTimeout(() => { console.log(`Calculator: Value of 'co2_light' cookie AFTER setting: ${getCookie("co2_light")}`); }, 100);
                } else if (theme === "eco") {
                    console.log(`Calculator: Calculated Eco Mode CO₂: ${roundedCO2} grams.`);
                    const currentCookieVal = getCookie("co2_eco"); // Check the correct cookie
                    console.log(`Calculator: Value of 'co2_eco' cookie BEFORE setting: ${currentCookieVal}`);
                    setCookie("co2_eco", roundedCO2.toString(), 30); // Set the correct cookie
                    console.log(`Calculator: setCookie('co2_eco', '${roundedCO2.toString()}', 30) called.`);
                    // Optional: Verify after delay
                    // setTimeout(() => { console.log(`Calculator: Value of 'co2_eco' cookie AFTER setting: ${getCookie("co2_eco")}`); }, 100);
                }
                // -----------------------------------------------------

            } else {
                console.warn(
                    `Calculator: Total bytes estimated as zero for theme '${theme}'. Skipping CO2 calculation and cookie update.`
                );
            }
        } catch (error) {
            console.error(`Calculator: Error during CO2 calculation for theme '${theme}':`, error);
        }
    } else {
        console.error(
            "Calculator: CO2.js library object ('co2') or constructor ('co2.co2') not found. Check script loading order and IIFE build."
        );
    }
}

// Add event listener to run the calculation after the page is fully loaded
if (!window.co2CalculationInitialized) {
     window.addEventListener('load', performCo2Calculation);
     window.co2CalculationInitialized = true;
     console.log("Calculator: window.load event listener added.");
}

// --- End Core Logic ---