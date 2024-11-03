import React, { useState } from 'react';
import './style/ManagerPage.css'

function ManagerPage() {
  const [entries, setEntries] = useState([]);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [password, setPassword] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();
    const newEntry = { websiteName, websiteURL, password };
    setEntries([...entries, newEntry]);
    setWebsiteName('');
    setWebsiteURL('');
    setPassword('');
  };

  return (
    <div className='manager-page'>
      <h1>Manager Page</h1>
      <p>Welcome to the manager page!</p>
      
      <form onSubmit={handleAddEntry}>
        <input
          type="text"
          placeholder="Website Name"
          value={websiteName}
          onChange={(e) => setWebsiteName(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Website URL"
          value={websiteURL}
          onChange={(e) => setWebsiteURL(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Website Name</th>
            <th>Website URL</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.websiteName}</td>
              <td><a href={entry.websiteURL} target="_blank" rel="noopener noreferrer">{entry.websiteURL}</a></td>
              <td>{entry.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerPage;