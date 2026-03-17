exports.handler = async (event) => {
  const id = event.queryStringParameters.id || "";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="The Quiet Club">
        <meta property="og:description" content="A note from The Quiet Club">
        <meta property="og:image" content="https://thequietclub.site/default.jpg">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
      </head>
      <body>
        <script>
          setTimeout(() => {
            window.location.href = "https://thequietclub.site/post.html?id=${id}";
          }, 1200);
        </script>
      </body>
      </html>
    `
  };
};