import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import GoogleButton from 'react-google-button'
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import { toast } from 'react-toastify';
import '../sass/HomeComponent.scss';
import { postUserData } from '../api/FireStoreAPIs';




const LoginComponent = () => {

    const [credentails, setCredentials] = useState({});
    const navigate = useNavigate();


    const register = async () => {
        try {
            let res = await RegisterAPI(credentails.email, credentails.password);
            toast.success("Account created successfully!");
            postUserData({ 
                name: credentails.name, 
                email: credentails.email,
                imageLink: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"

            })
            localStorage.setItem('userEmail', res.user.email);
            setCredentials({});
            navigate('/');
        } catch (err) {
            toast.error("Cannot create your account")
            console.log(err.error.message);

        }
    };

    const signIn = () => {
        try {
              let res = GoogleSignInAPI();
            console.log(res.user);
            console.log(res.user.email);5
        } catch (err) {
            console.log(err);
        }
    }


    
      


    return (
        <div className="login-wrapper">
            <img src={logo} className="linkedinLogo" />

            <div className="login-wrapper-inner">
                <h1 className="heading">Discover, Engage, Connect – Your Journey Through a World of Images</h1>

                <div className="auth-inputs">
                    <input
                        onChange={(event) =>
                            setCredentials({ ...credentails, name: event.target.value })
                        }
                        type="text"
                        className="common-input"
                        placeholder="Your name"
                    />
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
                <button onClick={register} className="login-btn">
                    Sign up
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
                    Already on socialHub?{" "}
                    <span className="join-now" onClick={() => navigate("/login")}>
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginComponent;
