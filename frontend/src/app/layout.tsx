import './globals.css'
import { ThemeProvider, useTheme } from "@/components/themeComponent/themeProvider"

export const metadata = {
  title: 'Cinewave',
  description: 'Generated by Ruka && Quadds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
    
    <body className="flex">
      <ThemeProvider>
    
      {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
