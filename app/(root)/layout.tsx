// app/your-nested-route/layout.tsx

import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/header'

export const revalidate = 60 * 60 * 24 * 30 // ✅ revalidate every 30 days

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear()

  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer currentYear={currentYear} />
    </div>
  )
}
