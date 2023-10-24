import { ApiLevelType, BaseHandler, ContextType, InputType } from '@ky-infra/handler-base';
import { DomainError } from '../handler.error';
import { EntityDao } from '@ky-infra/project-domain';

export class SingleHandler extends BaseHandler {
  protected defineApiLevel(): ApiLevelType {
    return 'User';
    // return 'None';
    // return 'Admin';
  }

  protected validateInput(input: InputType): void {
    const {phone, code} = input.data;
    if (!phone) {
      throw DomainError.EmptyPhoneNumber;
    }
    if (!code) {
      throw DomainError.EmptySMSCode;
    }
  }

  protected async internalHandle(_: InputType, __: ContextType): Promise<void> {
    console.log('hello world single handler')
    const entityDao = new EntityDao();
      const resp = await entityDao.createEntity({id: '1', shortId: '1', createdTime: new Date(), updatedTime: new Date()});
      console.log(await entityDao.findEndityById('1'));
  }
}

export const singleHandler = new SingleHandler();
