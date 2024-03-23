import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Login() {

    const navigate = useNavigate()

    const { logIn, googleSignIn } = useAuthContext();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    // console.log(userData);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await logIn(userData.email, userData.password);
            alert("Login Successfully!")
            navigate("/")
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorCode, errorMessage)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            alert(" Signin Successfully!");
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        }
    };

    return (
        <div>
            <div className='login-outer-div'>
                <div className='login-inner-div'>
                    <h3 className='txt-login'>LogIn</h3>
                    <form>
                        <div className='email-div'>
                            <label htmlFor="email">Email.</label>
                            <input type="email"
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                                }
                            />
                        </div>
                        <div className='password-div'>
                            <label htmlFor="password">Password.</label>
                            <input type="password"
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, password: e.target.value }))
                                }
                            />
                        </div>
                        <div className='google-login'>
                            <input onClick={onLogin} type="button" value="Login" />
                            <input onClick={handleGoogleSignIn} type="button" value="SignIn with Google" />
                        </div>
                    </form>
                    <p onClick={() => navigate("/signup")} >Create Your Account</p>
                </div>
            </div>
        </div>
    )
}
