# Google Forms Management System

This system makes it easy to add, update, and remove Google Forms from your Tech Talk Augusta website.

## How It Works

All Google Forms are managed through a single configuration file: `src/lib/forms.ts`

## Adding a New Google Form

1. Open `src/lib/forms.ts`
2. Add a new form object to the `googleForms` array:

```typescript
{
  id: 'my-new-form',                    // URL-friendly identifier
  title: 'My New Form',                 // Display title
  description: 'Description of what this form is for',
  googleFormUrl: 'https://forms.gle/your-google-form-id',
  category: 'Optional Category',        // Groups forms on the index page
  active: true,                         // Set to false to hide the form
  createdAt: '2024-01-30'              // Optional creation date
}
```

3. Save the file - that's it! The form will automatically appear on:
   - `/forms` (main forms listing page)
   - `/forms/my-new-form` (individual form page)

## Removing a Google Form

You have two options:

### Option 1: Hide the form (recommended)
Set `active: false` in the form object. This keeps the form data but hides it from the website.

### Option 2: Delete the form completely
Remove the entire form object from the `googleForms` array.

## Form Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | ✅ | URL-friendly identifier (used in URLs like `/forms/id`) |
| `title` | ✅ | Display title shown on the website |
| `description` | ✅ | Description shown on form cards and pages |
| `googleFormUrl` | ✅ | The actual Google Form URL (embed URL works best) |
| `category` | ❌ | Groups forms on the index page (e.g., "Feedback", "Registration") |
| `active` | ✅ | Set to `true` to show, `false` to hide |
| `createdAt` | ❌ | Optional creation date |

## Google Form URL Tips

1. **For embed URLs**: Use the Google Form's embed URL (has `/viewform?embedded=true`)
2. **For regular URLs**: Use the regular sharing URL (like `https://forms.gle/xyz`)
3. **Both work!** The system will display them in an iframe

## Categories

Forms are automatically grouped by category on the main `/forms` page. If no category is specified, the form appears in an "Other" section.

Popular categories:
- `Speaking` - Speaker applications, talk proposals
- `Feedback` - Event feedback, surveys
- `Registration` - Event signups, workshop registration
- `Community` - Volunteer signup, general community forms

## URL Structure

- Main forms page: `/forms`
- Individual form: `/forms/[form-id]`

Each form gets its own clean URL based on the `id` field.

## Features

✅ **Easy management** - Just edit one file
✅ **Clean URLs** - Each form gets its own page
✅ **Categories** - Automatic grouping by category
✅ **Responsive design** - Works on all devices
✅ **SEO friendly** - Proper meta tags and titles
✅ **Hide/show forms** - Use the `active` flag
✅ **Direct links** - Link to Google Forms or embedded view

## Examples

### Speaker Application Form
```typescript
{
  id: 'speaker-application',
  title: 'Speaker Application',
  description: 'Apply to speak at our monthly tech talks',
  googleFormUrl: 'https://forms.gle/speaker-form-id',
  category: 'Speaking',
  active: true
}
```

### Event Feedback Form
```typescript
{
  id: 'january-feedback',
  title: 'January Event Feedback',
  description: 'Share your thoughts about our January meetup',
  googleFormUrl: 'https://forms.gle/feedback-form-id',
  category: 'Feedback',
  active: true,
  createdAt: '2024-01-15'
}
```

### Temporarily Hidden Form
```typescript
{
  id: 'workshop-signup',
  title: 'Workshop Signup',
  description: 'Sign up for our upcoming workshop',
  googleFormUrl: 'https://forms.gle/workshop-form-id',
  category: 'Registration',
  active: false  // Hidden from website
}
``` 