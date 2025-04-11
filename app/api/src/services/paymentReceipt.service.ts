import { Transaction } from '@sis/types';
import { chromium } from 'playwright';
import fs from 'fs';

export class PaymentReceiptService {
    async generateReceipt(transactionHistory: Transaction) {
        const browser = await chromium.launch();
        try {
            const page = await browser.newPage();

            const htmlContent = this.buildHtml(transactionHistory);
            await page.setContent(htmlContent);

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
            });
            console.log('hi');
            fs.writeFileSync('./receipt.pdf', pdfBuffer);
            console.log('PDF saved successfully');
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            await browser.close();
        }
    }

    private buildHtml({ studentData, transactionId, category, amount, method, paidOn }: Transaction) {
        return `
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:wght@100..900&display=swap"
                        rel="stylesheet"
                    />
                    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                </head>
                <body>
                    <div className='bg-white shadow-section w-fit p-15 rounded-xl'>
                        <div className='flex items-center gap-2'>
                            <div className='w-15 rounded-lg overflow-hidden'>
                                <img src={logo} alt='logo' />
                            </div>
                            <h1 className='text-3xl font-semibold'>MET ENGINEERING COLLEGE</h1>
                        </div>

                        <div className='mt-10 grid grid-cols-2 gap-5 text-lg font-medium'>
                            <p>Name: ${studentData?.name}</p>
                            <p>RegisterNo: ${studentData?.registerNo}</p>
                            <p>Semester: 0${studentData?.semester}</p>
                            <p>Department: ${studentData?.department}</p>
                            <div>Year: ${studentData?.year}</div>
                            <p>Batch: ${studentData?.batch}</p>
                        </div>

                        <div className='mt-10'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <div className='w-20'>
                                    <img src={success} alt='success' />
                                </div>
                                <h1 className='text-2xl font-medium text-success'>Payment Successfull</h1>
                            </div>
                            <div className='flex flex-col items-center mt-10 gap-5 text-lg font-medium'>
                                <p>Payment Id: ${transactionId}</p>
                                <p>
                                    ${category}: ${amount}
                                </p>
                                <p>Method: ${method}</p>
                                <p>Paid On: ${paidOn}</p>
                            </div>
                        </div>
                        <div className='mt-10 text-lg font-medium'>Thanks you for your payment. Your payment was successfull</div>
                    </div>
                </body>
            </html>
        `;
    }
}
