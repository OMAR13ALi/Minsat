import React, { useState } from 'react';

const SCDA = () => {
  // Sample data for Service Class table
  const [serviceClassData] = useState([
    { id: 1, sc_id: 1, offre: "Prepaye club", da_group: 3, categorie: "Mobile PrÃ©payÃ©" },
    { id: 2, sc_id: 3, offre: "Prepaye zen", da_group: 3, categorie: "Mobile PrÃ©payÃ©" },
    { id: 3, sc_id: 4, offre: "Play", da_group: 8, categorie: "Mobile PrÃ©payÃ©" },
    { id: 4, sc_id: 9, offre: "Allo lekoll", da_group: 9, categorie: "Mobile PrÃ©payÃ©" },
    { id: 5, sc_id: 10, offre: "Kollou bonus", da_group: 10, categorie: "Mobile PrÃ©payÃ©" },
    { id: 6, sc_id: 11, offre: "prepaye club partenaire", da_group: 11, categorie: "Mobile PrÃ©payÃ©" },
    { id: 7, sc_id: 12, offre: "Nejma", da_group: 13, categorie: "Mobile PrÃ©payÃ©" },
    { id: 8, sc_id: 13, offre: "Boouj", da_group: 14, categorie: "Mobile PrÃ©payÃ©" },
    { id: 9, sc_id: 14, offre: "Edawa5", da_group: 15, categorie: "Mobile PrÃ©payÃ©" },
    { id: 10, sc_id: 15, offre: "Tehabbel", da_group: 16, categorie: "Mobile PrÃ©payÃ©" }
  ]);

  // Sample data for DA Group table
  const [daGroupData] = useState([
    { id: 1, da_group_id: 0, da_id: 417, description: "Pass Afrique roaming", unit_type: "Volume", usage: "NULL", category: "option" },
    { id: 2, da_group_id: 1, da_id: 435, description: "Option Data Roaming CAN", unit_type: "Volume", usage: "NULL", category: "option" },
    { id: 3, da_group_id: 1, da_id: 446, description: "Navigu 200Go", unit_type: "Volume", usage: "NULL", category: "option" },
    { id: 4, da_group_id: 1, da_id: 414, description: "option 10Go all night", unit_type: "Volume", usage: "NULL", category: "option" },
    { id: 5, da_group_id: 1, da_id: 416, description: "Option DATA 75 Go", unit_type: "Volume", usage: "NULL", category: "option" }
  ]);

  const [serviceClassEntries, setServiceClassEntries] = useState(10);
  const [daGroupEntries, setDaGroupEntries] = useState(10);
  const [serviceClassSearch, setServiceClassSearch] = useState('');
  const [daGroupSearch, setDaGroupSearch] = useState('');
  const [serviceClassPage, setServiceClassPage] = useState(1);
  const [daGroupPage, setDaGroupPage] = useState(1);

  // Filter and paginate Service Class data
  const filteredServiceClass = serviceClassData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(serviceClassSearch.toLowerCase())
    )
  );

  // Filter and paginate DA Group data
  const filteredDaGroup = daGroupData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(daGroupSearch.toLowerCase())
    )
  );

  const containerStyle = {
    padding: '60px',
    paddingLeft: '10px', // Move content more to the left
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
    fontSize: '18px' // Bigger text for header
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
    fontSize: '16px' // Bigger text for controls
  };

  const selectStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '6px 12px', // Bigger padding
    fontSize: '16px', // Bigger text
    marginLeft: '8px',
    marginRight: '8px'
  };

  const searchInputStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '8px 14px', // Bigger padding
    fontSize: '16px', // Bigger text
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
    padding: '14px', // Bigger padding
    textAlign: 'left',
    fontSize: '16px', // Bigger text
    fontWeight: '600',
    borderRight: '1px solid #ea580c'
  };

  const tdStyle = {
    padding: '14px', // Bigger padding
    fontSize: '16px', // Bigger text
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
    fontSize: '16px' // Bigger text for pagination
  };

  const buttonStyle = {
    padding: '8px 16px', // Bigger padding
    fontSize: '16px', // Bigger text
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

  const DataTable = ({ 
    title, 
    data, 
    columns, 
    entries, 
    setEntries, 
    search, 
    setSearch, 
    page, 
    setPage,
    totalEntries 
  }) => {
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / entries);

    return (
      <div style={tableContainerStyle}>
        {/* Table Header */}
        <div style={headerStyle}>
          <div style={iconStyle}>⚠</div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{title}</h2>
        </div>

        {/* Controls */}
        <div style={controlsStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', color: '#374151' }}>Show</span>
            <select 
              value={entries} 
              onChange={(e) => setEntries(Number(e.target.value))}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                      <select style={{
                        backgroundColor: '#ea580c',
                        border: '1px solid #c2410c',
                        borderRadius: '2px',
                        fontSize: '14px', // Bigger dropdown text
                        padding: '2px 4px',
                        color: 'white',
                        marginLeft: '8px'
                      }}>
                        <option value="">All</option>
                      </select>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={row.id} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9fafb' : 'white' }}>
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
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {totalEntries} entries
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button 
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              style={{
                ...buttonStyle,
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={page === pageNum ? activeButtonStyle : buttonStyle}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span style={{ padding: '0 8px', color: '#6b7280' }}>...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  style={buttonStyle}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button 
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              style={{
                ...buttonStyle,
                opacity: page === totalPages ? 0.5 : 1,
                cursor: page === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const serviceClassColumns = [
    { header: 'SC_ID', key: 'sc_id' },
    { header: 'Offre', key: 'offre' },
    { header: 'DA Group', key: 'da_group' },
    { header: 'Catégorie', key: 'categorie' }
  ];

  const daGroupColumns = [
    { header: 'DA group ID', key: 'da_group_id' },
    { header: 'DA ID', key: 'da_id' },
    { header: 'Description', key: 'description' },
    { header: 'Unit Type', key: 'unit_type' },
    { header: 'Usage', key: 'usage' },
    { header: 'Category', key: 'category' }
  ];

  return (
    <div style={{... containerStyle, height: '100vh', marginTop: '-30px', overflowY: 'auto' }}>
      {/* Service Class Table */}
      <DataTable
        title="Service Class"
        data={filteredServiceClass}
        columns={serviceClassColumns}
        entries={serviceClassEntries}
        setEntries={setServiceClassEntries}
        search={serviceClassSearch}
        setSearch={setServiceClassSearch}
        page={serviceClassPage}
        setPage={setServiceClassPage}
        totalEntries={104}
      />

      {/* DA Group Table */}
      <DataTable
        title="DA Group"
        data={filteredDaGroup}
        columns={daGroupColumns}
        entries={daGroupEntries}
        setEntries={setDaGroupEntries}
        search={daGroupSearch}
        setSearch={setDaGroupSearch}
        page={daGroupPage}
        setPage={setDaGroupPage}
        totalEntries={104}
      />
    </div>
  );
};

export default SCDA;