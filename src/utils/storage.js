const KEY = "opencns_conversations";


export function saveConversations(conversations) {
    localStorage.setItem(
        KEY,
        JSON.stringify(conversations)
    );
}


export function loadConversations() {

    const data = localStorage.getItem(KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}


export function createConversation() {

    return {
        id: crypto.randomUUID(),
        title: "新的聊天",
        messages: [],
        createdAt: Date.now(),
    };
}

// 兼容旧版 App.jsx
export function loadConversation() {

    const conversations = loadConversations();

    if (conversations.length === 0) {
        return [];
    }

    return conversations[0].messages;
}


export function saveConversation(messages) {

    const conversations = loadConversations();

    if (conversations.length === 0) {

        conversations.push({
            id: crypto.randomUUID(),
            title: "新的聊天",
            messages,
            createdAt: Date.now(),
        });

    } else {

        conversations[0].messages = messages;

    }

    saveConversations(conversations);
}
