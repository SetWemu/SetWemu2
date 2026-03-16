# SetWemu - Realtime Chat Utility

## Overview
This module handles the live, bidirectional WebSocket connection between the SetWemu frontend and the Supabase database. Instead of relying on manual API polling (HTTP GET requests) to fetch new messages, this utility listens for database insert events and instantly broadcasts them to the active chat room.

## Location
`src/utils/chatRealtime.js`

## Features
* **Instant Message Delivery:** Powered by Supabase Realtime (`postgres_changes`).
* **Room-Specific Channels:** Filters incoming database changes so users only receive messages for the specific `conversationId` they are currently viewing.
* **Memory Management:** Includes a dedicated cleanup function to disconnect from channels when a user leaves a chat screen.

## Database Prerequisites
For this utility to work, the Supabase database must be configured to broadcast changes for the `messages` table. This is handled via the following SQL command:
\`\`\`sql
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
\`\`\`
*(Note: This has already been executed on the current Supabase instance).*

## Usage Example (Frontend Integration)
Here is how you can import and use this utility inside a React Native component or frontend screen:

