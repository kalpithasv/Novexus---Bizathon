import { MdCodeOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { cn } from "../../functions/fn";
const ActionCard = ({
    icon, title, route, className, type = "normal", onClick, selected = false
}, props) => {
    return (
        <>
            <Link to={route}>
                <div className={cn('text-center text-xs flex items-center justify-center flex-col gap-y-3', className)}>
                    <div onClick={onClick} className={cn('p-3 drop-shadow-lg active:drop-shadow-none active:translate-y-0 hover:-translate-y-1 duration-200 rounded-lg flex items-center justify-center', type == "inverse" ? 'bg-[#1C1627]' : 'bg-[#483C56]', selected == true && 'text-[#483C56] bg-white')}>
                        {icon ? icon : <MdCodeOff className="text-2xl" />}
                    </div>
                    <span onClick={onClick}>{title}</span>
                </div>
            </Link>
        </>
    )
}

export default ActionCard;