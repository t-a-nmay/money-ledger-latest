const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //fetch total income and expenses
    const totalIncome = await Income.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    // console.log("totalIncome", {
    //   totalIncome,
    //   userId: isValidObjectId(userId),
    // });

    const totalExpense = await Expense.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    //Get income transactions in the last 60 days
    const last60DayIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //get total income for last 60 days
    const last60DayTotalIncome = last60DayIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //get expense transactions in the last 30 days
    const last30DayExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });


    //get total expense for last 30 days
    const last30DayTotalExpense = last30DayExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //fetch last 5 transaction (income+expense)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),

      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    //final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DayTotalExpense: {
        total: last30DayTotalExpense,
        transactions: last30DayExpenseTransactions,
      },
      last60DayTotalIncome: {
        total: last60DayTotalIncome,
        transactions: last60DayIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
