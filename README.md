# SetWemu 

## Overview
SetWemu is a personalized event discovery platform designed for the modern social scene in Colombo. Using a swipe style interaction model, SetWemu learns user preferences in real-time to serve a highly curated feed of events, from tech conferences at Trace Expert City to EDM festivals at BMICH.

## Core Modules
1. **Recommendation Engine (/backend)**
* The "Brain" of SetWemu. It tracks user interactions (Right/Left swipes) and updates a dynamic interest profile.

    * Smart Ranking: Events are prioritized based on weighted interest scores.
  
    * History Filtering: Automatically hides events a user has already swiped on.
 
2. **Live Event Map (/mobile-app)**
  * A real-time geospatial visualization of the Colombo social scene.
 
      * Interactive Markers: Tap pins to see event "Quick Views" at Trace Expert City, BMICH, and more.

      * Proximity Fetching: Dynamically loads events based on the user's current GPS coordinates.

      * Status Indicators: Color-coded pins to distinguish between "Happening Now" and "Upcoming" events.

## Tech Stack
| Layer | Technology |  
| :--- | :--- | 
| `Frontend` | React Native | 
| `Backend` | Node.js, Express.js  | 
| `Database` | Supabase (PostgreSQL) | 
| `Authentication` | Supabase Auth (UUID-linked) | 



## Testing Locally
 * The development database is pre-seeded with standard test accounts for the team:

    * Users: Mueena, Dulmin, Oneth, Isa, and Diara.

    * Flow: Use Thunder Client to test the /api/swipe/swipe and /api/swipe/recommendations/:userId endpoints before testing on the mobile UI


