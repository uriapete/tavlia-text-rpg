import { ReactElement, useContext } from 'react';
import './styles/Header.scss'
import { UserToken } from '../hooks/Contexts';

export default function Header():ReactElement{
    const UserTokenContext=useContext(UserToken)

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
                    <form action={`${process.env.REACT_APP_API_URL}/token-auth`} method="post">
                        <div className="auth auth-user header-auth">
                            <label htmlFor="username">Username</label>
                            <input type="username" name='username' />
                        </div>
                        <div className="auth auth-pass header-auth">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="" />
                        </div>
                    </form>
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