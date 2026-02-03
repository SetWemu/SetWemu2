import { supabase } from '../config/db.js';

const seedDatabase = async () => {
    try {
        console.log("🌱 Starting full database seed...");

        // 1. SEED 5 USERS
        const users = [
            { id: '00000000-0000-0000-0000-000000000001', email: 'mueena@example.com', full_name: 'Mueena Shahmy', role: 'personal', location: 'Colombo' },
            { id: '00000000-0000-0000-0000-000000000002', email: 'dulmin@example.com', full_name: 'Dulmin Fernando', role: 'personal', location: 'Galle' },
            { id: '00000000-0000-0000-0000-000000000003', email: 'oneth@setwemu.com', full_name: 'Oneth Kurukulasuriya', role: 'business', location: 'Kandy' },
            { id: '00000000-0000-0000-0000-000000000004', email: 'isa@example.com', full_name: 'Isa Farman', role: 'business', location: 'Colombo' },
            { id: '00000000-0000-0000-0000-000000000005', email: 'diara@setwemu.com', full_name: 'Diara Batagodage', role: 'business', location: 'Negombo' }
        ];
        
        await supabase.from('Profile').upsert(users);
        console.log("✅ 5 Users seeded.");

        // 2. SEED 15 EVENTS
        const eventData = [
            { id: 1, title: 'Lanka Tech Summit', category: 'Tech', location: 'Colombo', price: 1000, date: '2026-02-15' },
            { id: 2, title: 'Unawatuna Beach Fest', category: 'Music', location: 'Galle', price: 2000, date: '2026-02-02' },
            { id: 3, title: 'Kandy Esala Expo', category: 'Food', location: 'Kandy', price: 500, date: '2026-01-20' },
            { id: 4, title: 'Jaffna Cricket Open', category: 'Sports', location: 'Jaffna', price: 0, date: '2026-03-01' },
            { id: 5, title: 'Negombo Seafood Night', category: 'Food', location: 'Negombo', price: 5000, date: '2026-02-10' },
            { id: 6, title: 'Colombo Jazz Night', category: 'Music', location: 'Colombo', price: 2000, date: '2026-02-25' },
            { id: 7, title: 'AI Workshop Sri Lanka', category: 'Tech', location: 'Colombo', price: 1000, date: '2026-02-05' },
            { id: 8, title: 'Hikkaduwa Surf Meet', category: 'Sports', location: 'Galle', price: 0, date: '2026-03-12' },
            { id: 9, title: 'Cloud Computing Day', category: 'Tech', location: 'Kandy', price: 500, date: '2026-02-20' },
            { id: 10, title: 'Bailatronic Colombo', category: 'Music', location: 'Colombo', price: 1000, date: '2026-01-15' },
            { id: 11, title: 'Cyber Security Forum', category: 'Tech', location: 'Colombo', price: 1500, date: '2026-04-01' },
            { id: 12, title: 'Lankan Street Food Fest', category: 'Food', location: 'Negombo', price: 500, date: '2026-02-14' },
            { id: 13, title: 'Island Beats 2026', category: 'Music', location: 'Jaffna', price: 1000, date: '2026-05-20' },
            { id: 14, title: 'Art & Culture Expo', category: 'Other', location: 'Colombo', price: 0, date: '2026-02-02' },
            { id: 15, title: 'Community Wellness Fair', category: 'Other', location: 'Kandy', price: 0, date: '2026-03-20' }
        ];
        await supabase.from('events').upsert(eventData);
        console.log("✅ 15 Events seeded.");

        // 3. SEED 20 POSTS
        const posts = [];
        for (let i = 1; i <= 10; i++) {
            posts.push({
                content: `General SetWemu update #${i}!`,
                user_id: '00000000-0000-0000-0000-000000000001',
                event_id: null 
            });
        }
        for (let i = 1; i <= 10; i++) {
            posts.push({
                content: `Excited for Event #${i}!`,
                user_id: '00000000-0000-0000-0000-000000000002',
                event_id: i 
            });
        }
        await supabase.from('posts').insert(posts);
        console.log("✅ 20 Posts seeded.");

        console.log("🏁 All data successfully seeded to Supabase!");

    } catch (err) {
        // The missing catch block
        console.error("❌ Seeding failed:", err.message);
    }
};

// You must actually call the function
seedDatabase();