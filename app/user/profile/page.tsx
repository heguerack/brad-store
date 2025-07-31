import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
  title: `Custommer Profile`,
  description: 'A modern ecommerce store built with next js',
}
// beucase its a client componet we cant pull the sesion just like that we have to passit via the SessionProvider wrapper
export default async function profilePage() {
  const session = await auth()
  console.log('session :', session)

  return (
    <SessionProvider session={session}>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold'>Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  )
}
