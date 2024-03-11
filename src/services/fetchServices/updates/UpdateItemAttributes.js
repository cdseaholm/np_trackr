import fetch from 'node-fetch';

export async function UpdateItemAttributes(ipHandle, attributeToUpdate, itemid) {
        

    for (var i = 0; i < attributeToUpdate.length; i++) {
        const attribute = {
            id: attributeToUpdate[i].id,
            listid: attributeToUpdate[i].listid,
            itemid: attributeToUpdate[i].itemid,
            value: attributeToUpdate[i].value,
            type: attributeToUpdate[i].type,
            placeholder: attributeToUpdate[i].placeholder,
            name: attributeToUpdate[i].name
        };
        const toUpdate = {
            itemid: itemid,
            value: attribute.value,
        };
        console.log('toUpdate:', toUpdate);
        const params = new URLSearchParams(toUpdate).toString();
        const url = `${ipHandle}/update/${attribute.id}?${params}`;
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
            console.error('There has been a problem with your fetch operation and item:', attributeToUpdate[i], error);
        }
    }
    
}