export const trans = (translations:any,key:string) => ( translations?.withLang?.labels?.[key]??translations?.defaultLang?.labels?.[key]);
export const getUrlLangAbbr = () => window.location.href.split("/")[3].replace(/(\?.*)/g, "");
