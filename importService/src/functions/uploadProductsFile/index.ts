import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'PUT',
        path: 'uploaded/{name}',
        cors: true,
        request: {
          parameters: {
            paths: {
              name: true,
            }
          }
        }
      },
    },
  ],
};
