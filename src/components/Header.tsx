import { ReactElement, useContext } from 'react';
import './styles/Header.scss'
import { UserToken } from '../hooks/Contexts';
import getLogin from '../functions/getLogin';
import useUserData from '../hooks/useUserData';
import { Link, useNavigate } from 'react-router-dom';

export default function Header():ReactElement{
    const UserTokenContext = useContext(UserToken)

    const navigate=useNavigate()

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

    function handleLogout() {
        if (UserTokenContext === null) {
            return null
        }

        UserTokenContext.setTokenFn(null)

        navigate("/")
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
                    <button>
                        <Link to={"signup"} >
                            Sign Up
                        </Link>
                    </button>
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
                    {
                        user?
                        (
                            <>
                                <h3>{user.user}</h3>
                                <button onClick={handleLogout}>logout</button>
                            </>
                        )
                        :
                        (
                            <h3>loading...</h3>
                        )
                    }
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