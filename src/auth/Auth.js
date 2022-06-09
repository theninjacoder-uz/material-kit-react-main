import './Auth.css'
import axios from "axios";
import Cookies from 'js-cookie'
import {useLocation, useNavigate} from "react-router-dom";
import {useReducer, useState} from "react";
import account from "../_mock/account";

const AUTH_URL = "http://34.233.123.100:8080/api/v1/auth/";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, [action.key]: action.value
            }
        case "REGISTER":
            return {

                ...state, [action.key]: action.value
            }
        default:
            return {};
    }
};

function Auth() {
    const [auth, dispatch] = useReducer(reducer, {name: "", email: "", password: "", confirmPassword: ""});
    const [forRegister, setRegister] = useState(false);
    const { state } = useLocation();
    const navigation = useNavigate();

    function handleInputChange(e) {
        dispatch({
            type: forRegister ? "REGISTER" : "LOGIN", key: e.target.name, value: e.target.value
        })
    }

    function changeAuthType() {
        setRegister(!forRegister);
    }


    function login() {
        console.log(AUTH_URL + (forRegister ? "register" : "login"));
        axios.post(AUTH_URL + (forRegister ? "register" : "login"), auth).then((res) => {
            console.log(res);
            if (res.data.statusCode === 200) {
                // const jwtToken = Cookies.set("jwtToken", res.data.accessToken, { expires: 1, path: "/", secure: true });
                localStorage.setItem("jwtToken", res.data.accessToken);
                account.email = res.data.email;
                account.displayName = res.data.name;
                navigation("/dashboard/user", {state: {...account}})
            }else {
                // eslint-disable-next-line no-alert
                alert("EMAIL OR PASSWORD INCORRECT") ;
            }
        }).catch(err => {
            // eslint-disable-next-line no-alert
            alert("OOPs something was wrong :(") ;
        })
    }

    return ( <div className="container">

            <div className="screen">
                <div className="screen__content">
                    <div className="sign__up" id="header-login-button">
                        <a id="sign" type="submit" href="#"
                           onClick={changeAuthType}> {forRegister ? "Login ?" : "Sign Up ?"} </a>
                    </div>
                    <div className="login" style={{paddingTop: forRegister ? '30px' : '120px'}}>
                        {forRegister ?
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"/>
                                <input type="text" name="name" className="login__input" placeholder="Name"
                                       onChange={handleInputChange}/>
                            </div> : <div/>
                        }

                        <div className="login__field">
                            <i className="login__icon fas fa-user"/>
                            <input type="text" name="email" className="login__input"
                                   placeholder="Email"
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"/>
                            <input type="password" name="password" className="login__input" placeholder="Password"
                                   onChange={handleInputChange}/>
                        </div>

                        <button className="button login__submit" onClick={login}>
                            <span className="button__text"> {forRegister ? "Sign Up" : "Log In"}</span>
                        </button>

                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"/>
                    <span className="screen__background__shape screen__background__shape3"/>
                    <span className="screen__background__shape screen__background__shape2"/>
                    <span className="screen__background__shape screen__background__shape1"/>
                </div>
            </div>
        </div>)
}

export default Auth;