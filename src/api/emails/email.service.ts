import data from '../../mock.json';
import { filter } from '../../utils/filter';

export class EmailService {
  static async getEmail(email: string, number: string) {
    return data.filter(item => {
      if (!number) return filter(item.email, email);

      // return filter(item.email, email) || filter(item.number, number);
      return filter(item.email, email) && filter(item.number, number);
    });
  }
}
