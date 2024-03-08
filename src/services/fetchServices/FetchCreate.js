import fetch from 'node-fetch';

export async function FetchCreate(itemContent, ipHandle) {

  var ipHandle = `${ipHandle}/create`;
  const response = await fetch(ipHandle, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemContent)
  });
  return response 
}