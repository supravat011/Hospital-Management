import React from 'react';
import { Button } from '@/components/ui/button';
import PatientSidebar from '@/components/PatientSidebar';
import { Wallet as WalletIcon, CreditCard, DollarSign } from 'lucide-react';

const PatientWallet = () => {
    // Mock Data based on the mockup
    const TRANSACTIONS = [
        {
            id: '#AC1234',
            accountNo: '5396 5250 1908 XXXX',
            reason: 'Appointment',
            date: '26 Mar 2024',
            amount: '$300',
            status: 'Completed'
        },
        {
            id: '#AC3656',
            accountNo: '6372 4902 4902 XXXX',
            reason: 'Appointment',
            date: '28 Mar 2024',
            amount: '$480',
            status: 'Completed'
        },
        {
            id: '#AC1246',
            accountNo: '4892 0204 4924 XXXX',
            reason: 'Appointment',
            date: '11 Apr 2024',
            amount: '$250',
            status: 'Completed'
        },
        {
            id: '#AC6985',
            accountNo: '5730 4892 0492 XXXX',
            reason: 'Refund',
            date: '18 Apr 2024',
            amount: '$220',
            status: 'Pending'
        },
        {
            id: '#AC3659',
            accountNo: '7922 9024 5824 XXXX',
            reason: 'Appointment',
            date: '29 Apr 2024',
            amount: '$350',
            status: 'Completed'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Wallet" />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>

                    {/* Wallet Summary Card */}
                    <div className="bg-[#0b132b] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">

                            {/* Left Side: Stats */}
                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    {/* Balance Box */}
                                    <div className="border border-gray-700/50 rounded-xl p-4 flex-1 bg-[#1a203c]/40 backdrop-blur-sm">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm">
                                            <span className="text-yellow-400">●</span> Total Balance
                                        </div>
                                        <div className="text-3xl font-bold">$1200</div>
                                    </div>

                                    {/* Transaction Box */}
                                    <div className="border border-gray-700/50 rounded-xl p-4 flex-1 bg-[#1a203c]/40 backdrop-blur-sm">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm">
                                            <span className="text-green-400">■</span> Total Transaction
                                        </div>
                                        <div className="text-3xl font-bold">$2300</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm text-gray-400">Last Payment request : 24 Mar 2023</p>
                                    <Button className="bg-[#009ef7] hover:bg-[#008bd9] text-white rounded-full px-6">
                                        Add Payment
                                    </Button>
                                </div>
                            </div>

                            {/* Right Side: Bank Details */}
                            <div className="space-y-6 lg:border-l lg:border-gray-700/50 lg:pl-10">
                                <h3 className="text-xl font-semibold">Bank Details</h3>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div>
                                        <p className="text-gray-400 mb-1">Bank Name</p>
                                        <p className="font-medium">Citi Bank Inc</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1">Account Number</p>
                                        <p className="font-medium">5396 5250 1908 XXXX</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1">Branch Name</p>
                                        <p className="font-medium">London</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1">Account Name</p>
                                        <p className="font-medium">Darren</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 text-sm pt-2">
                                    <button className="text-[#009ef7] hover:underline">Edit Details</button>
                                    <button className="text-[#009ef7] hover:underline">Add Cards</button>
                                    <button className="text-[#009ef7] hover:underline ml-auto">Other Accounts</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Table */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#e9ecef]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Account No</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Debited / Credited On</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {TRANSACTIONS.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                                                {txn.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {txn.accountNo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {txn.reason}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {txn.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {txn.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${txn.status === 'Completed'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-yellow-50 text-yellow-600'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${txn.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'
                                                        }`}></span>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PatientWallet;
