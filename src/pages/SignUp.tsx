import { ReactElement } from "react";
import "./styles/SignUp.scss"
import { useNavigate } from "react-router";

export default function SignUp():ReactElement{
    const navigate=useNavigate()

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        const form = e.target

        const formData: FormData = new FormData(form as HTMLFormElement)

        const response=await fetch(
            `${ process.env.REACT_APP_API_URL }/users/`,
            {
                method:"POST",
                body:formData
            }
        )

        console.log(response)

        const respData=await response.json()

        console.log(respData)

        if("username" in respData && "password" in respData){
            navigate("/")
            return 0
        }
        console.log("error")

    }

    return(
        <div className="page page-signup">
            <form onSubmit={(e) => {
                handleLogin(e)
            }}>
                <div className="auth auth-user header-auth">
                    <label htmlFor="username">Username</label>
                    <input type="username" name='username' />
                </div>
                <div className="auth auth-pass header-auth">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" />
                </div>
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}