export default async function handler(req, res) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        return res.status(500).json({ error: 'Redis configuration missing' });
    }

    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ua = req.headers['user-agent'] || 'unknown';
        const fingerprint = btoa(`${ip}-${ua}`).substring(0, 32);

        const now = new Date();
        const hourlyKey = `vstat:${fingerprint}:${now.getUTCFullYear()}${now.getUTCMonth()}${now.getUTCDate()}${now.getUTCHours()}`;

        // Helper for Upstash REST calls
        async function upstash(command) {
            const response = await fetch(`${url}/${command.join('/')}`, {
                method: 'POST', // Use POST for writing
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.json();
        }

        // 1. Increment total hits
        await upstash(['incr', 'wedding:total_hits']);

        // 2. Track unique visitor using SET with EX and NX
        // Command format: SET key value EX seconds NX
        const setResponse = await upstash(['set', hourlyKey, '1', 'ex', '3600', 'nx']);

        if (setResponse.result === 'OK') {
            // If the SET returned OK, it was a new unique visitor for this hour
            await upstash(['incr', 'wedding:unique_visitors']);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({ success: false });
    }
}
