export const customizeQrCode = ({
    base64,
    width = 300,
    height = 300,
    padding = 5,
}: {
    base64: string;
    fileName?: string;
    width?: number;
    height?: number;
    padding?: number;
}): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) reject('Failed to get 2d context');

        const img = new Image();
        img.src = base64;

        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) reject('Failed to get temporary 2d context');

            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx?.drawImage(img, 0, 0);

            const imageData = tempCtx?.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const pixels = imageData?.data;
            if (!pixels) return;

            let top = tempCanvas.height,
                bottom = 0,
                left = tempCanvas.width,
                right = 0;

            for (let y = 0; y < tempCanvas.height; y++) {
                for (let x = 0; x < tempCanvas.width; x++) {
                    const i = (y * tempCanvas.width + x) * 4;
                    const r = pixels[i],
                        g = pixels[i + 1],
                        b = pixels[i + 2];

                    if (r < 200 || g < 200 || b < 200) {
                        if (x < left) left = x;
                        if (x > right) right = x;
                        if (y < top) top = y;
                        if (y > bottom) bottom = y;
                    }
                }
            }

            left = Math.max(0, left - padding);
            right = Math.min(tempCanvas.width, right + padding);
            top = Math.max(0, top - padding);
            bottom = Math.min(tempCanvas.height, bottom + padding);

            const qrWidth = right - left;
            const qrHeight = bottom - top;

            canvas.width = width;
            canvas.height = height;
            ctx?.clearRect(0, 0, width, height);
            ctx?.drawImage(img, left, top, qrWidth, qrHeight, 0, 0, width, height);

            // Convert canvas to Blob
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob); // Return the Blob
                } else {
                    reject('Failed to create blob');
                }
            }, 'image/png');
        };

        img.onerror = (error) => reject(error);
    });
};
