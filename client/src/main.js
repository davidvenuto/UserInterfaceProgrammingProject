export async function fetchData(route = '', data = {}, methodType = 'GET') {
    const response = await fetch(`http://localhost:5000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: methodType !== 'GET' ? JSON.stringify(data) : null
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Something went wrong');
    }
}
