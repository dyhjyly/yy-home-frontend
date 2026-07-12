const KEY = "opencns_conversation";


export function saveConversation(messages) {
    localStorage.setItem(
        KEY,
        JSON.stringify(messages)
    );
}


export function loadConversation() {
    const data = localStorage.getItem(KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}


export function clearConversation() {
    localStorage.removeItem(KEY);
}
