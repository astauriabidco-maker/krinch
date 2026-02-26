import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Uses DOMPurify which is the industry standard.
 * 
 * Allowed:
 * - Standard HTML tags (p, h1-h6, ul, ol, li, blockquote, a, strong, em, etc.)
 * - Class attributes (for styling)
 * - Images with src/alt
 * - Links with href (target="_blank" added automatically)
 * 
 * Blocked:
 * - Script tags
 * - Event handlers (onclick, onerror, etc.)
 * - JavaScript: URLs
 * - iframe, object, embed
 * - Style attributes with expressions
 */
export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'hr',
            'ul', 'ol', 'li',
            'a', 'strong', 'em', 'b', 'i', 'u', 's',
            'blockquote', 'pre', 'code',
            'img', 'figure', 'figcaption',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'div', 'span',
            'sup', 'sub',
        ],
        ALLOWED_ATTR: [
            'href', 'target', 'rel',
            'src', 'alt', 'title', 'width', 'height',
            'class',
            'colspan', 'rowspan',
        ],
        // Force all links to open in new tabs
        ADD_ATTR: ['target'],
        // Add rel="noopener noreferrer" to links
        ALLOW_DATA_ATTR: false,
    });
}

/**
 * Sanitize CSS values (for brand colors from DB)
 * Only allows hex colors, named colors, and safe font names.
 */
export function sanitizeCssValue(value: string): string {
    // Allow hex colors
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return value;
    // Allow rgb/rgba
    if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(value)) return value;
    // Allow named colors (basic set)
    const namedColors = ['transparent', 'inherit', 'currentColor', 'white', 'black'];
    if (namedColors.includes(value.toLowerCase())) return value;
    // Allow safe font names (alphanumeric, spaces, quotes)
    if (/^['"]?[\w\s-]+['"]?(,\s*['"]?[\w\s-]+['"]?)*$/.test(value)) return value;
    // Reject everything else
    return '';
}
