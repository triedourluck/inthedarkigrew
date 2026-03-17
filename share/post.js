export default async function handler(req, res) {
  const { id } = req.query;

  const firebaseUrl = `https://firestore.googleapis.com/v1/projects/thequietclub-7265a/databases/(default)/documents/posts/${id}`;

  const response = await fetch(firebaseUrl);
  const data = await response.json();

  const fields = data.fields || {};

  const text = fields.text?.stringValue || "A note from The Quiet Club";
  const tag = fields.tag?.stringValue || "";
  const image =
    fields.images?.arrayValue?.values?.[0]?.stringValue ||
    "https://thequietclub.site/default.jpg";

  res.setHeader("Content-Type", "text/html");

  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<meta property="og:title" content="The Quiet Club">
<meta property="og:description" content="${text.substring(0, 140)}">
<meta property="og:image" content="${image}">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Quiet Club">
<meta name="twitter:description" content="${text.substring(0, 140)}">
<meta name="twitter:image" content="${image}">

<meta http-equiv="refresh" content="0; url=https://quietclub-preview.vercel.app/post.html?id=${id}">

</head>
<body></body>
</html>
`);
}