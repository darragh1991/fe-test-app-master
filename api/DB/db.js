const statuses = require('./statuses.db');
let users = require('./users.db');
const content = require('./content.db')
const DB = {
  users: {
    get() {
      return users;
    },
    create(user) {
      users.push(user);
    },
    update(user) {
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex] = { ...user };
    }
  },
  statuses: {
    get() {
      return statuses;
    },
  },
  content: {
    get() {
      return content
    }
  }
}
module.exports = DB;
