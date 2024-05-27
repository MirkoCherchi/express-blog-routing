const posts = require("../db/db.js");

const routePosts = (req, res) => {
  res.format({
    html: () => {
      let html =
        " <h1 style='text-align: center'>I miei Post</h1> <div style='display: flex; flex-wrap: wrap; justify-content: center;'>";
      posts.forEach((post) => {
        let tagHtml = "";
        post.tags.forEach((tag) => {
          tagHtml += `<li style='display: inline-block; margin-right: 10px;'># ${tag}</li>`;
        });
        html += `
          <div style='margin: 10px;'>
          <h2 style='margin-bottom: 5px; text-align: center;'>${post.title}</h2>
            <img style='margin-bottom: 10px; width: 300px;' src="${post.image}" alt="${post.title}">
           
            <p style='margin-bottom: 5px;'>${post.content}</p>
            <ul style='padding-left: 0; margin-top: 5px;'>
              ${tagHtml}
            </ul>
          </div>
        `;
      });
      html += "</div>";
      res.send(html);
    },
    json: () => {
      res.json({
        data: posts,
        count: posts.length,
      });
    },
  });
};

module.exports = { routePosts };
