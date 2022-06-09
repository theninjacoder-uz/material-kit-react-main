import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import {useEffect} from "react";

const Logout = () => {

    const navigation = useNavigate();
    const inOneSecond = new Date(new Date().getTime() + 1);
    Cookies.set("jwtToken", "", {expires: inOneSecond});

    useEffect(() => {
        navigation("/login")
    })
    return (<div/>);

};
export default Logout;