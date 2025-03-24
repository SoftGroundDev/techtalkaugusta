import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, request }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
        return json({ error: 'Authentication failed', details: error }, { status: 400 });
    }

    if (!code) {
        return json({ error: 'No authorization code provided' }, { status: 400 });
    }

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await fetch('https://secure.meetup.com/oauth2/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.MEETUP_CLIENT_ID || '',
                client_secret: process.env.MEETUP_CLIENT_SECRET || '',
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.API_BASE_URL}/api/auth/callback`,
                code: code
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to exchange code for token');
        }

        const tokenData = await tokenResponse.json();
        
        // Store the access token securely (implement your storage solution)
        // For now, we'll just return success
        return json({ 
            success: true, 
            message: 'Authentication successful',
            // Don't send the actual token in the response
            token_type: tokenData.token_type,
            expires_in: tokenData.expires_in
        });

    } catch (error) {
        console.error('Auth callback error:', error);
        return json({ 
            error: 'Authentication failed', 
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}; 