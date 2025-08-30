module.exports = (req, res) => {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const invoiceId = searchParams.get('id');

  // 1. Create the final, real image URL from your server.
  const imageUrl = `https://japan-ab.ct.ws/uploads/${invoiceId}.jpg`;

  // 2. Create the HTML code as a simple text string.
  //    This is the "webpage" that will contain your OG tag.
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        
        <!-- Open Graph Tags -->
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:image:width" content="707" />
        <meta property="og:image:height" content="1000" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex" />
        
        <script>
          // Only redirect if it's a real browser (not a bot)
          if (!/bot|facebook|telegram|twitter|linkedin|whatsapp/i.test(navigator.userAgent)) {
            window.location.href = 'https://japan-ab.ct.ws/generate_invoice.html?id='+'${invoiceId}';
          }
        </script>
      </head>
      <body>
        <noscript>
          <meta http-equiv="refresh" content="0;url=https://japan-ab.ct.ws/generate_invoice.html?id=${invoiceId}">
        </noscript>
        <p>Redirecting to invoice...</p>
      </body>
    </html>
  `;

  // 3. Send the HTML back as the response.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};