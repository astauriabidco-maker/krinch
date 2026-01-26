"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ProgressBar
                height="2px"
                color="#C9A24D"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
}
