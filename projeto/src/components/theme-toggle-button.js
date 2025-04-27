import React, { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'

const ThemeToggleButton = () => {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return undefined
        }
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme')
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    })

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'light') {
            root.classList.remove('dark')
        } else {
            root.classList.add('dark')
        }
    }, [theme])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return isMounted ? (
        <div className="inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600">
            <button
                className={`${theme === 'light' ? 'bg-white text-black' : ''} cursor-pointer rounded-3xl p-2`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                <IoSunny />
            </button>
            <button
                className={`${theme === 'dark' ? 'bg-white text-black' : ''} cursor-pointer rounded-3xl p-2`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                <IoMoon />
            </button>
        </div>
    ) : (
        <div />
    )
}

export default ThemeToggleButton