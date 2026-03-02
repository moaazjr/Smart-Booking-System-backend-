import mongoose from "mongoose";

class Database {
  constructor() {
    this._connection = null;
  }

  async connect() {
    if (this._connection) {
      console.log("♻️ Using existing database connection");
      return this._connection;
    }

    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);

      this._connection = conn;
      console.log("✅ MongoDB connected successfully");

      return this._connection;
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }
}

// Singleton instance
const database = new Database();
export default database;
