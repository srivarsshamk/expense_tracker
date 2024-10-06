import React, { useState } from 'react';
import '../styles/View.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function View() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('daily'); // Default sorting option
  const [viewType, setViewType] = useState('posts'); // View type: 'posts' or 'graph'
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  // Sample data for income, expenditure, and budget
  const samplePosts = {
    income: [
      { date: '2024-09-17', amount: 200, description: 'Freelance Work' },
      { date: '2024-09-18', amount: 300, description: 'Salary' },
    ],
    expenditure: [
      { date: '2024-09-17', amount: 100, description: 'Groceries' },
      { date: '2024-09-18', amount: 150, description: 'Electricity Bill' },
    ],
    budget: [
      { date: '2024-09-17', amount: 1000, description: 'Monthly Budget' },
    ],
  };

  const filteredPosts = (category) =>
    samplePosts[category].filter((post) =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Bar graph data
  const graphData = {
    labels: ['Income', 'Expenditure', 'Budget'],
    datasets: [
      {
        label: `${sortOption.charAt(0).toUpperCase() + sortOption.slice(1)} View`,
        data: [
          selectedCategories.includes('income') ? samplePosts.income.reduce((sum, post) => sum + post.amount, 0) : 0,
          selectedCategories.includes('expenditure') ? samplePosts.expenditure.reduce((sum, post) => sum + post.amount, 0) : 0,
          selectedCategories.includes('budget') ? samplePosts.budget.reduce((sum, post) => sum + post.amount, 0) : 0,
        ],
        backgroundColor: ['#71e0eb', '#ff6384', '#4caf50'],
      },
    ],
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => handleCategoryChange('income')}>Income</button>
        <button onClick={() => handleCategoryChange('expenditure')}>Expenditure</button>
        <button onClick={() => handleCategoryChange('budget')}>Budget</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Section: Search and Sort */}
        <div className="top-section">
          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* Sorting Options */}
          <div className="sorting-options">
            <label>
              Sort by:
              <select value={sortOption} onChange={handleSortChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>
        </div>

        {/* View Type Selection */}
        <div className="view-toggle">
          <button onClick={() => handleViewTypeChange('posts')}>View as Posts</button>
          <button onClick={() => handleViewTypeChange('graph')}>View as Graph</button>
        </div>

        {/* Conditionally rendering either posts or graph */}
        <div className="content-display">
          {viewType === 'posts' ? (
            <div className="posts-view">
              {selectedCategories.map((category) => (
                <div key={category}>
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Posts</h3>
                  {filteredPosts(category).map((post, index) => (
                    <div key={index} className="post">
                      <p>Date: {post.date}</p>
                      <p>Amount: ${post.amount}</p>
                      <p>Description: {post.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="graph-view">
              <Bar data={graphData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
