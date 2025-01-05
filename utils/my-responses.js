

export function responseJson(data) {
  const response = new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
