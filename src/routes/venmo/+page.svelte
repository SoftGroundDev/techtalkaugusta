


<script>
    import SoftGroundSquare from '$lib/images/SoftGroundSquare.png';
    import VenmoQRCode from '$lib/images/VenmoQrCode.png';

</script>

<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background-color: #f5f5f7;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    
    .container {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        padding: 40px;
        max-width: 500px;
        width: 90%;
        text-align: center;
    }
    
    .profile {
        margin-bottom: 30px;
    }
    
    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #3d95ce;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 15px;
        color: white;
        font-size: 40px;
        font-weight: bold;
    }
    
    h1 {
        margin: 0 0 5px;
        font-size: 24px;
        color: #333;
    }
    
    .username {
        color: #008cff;
        font-weight: 600;
        margin-bottom: 20px;
    }
    
    .venmo-button {
        background-color: #008cff;
        color: white;
        border: none;
        border-radius: 24px;
        padding: 14px 32px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
        display: inline-block;
        margin-top: 15px;
    }
    
    .venmo-button:hover {
        background-color: #0075d6;
    }
    
    .message {
        margin: 30px 0;
        padding: 15px;
        border-radius: 8px;
        background-color: #f7f7f9;
    }
    
    .footer {
        margin-top: 40px;
        font-size: 14px;
        color: #999;
    }
    
    @media (max-width: 768px) {
        .container {
            padding: 30px 20px;
        }
    }
</style>

<div class="container">
    <div class="profile">
        <div class="avatar">
            <img src={SoftGroundSquare} alt="Soft Ground Logo" class="logo">
        </div>
        <h1>Organized by Soft Ground LLC</h1>
        <div class="username">@softgrounddev</div>
    </div>

    <div>
        <img src={VenmoQRCode} alt="Venmo QR Code" class="qr-code">
    </div>
    
    <div class="message">
        Thanks for your payment! I appreciate your support.
    </div>
    
    <!-- Replace "YourVenmoUsername" with your actual Venmo username -->
    <a href="https://venmo.com/softgrounddev" class="venmo-button">
        Pay with Venmo
    </a>
    
    <div class="footer">
        <p>Secure payment processed through Venmo</p>
    </div>
</div>