import { config } from '../../config';

export default class ContactService {
	public async getContacts(userId: string) {
		return await fetch(config.apiUrl + '/api/contacts/' + userId,).then((response) => response.json());
	}
}
