import { domainEntityModel } from '../models/entity.model';

export class EntityDao {
  async createEntity(entity: any): Promise<void> {
    await domainEntityModel.create(entity);
  }

  async deleteEntity(id: string): Promise<void> {
    await domainEntityModel.deleteOne({ id });
  }

  async findEndityById(id: string): Promise<any | null> {
    const user = await domainEntityModel.findOne({ id });
    return user
  }

}
