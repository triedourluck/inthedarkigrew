export default async function handler(req, res) {
  const id = req.query.id;

  const url = `https://firestore.googleapis.com/v1/projects/thequietclub-7265a/databases/(default)/documents/posts/${id}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.fields) {
    return res.redirect("https://thequietclub.site");
  }

  const text = data.fields.text?.stringValue || "";
  const image =
    data.fields.images?.arrayValue?.values?.[0]?.stringValue ||
    "https://thequietclub.site/default.jpg";

  res.setHeader("Content-Type", "text/html");

  res.send(`
    <html>
      <head>
        <meta property="og:title" content="The Quiet Club" />
        <meta property="og:description" content="${text.slice(0, 140)}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://quietclub-preview.vercel.app/post.html?id=${id}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta http-equiv="refresh" content="0; url=https://thequietclub.site/post.html?id=${id}" />
      </head>
      <body></body>
    </html>
  `);
}