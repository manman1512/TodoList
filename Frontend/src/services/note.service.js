import axiosClient from "../axiosClient/index";
export default {
    createNote: (note, token) => {
        return axiosClient.post('/api/note/create', note, {
            headers: { Authorization: token }
        });
    },
    getAllNote: (token) => {
        return axiosClient.get('/api/note/', {
            headers: { Authorization: token }
        });
    },
    getNoteById: (id, token) => {
        return axiosClient.get(`/api/note/${id}`, {
            headers: { Authorization: token }
        });
    },
    updateNote: (id, note, token) => {
        return axiosClient.put(`/api/note/${id}`, note, {
            headers: { Authorization: token }
        });
    },
    deleteNoteById: (id, token) => {
        return axiosClient.delete(`/api/note/${id}`, {
            headers: { Authorization: token }
        });
    },
    deleteAll: (token) => {
        return axiosClient.delete('/api/note/delete', {
            headers: { Authorization: token }
        });
    },
}