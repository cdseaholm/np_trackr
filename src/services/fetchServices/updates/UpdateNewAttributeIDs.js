import fetch from 'node-fetch';

export async function UpdateNewAttributeIDs(ipHandle, updatedSheet, parentid, parent) {
    
    let parentIP = '/'
    if (parent === 'Item') {
        parentIP = '/item/attribute';
    } else {
        parentIP = '/attribute';
    }
    const baseIP = `${ipHandle}${parentIP}`;
    for (var i = 0; i < updatedSheet.length; i++) {
        const params = new URLSearchParams(parentid).toString();
        const url = `${baseIP}/update/${updatedSheet[i].id}?${params}`;
        console.log('url:', url);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation and item:', updatedSheet[i], error);
        }
    }

    return 'ok';
}