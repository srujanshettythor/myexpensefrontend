import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "https://expensetracker-2-r68c.onrender.com/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Add Income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  // Get Incomes
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}income`);
      console.log(response.data); // Log response to verify structure
      if (response.data && Array.isArray(response.data.data)) {
        setIncomes(response.data.data); // Extract array from response object
      } else {
        console.error(
          "Expected an array of incomes but received",
          response.data
        );
        setIncomes([]); // Default to an empty array
      }
    } catch (error) {
      setError("Failed to fetch incomes");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}income/${id}`);
      getIncomes();
    } catch (error) {
      setError("Error deleting income");
    }
  };

  // Calculate Total Income
  const totalIncome = () => {
    if (!Array.isArray(incomes)) return 0; // Handle non-array cases
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Add Expense
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  // Get Expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}expenses`);
      console.log(response.data); // Log response to verify structure
      if (response.data && Array.isArray(response.data.data)) {
        setExpenses(response.data.data); // Extract array from response object
      } else {
        console.error(
          "Expected an array of expenses but received",
          response.data
        );
        setExpenses([]); // Default to an empty array
      }
    } catch (error) {
      setError("Failed to fetch expenses");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}expense/${id}`);
      getExpenses();
    } catch (error) {
      setError("Error deleting expense");
    }
  };

  // Calculate Total Expenses
  const totalExpenses = () => {
    if (!Array.isArray(expenses)) return 0; // Handle non-array cases
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Calculate Total Balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Transaction History (Last 3 Transactions)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
