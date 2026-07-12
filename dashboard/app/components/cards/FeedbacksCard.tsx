'use client';
import Link from "next/link";
import Pagination from "../pagination/Pagination";
import { useFeedbacks } from "@/app/hooks/useFeedbacks";

function FeedbacksCard({ type }: { type: 'page' | 'card' }) {
  const { isLoading, error, data, pageIndex, setPageIndex } = useFeedbacks();


  return (
    <div className='col-span-24 h-full rounded-lg bg-white p-6 shadow-[0px_8px_24px_rgba(149,157,165,0.2)] transition-all duration-300 mt-6'>
      <div className="flex mb-4 items-center justify-between">
        <p className="font-[700]">Mesajlar</p>
        {
          type === 'card' && <Link href="/feedbacks">Sayfaya Git</Link>
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
                    Konu
                  </th>
                  <th>
                    Mesaj
                  </th>
                  <th>
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {
                  data?.feedbacks.map(item => (
                    <tr key={item.id}>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.name}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.email}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.subject}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{item.message}</td>
                      <td className="border-b border-[#A0AEC0] pb-4">{new Date(item.createdAt).toLocaleDateString()}</td>
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

export default FeedbacksCard;