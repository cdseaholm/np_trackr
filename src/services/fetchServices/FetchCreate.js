import fetch from 'node-fetch';

export async function FetchCreate(itemContent, ipHandle) {

    const response = fetch(`${ipHandle}/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( 
          itemContent )
      });
  return response 

}