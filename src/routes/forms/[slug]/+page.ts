import { getGoogleFormById } from '$lib/forms.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }: { params: { slug: string } }) => {
	const form = getGoogleFormById(params.slug);
	
	if (!form) {
		throw error(404, `Form "${params.slug}" not found`);
	}
	
	return {
		form
	};
}; 