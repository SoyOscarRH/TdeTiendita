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



// =========================================================
// ========             POST THE DATA            ===========
// =========================================================
function toTitleCase(StringData) {
    return StringData.replace(/\w\S*/g, function(Text) {
        return Text.charAt(0).toUpperCase() + Text.substr(1).toLowerCase()})
}


export function CapitalizeFirstLetter(StringData) { return StringData && StringData[0].toUpperCase() + StringData.slice(1)}

export function ShowCuteMode(StringData) {

    const SpecialWords = [
        [" De", " de"],
        [" Con", " con"], 
        [" Gr", " gr"], 
        ["0 G", "0 g"], 
        [" Grs", " grs"], 
        [" Ml", " ml"], 
        [" Mon,", " Lunes"], 
        [" Tue,", " Martes"], 
        [" Wed,", " Miercoles"], 
        [" Thu,", " Jueves"], 
        [" Fri,", " Viernes"], 
        [" Sat,", " Sábado"], 
        [" Sun,", " Domingo"], 
        [" Jan,", " Enero"], 
        [" Feb,", " Febrero"], 
        [" Mar,", " Marzo"], 
        [" Apr,", " Abril"], 
        [" May,", " Mayo"], 
        [" Jun,", " Junio"], 
        [" Jul,", " Julio"], 
        [" Sep,", " Septiembre"], 
        [" Oct,", " Octubre"], 
        [" Nov,", " Noviembre"], 
        [" Dec,", " Diciembre"], 
    ]

    StringData = toTitleCase(StringData)
    SpecialWords.forEach( (Change) => StringData = StringData.replace(Change[0], Change[1]) )

    return StringData
}

