import { useNavigate } from "react-router-dom";

const MobiIndex = () => {
    const nav = useNavigate('/auth');
    nav('/auth');
    return(
        <></>
    )
}

export default MobiIndex;