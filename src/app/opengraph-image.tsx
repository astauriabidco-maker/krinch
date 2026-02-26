import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Krinch & Partners — Conseil RH & Transformation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0A1628 0%, #0F2A44 50%, #1a3a5c 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                    position: 'relative',
                }}
            >
                {/* Decorative elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        right: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(212, 175, 55, 0.05)',
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-150px',
                        left: '-150px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'rgba(212, 175, 55, 0.03)',
                        display: 'flex',
                    }}
                />

                {/* Gold line */}
                <div
                    style={{
                        width: '80px',
                        height: '3px',
                        background: '#D4AF37',
                        marginBottom: '40px',
                        display: 'flex',
                    }}
                />

                {/* Main title */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '-1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    Krinch
                    <span style={{ color: '#D4AF37', fontWeight: 300 }}>&</span>
                    Partners
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: '22px',
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: '24px',
                        letterSpacing: '8px',
                        textTransform: 'uppercase' as const,
                        fontWeight: 600,
                        display: 'flex',
                    }}
                >
                    Conseil RH & Transformation
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: '16px',
                        color: '#D4AF37',
                        marginTop: '32px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase' as const,
                        display: 'flex',
                    }}
                >
                    Excellence · Sobriété · Crédibilité
                </div>

                {/* Bottom gold line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '60px',
                        width: '120px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
