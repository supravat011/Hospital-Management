import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { patientService } from '@/services/patientService';

interface AddVitalsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddVitalsModal: React.FC<AddVitalsModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bloodPressure: '',
        heartRate: '',
        glucoseLevel: '',
        bodyTemperature: '',
        weight: '',
        height: '',
        spo2: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateBMI = () => {
        if (formData.weight && formData.height) {
            const heightInMeters = parseFloat(formData.height) / 100;
            const bmi = parseFloat(formData.weight) / (heightInMeters * heightInMeters);
            return bmi.toFixed(1);
        }
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const bmi = calculateBMI();
            await patientService.addVitals({
                bloodPressure: formData.bloodPressure,
                heartRate: parseInt(formData.heartRate),
                glucoseLevel: formData.glucoseLevel,
                bodyTemperature: parseFloat(formData.bodyTemperature),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                spo2: parseInt(formData.spo2),
                bmi: bmi ? parseFloat(bmi) : undefined
            });
            toast.success('Vitals recorded successfully');
            setFormData({
                bloodPressure: '',
                heartRate: '',
                glucoseLevel: '',
                bodyTemperature: '',
                weight: '',
                height: '',
                spo2: ''
            });
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to record vitals');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Vitals" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="bloodPressure">Blood Pressure *</Label>
                        <Input
                            id="bloodPressure"
                            name="bloodPressure"
                            value={formData.bloodPressure}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 120/80"
                        />
                    </div>

                    <div>
                        <Label htmlFor="heartRate">Heart Rate (BPM) *</Label>
                        <Input
                            id="heartRate"
                            name="heartRate"
                            type="number"
                            value={formData.heartRate}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 72"
                            min="30"
                            max="250"
                        />
                    </div>

                    <div>
                        <Label htmlFor="glucoseLevel">Glucose Level *</Label>
                        <Input
                            id="glucoseLevel"
                            name="glucoseLevel"
                            value={formData.glucoseLevel}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 70-90"
                        />
                    </div>

                    <div>
                        <Label htmlFor="bodyTemperature">Body Temperature (°C) *</Label>
                        <Input
                            id="bodyTemperature"
                            name="bodyTemperature"
                            type="number"
                            step="0.1"
                            value={formData.bodyTemperature}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 37.5"
                            min="30"
                            max="45"
                        />
                    </div>

                    <div>
                        <Label htmlFor="weight">Weight (kg) *</Label>
                        <Input
                            id="weight"
                            name="weight"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 70"
                            min="1"
                            max="500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="height">Height (cm) *</Label>
                        <Input
                            id="height"
                            name="height"
                            type="number"
                            step="0.1"
                            value={formData.height}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 170"
                            min="30"
                            max="300"
                        />
                    </div>

                    <div>
                        <Label htmlFor="spo2">SpO2 (%) *</Label>
                        <Input
                            id="spo2"
                            name="spo2"
                            type="number"
                            value={formData.spo2}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 96"
                            min="50"
                            max="100"
                        />
                    </div>

                    <div className="flex items-end">
                        <div className="w-full">
                            <Label>BMI (Calculated)</Label>
                            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                {calculateBMI() || 'Enter weight & height'}
                            </div>
                        </div>
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
                        {loading ? 'Recording...' : 'Record Vitals'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddVitalsModal;
