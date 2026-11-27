// `en-CA` is a placeholder default locale that forces every URL to carry a
// language prefix. Any request that resolves to it (e.g. `/`, `/contact`,
// `/en-CA/about`) is redirected to /fr or /en based on the browser's
// preferred language, falling back to /en.
function preferredLocale(acceptLanguage = '') {
    const langs = acceptLanguage
        .split(',')
        .map((part) => {
            const [tag, q] = part.trim().split(';q=');
            return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
        })
        .filter(({ tag }) => tag.startsWith('fr') || tag.startsWith('en'))
        .sort((a, b) => b.q - a.q);

    return langs[0]?.tag.startsWith('fr') ? 'fr' : 'en';
}

export function redirectDefaultLocale({ locale, resolvedUrl, req }) {
    if (locale !== 'en-CA') return null;
    const target = preferredLocale(req.headers['accept-language']);
    return {
        redirect: {
            destination: `/${target}${resolvedUrl === '/' ? '' : resolvedUrl}`,
            permanent: false,
        },
    };
}
