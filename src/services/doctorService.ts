import api from './api';

export const doctorService = {
    getProfile: async () => {
        const response = await api.get('/doctor/profile');
        return response.data;
    },

    searchPatient: async (query: string) => {
        const response = await api.get(`/doctor/patients/search?query=${query}`);
        return response.data;
    },

    addVisit: async (data: {
        patientId: string;
        diagnosis: string;
        tablets?: string[];
        tabletTimings?: string;
        foodInstructions?: string;
        bloodPressure?: string;
        spo2?: number;
        heartRate?: number;
    }) => {
        const response = await api.post('/doctor/visits', data);
        return response.data;
    },

    uploadScanReports: async (visitId: string, files: FileList) => {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('scans', file);
        });

        const response = await api.post(`/doctor/visits/${visitId}/scans`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getAllPatients: async () => {
        const response = await api.get('/doctor/patients');
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/doctor/stats');
        return response.data;
    },

    getPatientVisits: async (patientId: string) => {
        const response = await api.get(`/doctor/patients/${patientId}/visits`);
        return response.data;
    },

    getQueries: async (status?: string) => {
        const url = status ? `/doctor/queries?status=${status}` : '/doctor/queries';
        const response = await api.get(url);
        return response.data;
    },

    replyToQuery: async (queryId: string, answer: string) => {
        const response = await api.put(`/doctor/queries/${queryId}`, { answer });
        return response.data;
    },

    updateProfile: async (data: any) => {
        const response = await api.put('/doctor/profile', data);
        return response.data;
    },

    getAppointments: async (status?: string, limit?: number) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (limit) params.append('limit', limit.toString());
        const response = await api.get(`/doctor/appointments?${params.toString()}`);
        return response.data;
    },

    getUpcomingAppointment: async () => {
        const response = await api.get('/doctor/appointments/upcoming');
        return response.data;
    },

    getInvoices: async (status?: string, limit?: number) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (limit) params.append('limit', limit.toString());
        const response = await api.get(`/doctor/invoices?${params.toString()}`);
        return response.data;
    },

    getWeeklyAnalytics: async () => {
        const response = await api.get('/doctor/analytics/weekly');
        return response.data;
    },

    changePassword: async (data: any) => {
        const response = await api.put('/doctor/change-password', data);
        return response.data;
    },

    // ==================== SCHEDULE MANAGEMENT ====================

    getSchedule: async () => {
        const response = await api.get('/doctor/schedule');
        return response.data;
    },

    updateSchedule: async (data: { schedule: any; appointmentFee: number }) => {
        const response = await api.put('/doctor/schedule', data);
        return response.data;
    },

    // ==================== REVIEWS ====================

    getReviews: async () => {
        const response = await api.get('/doctor/reviews');
        return response.data;
    },

    replyToReview: async (reviewId: string, reply: string) => {
        const response = await api.put(`/doctor/reviews/${reviewId}/reply`, { reply });
        return response.data;
    },

    markReviewHelpful: async (reviewId: string) => {
        const response = await api.put(`/doctor/reviews/${reviewId}/helpful`);
        return response.data;
    },

    // ==================== ACCOUNTS & PAYOUTS ====================

    getAccountStats: async () => {
        const response = await api.get('/doctor/accounts/stats');
        return response.data;
    },

    getPayouts: async () => {
        const response = await api.get('/doctor/payouts');
        return response.data;
    },

    requestPayment: async () => {
        const response = await api.post('/doctor/accounts/request-payment');
        return response.data;
    },

    updateBankDetails: async (data: {
        bankName: string;
        accountNumber: string;
        branchName: string;
        accountName: string;
    }) => {
        const response = await api.put('/doctor/accounts/bank-details', data);
        return response.data;
    },

    updatePayoutMethod: async (method: 'stripe' | 'paypal') => {
        const response = await api.put('/doctor/payout-method', { method });
        return response.data;
    },

    // ==================== MESSAGES ====================

    getConversations: async () => {
        const response = await api.get('/doctor/conversations');
        return response.data;
    },

    getMessages: async (conversationId: string) => {
        const response = await api.get(`/doctor/conversations/${conversationId}/messages`);
        return response.data;
    },

    sendMessage: async (conversationId: string, receiverId: string, message: string) => {
        const response = await api.post(`/doctor/conversations/${conversationId}/messages`, {
            receiverId,
            message
        });
        return response.data;
    },

    markMessageAsRead: async (messageId: string) => {
        const response = await api.put(`/doctor/messages/${messageId}/read`);
        return response.data;
    },

    // ==================== SOCIAL MEDIA & SERVICES ====================

    updateSocialMedia: async (socialMedia: any) => {
        const response = await api.put('/doctor/social-media', { socialMedia });
        return response.data;
    },

    updateServices: async (services: string[]) => {
        const response = await api.put('/doctor/services', { services });
        return response.data;
    },

    // ==================== APPOINTMENT REQUESTS ====================

    getAppointmentRequests: async () => {
        const response = await api.get('/doctor/appointments/requests');
        return response.data;
    },

    acceptAppointmentRequest: async (appointmentId: string) => {
        const response = await api.put(`/doctor/appointments/requests/${appointmentId}/accept`);
        return response.data;
    },

    rejectAppointmentRequest: async (appointmentId: string) => {
        const response = await api.put(`/doctor/appointments/requests/${appointmentId}/reject`);
        return response.data;
    },

    updateAppointmentStatus: async (appointmentId: string, status: string) => {
        const response = await api.put(`/doctor/appointments/${appointmentId}/status`, { status });
        return response.data;
    },
};
