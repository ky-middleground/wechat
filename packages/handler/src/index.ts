import { queryHandler } from './router/query.handler';
import { commandHandler } from './router/command.handler';

exports.query = async (event: any, context: any) => queryHandler.run(event, context);
exports.command = async (event: any, context: any) => commandHandler.run(event, context);
