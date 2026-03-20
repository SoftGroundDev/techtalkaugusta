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
	},
	{
		id: 'call-for-speakers',
		title: 'Call for Speakers',
		description: 'Share your expertise with Augusta\'s tech community. Apply to speak at our monthly tech talks and workshops.',
		googleFormUrl: 'https://wax-warbler-fff.notion.site/ebd//194bc6eec566802e8557f2ce3ca6ac2f',
		category: 'speakers',
		active: true
	},
	{
		id: 'speaker-info',
		title: 'Speaker Information Form',
		description: 'Complete your speaker profile. Share your bio, headshot, and technical requirements.',
		googleFormUrl: 'https://wax-warbler-fff.notion.site/ebd//2ddbc6eec56680298cd2f4e1fe568df0',
		category: 'speakers',
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