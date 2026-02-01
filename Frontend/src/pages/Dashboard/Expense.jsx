import React, { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get All Expense Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboardlayout activeMenu="Expense">
      <div className="my-5 mx-auto"></div>
    </Dashboardlayout>
  );
};

export default Expense;
