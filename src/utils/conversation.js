const KEY = "opencns_conversations";


export function loadConversations() {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}


export function saveConversations(conversations) {
  localStorage.setItem(
    KEY,
    JSON.stringify(conversations)
  );
}


export function createConversation() {

  const conversation = {
    id: crypto.randomUUID(),
    title: "新对话",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [],
  };

  const conversations = loadConversations();

  conversations.unshift(conversation);

  saveConversations(conversations);

  return conversation;
}


export function deleteConversation(id){

  const conversations =
    loadConversations()
    .filter(item => item.id !== id);

  saveConversations(conversations);

}


export function renameConversation(id,title){

  const conversations =
    loadConversations()
    .map(item => {

      if(item.id === id){

        return {
          ...item,
          title,
          updatedAt:Date.now()
        };

      }

      return item;

    });


  saveConversations(conversations);

}


export function updateConversation(conversation){

  const conversations =
    loadConversations()
    .map(item =>
      item.id === conversation.id
        ? {
            ...conversation,
            updatedAt:Date.now()
          }
        : item
    );


  saveConversations(conversations);

}
