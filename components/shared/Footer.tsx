import { APP_NAME } from '@/lib/contants'

export default function Footer({ currentYear }: { currentYear: number }) {
  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
        {currentYear} {APP_NAME} All rights Reserved
      </div>
    </footer>
  )
}
