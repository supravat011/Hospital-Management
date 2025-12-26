import api from './api';

export const authService = {
    // Patient authentication
    patientSignup: async (data: {
        name: string;
        age: number;
        bloodGroup: string;
        height: number;
        weight: number;
        mobileNumber: string;
        password: string;
    }) => {
        const response = await api.post('/auth/patient/signup', data);
        return response.data;
    },

    patientLogin: async (identifier: string, password: string) => {
        const response = await api.post('/auth/patient/login', { identifier, password });
        return response.data;
    },

    // Doctor authentication
    doctorSignup: async (data: {
        name: string;
        age: number;
        phoneNumber: string;
        email: string;
        medicalLicenseNumber: string;
        specialization: string;
        hospitalName: string;
        hospitalAddress: string;
        password: string;
    }) => {
        const response = await api.post('/auth/doctor/signup', data);
        return response.data;
    },

    doctorLogin: async (identifier: string, password: string) => {
        const response = await api.post('/auth/doctor/login', { identifier, password });
        return response.data;
    },
};
