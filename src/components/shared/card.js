import React from 'react';
import { cn } from '../../functions/fn';
const Card = ({ text, className, type = "normal" }, props) => {
  return <div className={cn('rounded-xl py-4 px-3 text-sm', type == 'inverse' ? 'border-[#929292] text-[#94A3B8] font-medium text-center border-[1px] bg-[#141414]' : 'bg-[#483C56]', className)}>
    {text || props.children || 'Card'}
  </div>;
}

export default Card;