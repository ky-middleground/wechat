
import { config } from 'dotenv';
import {DomainService} from "../src";

const env = config({ path: './test/.env' });
jest.setTimeout(60000);
describe('Serivce Test', () => {

  test('test service', async () => {
     await DomainService.getInstance().domainFunctionForOtherDomain()
  });

});
