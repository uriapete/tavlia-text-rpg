export default async function deleteSave(userToken:string,saveID:number){

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/save_files/${saveID}/`,
        {
            method: `DELETE`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken}`,
            },
        }
    )

    // const respData=await response.json()

    return response
    // return respData
}