# SetWemu - Analytics API

## Overview
This module provides real-time data aggregation for event organizers on the SetWemu platform. It calculates key performance metrics—specifically total page views, ticket sales volume, and gross revenue—by pulling relational data directly from the Supabase database.

## Location
* **Controller:** `src/controllers/analyticsController.js`
* **Routes:** `src/routes/analyticsRoutes.js`

## Location
* **Controller:** `src/controllers/analyticsController.js`
* **Routes:** `src/routes/analyticsRoutes.js`

## Endpoints
### `GET /api/analytics/:eventId`
Fetches the analytics dashboard data for a specific event.

**Expected JSON Response (Success):**
```json
{
  "success": true,
  "data": {
    "eventId": "123e4567-e89b-12d3-a456-426614174000",
    "views": 1250,
    "sales": 85,
    "revenue": 4250.00
  }
}
