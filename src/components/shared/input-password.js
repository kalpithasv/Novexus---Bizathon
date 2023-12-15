import { useState } from "react";
import { cn } from "../../functions/fn";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LockIcon from "../icons/lock";

const Password = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    name,
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col gap-y-2 relative">
            {
                props.icon && <LockIcon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
            }
            <input
                id={name}
                type={showPassword ? "text" : "password"}
                autoComplete="password"
                placeholder={placeholder}
                className={cn(
                    'w-full placeholder-[#929292] text-[#94A3B8] px-3 py-3 bg-[#141414] border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm',
                    props.icon && 'pl-12'
                )}
                value={value}
                onChange={onChange}
                {...props}
            />
            <div
                className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <FiEye className="w-5 h-5 text-[#64748B]" />
                ) : (
                    <FiEyeOff className="w-5 h-5 text-[#64748B]" />
                )}
            </div>
        </div>
    );
}

export default Password;