import React, { useState } from 'react';
import '../sass/LoginComponent.scss';
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import logo from '../assets/logo.png';
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const LoginComponent = () => {

    const [credentails, setCredentials] = useState({});
    const navigate = useNavigate();

    const login = async () => {
        try {
            let res = await LoginAPI(credentails.email, credentails.password);
            toast.success("Signed in to socialHub!")
            localStorage.setItem('userEmail', res.user.email);
            setCredentials({});
            navigate('/');
        } catch (err) {
            toast.error("Please check your credentails")
            console.log(err.error.message);
            
        }
    };

    const signIn = () =>{
        try{
            let res= GoogleSignInAPI();
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="login-wrapper">
            <img src={logo} className="linkedinLogo" />

            <div className="login-wrapper-inner">
                <h1 className="heading">Sign in</h1>
                <h2 className="sub-heading">Snap, Share and Connect</h2>

                <div className="auth-inputs">
                    <input
                        onChange={(event) =>
                            setCredentials({ ...credentails, email: event.target.value })
                        }
                        type="email"
                        className="common-input"
                        placeholder="Email"
                    />
                    <input
                        onChange={(event) =>
                            setCredentials({ ...credentails, password: event.target.value })
                        }
                        type="password"
                        className="common-input"
                        placeholder="Password"
                    />
                </div>
                <button onClick={login} className="login-btn">
                    Sign in
                </button>
                {/* <hr className="hr-text" data-content="or" />
                <GoogleButton className='button'
                 style={{ width: "100%", margin: "auto" }}
                    onClick={signIn}
                /> */}

            </div>
            <hr className="hr-text" data-content="or" />
            <div className="google-btn-container">
                <p className="go-to-signup">
                    New to socialHub?{" "}
                    <span className="join-now" onClick={() => navigate("/register")}>
                        Join now
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginComponent;
