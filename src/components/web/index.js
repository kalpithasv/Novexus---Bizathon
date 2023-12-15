import { useNavigate } from "react-router-dom";

const WebIndex = () => {
    const nav = useNavigate('/auth');
    nav('/auth');
    return(
        <></>
    )
}

export default WebIndex;