const userInfo = require("./user-info");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated() && userInfo.getItem("role") === "basic") {
    return next();
  }
  res.redirect("/sign-in");
}

function checkAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && userInfo.getItem("role") === "admin") {
    return next();
  }
  res.redirect("/sign-in");
}

function checkAuthenticatedBasicOrAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/sign-in");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    let role = userInfo.getItem("role");
    if (role === "basic") {
      return res.redirect("/signed-index");
    }
    if (role === "admin") {
      return res.redirect("/admin-index");
    }
  }
  next();
}

module.exports = {
    checkAuthenticated,
    checkAuthenticatedAdmin,
    checkAuthenticatedBasicOrAdmin,
    checkNotAuthenticated
}