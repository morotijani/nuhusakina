export default async function handler(req, res) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    try {
        const authKey = req.query.key;
        if (authKey !== 'nuhu-sakina-2026') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Helper to fetch from Upstash REST
        async function upstash(command) {
            const response = await fetch(`${url}/${command.join('/')}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.json();
        }

        const { result: totalHits } = await upstash(['get', 'wedding:total_hits']);
        const { result: uniqueVisitors } = await upstash(['get', 'wedding:unique_visitors']);

        res.status(200).json({
            totalHits: totalHits || 0,
            uniqueVisitors: uniqueVisitors || 0,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Stats fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
}
