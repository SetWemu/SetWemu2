import { supabase } from '../config/db.js'; 

export const subscribeToChat = (conversationId, onNewMessage) => {
    console.log(` Listening for live messages in room: ${conversationId}`);

    const channel = supabase
        .channel(`room_${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            },
            (payload) => {
                console.log(" New message arrived!", payload.new);
                onNewMessage(payload.new); // This passes the message to your frontend screen
            }
        )
        .subscribe();

    return channel;
};

export const unsubscribeFromChat = (channel) => {
    if (channel) {
        supabase.removeChannel(channel);
        console.log("🔌 Disconnected from chat.");
    }
};