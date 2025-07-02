import { forwardRef, useState } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import { useTheme } from '../lib/theme-context'
import { IoLogoGithub } from 'react-icons/io5'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const { isDark } = useTheme()
  const inactiveColor = isDark ? 'text-white/90' : 'text-gray-200'

  return (
    <NextLink
      href={href}
      className={`px-2 py-2 rounded transition-colors duration-200 ${active
        ? 'bg-primary-500 text-white'
        : `${inactiveColor} hover:bg-gray-100 dark:hover:bg-gray-800`
        }`}
      target={target}
      {...props}
    >
      {children}
    </NextLink>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <NextLink ref={ref} {...props} />
))
MenuLink.displayName = 'MenuLink'

const Navbar = props => {
  const { path } = props
  const { isDark } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className={`fixed w-full backdrop-blur-glass z-50 ${isDark ? 'bg-gray-900/50' : 'bg-white/50'
        }`}
      {...props}
    >
      <div className="container-custom flex items-center justify-between p-2">
        <div className="flex items-center mr-5">
          <h1 className="text-lg font-bold tracking-tight">
            <Logo />
          </h1>
        </div>

        <div className="hidden md:flex items-center flex-grow space-x-4">
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            Wallpapers
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/joaovrivero/rivero-homepage"
            path={path}
            className="inline-flex items-center space-x-1 pl-2"
          >
            <IoLogoGithub />
            <span>Source</span>
          </LinkItem>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggleButton />

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <NextLink href="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  About
                </NextLink>
                <NextLink href="/works" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Works
                </NextLink>
                <NextLink href="/wallpapers" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Wallpapers
                </NextLink>
                <a
                  href="https://github.com/joaovrivero/rivero-homepage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Source
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
