// Theme provider replacement for Chakra UI
import { ThemeProvider } from '../lib/theme-context'

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  }
}