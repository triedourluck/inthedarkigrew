exports.handler = async function(event) {
  const id = event.queryStringParameters.id;
  const siteUrl = "https://spontaneous-khapse-f57661.netlify.app";

  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/thequietclub/databases/(default)/documents/posts/${id}`;

  try {
    const response = await fetch(firestoreUrl);
    const data = await response.json();

    const fields = data.fields || {};

    const title = fields.title?.stringValue
      ? `${fields.title.stringValue} | The Quiet Club`
      : "The Quiet Club";

    const text = fields.text?.stringValue || "Escribo por si algún día necesito recordar quién fui.";

    let image = `${siteUrl}/default.jpg`;

if (
  fields.images?.arrayValue?.values?.length > 0 &&
  fields.images.arrayValue.values[0].stringValue
) {
  image = decodeURIComponent(fields.images.arrayValue.values[0].stringValue);
}

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
          <meta property="og:description" content="${text.substring(0, 160)}">
          <meta property="og:image" content="${image}">
          <meta property="og:type" content="article">
          <meta property="og:url" content="${siteUrl}/post.html?id=${id}">

          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${text.substring(0,160)}">
          <meta name="twitter:image" content="${image}">

          <meta http-equiv="refresh" content="0; url=${siteUrl}/post.html?id=${id}">
        </head>
        <body></body>
        </html>
      `
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: "Error loading preview"
    };
  }
};