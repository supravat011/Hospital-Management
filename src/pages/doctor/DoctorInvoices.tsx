import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Printer, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const DoctorInvoices = () => {
    const navigate = useNavigate();

    // Mock Data matching the reference image
    const invoices = [
        {
            id: '#Inv-2021',
            patientName: 'Edalin Hendry',
            patientImage: 'https://i.pravatar.cc/150?u=10',
            aptDate: '24 Mar 2024',
            bookedOn: '21 Mar 2024',
            amount: '$300'
        },
        {
            id: '#Inv-2021',
            patientName: 'John Homes',
            patientImage: 'https://i.pravatar.cc/150?u=11',
            aptDate: '17 Mar 2024',
            bookedOn: '14 Mar 2024',
            amount: '$450'
        },
        {
            id: '#Inv-2021',
            patientName: 'Shanta Neill',
            patientImage: 'https://i.pravatar.cc/150?u=12',
            aptDate: '11 Mar 2024',
            bookedOn: '07 Mar 2024',
            amount: '$250'
        },
        {
            id: '#Inv-2021',
            patientName: 'Anthony Tran',
            patientImage: 'https://i.pravatar.cc/150?u=13',
            aptDate: '26 Feb 2024',
            bookedOn: '23 Feb 2024',
            amount: '$320'
        },
        {
            id: '#Inv-2021',
            patientName: 'Susan Lingo',
            patientImage: 'https://i.pravatar.cc/150?u=14',
            aptDate: '18 Feb 2024',
            bookedOn: '15 Feb 2024',
            amount: '$480'
        },
        {
            id: '#IApt123',
            patientName: 'Joseph Boyd',
            patientImage: 'https://i.pravatar.cc/150?u=15',
            aptDate: '10 Feb 2024',
            bookedOn: '07 Feb 2024',
            amount: '$260'
        },
        {
            id: '#Inv-2021',
            patientName: 'Juliet Gabriel',
            patientImage: 'https://i.pravatar.cc/150?u=16',
            aptDate: '28 Jan 2024',
            bookedOn: '25 Jan 2024',
            amount: '$350'
        }
    ];

    const handlePrint = (id: string) => {
        toast.info(`Printing invoice ${id}...`);
    };

    const handleView = (id: string) => {
        toast.info(`Viewing invoice ${id}...`);
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-gray-900">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Invoices</h1>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-sm">
                    <Input
                        placeholder="Search"
                        className="pl-4 h-11 rounded-xl border-gray-200 bg-white shadow-sm"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border boundary-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-100/50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Patient</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Appointment Date</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Booked on</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.map((invoice, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <button className="text-sm font-bold text-blue-500 hover:text-blue-600 hover:underline">
                                            {invoice.id}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={invoice.patientImage}
                                                alt={invoice.patientName}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                            <span className="text-sm font-semibold text-slate-700">
                                                {invoice.patientName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        {invoice.aptDate}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        {invoice.bookedOn}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                        {invoice.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleView(invoice.id)}
                                                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePrint(invoice.id)}
                                                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </div>
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
                <button className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-200">1</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-sm hover:bg-gray-50">2</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-sm hover:bg-gray-50">3</button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-slate-600 font-bold text-sm hover:bg-gray-50">4</button>
                <span className="w-9 h-9 flex items-center justify-center text-slate-400">...</span>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default DoctorInvoices;
