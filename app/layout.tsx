import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/contants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // title: `${APP_NAME} `,
  title: {
    template: `%s | Prostore`, //%s represents whatever the title for tat page is
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter} antialiased`}>
        <ThemeProvider
          attribute={'class'}
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
