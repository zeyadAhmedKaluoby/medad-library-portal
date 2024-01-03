import { apiVersion, baseUrl } from "../../utils/baseURL";
import { endpoints } from "../../utils/endpoints";

let cachedData:any;

export const fetchTranslations = async (lang:string|undefined) => {
  const responseLang = await fetch(`${baseUrl}/${lang}/${apiVersion}${endpoints.siteSettings.labels}`);
  const responseDefault= await fetch(`${baseUrl}/en/${apiVersion}${endpoints.siteSettings.labels}`);

  return {withLang:await responseLang.json(),defaultLang: await responseDefault.json(),lang:lang};
};

export const getTranslations = async (lang:string|undefined) => {
  if (!cachedData||cachedData?.lang != lang ) {
    cachedData = await fetchTranslations(lang);
  }
  return cachedData;
};
