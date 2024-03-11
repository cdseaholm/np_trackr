import fetch from 'node-fetch';

export async function UpdateItemAttributes(ipHandle, updatedSheet, parentid, newValue) {
    

    for (var i = 0; i < updatedSheet.length; i++) {
        const toUpdate = {
            listid: parentid,
            value: newValue
        };
        const params = new URLSearchParams(toUpdate).toString();
        const url = `${ipHandle}/update/${updatedSheet[i]}?${params}`;
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