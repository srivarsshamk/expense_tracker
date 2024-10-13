import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if not already
import '../styles/New.css';

function New() {
    // State to manage income, expense, and budget inputs
    const [income, setIncome] = useState({ source: '', amount: '', date: '' });
    const [expense, setExpense] = useState({ description: '', amount: '', category: '', date: '' });
    const [budget, setBudget] = useState({ amount: '', category: '' }); // State for budget inputs
    const [message, setMessage] = useState(''); // State for notification message
    const [messageType, setMessageType] = useState(''); // State for notification type (success/error)

    // Handlers for income form
    const handleIncomeChange = (e) => {
        const { name, value } = e.target;
        setIncome({ ...income, [name]: value });
    };

    const handleIncomeSubmit = async (e) => {
        e.preventDefault();
        const incomeToSend = {
            amount: parseInt(income.amount, 10), // Convert to integer
            source: income.source,
            income_date: income.date // Correct field name
        };
        try {
            const response = await axios.post('http://localhost:8000/incomes', incomeToSend);
            console.log('Income added:', response.data);
            setIncome({ source: '', amount: '', date: '' });
            setMessage('Income has been added!'); // Set success message
            setMessageType('success'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error adding income:', error.response.data); // Log error response
            setMessage('Error adding income.'); // Set error message
            setMessageType('error'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    // Handlers for expense form
    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();
        const expenseToSend = {
            description: expense.description,
            amount: parseInt(expense.amount, 10), // Convert to integer
            category: expense.category,
            expense_date: expense.date // Use the correct field name
        };
        try {
            const response = await axios.post('http://localhost:8000/expenses', expenseToSend);
            console.log('Expense added:', response.data);
            setExpense({ description: '', amount: '', category: '', date: '' });
            setMessage('Expense has been added!'); // Set success message
            setMessageType('success'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error adding expense:', error.response.data); // Log error response
            setMessage('Error adding expense.'); // Set error message
            setMessageType('error'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    // Handlers for budget form
    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        setBudget({ ...budget, [name]: value });
    };

    const handleBudgetSubmit = async (e) => {
        e.preventDefault();
        const budgetToSend = {
            amount: parseInt(budget.amount, 10), // Convert to integer
            category: budget.category
        };
        try {
            const response = await axios.post('http://localhost:8000/budgets', budgetToSend);
            console.log('Budget added:', response.data);
            setBudget({ amount: '', category: '' }); // Reset budget inputs
            setMessage('Budget has been added!'); // Set success message
            setMessageType('success'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error adding budget:', error.response.data); // Log error response
            setMessage('Error adding budget.'); // Set error message
            setMessageType('error'); // Set message type
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    return (
        <div className="new-page">
            {/* Income and Expense Forms */}
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

            {/* Budget Form */}
            <div className="form-container">
                <h2>Add Budget</h2>
                <form onSubmit={handleBudgetSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={budget.amount}
                            onChange={handleBudgetChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={budget.category}
                            onChange={handleBudgetChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Budget</button>
                </form>
            </div>

            {/* Notification Message */}
            {message && (
                <div className={`notification ${messageType}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default New;
