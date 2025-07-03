import { forwardRef } from 'react'
import { AnimateWrapper } from '../lib/animate-css-utils'

const Button = forwardRef(({ 
    children, 
    variant = 'primary', 
    size = 'md',
    leftIcon,
    rightIcon,
    isLoading = false,
    animate = false,
    animationType = 'bounceIn',
    animateOptions = {},
    className = '',
    ...props 
}, ref) => {
    const baseClasses = 'btn focus-visible inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        ghost: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
        outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md',
    }
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    const buttonContent = (
        <button
            ref={ref}
            className={`${classes} rotate-on-hover group`}
            disabled={isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {leftIcon && (
                <span className="mr-2 group-hover:animate-pulse">{leftIcon}</span>
            )}
            <span className="group-hover:scale-105 transition-transform duration-200">
                {children}
            </span>
            {rightIcon && (
                <span className="ml-2 group-hover:animate-pulse group-hover:translate-x-1 transition-all duration-200">{rightIcon}</span>
            )}
        </button>
    )

    if (animate) {
        return (
            <AnimateWrapper
                animation={animationType}
                trigger="scroll"
                options={animateOptions}
            >
                {buttonContent}
            </AnimateWrapper>
        )
    }

    return buttonContent
})

Button.displayName = 'Button'

export default Button
