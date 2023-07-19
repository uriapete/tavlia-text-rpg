import { ReactElement, useContext } from 'react';
import './styles/Header.scss'
import { UserToken } from '../hooks/Contexts';
import getLogin from '../functions/getLogin';
import useUserData from '../hooks/useUserData';

export default function Header():ReactElement{
    const UserTokenContext = useContext(UserToken)

    const user = useUserData()

    async function handleLogin(e:React.FormEvent<HTMLFormElement>){
        if(UserTokenContext===null){
            return null
        }

        e.preventDefault()

        const form=e.target

        const formData:FormData=new FormData(form as HTMLFormElement)

        UserTokenContext.setTokenFn((await getLogin(formData)).token)        
    }

    let authPart=(
        <></>
    )

    if(UserTokenContext===null){
        authPart=(
            <></>
        )
    }else{
        if(UserTokenContext.userToken===null){
            authPart=(
                <div className="auth-part">
                    <form onSubmit={(e)=>{
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
                        <button type="submit">Login</button>
                    </form>
                </div>
            )
        }else{
            authPart=(
                <div>
                    <h3>{user?user.user:"loading..."}</h3>
                </div>
            )
        }
    }

    return(
        <div className="comp comp-header">
            {authPart}
        </div>
    )
}