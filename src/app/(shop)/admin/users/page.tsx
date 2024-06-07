export const revalidate = 0
// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/components';

import { UsersTable } from './ui/UsersTable';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';

export default async function UsersPage() {

  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="All orders" />

      <div className='flex flex-col gap-4 pt-4'>
        <UsersTable users={users} />
        <Pagination totalPages={4} />
      </div>
    </>
  );
}