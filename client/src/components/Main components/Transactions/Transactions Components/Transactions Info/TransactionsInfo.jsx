import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { UserContext } from '../../../../../App'
import { ArrowUpCircle, ArrowDownCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 5

const TransactionsInfo = ({ transactionsInfo = [] }) => {
  const { currentUser } = useContext(UserContext)
  const [filterTransaction, setFilterTransaction] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const currentUserId = Number(currentUser?.id)

  const isIncome = useCallback((tx) => {
    const isOwner = Number(tx.transaction_owner) === currentUserId
    return (tx.transation_result && isOwner) || (!tx.transation_result && !isOwner)
  }, [currentUserId])

  const filteredList = useMemo(() => {
    return transactionsInfo.filter((tx) => {
      if (filterTransaction === 'income') return isIncome(tx)
      if (filterTransaction === 'expense') return !isIncome(tx)
      return true
    })
  }, [transactionsInfo, filterTransaction, isIncome])

  const totalPages = Math.max(1, Math.ceil(filteredList.length / ITEMS_PER_PAGE))

  useEffect(() => {
    setCurrentPage(1)
  }, [filterTransaction])

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredList.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredList, currentPage])

  const handleDownloadReceipt = useCallback((tx) => {
    const receiptContent = `
========================================
        TRANSACTION RECEIPT
========================================
Transaction ID : ${tx.id}
Description    : ${tx.description}
Type           : ${tx.transaction_type}
Card           : ${tx.card}
Date           : ${tx.date}
Amount         : ${tx.balance}
Status         : Completed
========================================
Thank you for your business!
`.trim()

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt-${String(tx.id).replace('#', '')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  const handleFilterChange = useCallback((type) => {
    setFilterTransaction(type)
  }, [])

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handlePageSelect = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const renderFilterButton = useCallback((type, label) => (
    <button
      key={type}
      type="button"
      className={`pb-[12px] font-semibold text-[16px] px-[10px] border-b-[3px] transition-all cursor-pointer ${
        filterTransaction === type
          ? "text-[#1814F3] border-[#1814F3]"
          : "text-[#718EBF] border-transparent hover:text-[#1814F3]"
      }`}
      onClick={() => handleFilterChange(type)}
    >
      {label}
    </button>
  ), [filterTransaction, handleFilterChange])

  const tableBodyContent = useMemo(() => {
    if (paginatedTransactions.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="py-8 text-center text-[#718EBF] text-sm">
            No transactions found.
          </td>
        </tr>
      )
    }

    return paginatedTransactions.map((tx, index) => {
      const income = isIncome(tx)
      const formattedBalance = Math.abs(parseFloat(tx.balance) || 0).toLocaleString()

      return (
        <tr key={tx.id || index} className="hover:bg-slate-50/50 transition-colors">
          <td className="py-4 px-4 font-medium text-slate-800">
            <div className="flex items-center gap-3">
              {income ? (
                <ArrowUpCircle className="w-6 h-6 text-emerald-500 stroke-[1.5]" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-rose-500 stroke-[1.5]" />
              )}
              <span>{tx.description || 'Transaction'}</span>
            </div>
          </td>

          <td className="py-4 px-4 text-slate-600 font-mono">{tx.id}</td>
          <td className="py-4 px-4 text-slate-600 capitalize">{tx.transaction_type}</td>
          <td className="py-4 px-4 text-slate-600">ID: {tx.card}</td>
          <td className="py-4 px-4 text-slate-600">
            {tx.date ? new Date(tx.date).toLocaleDateString() : 'N/A'}
          </td>

          <td className={`py-4 px-4 font-semibold ${income ? 'text-emerald-500' : 'text-rose-500'}`}>
            {income ? '+' : '-'}${formattedBalance}
          </td>

          <td className="py-4 px-4 text-right">
            <button
              type="button"
              onClick={() => handleDownloadReceipt(tx)}
              className="px-4 py-1.5 text-xs font-medium text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Download
            </button>
          </td>
        </tr>
      )
    })
  }, [paginatedTransactions, isIncome, handleDownloadReceipt])

  return (
    <div>
      <div className="flex items-center gap-[60px] max-md:[10px] border-b border-[#EBEEF2]">
        {renderFilterButton('all', 'All Transactions')}
        {renderFilterButton('income', 'Income')}
        {renderFilterButton('expense', 'Expense')}
      </div>

      <div className="text-[#EBEEF2] pb-[25px]" />

      <div className="w-full p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-sm font-medium">
                <th className="py-3 px-4 font-medium text-[16px]">Description</th>
                <th className="py-3 px-4 font-medium text-[16px]">Transaction ID</th>
                <th className="py-3 px-4 font-medium text-[16px]">Type</th>
                <th className="py-3 px-4 font-medium text-[16px]">Card</th>
                <th className="py-3 px-4 font-medium text-[16px]">Date</th>
                <th className="py-3 px-4 font-medium text-[16px]">Amount</th>
                <th className="py-3 px-4 font-medium text-[16px] text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {tableBodyContent}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 text-sm font-medium pt-5">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 text-[#1814F3] font-semibold disabled:cursor-not-allowed disabled:opacity-50 transition-colors px-2 py-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageSelect(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#1814F3] text-white font-semibold shadow-sm'
                  : 'text-[#1814F3]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-[#1814F3] font-semibold disabled:cursor-not-allowed disabled:opacity-50 transition-colors px-2 py-1 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}

export default TransactionsInfo