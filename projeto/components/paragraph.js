// Paragraph component - migrated from emotion/styled to Tailwind
const Paragraph = ({ children, className = '', ...props }) => (
    <p
        className={`text-justify indent-4 hyphens-auto ${className}`}
        {...props}
    >
        {children}
    </p>
)

export default Paragraph