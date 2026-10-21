import { useState } from "react";
import {
    CreditCard,
    User,
    Calendar,
    Hash,
    ChevronDown,
    PlusCircle,
    ShieldCheck,
    Info,
} from "lucide-react";

export default function AddCardForm() {
    const [cardType, setCardType] = useState("Classic");
    const [nameOnCard, setNameOnCard] = useState("Aleksandre Dzukaevi");
    const [cardNumber, setCardNumber] = useState("5399 4820 1234 5600");
    const [expirationDate, setExpirationDate] = useState("25 January 2028");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100/80 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1814F3] via-[#2A26FF] to-[#6366F1] rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-indigo-100 min-h-[190px]">
            <div className="flex justify-between items-center">
                <div>
                <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">
                    {cardType || "Card Type"}
                </p>
                <p className="text-lg font-bold tracking-tight mt-0.5">
                    Bank Card
                </p>
                </div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="my-3">
                <p className="text-xs text-indigo-200 mb-1">Card Number</p>
                <p className="font-mono text-lg sm:text-xl font-medium tracking-widest text-white/90">
                {cardNumber || "**** **** **** ****"}
                </p>
            </div>

            <div className="flex justify-between items-end pt-2 border-t border-white/15">
                <div>
                <p className="text-[10px] uppercase text-indigo-200">Card Holder</p>
                <p className="text-xs font-semibold tracking-wide truncate max-w-[150px]">
                    {nameOnCard || "FULL NAME"}
                </p>
                </div>
                <div>
                <p className="text-[10px] uppercase text-indigo-200">Expires</p>
                <p className="text-xs font-semibold tracking-wide">
                    {expirationDate || "MM/YY"}
                </p>
                </div>
            </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50/70 border border-slate-100 rounded-2xl p-6">
            <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-[#1814F3] rounded-xl shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
                </div>
                <div>
                <h4 className="text-base font-semibold text-[#232323] mb-1">
                    About Credit Card Issuance
                </h4>
                <p className="text-[#718EBF] text-xs sm:text-sm leading-relaxed">
                    Credit Card generally means a plastic card issued by Scheduled
                    Commercial Banks assigned to a Cardholder, with a credit limit,
                    that can be used to purchase goods and services on credit or
                    obtain cash advances.
                </p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-3.5 py-2 rounded-xl text-xs font-medium mt-4">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>256-bit SSL Bank-Grade Encryption Guaranteed</span>
            </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-semibold flex items-center gap-1.5">
                    <span>Card Type</span>
                </label>
                <div className="relative">
                <input
                    type="text"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    placeholder="Classic, Platinum, Gold"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 text-[#232323] placeholder-[#8BA3CB] text-sm focus:outline-none focus:border-[#1814F3] focus:ring-4 focus:ring-indigo-50 transition-all bg-white"
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-semibold">
                Name On Card
                </label>
                <div className="relative">
                <input
                    type="text"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 text-[#232323] placeholder-[#8BA3CB] text-sm focus:outline-none focus:border-[#1814F3] focus:ring-4 focus:ring-indigo-50 transition-all bg-white"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-semibold">
                Card Number
                </label>
                <div className="relative">
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="**** **** **** ****"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 text-[#232323] placeholder-[#8BA3CB] text-sm focus:outline-none focus:border-[#1814F3] focus:ring-4 focus:ring-indigo-50 transition-all bg-white font-mono"
                />
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-semibold">
                Expiration Date
                </label>
                <div className="relative">
                <input
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    placeholder="25 January 2028"
                    className="w-full h-12 pl-11 pr-10 rounded-2xl border border-slate-200 text-[#232323] placeholder-[#8BA3CB] text-sm focus:outline-none focus:border-[#1814F3] focus:ring-4 focus:ring-indigo-50 transition-all bg-white cursor-pointer"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF] pointer-events-none" />
                </div>
            </div>
            </div>

            <div className="pt-4 flex items-center justify-start gap-4">
            <button
                type="submit"
                className="flex items-center gap-2 px-8 h-12 bg-[#1814F3] hover:bg-[#120FD1] text-white font-medium text-sm rounded-2xl transition-all duration-150 shadow-md shadow-indigo-200 active:scale-95"
            >
                <PlusCircle className="w-4 h-4" />
                <span>Add Card</span>
            </button>
            <button
                type="button"
                className="px-6 h-12 bg-slate-100 hover:bg-slate-200 text-[#718EBF] hover:text-[#232323] font-medium text-sm rounded-2xl transition-colors duration-150"
            >
                Cancel
            </button>
            </div>
        </form>
        </div>
    )
}