import { api } from "./api";

export async function login(data) {
    const url = import.meta.env.VITE_LOGIN_SERVICE;
    return api('POST', url, data)
}

export async function signup(data) {
    const url = import.meta.env.VITE_REGISTER_SERVICE;
    return api('POST', url, data)
}

export async function deleteAccount(userId) {
    const url = `${import.meta.env.VITE_DELETE_ACOOUNT_SERVICE}/${userId}`;
    return api('DELETE', url);
}

export async function updateAccountInfos(data) {
    const url = import.meta.env.VITE_UPDATE_PROFILE_SERVICE;
    return api('PUT', url, data)
}