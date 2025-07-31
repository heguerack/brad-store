import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import UpdateUserForm from './UpdateUserForm'

export const metadata: Metadata = {
  title: 'Update User',
}

export default async function adminUserUpdatePage(props: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await props.params
  const user = await getSingleUserByIdAction(id)
  if (!user) notFound()
  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h2 className='he-bold'>Update User</h2>
      <UpdateUserForm user={user} />
    </div>
  )
}
