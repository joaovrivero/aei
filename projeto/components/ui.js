// UI Components Library
// Core UI components built with Tailwind CSS

// Container component
export const Container = ({ children, className = '', maxW = 'container-custom', ...props }) => (
    <div className={`${maxW} ${className}`} {...props}>
        {children}
    </div>
)

// Box component
export const Box = ({ children, className = '', as = 'div', ...props }) => {
    const Component = as
    return (
        <Component className={className} {...props}>
            {children}
        </Component>
    )
}

// Heading component
export const Heading = ({ children, as = 'h2', className = '', variant, fontSize, ...props }) => {
    const Component = as
    let headingClasses = 'font-heading font-bold'

    if (variant === 'page-title') {
        headingClasses += ' text-3xl md:text-4xl'
    } else if (variant === 'section-title') {
        headingClasses += ' section-title'
    } else {
        // Default sizes based on heading level
        const sizeMap = {
            h1: 'text-4xl',
            h2: 'text-3xl',
            h3: 'text-2xl',
            h4: 'text-xl',
            h5: 'text-lg',
            h6: 'text-base'
        }
        headingClasses += ` ${sizeMap[as] || 'text-2xl'}`
    }

    if (fontSize) {
        headingClasses += ` text-[${fontSize}px]`
    }

    return (
        <Component className={`${headingClasses} ${className}`} {...props}>
            {children}
        </Component>
    )
}

// Button component
export const Button = ({
    children,
    className = '',
    variant = 'solid',
    colorScheme: _colorScheme = 'primary',
    size: _size = 'md',
    leftIcon,
    rightIcon,
    as = 'button',
    ...props
}) => {
    const Component = as
    let buttonClasses = 'btn'

    if (variant === 'solid') {
        buttonClasses += ' btn-primary'
    } else if (variant === 'ghost') {
        buttonClasses += ' btn-ghost'
    }

    return (
        <Component className={`${buttonClasses} ${className}`} {...props}>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </Component>
    )
}

// Link component
export const Link = ({ children, className = '', href, target, ...props }) => (
    <a
        href={href}
        target={target}
        className={`link ${className}`}
        {...props}
    >
        {children}
    </a>
)

// Text component
export const Text = ({ children, className = '', fontSize, ...props }) => {
    let textClasses = ''
    if (fontSize) {
        textClasses = `text-[${fontSize}px]`
    }

    return (
        <p className={`${textClasses} ${className}`} {...props}>
            {children}
        </p>
    )
}

// List components
export const List = ({ children, className = '', ...props }) => (
    <ul className={`space-y-2 ${className}`} {...props}>
        {children}
    </ul>
)

export const ListItem = ({ children, className = '', ...props }) => (
    <li className={className} {...props}>
        {children}
    </li>
)

// SimpleGrid component
export const SimpleGrid = ({ children, columns = [1, 2], gap = 6, className = '', ...props }) => {
    const gridCols = Array.isArray(columns) ?
        `grid-cols-${columns[0]} md:grid-cols-${columns[1] || columns[0]} lg:grid-cols-${columns[2] || columns[1] || columns[0]}` :
        `grid-cols-${columns}`

    return (
        <div className={`grid ${gridCols} gap-${gap} ${className}`} {...props}>
            {children}
        </div>
    )
}

// Flex component
export const Flex = ({ children, className = '', align = '', justify = '', direction = '', ...props }) => {
    let flexClasses = 'flex'

    if (align) flexClasses += ` items-${align}`
    if (justify) flexClasses += ` justify-${justify}`
    if (direction) flexClasses += ` flex-${direction}`

    return (
        <div className={`${flexClasses} ${className}`} {...props}>
            {children}
        </div>
    )
}

// Stack component
export const Stack = ({ children, className = '', direction = 'column', spacing: _spacing = 4, ...props }) => {
    const directionClass = direction === 'row' ? 'flex-row space-x-4' : 'flex-col space-y-4'

    return (
        <div className={`flex ${directionClass} ${className}`} {...props}>
            {children}
        </div>
    )
}

// Icon component
export const Icon = ({ as: IconComponent, className = '', ...props }) => (
    <IconComponent className={className} {...props} />
)

// Spinner component
export const Spinner = ({ className = '', size = 'md', ...props }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    }

    return (
        <div
            className={`animate-spin rounded-full border-2 border-primary-500 border-t-transparent ${sizeClasses[size]} ${className}`}
            {...props}
        />
    )
}

// Badge component  
export const Badge = ({ children, className = '', colorScheme: _colorScheme = 'primary', ...props }) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 ${className}`}
        {...props}
    >
        {children}
    </span>
)

// Image component (will use Next.js Image)
export const Image = ({ src, alt, className = '', ...props }) => (
    <img
        src={src}
        alt={alt}
        className={className}
        {...props}
    />
)

// Menu components (simplified)
export const Menu = ({ children, ...props }) => (
    <div className="relative" {...props}>
        {children}
    </div>
)

export const MenuButton = ({ children, className = '', ...props }) => (
    <button className={`btn ${className}`} {...props}>
        {children}
    </button>
)

export const MenuList = ({ children, className = '', ...props }) => (
    <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ${className}`} {...props}>
        {children}
    </div>
)

export const MenuItem = ({ children, className = '', as = 'button', ...props }) => {
    const Component = as
    return (
        <Component className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${className}`} {...props}>
            {children}
        </Component>
    )
}

// IconButton component
export const IconButton = ({ icon, className = '', ...props }) => (
    <button className={`btn p-2 ${className}`} {...props}>
        {icon}
    </button>
)

// LinkBox and LinkOverlay for grid items
export const LinkBox = ({ children, className = '', ...props }) => (
    <div className={`relative ${className}`} {...props}>
        {children}
    </div>
)

export const LinkOverlay = ({ children, href, className = '', as = 'a', ...props }) => {
    const Component = as
    return (
        <Component
            href={href}
            className={`absolute inset-0 z-10 ${className}`}
            {...props}
        >
            <span className="sr-only">{children}</span>
        </Component>
    )
}

// Divider component
export const Divider = ({ className = '', ...props }) => (
    <hr className={`border-gray-300 dark:border-gray-600 ${className}`} {...props} />
)
