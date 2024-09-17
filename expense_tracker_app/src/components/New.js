import React, { useState } from 'react';
import '../styles/New.css';

function New() {
  // State to manage income and expense inputs
  const [income, setIncome] = useState({ source: '', amount: '', date: '' });
  const [expense, setExpense] = useState({ description: '', amount: '', category: '', date: '' });

  // Handlers for income form
  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    console.log('Income added:', income);
    // You can add logic here to save income data
  };

  // Handlers for expense form
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    console.log('Expense added:', expense);
    // You can add logic here to save expense data
  };

  return (
    <div className="new-page">
      {/* Income Form */}
      <div className="form-container">
        <h2>Add Income</h2>
        <form onSubmit={handleIncomeSubmit}>
          <div className="form-group">
            <label htmlFor="source">Source:</label>
            <input
              type="text"
              id="source"
              name="source"
              value={income.source}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={income.amount}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={income.date}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <button type="submit">Add Income</button>
        </form>
      </div>

      {/* Expense Form */}
      <div className="form-container">
        <h2>Add Expense</h2>
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={expense.description}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expense.amount}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleExpenseChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={expense.date}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default New;
