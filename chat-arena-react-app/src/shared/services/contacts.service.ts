import { config } from '../../config';

export default class ContactService {
	public async getContacts(userId: string, signal: AbortSignal) {
		return await fetch(config.apiUrl + '/api/contacts/' + userId, { signal }).then((response) => response.json());
	}
}
