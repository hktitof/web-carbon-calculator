# Web Page Carbon Estimator 🌎

A Chrome extension to estimate the carbon footprint of the current webpage. This is a learning project to explore web sustainability and browser extension development.

### What Is This Thing Anyway

Have you ever wondered how much pollution a website creates just by loading on your screen. This little tool gives you a quick look at the carbon cost for any page you visit. It runs automatically in your browser and shows you the results in a simple popup.

### What Does It Show You

When you click the extension icon you will see a few key things.

#### Page Size
This tells you how much data your computer had to download to show you the website. We measure this in kilobytes KB or megabytes MB and a bigger number means a heavier page.

#### CO₂ Emissions
This is the main event. It shows the estimated grams of carbon dioxide created by the page's data transfer. The number comes from a smart calculation that considers the page size and other factors.

#### Green Hosting
This part asks a simple question does the website's server run on clean energy. You will see a yes or a no. This check is done by asking The Green Web Foundation which keeps a huge list of green web hosts.

#### Driving Equivalent
To make the CO₂ number easier to understand we compare it to something real. This shows you how far you could drive a normal petrol car with the same amount of emissions.

### How Does It Actually Work

The process is pretty simple but clever.

First the extension waits for a page to load in your browser. It gives it a few seconds to make sure all the extra content and ads have finished loading too. Then it uses a built in browser tool to count every single byte of data that was transferred to your computer.

Next it takes the website's address like google.com and asks The Green Web Foundation's API a question. Is this website hosted on a server that uses renewable energy. The API answers with a simple true or false.

Finally it takes the total bytes and the green hosting answer and gives them to a special library called `co2.js`. This library does the final math using a model that knows how much electricity it takes to run data centers and send information over the internet. If the website is green hosted the library lowers the final CO₂ amount because it knows clean energy was used. This gives us the final number you see in the popup.

### How to Use It

1.  Open your Chrome browser and go to `chrome://extensions`.
2.  Turn on the "Developer mode" switch in the top right corner.
3.  Click the "Load unpacked" button.
4.  Select the folder where you have all these project files.
5.  That's it the extension will now appear in your toolbar ready to go.