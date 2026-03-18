# SetWemu - Authentication & Login API

## Overview
This module handles user authentication and profile management for the SetWemu platform. It integrates with Supabase Auth for secure credential management and seamlessly links authenticated users to our custom `profiles` table using UUIDs.

## Features
* **Secure User Login/Registration:** Powered by Supabase Authentication.
* **Profile Syncing:** Automatically connects the secure auth vault to the public `profiles` table.
* **Role-Based Access:** Supports `personal` and `business` user roles for tailored app experiences.
* **UUID Integration:** Uses secure, globally unique identifiers for all relational data.

## Database Schema (`profiles` table)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key, linked directly to Supabase `auth.users` |
| `email` | String | User's email address |
| `full_name` | String | User's display name |
| `role` | String | `personal` or `business` |
| `location` | String | User's primary city/location |

## Testing Locally
To test the login flow and endpoints locally, ensure your development database is seeded with our standard test accounts (Mueena, Dulmin, Oneth, Isa, and Diara):

\`\`\`bash
node src/scripts/seedData.js
\`\`\`

Once seeded, start the local server (`npm run dev`) and use Thunder Client to send POST requests to the authentication endpoints.
