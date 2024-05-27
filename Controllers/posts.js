const posts = require("../db/db.json");
const path = require("path");

const index = (req, res) => {
  let html = "<ul>";
  posts.forEach((post) => {
    html += `<li><a href="/posts/${post.slug}">${post.title}</a></li>`;
  });
  html += "</ul>";
  res.send(html);
};

const show = (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (post) {
    const imageUrl = `http://localhost:3000${post.image}`;
    res.type("json").json({ ...post, image_url: imageUrl });
  } else {
    res.status(404).send({ error: "Post not found" });
  }
};

const create = (req, res) => {
  res.format({
    html: () => {
      res.send("<h1>Creazione nuovo post</h1>");
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  });
};

const download = (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (post) {
    const filePath = path.join(__dirname, "..", "public", post.image);
    res.download(filePath);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
};

module.exports = { index, show, create, download };
