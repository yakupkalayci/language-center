import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function getWords(pageIndex, pageSize) {
    const url = ENDPOINTS.WORDS.GETWORDLIST + `?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return api('GET', url);
}

export async function addWord(data) {
    const url = ENDPOINTS.WORDS.GETWORDLIST;
    return api('POST', url, data);
}

export async function updateWord(data, id) {
    const url = ENDPOINTS.WORDS.GETWORDLIST + `/${id}`;
    return api('PUT', url, data);
}

export async function deleteWord(id) {
    const url = ENDPOINTS.WORDS.GETWORDLIST + `/${id}`;
    return api('DELETE', url);
}

export async function getWordByDateType(dateType, pageIndex, pageSize) {
    const url = ENDPOINTS.WORDS.GETWORDLIST + `?dateType=${dateType}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return api('GET', url);
}