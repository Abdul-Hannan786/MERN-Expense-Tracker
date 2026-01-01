import Expense from "../models/Expense.js";
import xlsx from "xlsx";

// Add Expense
export const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All expenses
export const getAllExpense = async (req, res) => {};

// Delete Expense
export const deleteExpense = (req, res) => {};

// Download Excel
export const downloadExpenseExcel = (req, res) => {};
