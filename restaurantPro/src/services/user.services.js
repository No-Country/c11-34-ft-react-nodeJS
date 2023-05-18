const API_URL = 'https://ncback-production.up.railway.app/api/usuarios'

export async function postUser (newUser) {

    const config = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }

    try {
        const response = await fetch(API_URL, config)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}