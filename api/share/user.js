export default async function handler(req, res) {
  const alias = req.query.alias;

  const url = `https://firestore.googleapis.com/v1/projects/thequietclub-7265a/databases/(default)/documents:runQuery`;

  const body = {
    structuredQuery: {
      from: [{ collectionId: "users" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "alias" },
          op: "EQUAL",
          value: { stringValue: alias }
        }
      },
      limit: 1
    }
  };

  const response = await fetch(url,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  const doc = data[0]?.document;

  if(!doc){
    return res.redirect("https://thequietclub.site");
  }

  const fields = doc.fields;

  const name = fields.name?.stringValue || "The Quiet Club";
  const image =
    fields.previewImage?.stringValue ||
    fields.avatarURL?.stringValue ||
    "https://thequietclub.site/default.jpg";

  res.setHeader("Content-Type","text/html");

  res.send(`
    <html>
      <head>
        <meta property="og:title" content="${name}" />
        <meta property="og:description" content="@${alias}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://share.thequietclub.site/api/share/user?alias=${alias}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta http-equiv="refresh" content="0; url=https://thequietclub.site/${alias}" />
      </head>
      <body></body>
    </html>
  `);
}