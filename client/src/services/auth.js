import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function login(data) {
    const url = ENDPOINTS.LOGIN;
    return api('POST', url, data)
}

export async function signup(data) {
    const url = ENDPOINTS.REGISTER;
    return api('POST', url, data)
}

export async function deleteAccount(userId) {
    const url = `${ENDPOINTS.DELETE_ACCOUNT}/${userId}`;
    return api('DELETE', url);
}

export async function updateAccountInfos(data) {
    const url = ENDPOINTS.UPDATE_PROFILE;
    return api('PATCH', url, data)
}

export async function changePassword(data) {
    const url = ENDPOINTS.CHANGE_PASSWORD;
    return api('PATCH', url, data)
}