import { useAuth } from '@hooks';
import { Html5Qrcode } from 'html5-qrcode';
import { isMobile } from 'react-device-detect';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface QrScannerProps {
    scan: boolean;
    setScan: Dispatch<SetStateAction<boolean>>;
    path: string;
}

export const QrScanner = ({ scan, setScan, path }: QrScannerProps) => {
    const [startScan, setStartScan] = useState(false);
    const { loginByQr } = useAuth();

    useEffect(() => {
        setStartScan(scan);
    }, [scan]);

    useEffect(() => {
        if (!startScan) return;
        const scanner = new Html5Qrcode('reader');
        const config = { fps: 10 };

        async function success(qrToken: string) {
            loginByQr.mutate({ path, qrToken });
            setStartScan(false);
            setScan(false);
        }

        function error() {}

        scanner.start({ facingMode: isMobile ? 'environment' : 'user' }, config, success, error).catch(console.error);

        return () => {
            scanner.stop().catch(console.error);
        };
    }, [startScan]);
    return <div id='reader'></div>;
};
