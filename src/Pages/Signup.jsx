import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function SignUp() {
    const navigate = useNavigate()

    const { signUp } = useAuthContext()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        try {
            await signUp(userDetails.email, userDetails.password)
            alert("SignUp successfully!");
            navigate("/login")
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        }
    }

    return (
        <div>
            <div className='login-outer-div'>
                <div className='login-inner-div'>
                    <h3 className='txt-login'>Sign Up</h3>
                    <form>
                        <div className='email-div'>
                            <label htmlFor="email">Email.</label>
                            <input type="email"
                                value={userDetails.email}
                                onChange={(e) =>
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className='password-div'>
                            <label htmlFor="password">Password.</label>
                            <input type="password" required
                                value={userDetails.password}
                                onChange={(e) =>
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className='google-login'>
                            <input onClick={handleSubmitSignup} type="button" value="Signup" />
                        </div>
                    </form>
                    <p onClick={() => navigate("/login")} >Already Have an Account?</p>
                </div>
            </div>
        </div>
    )
}
