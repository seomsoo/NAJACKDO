// init-mongo.js
db = db.getSiblingDB("admin");
db.auth("najackdo", "najackdo");
db = db.getSiblingDB("najackdo");
db.createUser({
  user: "najackdo",
  pwd: "najackdo",
  roles: [{ role: "readWrite", db: "najackdo" }],
});
