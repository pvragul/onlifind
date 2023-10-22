const mongoose = require("mongoose");
const modelMapper = require("../schemas/modelMapper");

class Database {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.collections = null;
    this.connect();
  }

  async connect() {
    if (this.collections == null) {
      this.collections = {};
      try {
        await this.mongoose.connect(process.env.DB_CONNECTION_URI);
        Object.keys(modelMapper).map((model) => {
          this.collections[model] = require(`../schemas/${modelMapper[model]}`)(this.mongoose);
        });
      } catch (err) {
        console.log(error.message);
      }
    }
  }
}

module.exports = new Database(mongoose).collections;
