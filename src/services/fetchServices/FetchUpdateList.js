import fetch from 'node-fetch';

export async function UpdateList(ipHandle, updatedSheet) {

    const params = new URLSearchParams(updatedSheet).toString();

    const url = `${ipHandle}?${params}`;
    try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
} catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
}

    return 'ok';
}