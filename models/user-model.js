const fs = require("fs");
const path = require("path");

module.exports = class User {
  constructor(_id, _password, _fullname, _email) {
    this.id = _id;
    this.email = _email;
    this.password = _password;
    this.fullname = _fullname;
  }

  save() {
    const storage = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "users.json"
    );
    fs.readFile(storage, (err, fileContent) => {
        let users = [];
        if (!err) {
            users = JSON.parse(fileContent)
        }
        users.push(this);
        fs.writeFile(storage, JSON.stringify(users), (err) => {
            console.log(err)
        })
    })
  }

  fetch() {
      let users = []
    const storage = path.join(
        path.dirname(process.mainModule.filename),
        "data",
        "users.json"
      );
      users = fs.readFileSync(storage, 'utf-8')
      return JSON.parse(users);
  }
};
