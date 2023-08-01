"use client"

import Image from 'next/image';
import { CustomButtonProps } from '@/types';

const CustomButton = ({
  title,
  btnType,
  containerStyles,
  textStyles,
  leftIcon,
  rightIcon,
  handleClick
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={20} height={20} alt="left icon" />
      )}

      <span className={`flex-1 ${textStyles}`}>
        {title}
      </span>

      {rightIcon && (
        <Image src={rightIcon} width={20} height={20} alt="right icon" />
      )}
    </button>
  )
}

export default CustomButton