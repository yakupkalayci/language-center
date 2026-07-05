import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function getWords(pageIndex, pageSize) {
    const tzOffset = new Date().getTimezoneOffset();
    const url = ENDPOINTS.WORDS.GETWORDLIST + `?pageIndex=${pageIndex}&pageSize=${pageSize}&tzOffset=${tzOffset}`;
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
    const tzOffset = new Date().getTimezoneOffset();
    const url = ENDPOINTS.WORDS.GETWORDLIST + `?dateType=${dateType}&pageIndex=${pageIndex}&pageSize=${pageSize}&tzOffset=${tzOffset}`
    return api('GET', url);
}

export async function getDailyLearningWords() {
    const url = ENDPOINTS.WORDS.GET_DAILY_LEARNING_WORDS;
    return api('GET', url);
}

export async function markWordAsLearned(wordId) {
    const url = ENDPOINTS.WORDS.MARK_WORD_AS_LEARNED.replace(':id', wordId);
    return api('POST', url);
}

export async function markWordAsUnlearned(wordId) {
    const url = ENDPOINTS.WORDS.MARK_WORD_AS_UNLEARNED.replace(':id', wordId);
    return api('POST', url);
}

export async function getLearnedWords(pageIndex, pageSize, startDate, endDate) {
    const url = ENDPOINTS.WORDS.GET_LEARNED_WORDS + `?pageIndex=${pageIndex}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`;
    return api('GET', url);
}