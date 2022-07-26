const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

const cnn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_api",
});

cnn.connect((err) => {
  if (err) throw err;

  console.log("Connect");
});

app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.get("/", (req, res) => {
  const qProduct = "SELECT * FROM products";

  let query = cnn.query(qProduct, (err, results) => {
    if (err) throw err;
    console.log(results);

    res.render("home", {
      results: results,
    });
  });
});
// set untuk terhubung ke views
// app.set("views", path.join(__dirname, "views"));
// configure template engine
// app.engine(
//   "hbs",
//   exphbs({
//     defaultLayout: "main",
//     extname: ".hbs",
//   })
// );
// //set untuk terhubung ke templating engine

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/assets", express.static(__dirname + "/public"));
// app.get("/", (err, res) => {
// });

app.listen(3000, () => {
  console.log("server berjalan pada port 8000");
});
