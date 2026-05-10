const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BorrowRecord = sequelize.define("BorrowRecord", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  book_id: { type: DataTypes.INTEGER, allowNull: false },
  borrow_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.STRING, defaultValue: "borrowed" }
});

module.exports = BorrowRecord;