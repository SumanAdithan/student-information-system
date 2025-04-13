import { Transaction } from '@sis/types';
import { chromium } from 'playwright';
import { compile } from 'handlebars';
import fs from 'fs';
import path from 'path';
import { AwsService } from './aws.service';

export class PaymentReceiptService {
    static async generateReceipt(transactionHistory: Transaction) {
        const awsService = new AwsService();

        const paymentReceiptTemplate = path.join(__dirname, '../templates/paymentReceipt.hbs');
        const source = fs.readFileSync(paymentReceiptTemplate, 'utf8');
        const paymentReceipt = compile(source);

        const logoIconBase64 = await awsService.getImages('/icons/logo.png');
        const successIconBase64 = await awsService.getImages('/icons/success.png');
        const backgroundImage = await awsService.getImages('/images/met-background.png');

        const paymentReceiptHtml = paymentReceipt({
            ...transactionHistory,
            logoIcon: `data:image/png;base64,${logoIconBase64}`,
            successIcon: `data:image/png;base64,${successIconBase64}`,
            backgroundImage: `data:image/png;base64,${backgroundImage}`,
        });

        const browser = await chromium.launch();
        try {
            const page = await browser.newPage();
            await page.setContent(paymentReceiptHtml, { waitUntil: 'load' });

            const pdfBuffer = await page.pdf({
                format: 'A4',
                preferCSSPageSize: true,
                printBackground: true,
                pageRanges: '1',
            });

            return pdfBuffer;
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            await browser.close();
        }
    }
}
