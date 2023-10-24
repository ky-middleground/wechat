import { BaseRouteHandler } from '@ky-infra/handler-base';
import { singleHandler } from '../handlers/single.handler';
export class CommandHandler extends BaseRouteHandler {
  protected registerHandlers(): void {
    this.registerHandler('/domain_name/url/path', 'POST', singleHandler);
  }
}
export const commandHandler = new CommandHandler();
