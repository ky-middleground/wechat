
import { config } from 'dotenv';
import * as request from 'superagent';

const env = config({ path: './deploy/.env.test' });
jest.setTimeout(60000);
describe('Handler Test', () => {
  const baseUrl =  'https://api-dev.ky.com';
  const salt = 'xxxxxxxx';
  const token = 'xxxxxxxxxx';
  const encryptData = (data: string): string => {
    return ''
  };
  const decrptData = (data: string): string => {
    return ''
  };

  test('test demo', async () => {
    const scfUrl = '/domain/path1';
    const requestUrl = `${baseUrl}${scfUrl}`;
    try {
      const result = await request.get(requestUrl).set('t', new Date().getTime().toString()).set('token', token);
      if (result.ok) {
        const { data } = result.body;
        if (data) {
          console.log(data)
        }
      } else {
        console.warn( result.error);
      }
    } catch (error) {
      console.error( requestUrl, error);
    }
  });

});
