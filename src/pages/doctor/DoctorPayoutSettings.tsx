import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DoctorPayoutSettings = () => {
    const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal'>('paypal');

    // Mock Payout History
    const payouts = [
        { date: '24 Mar 2024', method: 'Paypal', amount: '$300', status: 'Completed' },
        { date: '24 Mar 2024', method: 'Paypal', amount: '$200', status: 'Completed' },
        { date: '25 Mar 2024', method: 'Paypal', amount: '$300', status: 'Completed' },
        { date: '24 Mar 2024', method: 'Paypal', amount: '$300', status: 'Completed' },
        { date: '24 Mar 2024', method: 'Paypal', amount: '$300', status: 'Completed' },
        { date: '24 Mar 2024', method: 'Paypal', amount: '$300', status: 'Completed' },
        { date: '27 Mar 2024', method: 'Paypal', amount: '$200', status: 'Completed' },
        { date: '29 Mar 2024', method: 'Paypal', amount: '$350', status: 'Completed' },
        { date: '24 Mar 2024', method: 'Paypal', amount: '$100', status: 'Completed' },
        { date: '04 Apr 2024', method: 'Paypal', amount: '$180', status: 'Completed' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">

            {/* Dark Settings Header */}
            <Card className="bg-[#020b2d] border-none text-white rounded-2xl mb-8 overflow-hidden shadow-xl">
                <CardContent className="p-8">
                    <h1 className="text-xl font-bold mb-2">Settings</h1>
                    <p className="text-sm text-gray-300 mb-8 pb-6 border-b border-gray-700">
                        All the earning will be sent to below selected payout method
                    </p>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Stripe Card */}
                        <div
                            className={`bg-white rounded-lg p-6 w-56 relative cursor-pointer transition-all ${selectedMethod === 'stripe' ? 'ring-2 ring-green-400' : ''}`}
                            onClick={() => setSelectedMethod('stripe')}
                        >
                            {selectedMethod === 'stripe' && (
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 font-sans">stripe</h3>
                            <Button variant="secondary" size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200 w-full justify-start gap-2">
                                <Settings className="w-3.5 h-3.5" />
                                Configure
                            </Button>
                        </div>

                        {/* PayPal Card */}
                        <div
                            className={`bg-white rounded-lg p-6 w-56 relative cursor-pointer transition-all ${selectedMethod === 'paypal' ? 'ring-2 ring-green-400' : ''}`}
                            onClick={() => setSelectedMethod('paypal')}
                        >
                            {selectedMethod === 'paypal' && (
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-blue-500 mb-6 font-sans italic">PayPal</h3>
                            <Button variant="secondary" size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200 w-full justify-start gap-2">
                                <Settings className="w-3.5 h-3.5" />
                                Configure
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payouts Section */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Payouts</h2>

                {/* Search */}
                <div className="mb-6 relative max-w-xs">
                    <Input
                        placeholder="Search"
                        className="pl-4 pr-10 h-11 rounded-lg border-gray-200 bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200/50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Payment Method</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payouts.map((payout, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">{payout.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium text-blue-400">{payout.method}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-bold">{payout.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {payout.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
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
        </div>
    );
};

export default DoctorPayoutSettings;
