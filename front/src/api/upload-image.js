import axios from 'axios';

export const uploadImage = async (formData) => {
	try {
		const { data } = await axios.post('/api/upload', formData);
		return data.url;
	} catch (err) {
		console.log(err);
		alert('Ошибка загрузки файла');
	}
};
