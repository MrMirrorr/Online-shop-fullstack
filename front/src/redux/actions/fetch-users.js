import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const usersRes = await axios.get(`/api/users`, { timeout: 3000 });
			const rolesRes = await axios.get('/api/users/roles', { timeout: 3000 });

			const {
				data: { data: roles },
			} = rolesRes;

			const {
				data: { data: users, error },
			} = usersRes;

			return { users, roles, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchUsers', rejectWithValue);
		}
	},
);
