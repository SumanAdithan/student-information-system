export const getNumberToWord = (number: number) => {
    const word: Record<number, string> = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
    };
    return word[number];
};

export const getPaymentReceiptName = (name: string, date: string) => {
    const dateObj = new Date(date);
    const dateStr = dateObj
        .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        })
        .replace(/[/:, ]/g, '-');
    const fileName = `${name}_${dateStr}`;
    let paymentReceiptName = `${fileName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase()}.pdf`;
    paymentReceiptName = paymentReceiptName.replace(/ ?-pm| ?-am/gi, '').replace('--', '_');

    return paymentReceiptName;
};
