export const formatJSONResponse = <T>(response: T | Array<T>) => {
  return {
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    },
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
