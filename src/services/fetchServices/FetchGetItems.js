import fetch from 'node-fetch';


export async function FetchGetItems(ipHandle) {
    let itemContents = [];
    if (ipHandle === `${EXPO_PUBLIC_LIST_TYPE_IP_URL}/listTypes`) {
        itemContents = {
            name: '',
            category: ''
        };
    } else if (ipHandle === `${EXPO_PUBLIC_RANKER_ITEM_IP_URL}`) {
        itemContents = {
            name: '',
            category: '',
            notes: '',
            rank: ''
        };
    } else if (ipHandle === `${EXPO_PUBLIC_TRACKER_ITEM_IP_URL}`) {
        itemContents = {
            name: '',
            category: '',
            notes: ''
        };
    } else if (ipHandle === `${EXPO_PUBLIC_CUSTOM_ITEM_IP_URL}`) {
        itemContents = {
            name: '',
            category: '',
            notes: ''
        };
    } else {
        console.log('Error: FetchGetItems');
    }

    const response = await fetch(ipHandle, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log('Data:', data);
    items = data.map((item) => {
        return itemContents
    });
    return items;
}