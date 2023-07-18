import UserData from "../interfaces/UserData"

export default async function getUserFromToken(token:string){

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user_from_token/`,
        {
            body: JSON.stringify({ token: token }), method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, }
    )
    console.log(response)
    const respData: UserData = await response.json()
    // const respData:UserData={
    //     user:"null"
    // }
    return respData
}