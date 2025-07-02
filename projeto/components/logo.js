import Link from 'next/link'
import FootprintIcon from './icons/footprint'
import { useTheme } from '../lib/theme-context'

const Logo = () => {
  const { isDark } = useTheme()

  return (
    <Link href="/" className="inline-flex items-center h-8 px-3 font-bold text-lg group">
      <FootprintIcon className="transition-transform duration-200 group-hover:rotate-[20deg]" />
      <span
        className={`font-heading font-bold ml-3 ${isDark ? 'text-gray-100' : 'text-gray-800'
          }`}
      >
        Rivero
      </span>
    </Link>
  )
}

export default Logo
