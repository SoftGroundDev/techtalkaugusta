export interface GoogleForm {
	id: string;
	title: string;
	description: string;
	googleFormUrl: string;
	category?: string;
	active: boolean;
}

export const googleForms: GoogleForm[] = [
	{
		id: 'business-projects',
		title: 'Business Project Intake',
		description: 'As a business owner, you can submit projects you\'d like the community to work on.',
		googleFormUrl: 'https://forms.gle/HyWPtjjSP5Cdqpg38',
		category: 'projects',
		active: true
	},
	{
		id: 'talent-pool',
		title: 'Join the Talent Roster',
		description: 'Join the talent roster to be notified of projects and opportunities.',
		googleFormUrl: 'https://forms.gle/sZcLuEMpvvD962TS7',
		category: 'projects',
		active: true
	}
];

export function getActiveGoogleForms(): GoogleForm[] {
	return googleForms.filter(form => form.active);
}

export function getGoogleFormById(id: string): GoogleForm | undefined {
	return googleForms.find(form => form.id === id && form.active);
}

export function getGoogleFormsByCategory(category: string): GoogleForm[] {
	return googleForms.filter(form => form.category === category && form.active);
} 