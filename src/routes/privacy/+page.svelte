<script lang="ts">
    import { transparentLogo } from '$lib/images';
</script>

<svelte:head>
    <title>Privacy Policy - Tech Talk Augusta</title>
    <meta name="description" content="Privacy policy for Tech Talk Augusta's Discord bot and website." />
    <meta name="keywords" content="privacy policy, data protection, GDPR, CCPA, Tech Talk Augusta" />
    <meta property="og:title" content="Privacy Policy - Tech Talk Augusta" />
    <meta property="og:description" content="Privacy policy for Tech Talk Augusta's Discord bot and website." />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="hero">
    <div class="hero-content">
        <img src={transparentLogo} alt="Tech Talk Augusta Logo" class="logo" />
        <h1>Privacy Policy</h1>
        <p class="lead">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
</div>

<div class="container">
    <div class="privacy-content">
        <section>
            <h2>1. Introduction</h2>
            <p>Tech Talk Augusta ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Discord bot and website.</p>
        </section>

        <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Discord Information</h3>
            <ul>
                <li>Discord user ID</li>
                <li>Username and avatar</li>
                <li>Server membership status</li>
                <li>Message content in designated channels</li>
            </ul>

            <h3>2.2 Event Information</h3>
            <ul>
                <li>Event RSVPs and attendance</li>
                <li>Event preferences and interests</li>
                <li>Interaction with event announcements</li>
            </ul>

            <h3>2.3 Website Usage</h3>
            <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited</li>
                <li>Time spent on site</li>
            </ul>
        </section>

        <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our services</li>
            </ul>
        </section>

        <section>
            <h2>4. Data Storage and Security</h2>
            <p>We use MongoDB to store your data securely. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
                <li>Discord API</li>
                <li>Meetup.com API</li>
                <li>Eventbrite API</li>
                <li>Facebook Graph API</li>
            </ul>
        </section>

        <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
            </ul>
        </section>

        <section>
            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul>
                <li>Email: [Your Contact Email]</li>
                <li>Discord: [Your Discord Username]</li>
            </ul>
        </section>
    </div>
</div>

<style>
    .hero {
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        color: white;
        padding: 4rem 2rem;
        text-align: center;
    }

    .hero-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .logo {
        width: 150px;
        height: auto;
        margin-bottom: 1rem;
    }

    .lead {
        font-size: 1.2rem;
        opacity: 0.8;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .privacy-content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    section {
        margin-bottom: 2rem;
    }

    h2 {
        color: #2a2a2a;
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }

    h3 {
        color: #3a3a3a;
        margin: 1.5rem 0 1rem;
        font-size: 1.4rem;
    }

    p {
        line-height: 1.6;
        color: #4a4a4a;
        margin-bottom: 1rem;
    }

    ul {
        list-style-type: disc;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }

    li {
        line-height: 1.6;
        color: #4a4a4a;
        margin-bottom: 0.5rem;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .privacy-content {
            padding: 1rem;
        }

        h2 {
            font-size: 1.6rem;
        }

        h3 {
            font-size: 1.2rem;
        }
    }
</style> 