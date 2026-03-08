import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function getWords() {
    const url = ENDPOINTS.WORDS.GETWORDLIST;
    return api('GET', url);
}

export async function addWord(data) {
    const url = ENDPOINTS.WORDS.GETWORDLIST;
    return api('POST', url, data);
}