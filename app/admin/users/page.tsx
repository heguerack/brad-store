import { getAllUsersAction } from '@/actions/users/getAllUsersAction'
import { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { authGuard } from '@/helperFuntions/authGuard'
import { formattUUID } from '@/helperFuntions/formatUUID'
import Link from 'next/link'
import DeleteDialog from '@/components/shared/DeleteDialog'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import { deleteSingleUserAction } from '@/actions/users/deleteSingleUserAction'
import { Badge } from '@/components/ui/badge'

const metadata: Metadata = {
  title: 'Admin Users',
}

export default async function adminUsersPage(props: {
  searchParams: Promise<{ page: string; query: string }>
}) {
  await authGuard()
  const { page = 1, query: searchText } = await props.searchParams
  const users = await getAllUsersAction({
    page: Number(page),
    query: searchText,
  })
  // console.log(users)

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold'>Users</h1>
        {searchText && (
          <div className=''>
            Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
            <Link href={'/admin/users'}>
              <Button size='sm'>Remove Filter</Button>
            </Link>
          </div>
        )}
      </div>
      <div className='space-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formattUUID(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === 'user' ? (
                    <Badge variant={'secondary'}>User</Badge>
                  ) : (
                    <Badge variant={'destructive'}>Admin</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Button asChild size={'sm'}>
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteSingleUserAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages && (
          <Pagination page={Number(page) || 1} totalPages={users.totalPages} />
        )}
      </div>
    </div>
  )
}
