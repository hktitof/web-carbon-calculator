import tgwf from "https://cdn.skypack.dev/@tgwf/co2";

function main() {
    const swd = new tgwf.co2({ model: "swd" });

    let requests = chrome.webRequest.onCompleted(request => {
        console.log(request.fromCache)
    });

    const emissions = swd.perVisit();

    console.log(requests);
}

main();