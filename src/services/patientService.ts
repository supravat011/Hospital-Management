import api from './api';

export const patientService = {
    getProfile: async () => {
        const response = await api.get('/patient/profile');
        return response.data;
    },

    updateProfile: async (data: any) => {
        const response = await api.put('/patient/profile', data);
        return response.data;
    },

    getVisitHistory: async () => {
        const response = await api.get('/patient/visits');
        return response.data;
    },

    getVisitDetails: async (visitId: string) => {
        const response = await api.get(`/patient/visits/${visitId}`);
        return response.data;
    },

    downloadVisitPDF: async (visitId: string) => {
        const response = await api.get(`/patient/visits/${visitId}/pdf`, {
            responseType: 'blob',
        });
        return response.data;
    },

    getVisitScans: async (visitId: string) => {
        const response = await api.get(`/patient/visits/${visitId}/scans`);
        return response.data;
    },

    downloadScan: async (scanId: string) => {
        const response = await api.get(`/patient/scans/${scanId}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },

    sendQuery: async (data: { doctorId: string; visitId?: string; question: string }) => {
        const response = await api.post('/patient/queries', data);
        return response.data;
    },

    getQueries: async () => {
        const response = await api.get('/patient/queries');
        return response.data;
    },

    // Notifications
    getNotifications: async () => {
        const response = await api.get('/patient/notifications');
        return response.data;
    },

    markNotificationRead: async (id: string) => {
        const response = await api.put(`/patient/notifications/${id}/read`);
        return response.data;
    },

    // Dependants
    getDependants: async () => {
        const response = await api.get('/patient/dependants');
        return response.data;
    },

    addDependant: async (data: any) => {
        const response = await api.post('/patient/dependants', data);
        return response.data;
    },

    updateDependant: async (id: string, data: any) => {
        const response = await api.put(`/patient/dependants/${id}`, data);
        return response.data;
    },

    deleteDependant: async (id: string) => {
        const response = await api.delete(`/patient/dependants/${id}`);
        return response.data;
    },

    // Favourites
    getFavourites: async () => {
        const response = await api.get('/patient/favourites');
        return response.data;
    },

    addFavourite: async (doctorId: string) => {
        const response = await api.post(`/patient/favourites/${doctorId}`);
        return response.data;
    },

    removeFavourite: async (doctorId: string) => {
        const response = await api.delete(`/patient/favourites/${doctorId}`);
        return response.data;
    },

    // Vitals
    addVitals: async (data: any) => {
        const response = await api.post('/patient/vitals', data);
        return response.data;
    },

    getVitals: async () => {
        const response = await api.get('/patient/vitals');
        return response.data;
    },

    // Medical Records
    addMedicalRecord: async (data: any) => {
        const response = await api.post('/patient/medical-records', data);
        return response.data;
    },

    getMedicalRecords: async () => {
        const response = await api.get('/patient/medical-records');
        return response.data;
    },

    deleteMedicalRecord: async (id: string) => {
        const response = await api.delete(`/patient/medical-records/${id}`);
        return response.data;
    },

    // Security
    changePassword: async (data: { currentPassword: string; newPassword: string }) => {
        const response = await api.put('/patient/change-password', data);
        return response.data;
    },

    // Settings
    updateNotificationSettings: async (data: any) => {
        const response = await api.put('/patient/notification-settings', data);
        return response.data;
    },
};

