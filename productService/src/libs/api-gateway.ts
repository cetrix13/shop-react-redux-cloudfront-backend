export enum HttpCode {
  OK = 200,
  NOT_FOUND = 404,
}

export const formatJSONResponse = <T>(response: T | Array<T> | string, code: number = HttpCode.OK) => {
  return {
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    },
    statusCode: code,
    body: JSON.stringify(response)
  }
}
