const React = require('react');
const { ImageResponse } = require('@vercel/og');

module.exports.config = {
  runtime: 'edge',
};

module.exports = async function handler(req) {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const invoiceId = searchParams.get('id');
  const dynamicImageUrl = `https://japan-ab.ct.ws/uploads/${invoiceId}.jpg`;
  const title = searchParams.get('title') || `Invoice #${invoiceId}`;

  // This is the pure JavaScript way to create the elements.
  // It avoids the '<' syntax error completely.
  const element = React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        fontSize: 60,
        color: 'black',
        background: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    React.createElement('img', {
      src: dynamicImageUrl,
      width: '350',
      style: {
        border: '4px solid #ccc',
        borderRadius: '10px',
        marginRight: '30px',
      },
    }),
    React.createElement('p', null, title)
  );

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
  });
};