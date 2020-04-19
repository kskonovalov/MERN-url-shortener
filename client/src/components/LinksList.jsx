import React from 'react';

const LinksList = ({ links }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>short</th>
          <th>full</th>
          <th>date</th>
          <th>clicks</th>
        </tr>
      </thead>
      <tbody>
      { links.map(item => {
        return <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.short}</td>
          <td>{item.url}</td>
          <td>{new Date(item.date).toLocaleDateString()}</td>
          <td>{item.clicks}</td>
        </tr>;
      })}
      </tbody>
    </table>
  );
};

export default LinksList;
