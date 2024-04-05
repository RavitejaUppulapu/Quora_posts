const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Use your chosen template engine here
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views")); // Set the views directory

let posts = [
  {
    id: uuidv4(),
    username: "Here come your name",
    content: "Here comes your content",
  },
];

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("home.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((postcheck) => id === postcheck.id);

  if (!post) {
    // Handle the case where the post is not found
    return res.status(404).send("Post not found");
  }

  res.render("show.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((postcheck) => id !== postcheck.id);

  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
