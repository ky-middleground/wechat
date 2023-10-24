import { KyError } from '@ky-infra/handler-base';

const domainKey = 'User'
export namespace DomainError {
  export const EmptyPhoneNumber = KyError.create(domainKey, '空电话号码', 1);
  export const EmptySMSCode = KyError.create(domainKey, '空短信码', 2);
}
