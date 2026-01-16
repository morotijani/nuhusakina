import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ua = req.headers['user-agent'];
        const fingerprint = btoa(`${ip}-${ua}`).substring(0, 32);

        // Create a time-based key (hourly) to prevent duplicate counts from the same user
        const now = new Date();
        const hourlyKey = `vstat:${fingerprint}:${now.getUTCFullYear()}${now.getUTCMonth()}${now.getUTCDate()}${now.getUTCHours()}`;

        // 1. Increment total hits (every page load)
        await redis.incr('wedding:total_hits');

        // 2. Track unique visitor for this hour
        // SET NX returns OK if key was set, null if it already exists
        const isNewThisHour = await redis.set(hourlyKey, '1', { nx: true, ex: 3600 });

        if (isNewThisHour) {
            // If it's a new visitor this hour, increment unique count
            await redis.incr('wedding:unique_visitors');
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({ success: false, error: 'Failed to track visitor' });
    }
}
