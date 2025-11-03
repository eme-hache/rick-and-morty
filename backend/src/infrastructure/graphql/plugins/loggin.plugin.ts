import { ApolloServerPlugin } from "@apollo/server";

export const loggin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    const start = Date.now();
    const operation = requestContext.request.operationName || "Anonymous";
    const variables = requestContext.request.variables;

    console.log(`[GRAPHQL]: ${operation}`);
    if (variables && Object.keys(variables).length > 0) {
      console.log(`[GRAPHQL]: Variables: ${JSON.stringify(variables)}`);
    }

    return {
      async willSendResponse() {
        const duration = Date.now() - start;
        console.log(`[GRAPHQL]: ${operation} - ${duration}ms\n`);
      },
    };
  },
};
