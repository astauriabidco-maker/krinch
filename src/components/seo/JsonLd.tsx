import { ProfessionalService, WithContext } from "schema-dts";

export default function JsonLd() {
    const schema: WithContext<ProfessionalService> = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Krinch & Partners",
        "image": "https://www.krinchpartners.com/images/hero_premium.png",
        "@id": "https://www.krinchpartners.com",
        "url": "https://www.krinchpartners.com",
        "telephone": "+237000000000",
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Nylon, Douala",
                "addressLocality": "Douala",
                "addressRegion": "Littoral",
                "postalCode": "BP 1234",
                "addressCountry": "CM"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "Bastos, Yaoundé",
                "addressLocality": "Yaoundé",
                "addressRegion": "Centre",
                "postalCode": "BP 5678",
                "addressCountry": "CM"
            }
        ],
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.0511,
            "longitude": 9.7679
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.linkedin.com/company/krinchpartners",
            "https://twitter.com/krinchpartners"
        ],
        "areaServed": [
            {
                "@type": "Country",
                "name": "Cameroon"
            },
            {
                "@type": "Region",
                "name": "Central Africa"
            },
            {
                "@type": "Region",
                "name": "International"
            }
        ],
        "description": "Cabinet de conseil RH & Transformation basé au Cameroun. Expertise en Audit RH, SIRH et IA RH Afrique."
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
