import React from 'react';
import {
    CreditCard,
    Lock,
    Sliders,
    Radio,
    Snowflake,
    AlertTriangle,
    FileText,
} from "lucide-react";

const GoogleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24">
        <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
        />
        <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
        />
        <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.2-1.3 0-5z"
        />
        <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
        />
    </svg>
);

const AppleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D9488">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.1-.98.04-2.18.66-2.88 1.48-.62.72-1.16 1.88-.99 3.01 1.1.09 2.21-.57 2.88-1.39z" />
    </svg>
);

const settingsOptions = [
    {
        id: 1,
        title: "Block Card",
        subtitle: "Instantly block your card",
        bgColor: "bg-[#FFF6E5]",
        icon: (
        <div className="relative">
            <CreditCard className="w-6 h-6 text-[#F59E0B]" />
            <span className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px] font-bold">
                -
            </span>
        </div>
        ),
    },
    {
        id: 2,
        title: "Change Pin Code",
        subtitle: "Choose another pin code",
        bgColor: "bg-[#EBF3FF]",
        icon: <Lock className="w-6 h-6 text-[#3B82F6]" />,
    },
    {
        id: 3,
        title: "Add to Google Pay",
        subtitle: "Withdraw without any card",
        bgColor: "bg-[#FFEBF0]",
        icon: <GoogleIcon />,
    },
    {
        id: 4,
        title: "Add to Apple Pay",
        subtitle: "Withdraw without any card",
        bgColor: "bg-[#E6F9F6]",
        icon: <AppleIcon />,
    },
    {
        id: 5,
        title: "Add to Apple Store",
        subtitle: "Withdraw without any card",
        bgColor: "bg-[#E6F9F6]",
        icon: <AppleIcon />,
    },
    {
        id: 6,
        title: "Set Online Limit",
        subtitle: "Manage daily online spending",
        bgColor: "bg-[#F3E8FF]",
        icon: <Sliders className="w-6 h-6 text-[#A855F7]" />,
    },
    {
        id: 7,
        title: "Contactless Payment",
        subtitle: "Enable or disable NFC tap",
        bgColor: "bg-[#CCFBF1]",
        icon: <Radio className="w-6 h-6 text-[#14B8A6]" />,
    },
    {
        id: 8,
        title: "Freeze Card",
        subtitle: "Temporarily pause card activity",
        bgColor: "bg-[#E0F2FE]",
        icon: <Snowflake className="w-6 h-6 text-[#0284C7]" />,
    },
    {
        id: 9,
        title: "Report Lost or Stolen",
        subtitle: "Instantly flag card security issue",
        bgColor: "bg-[#FFEDD5]",
        icon: <AlertTriangle className="w-6 h-6 text-[#F97316]" />,
    },
    {
        id: 10,
        title: "Card Statements",
        subtitle: "Download monthly PDFs",
        bgColor: "bg-[#E0E7FF]",
        icon: <FileText className="w-6 h-6 text-[#6366F1]" />,
    },
];

const CardSetting = () => {
    return (
        <div className="bg-white rounded-[28px] p-6 border border-slate-100/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {settingsOptions.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="flex items-center gap-4 text-left group hover:bg-slate-50/80 p-2 -m-2 rounded-2xl transition-colors duration-150 w-full">
                        
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.bgColor} transition-transform duration-150 group-hover:scale-105`}>
                            {item.icon}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-[#232323] font-medium text-base leading-tight truncate">
                                {item.title}
                            </span>
                            <span className="text-[#8BA3CB] text-xs font-normal mt-1 truncate">
                                {item.subtitle}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CardSetting