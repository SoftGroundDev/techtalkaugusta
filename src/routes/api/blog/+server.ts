import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const ORGANIZATION_ID = 'techtalkaugusta';

export const GET: RequestHandler = async () => {
    try {
        const response = await fetch(`https://dev.to/api/organizations/${ORGANIZATION_ID}/articles`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const posts = await response.json();
        
        return json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}; 