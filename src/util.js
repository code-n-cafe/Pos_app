export const getImgURL = (path) => {
    return new URL(`./assets/${path}`, import.meta.url).href;
};

export const getImgURLMenu = (path) => {
    return new URL(`./assets/menu/${path}`, import.meta.url).href;
};

export const getImgURLGiftCards = (path) => {
    return new URL(`./assets/giftcards/${path}`, import.meta.url).href;
}