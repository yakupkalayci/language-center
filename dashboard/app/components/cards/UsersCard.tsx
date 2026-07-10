'use client';
import Link from "next/link";
import { useGetUsers } from "@/app/hooks/useGetUsers";
import Pagination from "../pagination/Pagination";

function UsersCard({ type }: { type: 'page' | 'card' }) {
  const { isLoading, error, data, pageIndex, setPageIndex } = useGetUsers();

  return (
    <div className='col-span-24 h-full rounded-lg bg-white p-6 shadow-[0px_8px_24px_rgba(149,157,165,0.2)] transition-all duration-300 mt-6'>
      <div className="flex mb-4 items-center justify-between">
        <p className="font-[700]">Kullanıcılar</p>
        {
          type === 'card' && <Link href="/users">Sayfaya Git</Link>
        }
      </div>
      <table className="w-full border-separate border-spacing-y-4">
        {
          isLoading ? (
            <p>Yükleniyor..</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    İsim
                  </th>
                  <th>
                    Eposta
                  </th>
                  <th>
                    Üyelik Tarihi
                  </th>
                  {
                    type === 'page' && (
                      <>
                        <th>Roller</th>
                        <th>İşlemler</th>
                      </>
                    )
                  }
                </tr>
              </thead>
              <tbody className="text-center">
                {
                  data?.users.map(item => (
                    <tr key={item.id}>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.firstName} {item.lastName}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.email}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                      {
                        type === 'page' && (
                          <>
                            <td className="border-b border-[#A0AEC0] pb-4">
                              {item.role.join(",")}
                            </td>
                            <td className="border-b border-[#A0AEC0] pb-4">
                              <div className="flex justify-center items-center gap-2">
                                <button className="bg-blue-500 text-white px-4 rounded-md cursor-pointer">
                                  {item.role.includes("ADMIN") ? 'Adminlikten çıkar' : 'Admin Yap'}
                                </button>
                                <button className="bg-red-500 text-white px-4 rounded-md cursor-pointer">Sil</button>
                              </div>
                            </td>
                          </>
                        )
                      }
                    </tr>
                  )
                  )
                }
              </tbody>
            </>
          )
        }
      </table>
      {(data?.pagination.totalPages || 0) > 1 && type === 'page' && (
        <Pagination
          totalPages={data?.pagination.totalPages || 0}
          pageIndex={pageIndex}
          onPageChange={(page) => setPageIndex(page)}
        />
      )}
    </div>
  )
}

export default UsersCard;