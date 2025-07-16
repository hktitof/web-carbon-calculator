// this isn't actually deprecated, ide just whining
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_PERFORMANCE_DATA') {
        const resources = performance.getEntriesByType("resource").map(e => e.toJSON());

        sendResponse({ payload: resources });
    }

    // this is very important to not get errors, no clue why
    return true;
});

console.log("Web Carbon Calculator content script loaded and listening.");