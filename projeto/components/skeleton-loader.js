// Skeleton Loader Component - Requisito 2
const SkeletonLoader = ({
    className = '',
    width = 'w-full',
    height = 'h-4',
    variant = 'text',
    lines = 1,
    ...props
}) => {
    const baseClasses = 'skeleton animate-pulse bg-gray-200 dark:bg-gray-700 rounded'

    if (variant === 'text') {
        return (
            <div className={`space-y-2 ${className}`} {...props}>
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={`${baseClasses} ${height} ${index === lines - 1 && lines > 1 ? 'w-3/4' : width
                            }`}
                    />
                ))}
            </div>
        )
    }

    if (variant === 'title') {
        return (
            <div className={`${baseClasses} h-6 w-3/4 mb-4 ${className}`} {...props} />
        )
    }

    if (variant === 'avatar') {
        return (
            <div className={`${baseClasses} h-20 w-20 rounded-full ${className}`} {...props} />
        )
    }

    if (variant === 'image') {
        return (
            <div className={`${baseClasses} h-48 w-full rounded-lg ${className}`} {...props} />
        )
    }

    if (variant === 'card') {
        return (
            <div className={`card p-6 ${className}`} {...props}>
                <div className="skeleton h-6 w-1/2 mb-4" />
                <div className="space-y-2">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                </div>
            </div>
        )
    }

    return (
        <div className={`${baseClasses} ${height} ${width} ${className}`} {...props} />
    )
}

// Skeleton para o VoxelArt component
export const VoxelSkeleton = ({ className = '' }) => (
    <div className={`relative w-full h-64 md:h-96 ${className}`}>
        <div className="skeleton h-full w-full rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
            <SkeletonLoader variant="text" lines={2} />
        </div>
    </div>
)

// Skeleton para Grid Items
export const GridItemSkeleton = ({ className = '' }) => (
    <div className={`grid-item ${className}`}>
        <SkeletonLoader variant="image" className="mb-4" />
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="text" lines={2} />
    </div>
)

// Skeleton para Works page
export const WorksGridSkeleton = ({ count = 6, className = '' }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
            <GridItemSkeleton key={index} />
        ))}
    </div>
)

// Skeleton para Bio section
export const BioSkeleton = ({ className = '' }) => (
    <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex space-x-4">
                <SkeletonLoader width="w-16" height="h-4" />
                <SkeletonLoader width="w-full" height="h-4" />
            </div>
        ))}
    </div>
)

export default SkeletonLoader
