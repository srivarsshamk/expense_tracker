import React, { useState, useEffect } from 'react';
import '../styles/View.css';
import { Bar } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function View() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('daily');
  const [viewType, setViewType] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData('http://localhost:8000/incomes', setIncomeData);
    fetchData('http://localhost:8000/expenses', setExpenseData);
    fetchData('http://localhost:8000/budgets', setBudgetData);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
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

  const exportAllData = () => {
    const allData = [...incomeData, ...expenseData, ...budgetData];
    exportToCSV(allData, 'all_financial_data.csv');
  };

  const exportToCSV = (data, filename) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escapedValue = ('' + row[header]).replace(/"/g, '""');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredPosts = (category) => {
    const posts = category === 'income' ? incomeData : category === 'expenditure' ? expenseData : budgetData;
    return posts.filter((post) =>
      (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.income_date && post.income_date.includes(searchQuery)) ||
      (post.expense_date && post.expense_date.includes(searchQuery)) ||
      (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const graphData = {
    labels: ['Income', 'Expenditure', 'Budgets'],
    datasets: [
      {
        label: `${sortOption.charAt(0).toUpperCase() + sortOption.slice(1)} View`,
        data: [
          selectedCategories.includes('income') ? incomeData.reduce((sum, post) => sum + post.amount, 0) : 0,
          selectedCategories.includes('expenditure') ? expenseData.reduce((sum, post) => sum + post.amount, 0) : 0,
          selectedCategories.includes('budgets') ? budgetData.reduce((sum, post) => sum + post.amount, 0) : 0,
        ],
        backgroundColor: ['#71e0eb', '#ff6384', '#ffc107'],
      },
    ],
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button 
          onClick={() => handleCategoryChange('income')}
          className={selectedCategories.includes('income') ? 'selected' : ''}
        >
          Income
        </button>
        <button 
          onClick={() => handleCategoryChange('expenditure')}
          className={selectedCategories.includes('expenditure') ? 'selected' : ''}
        >
          Expenditure
        </button>
        <button 
          onClick={() => handleCategoryChange('budgets')}
          className={selectedCategories.includes('budgets') ? 'selected' : ''}
        >
          Budgets
        </button>
      </div>

      <div className="main-content">
        <div className="top-section">
          <div className="search-sort-container">
            <div className="search-bar">
              <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className="sorting-options" style={{ marginLeft: '10px' }}>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="daily">Sort by: Daily</option>
                <option value="weekly">Sort by: Weekly</option>
                <option value="yearly">Sort by: Yearly</option>
              </select>
            </div>
          </div>

          <span onClick={exportAllData} className="export-icon" style={{ cursor: 'pointer' }}>
            <Download size={24} />
          </span>
        </div>

        <div className="content-display">
          {viewType === 'posts' ? (
            <div className="posts-view">
              {selectedCategories.map((category) => (
                <div key={category}>
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Posts</h3>
                  {filteredPosts(category).map((post, index) => (
                    <div key={index} className="post">
                      {category === 'income' && (
                        <>
                          <p>Date: {post.income_date || post.created_at}</p>
                          <p>Amount: ${post.amount}</p>
                          <p>Source: {post.source}</p>
                        </>
                      )}
                      {category === 'expenditure' && (
                        <>
                          <p>Date: {post.expense_date || post.created_at}</p>
                          <p>Amount: ${post.amount}</p>
                          <p>Description: {post.description}</p>
                        </>
                      )}
                      {category === 'budgets' && (
                        <>
                          <p>Category: {post.category}</p>
                          <p>Amount: ${post.amount}</p>
                        </>
                      )}
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

      <div className="right-sidebar">
        <div className="view-toggle">
          <button onClick={() => handleViewTypeChange('posts')}>View as Posts</button>
          <button onClick={() => handleViewTypeChange('graph')}>View as Graph</button>
        </div>
      </div>
    </div>
  );
}

export default View;
