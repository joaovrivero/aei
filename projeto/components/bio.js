// Bio components - migrated from Chakra UI to Tailwind

export const BioSection = ({ children, className = '', ...props }) => (
    <div
        className={`pl-14 -indent-14 ${className}`}
        {...props}
    >
        {children}
    </div>
)

export const BioYear = ({ children, className = '', ...props }) => (
    <span
        className={`font-bold mr-4 ${className}`}
        {...props}
    >
        {children}
    </span>
)