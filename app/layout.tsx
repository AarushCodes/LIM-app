import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '7 Habits app',
  description: 'Learn and practice the 7 Habits of Highly Effective People for your age group', 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="text-center py-4 text-sm text-gray-500">
          Created by Aarush Khilosia
        </footer>
      </body>
    </html>
  )
}
