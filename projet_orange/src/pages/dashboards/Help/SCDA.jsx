import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SCDA = () => {
  const [serviceClassData, setServiceClassData] = useState([]);
  const [daGroupData, setDaGroupData] = useState([]);

  const [serviceClassEntries, setServiceClassEntries] = useState(5);
  const [daGroupEntries, setDaGroupEntries] = useState(5);
  const [serviceClassSearch, setServiceClassSearch] = useState('');
  const [daGroupSearch, setDaGroupSearch] = useState('');
  const [serviceClassPage, setServiceClassPage] = useState(1);
  const [daGroupPage, setDaGroupPage] = useState(1);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scRes, uaRes] = await Promise.all([
          axios.get("http://localhost:5000/help/sc"),
          axios.get("http://localhost:5000/help/ua")
        ]);
        setServiceClassData(scRes.data);
        setDaGroupData(uaRes.data);
      } catch (err) {
        console.error("Erreur lors du fetch:", err);
      }
    };
    fetchData();
  }, []);

  // Filter data
  const filteredServiceClass = serviceClassData.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(serviceClassSearch.toLowerCase())
    )
  );

  const filteredDaGroup = daGroupData.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(daGroupSearch.toLowerCase())
    )
  );

  // Column definitions
  const serviceClassColumns = [
    { header: 'SC', key: 'sc' },
    { header: 'Offre', key: 'offre' },
    { header: 'DA Group', key: 'dagroup' },
    { header: 'Catégorie', key: 'cat' }
  ];

  const daGroupColumns = [
    { header: 'UA', key: 'ua' },
    { header: 'Description', key: 'description' }
  ];

  // DataTable component
  const DataTable = ({ title, data, columns, entries, setEntries, search, setSearch, page, setPage }) => {
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / entries);

    return (
      <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: '#f97316', color: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ backgroundColor: '#ea580c', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>⚠</div>
          <h2 style={{ margin: 0 }}>{title}</h2>
        </div>

        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            Show 
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} style={{ margin: '0 8px' }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>
          <div>
            Global Search: 
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginLeft: '8px' }} placeholder="Search..." />
          </div>
        </div>

        <div style={{  }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columns.map((col, idx) => <th key={idx} style={{ backgroundColor: '#f97316', color: 'white', padding: '14px', textAlign: 'left' }}>{col.header}</th>)}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                  {columns.map((col, cidx) => <td key={cidx} style={{ padding: '14px' }}>{row[col.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <div>Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries</div>
          <div>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
    padding: '60px 10px 25px 10px', 
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif'
    }}>  
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
    />
    <DataTable
      title="UA / DA Group"
      data={filteredDaGroup}
      columns={daGroupColumns}
      entries={daGroupEntries}
      setEntries={setDaGroupEntries}
      search={daGroupSearch}
      setSearch={setDaGroupSearch}
      page={daGroupPage}
      setPage={setDaGroupPage}
    />
    </div>
  );
};

export default SCDA;
