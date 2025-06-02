const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCV() {
    try {
        // Ensure assets directory exists
        const assetsDir = path.join(__dirname, 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir);
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlPath = path.join(__dirname, 'assets', 'cv-template.html');
        await page.goto(`file:${htmlPath}`, {
            waitUntil: 'networkidle0'
        });

        // Generate PDF
        const pdfPath = path.join(__dirname, 'assets', 'saqib-ayaz-cv.pdf');
        await page.pdf({
            path: pdfPath,
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
        console.log('CV PDF has been generated successfully!');
    } catch (error) {
        console.error('Error generating CV:', error);
    }
}

generateCV(); 