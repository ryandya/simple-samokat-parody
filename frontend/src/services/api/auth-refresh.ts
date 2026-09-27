import { API_URL, getAuthUrl } from "@/config/api.config"
import { EnumSecureStore, IAuthResponse } from "@/types/auth.interface"
import axios from "axios"
import { getItemAsync } from "expo-secure-store"
import { saveToStorage } from "../auth/auth.helper"

export const getNewTokens = async () => {
    const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)

    const res = await axios.post<string, { data: IAuthResponse }>(
        API_URL + getAuthUrl('/login/access-token'),
        { refreshToken },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    if (res.data.accessToken) await saveToStorage(res.data)
    return res
}
