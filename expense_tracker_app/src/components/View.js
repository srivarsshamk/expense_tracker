import React, { useState } from 'react';
import '../styles/View.css';

function View() {
  const [selectedCategory, setSelectedCategory] = useState('today'); // Default to 'today'

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="view-page">
      {/* Sidebar for selecting category */}
      <div className="sidebar">
        <button onClick={() => handleCategoryChange('today')}>Today</button>
        <button onClick={() => handleCategoryChange('week')}>This Week</button>
        <button onClick={() => handleCategoryChange('month')}>This Month</button>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Upper Half: Savings and Expenses */}
        <div className="upper-half">
          {/* Savings Section */}
          <div className="section">
            <h3>Savings</h3>
            <div className="grid">
              <div className={`box ${selectedCategory === 'today' ? 'active' : 'hidden'}`}>
                <h4>Today's Savings</h4>
                <p>$50</p> {/* Replace with dynamic data */}
              </div>
              <div className={`box ${selectedCategory === 'week' ? 'active' : 'hidden'}`}>
                <h4>This Week's Savings</h4>
                <p>$300</p> {/* Replace with dynamic data */}
              </div>
              <div className={`box ${selectedCategory === 'month' ? 'active' : 'hidden'}`}>
                <h4>This Month's Savings</h4>
                <p>$1000</p> {/* Replace with dynamic data */}
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="section">
            <h3>Expenses</h3>
            <div className="grid">
              <div className={`box ${selectedCategory === 'today' ? 'active' : 'hidden'}`}>
                <h4>Today's Expenses</h4>
                <p>$100</p> {/* Replace with dynamic data */}
              </div>
              <div className={`box ${selectedCategory === 'week' ? 'active' : 'hidden'}`}>
                <h4>This Week's Expenses</h4>
                <p>$500</p> {/* Replace with dynamic data */}
              </div>
              <div className={`box ${selectedCategory === 'month' ? 'active' : 'hidden'}`}>
                <h4>This Month's Expenses</h4>
                <p>$2000</p> {/* Replace with dynamic data */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
