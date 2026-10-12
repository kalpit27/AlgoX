import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'interactive' | 'accent'
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#151E30] border-[#293449]',
    surface: 'bg-[#111827] border-[#252F44]',
    interactive:
      'bg-[#151E30] border-[#293449] hover:border-indigo-500/50 hover:bg-[#18233A] transition-all duration-200 cursor-pointer',
    accent: 'bg-gradient-to-br from-[#18233C] to-[#121A2C] border-indigo-500/30',
  }

  return (
    <div
      className={`rounded-xl border p-5 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
