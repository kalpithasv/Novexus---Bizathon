import { cn } from "../../functions/fn";

const HrLineStyled = ({ text }, props) => {
    return (
        <div className={cn('w-full flex items-center justify-center', text ? "gap-x-5": 'gap-x-2')}>
            <div className="flex-1 h-px bg-gradient-to-l from-[#8FFF00] to-[#000000]"></div>
            <span className="font-semibold">
                {text}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8FFF00] to-[#000000]"></div>
        </div>
    )
}

export default HrLineStyled;