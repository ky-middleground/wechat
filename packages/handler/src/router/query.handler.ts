import { BaseRouteHandler } from '@ky-infra/handler-base';
import { singleHandler } from '../handlers/single.handler';
export class QueryHandler extends BaseRouteHandler {
  protected registerHandlers(): void {
    this.registerHandler('/domain_name/url/path', 'GET', singleHandler);
  }
}
export const queryHandler = new QueryHandler();
