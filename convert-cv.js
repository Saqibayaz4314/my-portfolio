const puppeteer = require('puppeteer');
const path = require('path');

async function convertHTMLToPDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file:${path.join(__dirname, 'assets', 'cv-template.html')}`, {
        waitUntil: 'networkidle0'
    });

    // Generate PDF
    await page.pdf({
        path: path.join(__dirname, 'assets', 'saqib-ayaz-cv.pdf'),
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0.4in',
            right: '0.4in',
            bottom: '0.4in',
            left: '0.4in'
        }
    });

    await browser.close();
    console.log('PDF has been generated successfully!');
}

convertHTMLToPDF().catch(console.error); 