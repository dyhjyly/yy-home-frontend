const API_URL = "https://jyly.online/chat";

export async function chat(message, history = []) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            history,
        }),
    });

    if (!response.ok) {
        throw new Error("Network Error");
    }

    return response.json();
}