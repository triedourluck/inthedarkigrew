exports.handler = async (event) => {
  const id = event.queryStringParameters.id || "";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<meta property="og:title" content="The Quiet Club">
<meta property="og:description" content="A note from The Quiet Club">
<meta property="og:image" content="${image}">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Quiet Club">
<meta name="twitter:description" content="A note from The Quiet Club">
<meta name="twitter:image" content="https://thequietclub.site/default.jpg">

<meta http-equiv="refresh" content="2;url=https://thequietclub.site/post.html?id=${id}">
</head>
<body>
</body>
</html>`
  };
};