import React from 'react';
import { Link } from 'react-router-dom';

const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links for now here</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>short</th>
          <th>details</th>
          <th>full</th>
          <th>date</th>
          <th>clicks</th>
        </tr>
      </thead>
      <tbody>
        {links.map((item, index) => {
          return (
            <tr key={item._id}>
              <td>{index}</td>
              <td><Link to={`/detail/${item._id}`}>Details</Link></td>
              <td>{item.short}</td>
              <td>{item.url}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.clicks}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksList;
