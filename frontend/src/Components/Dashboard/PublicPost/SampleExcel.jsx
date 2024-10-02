import React from 'react';

const sampleData = [
    {
      title: 'Country Data 2023',
      description: 'Data showing country rankings in 2023 based on certain metrics',
      columns: ['Country', 'Year', 'Rank', 'Total'],
      rows: [
        ['Somalia', '2023', '1st', '111.9'],
        ['Yemen', '2023', '2nd', '108.9'],
        ['South Sudan', '2023', '3rd', '108.5'],
        ['Congo Democratic Republic', '2023', '4th', '107.2'],
        ['Syria', '2023', '5th', '107.1'],
        ['Afghanistan', '2023', '6th', '106.6'],
        ['Sudan', '2023', '7th', '106.2'],
        ['Central African Republic', '2023', '8th', '105.7'],
      ],
      file: '/CountryData2023.xlsx', // Direct URL from public folder
      fileName: 'CountryData2023.xlsx', // Dynamic file name
    },
    {
      title: 'Employee Data 2024',
      description: 'Data showing employee details and job titles',
      columns: ['EEID', 'Full Name', 'Job Title'],
      rows: [
        ['E02387', 'Emily Davis', 'Sr. Manager'],
        ['E04105', 'Theodore Dinh', 'Technical Architect'],
        ['E02572', 'Luna Sanders', 'Director'],
        ['E02832', 'Penelope Jordan', 'Computer Systems Manager'],
        ['E01639', 'Austin Vo', 'Sr. Analyst'],
        ['E00644', 'Joshua Gupta', 'Account Representative'],
        ['E01550', 'Ruby Barnes', 'Manager'],
        ['E04332', 'Luke Martin', 'Analyst'],
      ],
      file: '/EmployeeData2024.xlsx',  // Direct URL from public folder
      fileName: 'EmployeeData2024.xlsx',  // Dynamic file name
    },
  ];
  

const SampleExcel = () => {
    const handleSampleDownload = (file, fileName) => {
        const link = document.createElement('a');
        link.href = file;
        link.download = fileName; // Use dynamic file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6">Sample Spreadsheets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleData.map((sheet, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="font-semibold mb-2 text-lg">{sheet.title}</h3>
            <p className="text-sm text-gray-700 mb-3">{sheet.description}</p>
            <div className="h-60 w-full border border-gray-400 overflow-auto rounded-lg bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    {sheet.columns.map((column, colIndex) => (
                      <th
                        key={colIndex}
                        className="border border-gray-300 px-3 py-2 text-gray-800 font-bold"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheet.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-3 py-2 text-gray-800"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
  onClick={() => handleSampleDownload(sheet.file, sheet.fileName)}
>
  Use Data
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleExcel;
