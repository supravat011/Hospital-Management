import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, FileText } from 'lucide-react';
import { patientService } from '@/services/patientService';

interface AddMedicalRecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddMedicalRecordModal: React.FC<AddMedicalRecordModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        recordName: '',
        recordType: '',
        comments: '',
        recordFor: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                toast.error('File size should be less than 10MB');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('recordName', formData.recordName);
            formDataToSend.append('recordType', formData.recordType);
            formDataToSend.append('comments', formData.comments);
            formDataToSend.append('recordFor', formData.recordFor);
            if (file) {
                formDataToSend.append('file', file);
            }

            await patientService.addMedicalRecord(formDataToSend);
            toast.success('Medical record added successfully');
            setFormData({ recordName: '', recordType: '', comments: '', recordFor: '' });
            setFile(null);
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add medical record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Medical Record" size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="recordName">Record Name *</Label>
                    <Input
                        id="recordName"
                        name="recordName"
                        value={formData.recordName}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Blood Test Report"
                    />
                </div>

                <div>
                    <Label htmlFor="recordType">Record Type *</Label>
                    <select
                        id="recordType"
                        name="recordType"
                        value={formData.recordType}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select type</option>
                        <option value="Lab Report">Lab Report</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="MRI">MRI</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="Ultrasound">Ultrasound</option>
                        <option value="ECG">ECG</option>
                        <option value="Prescription">Prescription</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="recordFor">Record For *</Label>
                    <select
                        id="recordFor"
                        name="recordFor"
                        value={formData.recordFor}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select patient</option>
                        <option value="self">Self</option>
                        {/* Dependants will be loaded dynamically */}
                    </select>
                </div>

                <div>
                    <Label htmlFor="comments">Comments</Label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Add any notes or comments"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    />
                </div>

                <div>
                    <Label htmlFor="file">Upload File</Label>
                    <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {file ? (
                                    <>
                                        <FileText className="w-10 h-10 text-blue-500 mb-2" />
                                        <p className="text-sm text-gray-600">{file.name}</p>
                                        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400">PDF, JPG, PNG (MAX. 10MB)</p>
                                    </>
                                )}
                            </div>
                            <input
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Add Record'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMedicalRecordModal;
