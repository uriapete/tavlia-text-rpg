import TokenResponse from "../interfaces/TokenResponse"

export default async function getLogin(credentials:FormData){
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/token-auth/`,
        { body: credentials, method: "POST" }
    )
    const respData:TokenResponse = await response.json()
    return respData
}