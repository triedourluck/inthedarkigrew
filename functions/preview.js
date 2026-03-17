const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const id = event.queryStringParameters.id || "";

  const snapshot = await db.collection("posts").limit(1).get();
  const post = snapshot.empty ? {} : snapshot.docs[0].data();

  const image = post.images?.[0] ? encodeURI(post.images[0]) : "";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
<!DOCTYPE html>
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
<meta name="twitter:image" content="${image}">

<meta http-equiv="refresh" content="2;url=https://thequietclub.site/post.html?id=${id}">
</head>
<body>
</body>
</html>`
  };
};