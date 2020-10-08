import { defaultLocale, isLocale } from './config';

export function getInitialLocale() {
    const localSetting = localStorage.getItem("locale");

    if (localSetting && isLocale(localSetting)) {
        return localSetting;
    }

    const [browserSetting] = navigator.language.split("-");

    if (isLocale(browserSetting)) {
        return browserSetting;
    }

    return defaultLocale;
}
