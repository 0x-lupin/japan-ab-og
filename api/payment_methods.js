module.exports = (req, res) => {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const timestamp = searchParams.get('t') || '';

  const imageUrl = `https://japan-ab.ftp.sh/uploads/payment_methods_og.jpg${timestamp ? '?t=' + timestamp : ''}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Methods - Japan Affordable Brands</title>
        
        <!-- Open Graph Tags -->
        <meta property="og:title" content="Payment Methods - Japan Affordable Brands" />
        <meta property="og:description" content="View our available payment methods" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:alt" content="Payment Methods Preview" />
        
      </head>
      <body>
        <h1>Redirecting to payment methods...</h1>

        <script>
          if (!/bot|facebook|telegram|twitter|linkedin|whatsapp/i.test(navigator.userAgent)) {
            window.location.href = 'https://japan-ab.ftp.sh/payment_methods.html';
          }
        </script>
      </body>
    </html>
  `;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};
