// Switch to the admin database to create a root user
db = db.getSiblingDB("admin");
db.createUser({
  user: "najackdo",
  pwd: "najackdo",
  roles: [{ role: "root", db: "admin" }],
});

// Authenticate as the newly created user
db.auth("najackdo", "najackdo");

// Switch to the database where you want to create users
db = db.getSiblingDB("najackdo");

// Create a user with readWrite role for the 'najackdo' database
db.createUser({
  user: "najackdo",
  pwd: "najackdo",
  roles: [{ role: "readWrite", db: "najackdo" }],
});

db.getSiblingDB("najackdo").updateUser("najackdo", {
  roles: [{ role: "readWrite", db: "najackdo" }],
});
