import { supabase } from '../config/db.js';

const seedDatabase = async () => {
    try {
        console.log(" Starting full database seed...");

        
        const profileData = [
            { username: 'mueena_s', full_name: 'Mueena Shahmy', role: 'attendee' },
            { username: 'sarah_j', full_name: 'Sarah Jansen', role: 'attendee' },
            { username: 'colombo_events', full_name: 'Colombo Event Hub', role: 'host' },
            { username: 'beach_vibes_sl', full_name: 'Island Party Co', role: 'host' },
            { username: 'tech_talks_lanka', full_name: 'Lanka Tech Community', role: 'host' }
        ];

        console.log(" Seeding 5 Profiles...");
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .insert(profileData)
            .select(); 

        if (profileError) throw profileError;
        const userIds = profiles.map(p => p.id);
        console.log(" Profiles seeded!");

        // 2. Seed 15 Events and get their IDs
        const eventData = [
            { title: 'Lanka Tech Summit', category: 'Tech', location: 'Colombo', price: 1000, date: '2026-02-15' },
            { title: 'Unawatuna Beach Fest', category: 'Music', location: 'Galle', price: 2000, date: '2026-02-02' },
            { title: 'Kandy Esala Expo', category: 'Food', location: 'Kandy', price: 500, date: '2026-01-20' },
            { title: 'Jaffna Cricket Open', category: 'Sports', location: 'Jaffna', price: 0, date: '2026-03-01' },
            { title: 'Negombo Seafood Night', category: 'Food', location: 'Negombo', price: 5000, date: '2026-02-10' },
            { title: 'Colombo Jazz Night', category: 'Music', location: 'Colombo', price: 2000, date: '2026-02-25' },
            { title: 'AI Workshop Sri Lanka', category: 'Tech', location: 'Colombo', price: 1000, date: '2026-02-05' },
            { title: 'Hikkaduwa Surf Meet', category: 'Sports', location: 'Galle', price: 0, date: '2026-03-12' },
            { title: 'Cloud Computing Day', category: 'Tech', location: 'Kandy', price: 500, date: '2026-02-20' },
            { title: 'Bailatronic Colombo', category: 'Music', location: 'Colombo', price: 1000, date: '2026-01-15' },
            { title: 'Cyber Security Forum', category: 'Tech', location: 'Colombo', price: 1500, date: '2026-04-01' },
            { title: 'Lankan Street Food Fest', category: 'Food', location: 'Negombo', price: 500, date: '2026-02-14' },
            { title: 'Island Beats 2026', category: 'Music', location: 'Jaffna', price: 1000, date: '2026-05-20' },
            { title: 'Art & Culture Expo', category: 'Other', location: 'Colombo', price: 0, date: '2026-02-02' },
            { title: 'Community Wellness Fair', category: 'Other', location: 'Kandy', price: 0, date: '2026-03-20' }
        ];
        
        console.log(" Seeding 15 Events...");
        const { data: events, error: eventError } = await supabase
            .from('events')
            .insert(eventData)
            .select();

        if (eventError) throw eventError;
        const eventIds = events.map(e => e.id);
        console.log(" 15 Events seeded!");

        // 3. Create 20 Posts 
        console.log(" Seeding 20 Posts...");
        const postsToCreate = [];
        for (let i = 0; i < 20; i++) {
            postsToCreate.push({
                content: i < 10 
                    ? `Can't wait for ${events[i % events.length].title}! See you there. #SetWemu` 
                    : `Just checking out the new SetWemu app! It's looking good. ${i}`,
                user_id: userIds[i % userIds.length],
                event_id: i < 10 ? eventIds[i % eventIds.length] : null
            });
        }
        const { data: posts, error: postError } = await supabase
            .from('posts')
            .insert(postsToCreate)
            .select();

        if (postError) throw postError;
        console.log(" 20 Posts seeded!");

        
        console.log(" Connecting relationships...");

        // Users follow each other
        await supabase.from('follows').insert([
            { follower_id: userIds[0], following_id: userIds[2] },
            { follower_id: userIds[1], following_id: userIds[2] },
            { follower_id: userIds[0], following_id: userIds[1] }
        ]);

        // Users "Attend" Events (Event Attendees)
        await supabase.from('event_attendees').insert([
            { event_id: eventIds[0], user_id: userIds[0] },
            { event_id: eventIds[1], user_id: userIds[1] }
        ]);

        

    } catch (err) {
        console.error(" Seeding failed:", err.message);
    }
};

seedDatabase();