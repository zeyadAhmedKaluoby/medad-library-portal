import { baseUrl } from "../utils/baseURL"
import {  endpoints } from "../utils/endpoints"

export const getHeaderData = async(lang:string|undefined) => {
    const response = await fetch(`${baseUrl}/${lang}/${endpoints.header.data}`) 
    const data = await response.json()
    return data?.data
}