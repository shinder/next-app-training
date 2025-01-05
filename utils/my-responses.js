

export function responseJson(data, status = 200) {
  const response = new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
