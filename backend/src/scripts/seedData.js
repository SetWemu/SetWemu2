import { supabase } from '../config/db.js';

const seedData = async () => {
    const user1 = "3db47b32-bbc7-40e5-85fe-db585a28d270";
    const user2 = "c318071e-8b8b-4f42-b00c-a2225cfe93b0";

    const events = [
        { title: "Colombo Tech Expo", description: "Main tech event", location: "BMICH", price: 500, category_id: 1, host_id: user1, date: "2026-06-01" },
        { title: "Galle Face Food Fest", description: "Street food", location: "Colombo", price: 0, category_id: 3, host_id: user2, date: "2026-06-05" },
        { title: "Kandy Esala Perahera View", description: "Private balcony view", location: "Kandy", price: 5000, category_id: 4, host_id: user1, date: "2026-08-15" },
        { title: "Hikkaduwa Surf Open", description: "Surfing competition", location: "Hikkaduwa", price: 0, category_id: 2, host_id: user2, date: "2026-07-20" },
        { title: "Jaffna Music Night", description: "Traditional & Modern", location: "Jaffna", price: 1500, category_id: 2, host_id: user1, date: "2026-09-10" },
        { title: "Negombo Seafood Bash", description: "All you can eat", location: "Negombo", price: 4500, category_id: 3, host_id: user2, date: "2026-06-30" },
        { title: "Cloud Meetup SL", description: "AWS & Azure talks", location: "Trace City", price: 0, category_id: 1, host_id: user1, date: "2026-07-12" }
    ];

    console.log("Seeding realistic events...");
    const { error } = await supabase.from('events').insert(events);
    
    if (error) console.error("Seed Error:", error.message);
    else console.log("Success: Database populated for demo.");
};

seedData();