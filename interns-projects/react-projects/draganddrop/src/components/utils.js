const fetchurl = async function (url,body,headers,method) {
    const response = await fetch(url,{
        method: method,
        headers: headers,
        body: body
    });
    return await response.json();
}