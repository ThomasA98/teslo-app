'use client'
import { changeUserRole } from "@/actions"
import { Role, User } from "@/interfaces"

export interface UsersTableProps {
    users: User[]
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <table className="min-w-full table-fixed">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Actualizar role
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={ user.id } className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 table-fixed">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    { user.email }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { user.name }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <select
                        value={ user.role }
                        onChange={ e => changeUserRole(user.id, e.target.value as Role) }
                        className="text-sm text-gray-900 w-full p-2"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
  )
}