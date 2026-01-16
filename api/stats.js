import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
    try {
        // Simple key-based protection (can be passed in query params)
        // In a real app, you'd use proper auth, but for a wedding site, a hidden path/key is usually enough
        const authKey = req.query.key;
        if (authKey !== 'nuhu-sakina-2026') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const totalHits = await redis.get('wedding:total_hits') || 0;
        const uniqueVisitors = await redis.get('wedding:unique_visitors') || 0;

        res.status(200).json({
            totalHits,
            uniqueVisitors,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
}
