import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8000'
});

const API = {
	getPDFFile: () => {
		return instance.get('/crypto.pdf');
	},

	uploadFile: (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return instance.post('/uploads', formData);
	}
};

export default API;