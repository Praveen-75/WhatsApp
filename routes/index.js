const express = require('express');
const router = express.Router();
const usermodel = require("./users");
const localStrategy = require("passport-local");
const passport = require('passport');
const multer = require("multer");


passport.use(new localStrategy(usermodel.authenticate()));


function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(new Error("Second Time Try Karna"))
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random() * 10000000) + file.originalname;
    cb(null, fn)
  }
})
const upload = multer({ storage: storage, fileFilter })


router.post("/photo", isLoggedIn, upload.single("image"), async function (req, res) {
  const data = await usermodel.findOne({ username: req.session.passport.user });
  data.profilePic = req.file.filename
  await data.save()
  res.redirect(req.headers.referer);
})


function fileFilter1(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "video/mp4") {
    cb(null, true)
  } else {
    cb(new Error("Second Time Try Karna"))
  }
}

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/story')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random() * 10000000) + file.originalname;
    cb(null, fn)
  }
})
const upload1 = multer({ storage: storage1, fileFilter1 })


router.post("/story", isLoggedIn, upload1.single("story"), async function (req, res) {
  const data = await usermodel.findOne({ username: req.session.passport.user });
  data.story = req.file.filename
  await data.save()
  res.redirect(req.headers.referer);
})



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register", function (req, res) {
  const data = new usermodel({
    name: req.body.name,
    username: req.body.username,
    mobile: req.body.mobile
  })
  usermodel.register(data, req.body.password)
    .then(function (data) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile")
      })
    }).catch(function (e) {
      res.redirect("/login")
    })
})

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get("/profile", isLoggedIn, async function (req, res) {
  const data1 = await usermodel.findOne({ username: req.session.passport.user })
  const data = await usermodel.find()
  res.render("profile", { data, data1 })
})

router.get("/chat/:username", isLoggedIn, async function (req, res) {
  const user = await usermodel.findOne({ username: req.session.passport.user })
  const data1 = await usermodel.findOne({ username: req.params.username })
  const data = await usermodel.find()
  res.render("chat", { data, data1, user })
})

router.get("/Story", isLoggedIn, async function (req, res) {
  const user = await usermodel.findOne({ username: req.session.passport.user })
  const data = await usermodel.find()
  data.read = true;
  user.read = true;
  res.render("Story", { data, user })
})

router.get("/StoryView/:username", isLoggedIn, async function (req, res) {
  const data = await usermodel.findOne({ username: req.params.username })
  const user = await usermodel.findOne({ username: req.session.passport.user })
  const data1 = await usermodel.find()
  data1.read = true;
  data.read = true;
  res.render("StoryView", { data, data1, user })
})


router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res) { })

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/")
  }
}

module.exports = router;
