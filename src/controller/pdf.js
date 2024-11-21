import fs from 'fs';
import moment from 'moment';
import puppeteer from 'puppeteer';
export const generateCertificate = async (req,res) => {
    const data = req?.body
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <div style="width: 800px; margin: 50px auto; border: 20px solid #4994ca; border-radius: 17px; padding: 20px; background-color: #f9f9f9; text-align: center;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="text-align: left; margin-bottom: 30px;">
                        <p style="margin: 0; font-size: 16px;">Register-Id: ${data.registerId}</p>
                        <p style="margin: 0; font-size: 16px;">E-Mail: ${data.email}</p>
                        <p style="margin: 0; font-size: 16px;">Phone No.: ${data.phone}</p>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <img src="http://localhost:4100${data.images.logo}" alt="image" style="max-width: 100px; max-height: 100px;" />
                    </div>
                    <div style="text-align: right; margin-bottom: 30px;">
                        <p style="margin: 0; font-size: 16px;">${data.address.line1}</p>
                        <p style="margin: 0; font-size: 16px;">${data.address.line2}</p>
                        <p style="margin: 0; font-size: 16px;">${data.address.line3}</p>
                    </div>
                </div>
                <h1 style="margin: 20px 0; font-size: 32px; font-family: 'Times New Roman', Times, serif; color: #4994ca;">${data.certificateTitle}</h1>
                <h2 style="margin: 40px 0 0 2px; font-size: 18px; font-family: 'Times New Roman', Times, serif;">This Certificate Presented to</h2>
                <h1 style="margin: 0; font-size: 22px;  color: #e7bf3bd7; font-family: 'Times New Roman', Times, serif;">${data.presentedTo}</h1>
                <div style=" margin: 0 66px;">
                    <p style="font-size: 16px; line-height: 1.5; margin: 20px 0; font-family: 'Times New Roman', serif;">${data.description}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 30px; font-size: 16px;">
                    <div style="margin: 5px 0;">Date of Birth: ${data.dob}</div>
                    <div style="margin: 5px 30px 5px 0; ">Gender: ${data.gender}</div>
                    <div style="margin: 5px 0;">Blood Group: ${data.bloodGroup}</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <div style="margin-top: 50px;">
                        <p style="font-size: 16px; margin: 10px 0;">${data.dateTime}</p>
                        <p style="border-top: 1px solid #000; width: 200px; margin: 10px auto 0;"></p>
                        <p style="margin: 5px 0;">DATE-TIME</p>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;">
                       <img src="http://localhost:4100${data.images.signature}" alt="image" style="max-width: 100px; max-height: 100px;" />
                    </div>
                    <div style="margin-top: 50px;">
                        <p style="border-top: 1px solid #000; width: 200px; margin: 20px auto 0;"></p>
                        <p style="margin: 5px 0;">SIGNATURE</p>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent);

            const folderPath = './created-pdf';
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            const fileName = `${moment().format('YYYYMMDD_HHmmss')}.pdf`;
            const filePath = `${folderPath}/${fileName}`;

            await page.pdf({
                path: filePath,
                format: 'A4',
                landscape: true,
                printBackground: true,
            });

            await browser.close();
            res.status(200).json({ message: 'PDF created successfully!', filePath });
        } catch (error) {
            res.status(500).json({ message: 'Error creating PDF', error: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating PDF', error: error.message });
    }
}