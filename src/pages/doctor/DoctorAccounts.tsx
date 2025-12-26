import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card'; // We'll custom style this, or just use div for the dark card
import { ArrowLeft, Search, Link as LinkIcon, ChevronLeft, ChevronRight, Wallet, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const DoctorAccounts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'accounts' | 'refund'>('accounts');

    // Mock Data matching reference image
    const transactions = [
        {
            id: '#AC-1234',
            requestedDate: '24 Mar 2024',
            accountNo: '5396 5250 1908 XXXX',
            creditedOn: '26 Mar 2024',
            amount: '$300',
            status: 'Completed'
        },
        {
            id: '#AC-1235',
            requestedDate: '28 Mar 2024',
            accountNo: '8833 8942 9013 XXXX',
            creditedOn: '30 Mar 2024',
            amount: '$400',
            status: 'Completed'
        },
        {
            id: '#AC-1236',
            requestedDate: '02 Apr 2024',
            accountNo: '8920 4041 4725 XXXX',
            creditedOn: '04 Apr 2024',
            amount: '$350',
            status: 'Cancelled'
        },
        {
            id: '#AC-1237',
            requestedDate: '10 Apr 2024',
            accountNo: '5730 4892 0492 XXXX',
            creditedOn: '12 Apr 2024',
            amount: '$220',
            status: 'Pending'
        },
        {
            id: '#AC-1238',
            requestedDate: '16 Apr 2024',
            accountNo: '7922 9024 5824 XXXX',
            creditedOn: '18 Apr 2024',
            amount: '$470',
            status: 'Completed'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-teal-600 text-white';
            case 'Cancelled': return 'bg-red-600 text-white';
            case 'Pending': return 'bg-yellow-400 text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    const handleRequestPayment = () => {
        toast.success("Payment request sent successfully!");
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-gray-900">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
            </div>

            {/* Top Stats Card (Dark Blue) */}
            <div className="bg-[#020b2d] rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">

                    {/* Left: Statistics */}
                    <div className="flex-1">
                        <h2 className="text-lg font-bold mb-6">Statistics</h2>
                        <div className="flex gap-4 mb-6 text-white">
                            {/* Stats Box 1 */}
                            <div className="border border-white/20 rounded-lg p-4 w-32 md:w-40 flex flex-col justify-between h-24">
                                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                                    <div className="w-1 h-3 bg-green-400"></div>
                                    <span className="leading-tight">Total<br />Balance</span>
                                </div>
                                <p className="text-2xl font-bold">$900</p>
                            </div>

                            {/* Stats Box 2 */}
                            <div className="border border-white/20 rounded-lg p-4 w-32 md:w-40 flex flex-col justify-between h-24">
                                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                                    <div className="w-1 h-3 bg-orange-400"></div>
                                    <span className="leading-tight">Earned</span>
                                </div>
                                <p className="text-2xl font-bold">$906</p>
                            </div>

                            {/* Stats Box 3 */}
                            <div className="border border-white/20 rounded-lg p-4 w-32 md:w-40 flex flex-col justify-between h-24">
                                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                                    <HelpCircle className="w-3 h-3 text-pink-500" />
                                    <span className="leading-tight">Requested</span>
                                </div>
                                <p className="text-2xl font-bold">$50</p>
                            </div>
                        </div>

                        <p className="text-sm font-medium text-white/70 mb-6">Last Payment request : 24 Mar 2023</p>

                        <button
                            onClick={handleRequestPayment}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Request Payment
                        </button>
                    </div>

                    {/* Right: Bank Details */}
                    <div className="flex-1 border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-0 xl:pl-16">
                        <h2 className="text-lg font-bold mb-6">Bank Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                            <div>
                                <p className="text-xs font-medium text-white/60 mb-1">Bank Name</p>
                                <p className="text-base font-bold">Citi Bank Inc</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-white/60 mb-1">Account Number</p>
                                <p className="text-base font-bold">5396 5250 1908 XXXX</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-white/60 mb-1">Branch Name</p>
                                <p className="text-base font-bold">London</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-white/60 mb-1">Account Name</p>
                                <p className="text-base font-bold">Darren</p>
                            </div>
                        </div>

                        <div className="flex gap-4 text-sm font-medium">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">Edit Details</button>
                            <span className="text-white/20">|</span>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">Other Accounts</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('accounts')}
                    className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'accounts'
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Accounts
                </button>
                <button
                    onClick={() => setActiveTab('refund')}
                    className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'refund'
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Refund Request
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-bold" />
                    <Input
                        placeholder="Search"
                        className="pl-9 h-10 rounded-lg border-gray-200 bg-white shadow-sm placeholder:font-medium text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Requested Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Account No</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Credited On</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {transactions.map((tx, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-500">
                                        {tx.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {tx.requestedDate}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {tx.accountNo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {tx.creditedOn}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-bold">
                                        {tx.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md tracking-wide ${getStatusColor(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all">
                                            <LinkIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-slate-500">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-200">1</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-xs hover:bg-gray-50">2</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-xs hover:bg-gray-50">3</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-xs hover:bg-gray-50">4</button>
                <span className="w-9 h-9 flex items-center justify-center text-slate-400 text-xs">...</span>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default DoctorAccounts;
