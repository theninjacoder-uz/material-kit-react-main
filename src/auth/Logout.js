import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {

    const navigation = useNavigate();
    localStorage.removeItem("jwtToken");

    useEffect(() => {
        navigation("/login")
    })
    return (<div/>);

};
export default Logout;