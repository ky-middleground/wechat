import { config } from 'dotenv';
import { EntityDao } from '../src';
import { DBService } from 'ky-infrastructure-cloudplatform-service';

const env = config({ path: './test/.env' });
jest.setTimeout(60000);
describe('Engine Test', () => {
  beforeAll(async () => {
    await DBService.getInstance().connect();
  });

  afterAll(async () => {
    await DBService.getInstance().close();
  });

  test('create entity', async () => {
    const entityDao = new EntityDao();
    const entity = {};
    await entityDao.createEntity(entity);
  });
});
