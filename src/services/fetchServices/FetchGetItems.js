import fetch from 'node-fetch';

export async function FetchGetItems(ipHandle) {
    const response = await fetch(ipHandle, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log('Data:', data);
    return data;
}

export async function FetchGetAllItems(ipHandle) {
    const response = await fetch(ipHandle, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    } else {
        const data = await response.json();
        console.log('Data:', data);
        return data;
    }
}