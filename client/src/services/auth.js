import { api } from "./api";
import { ENDPOINTS } from "./constant";

export async function login(data) {
    const url = ENDPOINTS.AUTH.LOGIN;
    return api('POST', url, data)
}

export async function signup(data) {
    const url = ENDPOINTS.AUTH.REGISTER;
    return api('POST', url, data)
}

export async function deleteAccount(userId) {
    const url = `${ENDPOINTS.AUTH.DELETE_ACCOUNT}/${userId}`;
    return api('DELETE', url);
}

export async function updateAccountInfos(data) {
    const url = ENDPOINTS.AUTH.UPDATE_PROFILE;
    return api('PATCH', url, data)
}

export async function changePassword(data) {
    const url = ENDPOINTS.AUTH.CHANGE_PASSWORD;
    return api('PATCH', url, data)
}