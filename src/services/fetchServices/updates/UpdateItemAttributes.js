import fetch from 'node-fetch';

export async function UpdateItemAttributes(ipHandle, attributeToUpdate, itemid) {
        
        const toUpdate = {
            itemid: itemid,
            value: attributeToUpdate.value,
        };
        console.log('toUpdate:', toUpdate);
        const params = new URLSearchParams(toUpdate).toString();
        const url = `${ipHandle}/update/${attributeToUpdate.id}?${params}`;
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
            } else {
                return response;
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation and item:', attributeToUpdate, error);
        }
    
    
}