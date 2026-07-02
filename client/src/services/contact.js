import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function submitContactForm(data) {
    const url = ENDPOINTS.CONTACT.SUBMIT_CONTACT_FORM;
    return api('POST', url, data);
}