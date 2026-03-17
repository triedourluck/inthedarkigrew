exports.handler = async function(event) {
  const id = event.queryStringParameters.id;

  const siteUrl = "https://spontaneous-khapse-f57661.netlify.app";

  const title = "The Quiet Club";
  const description = "Escribo por si algún día necesito recordar quién fui.";
  const image = `${siteUrl}/default.jpg`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>

        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta property="og:type" content="article">
        <meta property="og:url" content="${siteUrl}/post.html?id=${id}">

        <meta http-equiv="refresh" content="0; url=${siteUrl}/post.html?id=${id}">
      </head>
      <body></body>
      </html>
    `
  };
};