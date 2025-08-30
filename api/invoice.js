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
        
        <!-- THIS IS YOUR OPEN GRAPH TAG -->
        <meta property="og:image" content="${imageUrl}" />
        <!--<meta property="og:title" content="Invoice #${invoiceId}" />
        <meta property="og:description" content="View your invoice." />-->

        <!-- Optional: Redirect to the actual image after a delay -->
        <!--<meta http-equiv="refresh" content="0; url=${imageUrl}" />-->
      </head>
      <body>
        <h1>Loading your invoice image...</h1>
      </body>
    </html>
  `;

  // 3. Send the HTML back as the response.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};