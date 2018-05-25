// =========================================================
// ========             POST THE DATA            ===========
// =========================================================
export function SentData(URLWebsite, Data) {
        return fetch(URLWebsite, {
            body: JSON.stringify(Data, null, '\t'), 
            cache:       'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                'accept':       'application/json'
            },
            method:   'POST', 
            mode:     'cors', 
            redirect: 'follow',
            referrer: 'no-referrer',
        })
        .then(response => response.json())
    }

