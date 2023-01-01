const express = require('express');
var path = require('path');
var fs = require('fs');
var alert = require('alert');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const { nextTick } = require('process');
const app = express();
app.use(cookieParser());
var MongoClient = require('mongodb').MongoClient;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3030;
const username = "admin";
const password = "admin";
var wanttogo = [];

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var session;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.redirect("home");
  } else {
    res.render("login");
  }
});

app.get('/login', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.redirect("login");
  } else {
    res.render("login");
  }
});

app.get('/registration', function (req, res) {
  res.render("registration");
});

app.get('/home', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("home");
  } else {
    res.redirect("login");
  }
});

app.get('/bali', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("bali");
  } else {
    res.redirect("login");
  }
});

app.get('/annapurna', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("annapurna");
  } else {
    res.redirect("login");
  }
});

app.get('/cities', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("cities");
  } else {
    res.redirect("login");
  }
});

app.get('/hiking', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("hiking");
  } else {
    res.redirect("login");
  }
});

app.get('/inca', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("inca");
  } else {
    res.redirect("login");
  }
});

app.get('/islands', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("islands");
  } else {
    res.redirect("login");
  }
});

app.get('/paris', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("paris");
  } else {
    res.redirect("login");
  }
});

app.get('/rome', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("rome");
  } else {
    res.redirect("login");
  }
});

app.get('/santorini', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("santorini");
  } else {
    res.redirect("login");
  }
});

app.get('/searchresults', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("searchresults");
  } else {
    res.redirect("login");
  }
});

app.get('/wanttogo', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("wanttogo", { arr: wanttogo });
  } else {
    res.redirect("login");
  }
});

app.post('/register', function (req, res) {
  var x = req.body.username;
  var y = req.body.password;
  if (x === "" && y === "")
    alert("You didn't enter anything! Try again");
  else if (x === "" || y === "")
    alert("One of the fields is empty! Try again");

});


app.post('/login', function (req, res) {
  session = req.session;
  session.userid = req.body.username;
  var pass = req.body.password;
  console.log(session.userid);
  if (session.userid != username) {
    alert("User not found");
  } else {
    if (pass != password) {
      alert("Incorrect passsword");
    } else {
      res.redirect("home");
    }
  }
});


app.post('/rome', function (req, res) {
  addToWantToGo("rome");
  res.render("home");
});

app.post('/paris', function (req, res) {
  addToWantToGo("paris");
  res.render("home");
});

app.post('/santorini', function (req, res) {
  addToWantToGo("santorini");
  res.render("home");
});

app.post('/inca', function (req, res) {
  addToWantToGo("inca");
  res.render("home");
});

app.post('/bali', function (req, res) {
  addToWantToGo("bali");
  res.render("home");
});

app.post('/annapurna', function (req, res) {
  addToWantToGo("annapurna");
  res.render("home");
});


app.post('/search', function (req, res) {
  const searchString = req.body.Search;
  console.log(searchString);
  let destinations = ["paris", "rome", "santorini", "inca", "bali", "annapurna"];
  const arr = destinations.filter((character) => {
    return (
      character.toLowerCase().includes(searchString)
    );
  });
  console.log(arr);
  res.render('searchresults', { arr });
  if (arr.length == 0) {
    alert("No results found");
  }
});

function addToWantToGo(destination) {
  if (wanttogo.includes(destination)) {
    alert(destination + " is already in your Want To Go List");
  }
  else {
    wanttogo.push(destination);
    alert(destination + " added to Want To Go List! :)");
  }
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
