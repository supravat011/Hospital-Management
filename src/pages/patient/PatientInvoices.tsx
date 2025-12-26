import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Link as LinkIcon, Download } from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';
import { generateInvoicePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

const PatientInvoices = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data based on the mockup
    const INVOICES = [
        {
            id: '#INV1236',
            doctor: { name: 'Edalin Hendry', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
            apptDate: '24 Mar 2024',
            bookedOn: '21 Mar 2024',
            amount: '$300'
        },
        {
            id: '#NV3656',
            doctor: { name: 'John Homes', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
            apptDate: '17 Mar 2024',
            bookedOn: '14 Mar 2024',
            amount: '$450'
        },
        {
            id: '#INV1246',
            doctor: { name: 'Shanta Neill', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
            apptDate: '11 Mar 2024',
            bookedOn: '07 Mar 2024',
            amount: '$250'
        },
        {
            id: '#INV6985',
            doctor: { name: 'Anthony Tran', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
            apptDate: '26 Feb 2024',
            bookedOn: '23 Feb 2024',
            amount: '$320'
        },
        {
            id: '#INV3659',
            doctor: { name: 'Susan Lingo', image: 'https://randomuser.me/api/portraits/women/28.jpg' },
            apptDate: '18 Feb 2024',
            bookedOn: '15 Feb 2024',
            amount: '$480'
        }
    ];

    const handleDownload = (invoice: any) => {
        try {
            generateInvoicePDF({
                id: invoice.id,
                doctor: invoice.doctor.name,
                date: invoice.apptDate,
                bookedOn: invoice.bookedOn,
                amount: invoice.amount
            });
            toast.success('Invoice downloaded successfully');
        } catch (error) {
            toast.error('Failed to download invoice');
        }
    };

    const filteredInvoices = INVOICES.filter(inv =>
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Invoices" />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white border-gray-200"
                            />
                        </div>
                    </div>

                    {/* Invoices Table */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#e9ecef]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Appointment Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Booked on</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredInvoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                                                {inv.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={inv.doctor.image}
                                                        alt={inv.doctor.name}
                                                        className="w-8 h-8 rounded-lg object-cover"
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">{inv.doctor.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {inv.apptDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {inv.bookedOn}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {inv.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200"
                                                        onClick={() => toast.info('View invoice details')}
                                                    >
                                                        <LinkIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors border border-gray-200"
                                                        onClick={() => handleDownload(inv)}
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
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
                        <Button variant="outline" size="sm" className="h-8 text-xs">Prev</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">1</Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs bg-blue-600 text-white">2</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">3</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">4</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">Next</Button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PatientInvoices;
