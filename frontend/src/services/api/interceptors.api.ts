import { API_URL } from "@/config/api.config";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { deleteTokensStorage, getAccessToken } from "../auth/auth.helper";
import { errorCatch } from "./error.api";
import { getNewTokens } from './auth-refresh';

type RetryRequestConfig = InternalAxiosRequestConfig & {
    _isRetry?: boolean
}

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(async config => {
    const accessToken = await getAccessToken()

    if (config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig | undefined

        const status = error.response?.status
        const isAuthRequest = originalRequest?.url?.startsWith('/auth/')

        if (
            !isAuthRequest &&
            (status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            originalRequest && !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await getNewTokens()
                return instance.request(originalRequest)
            } catch (refreshError) {
                await deleteTokensStorage()
                throw refreshError
            }
        }
        throw error
    }
)
