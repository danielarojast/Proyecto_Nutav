async function getClients(){
    const response = await fetch('http://localhost:8080/api/v1/clients')
    const data = await response.json()
    console.log(data);
    console.log(data.content);
}

console.log(":,V");
getClients()