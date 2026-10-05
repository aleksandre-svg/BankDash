import Transaction from "./Transaction"
import { useState, useEffect } from "react"
import { ArrowUpCircle, ArrowDownCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const TransactionsInfo = ({ transactionsInfo }) => {
  const [filterTransaction, setFilterTransaction] = useState('all')
  const [transactions, setTransactions] = useState(transactionsInfo)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5

  const filteredList = transactionsInfo.filter(transaction => {
    if (filterTransaction === 'income') return !transaction.isExpense
    if (filterTransaction === 'expense') return transaction.isExpense
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage))
  const array = []
  for (let i = 1; i <= totalPages; i++) {
    array.push(i)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [filterTransaction])

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    setTransactions(filteredList.slice(indexOfFirstItem, indexOfLastItem))
  }, [filterTransaction, currentPage, transactionsInfo])

  return (
    <>
      <div>
        <div className="flex items-center gap-[60px] border-b border-[#EBEEF2]">
          <button 
            className={`pb-[12px] font-semibold text-[16px] border-b-[3px] px-[10px] transition-all ${
              filterTransaction === 'all' 
                ? "text-[#1814F3] border-[#1814F3]" 
                : "text-[#718EBF] border-transparent hover:text-[#1814F3]"
            }`} 
            onClick={() => setFilterTransaction('all')}
          >
            All Transactions
          </button>
          <button 
            className={`pb-[12px] font-semibold text-[16px] px-[10px] border-b-[3px] transition-all ${
              filterTransaction === 'income' 
                ? "text-[#1814F3] border-[#1814F3]" 
                : "text-[#718EBF] border-transparent hover:text-[#1814F3]"
            }`} 
            onClick={() => setFilterTransaction('income')}
          >
            Income
          </button>
          <button 
            className={`pb-[12px] font-semibold text-[16px] px-[10px] border-b-[3px] transition-all ${
              filterTransaction === 'expense' 
                ? "text-[#1814F3] border-[#1814F3]" 
                : "text-[#718EBF] border-transparent hover:text-[#1814F3]"
            }`} 
            onClick={() => setFilterTransaction('expense')}
          >
            Expense
          </button>
        </div>

        <hr className="text-[#EBEEF2] pb-[25px]" />

        <div className="w-full p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-medium">
                  <th className="py-3 px-4 font-[500] text-[16px]">Description</th>
                  <th className="py-3 px-4 font-[500] text-[16px]">Transaction ID</th>
                  <th className="py-3 px-4 font-[500] text-[16px]">Type</th>
                  <th className="py-3 px-4 font-[500] text-[16px]">Card</th>
                  <th className="py-3 px-4 font-[500] text-[16px]">Date</th>
                  <th className="py-3 px-4 font-[500] text-[16px]">Amount</th>
                  <th className="py-3 px-4 font-[500] text-[16px] text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {transactions?.map((tx, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-800">
                      <div className="flex items-center gap-3">
                        {
                          tx.isExpense ?
                            <ArrowUpCircle className="w-6 h-6 text-slate-400 stroke-[1.5]" /> :
                            <ArrowDownCircle className="w-6 h-6 text-slate-400 stroke-[1.5]" />
                        }
                        <span>{tx.description}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-600">{tx.id}</td>
                    <td className="py-4 px-4 text-slate-600">{tx.type}</td>
                    <td className="py-4 px-4 text-slate-600">{tx.card}</td>
                    <td className="py-4 px-4 text-slate-600">{tx.date}</td>

                    <td className={`py-4 px-4 font-semibold ${tx.isExpense ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                      {tx.amount}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          const receiptContent = `
========================================
        TRANSACTION RECEIPT
========================================
Transaction ID : ${tx.id}
Description    : ${tx.description}
Type           : ${tx.type}
Card           : ${tx.card}
Date           : ${tx.date}
Amount         : ${tx.amount}
Status         : Completed
========================================
Thank you for your business!
`
                          const blob = new Blob([receiptContent.trim()], { type: 'text/plain;charset=utf-8;' })
                          const url = URL.createObjectURL(blob)
                          const link = document.createElement('a')
                          link.href = url
                          link.setAttribute('download', `receipt-${tx.id.replace('#', '')}.txt`)
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                          URL.revokeObjectURL(url)
                        }}
                        className="px-4 py-1.5 text-xs font-medium text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 text-sm font-medium pt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-[#1814F3] font-[600] disabled:cursor-not-allowed transition-colors px-2 py-1"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {array.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm transition-all ${currentPage === page
                    ? 'bg-[#1814F3] text-white font-semibold shadow-sm'
                    : 'text-[#1814F3]'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 text-[#1814F3] font-[600] disabled:cursor-not-allowed transition-colors px-2 py-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </>
  )
}

export default TransactionsInfo