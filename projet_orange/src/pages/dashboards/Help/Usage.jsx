import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usage = () => {
  // Usage Counter Data
  const [usageCounterData, setUsageCounterData] = useState([]);

  // State for usage counter table
 const [usageCounterState, setUsageCounterState] = useState({
    entries: 10,
    search: '',
    page: 1,
    filteredData: [],
    filters: { counter: '', description: '' }
  });
  useEffect(() => {
  const fetchUsage = async () => {
    try {
      const { data } = await axios.get('/help/uc');
      setUsageCounterData(data);
      setUsageCounterState(prev => ({ ...prev, filteredData: data }));
    } catch (err) {
      console.error('❌ Erreur lors du fetch usage counters:', err);
    }
  };

    fetchUsage();
  }, []);

  // Apply filters function
  const applyFilters = (data, search, filters) => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Column filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(item =>
          item[key].toString().toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    return filtered;
  };
  

  // Update filtered data when search or filters change
   useEffect(() => {
    const filtered = applyFilters(usageCounterData, usageCounterState.search, usageCounterState.filters);
    setUsageCounterState(prev => ({ ...prev, filteredData: filtered, page: 1 }));
  }, [usageCounterState.search, usageCounterState.filters, usageCounterData]);

  // Initialize filtered data

  // Styles
  const containerStyle = {
    padding: '60px',
    paddingLeft: '10px',
    paddingBottom: '25px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px'
  };

  const iconStyle = {
    backgroundColor: '#ea580c',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  const controlsStyle = {
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px'
  };

  const selectStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '16px',
    marginLeft: '8px',
    marginRight: '8px'
  };

  const searchInputStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '8px 14px',
    fontSize: '16px',
    width: '250px',
    marginLeft: '8px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '14px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: '600',
    borderRight: '1px solid #ea580c'
  };

  const tdStyle = {
    padding: '14px',
    fontSize: '16px',
    borderBottom: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb'
  };

  const paginationStyle = {
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    margin: '0 2px'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f97316',
    color: 'white',
    border: '1px solid #f97316'
  };

  const filterSelectStyle = {
    backgroundColor: '#ea580c',
    border: '1px solid #c2410c',
    borderRadius: '2px',
    fontSize: '14px',
    padding: '2px 4px',
    color: 'white',
    marginLeft: '8px'
  };

  // Generic DataTable Component
  const DataTable = ({ 
    title, 
    icon,
    data, 
    columns, 
    state,
    setState,
    showColumnFilters = false
  }) => {
    const startIndex = (state.page - 1) * state.entries;
    const endIndex = startIndex + state.entries;
    const paginatedData = state.filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(state.filteredData.length / state.entries);

    const updateState = (updates) => {
      setState(prev => ({ ...prev, ...updates }));
    };

    const updateFilter = (column, value) => {
      setState(prev => ({
        ...prev,
        filters: { ...prev.filters, [column]: value }
      }));
    };

    const getUniqueValues = (column) => {
      return [...new Set(data.map(item => item[column]))].sort((a, b) => {
        if (column === 'counter') return Number(a) - Number(b);
        return a.toString().localeCompare(b.toString());
      });
    };

    return (
      <div style={tableContainerStyle}>
        {/* Table Header */}
        <div style={headerStyle}>
          <div style={iconStyle}>{icon}</div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{title}</h2>
        </div>

        {/* Controls */}
        <div style={controlsStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', color: '#374151' }}>Show</span>
            <select 
              value={state.entries} 
              onChange={(e) => updateState({ entries: Number(e.target.value), page: 1 })}
              style={selectStyle}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span style={{ fontSize: '16px', color: '#374151' }}>entries</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', color: '#374151' }}>Global Search:</span>
            <input
              type="text"
              value={state.search}
              onChange={(e) => updateState({ search: e.target.value })}
              style={searchInputStyle}
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} style={{ ...thStyle, borderRight: index === columns.length - 1 ? 'none' : '1px solid #ea580c' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{column.header}</span>
                      {showColumnFilters && (
                        <select 
                          value={state.filters[column.key] || ''}
                          onChange={(e) => updateFilter(column.key, e.target.value)}
                          style={filterSelectStyle}
                        >
                          <option value="">All</option>
                          {getUniqueValues(column.key).map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      )}
                      {!showColumnFilters && (
                        <select style={filterSelectStyle}>
                          <option value="">All</option>
                        </select>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={row.counter + '-' + rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9fafb' : 'white' }}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} style={{ 
                      ...tdStyle, 
                      borderRight: colIndex === columns.length - 1 ? 'none' : '1px solid #e5e7eb',
                      color: '#374151'
                    }}>
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={paginationStyle}>
          <div style={{ fontSize: '16px', color: '#374151' }}>
            Showing {startIndex + 1} to {Math.min(endIndex, state.filteredData.length)} of {state.filteredData.length} entries
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button 
              onClick={() => updateState({ page: Math.max(1, state.page - 1) })}
              disabled={state.page === 1}
              style={{
                ...buttonStyle,
                opacity: state.page === 1 ? 0.5 : 1,
                cursor: state.page === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => updateState({ page: pageNum })}
                  style={state.page === pageNum ? activeButtonStyle : buttonStyle}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span style={{ padding: '0 8px', color: '#6b7280' }}>...</span>
                <button
                  onClick={() => updateState({ page: totalPages })}
                  style={buttonStyle}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button 
              onClick={() => updateState({ page: Math.min(totalPages, state.page + 1) })}
              disabled={state.page === totalPages}
              style={{
                ...buttonStyle,
                opacity: state.page === totalPages ? 0.5 : 1,
                cursor: state.page === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Column definitions
  const usageCounterColumns = [
    { header: 'Counter', key: 'counter' },
    { header: 'Description', key: 'description' }
  ];

  return (
    <div style={{...containerStyle, height: '100vh', marginTop: '-30px', overflowY: 'auto' }}>
      {/* Usage Counter Table */}
      <DataTable
        title="Usage Counter"
        icon="⚙️"
        data={usageCounterData}
        columns={usageCounterColumns}
        state={usageCounterState}
        setState={setUsageCounterState}
        showColumnFilters={true}
      />
    </div>
  );
};

export default Usage;