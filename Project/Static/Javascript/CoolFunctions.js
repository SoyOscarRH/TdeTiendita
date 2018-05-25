// =========================================================
// ========             POST THE DATA            ===========
// =========================================================
export function SentData(URLWebsite, Data) {
    return fetch(URLWebsite, {
        headers: {
            'content-type': 'application/json',
            'accept':       'application/json'
        },
        body:        JSON.stringify(Data, null, '\t'), 
        cache:       'no-cache',
        credentials: 'same-origin',
        method:      'POST', 
        mode:        'cors', 
        redirect:    'follow',
        referrer:    'no-referrer',
    })
    .then(response => response.json())
}
