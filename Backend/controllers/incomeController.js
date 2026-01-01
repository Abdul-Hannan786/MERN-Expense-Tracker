import Income from "../models/Income.js"

// Add Income Source
export const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Income Source
export const getAllIncome = async (req, res) => {};

// Delete Income Source
export const deleteIncome = async (req, res) => {};

//Download Excel
export const downloadIncomeExcel = async (req, res) => {};
