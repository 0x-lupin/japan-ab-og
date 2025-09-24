module.exports = (req, res) => {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const invoiceId = searchParams.get('id');

  const imageUrl = `https://japan-dev.ct.ws/uploads/${invoiceId}_facebook.jpg`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        
        <!-- Open Graph Tags -->
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="1000" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:alt" content="Invoice Preview" />
        
      </head>
      <body>
        <h1>Redirecting to invoice...</h1>

        <script>
          if (!/bot|facebook|telegram|twitter|linkedin|whatsapp/i.test(navigator.userAgent)) {
            window.location.href = 'https://japan-dev.ct.ws/generate_invoice.html?id='+'${invoiceId}';
          }
        </script>
      </body>
    </html>
  `;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};