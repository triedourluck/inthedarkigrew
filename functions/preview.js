exports.handler = async (event) => {
  const id = event.queryStringParameters.id || "";

  const title = "The Quiet Club";
  const description = "A quiet place to read.";
  const image = "https://thequietclub.site/default.jpg";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta http-equiv="refresh" content="0; url=https://thequietclub.site/post.html?id=${id}">
      </head>
      <body></body>
      </html>
    `
  };
};