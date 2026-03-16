# SetWemu - Social Posts API

## Overview
This module handles the social feed functionality for the SetWemu platform. It allows users to create new posts (text and optional images) and fetches a chronological timeline of activity. The feed automatically joins post data with the author's profile information to reduce the number of API calls required by the frontend.

## Location
* **Controller:** `src/controllers/postController.js`
* **Routes:** `src/routes/postRoutes.js`

## Endpoints

### 1. Create a Post
**`POST /api/posts/`**
Creates a new social feed post.

**Request Body:**
\`\`\`json
{
  "profileId": "123e4567-e89b-12d3-a456-426614174000",
  "content": "Just got my tickets for the Kandy Esala Expo! Who else is going? 🎉",
  "imageUrl": "https://example.com/images/expo.jpg" 
}
\`\`\`
*(Note: `imageUrl` is optional and can be omitted).*

**Expected Response (201 Created):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "987fcdeb-51a2-43d7-9012-345678901234",
    "profile_id": "123e4567-e89b-12d3-a456-426614174000",
    "content": "Just got my tickets for the Kandy Esala Expo! Who else is going? 🎉",
    "image_url": "https://example.com/images/expo.jpg",
    "created_at": "2026-03-16T10:00:00Z"
  }
}
\`\`\`

### 2. Get the Timeline Feed
**`GET /api/posts/feed`**
Fetches all posts, ordered by newest first. Automatically includes the author's display name and role.

**Expected Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "987fcdeb-51a2-43d7-9012-345678901234",
      "content": "Just got my tickets for the Kandy Esala Expo! Who else is going? 🎉",
      "image_url": "https://example.com/images/expo.jpg",
      "created_at": "2026-03-16T10:00:00Z",
      "profiles": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "oneth",
        "full_name": "Oneth Kurukulasuriya",
        "role": "business"
      }
    }
  ]
}
\`\`\`

## Database Schema (`posts` table)
To support this API, the Supabase database must contain a `posts` table with the following structure:

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key, auto-generated |
| `profile_id` | UUID | Foreign Key linking to `profiles.id` |
| `content` | Text | The text body of the post |
| `image_url` | Text | (Optional) URL to an attached image |
| `created_at` | Timestamp | Auto-generated timestamp |
