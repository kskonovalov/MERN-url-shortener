import React, { useEffect } from 'react';

const LinkCard = ({ link }) => {

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <>
      <div className="row">
        <div className="input-field col s6">
          <input id="short" type="text" value={link.short} readOnly={true} />
          <label htmlFor="first_name">Short</label>
          <a href={link.short} target="_blank" rel="noopener noreferrer nofollow">Open in new window</a>
        </div>
        <div className="input-field col s6">
          <input id="full" type="text" value={link.url} readOnly={true} />
          <label htmlFor="first_name">Full</label>
          <a href={link.url} target="_blank" rel="noopener noreferrer nofollow">Open in new window</a>
        </div>
      </div>
      <p><b>Clicks:</b> {link.clicks}</p>
      <p><b>Added:</b> {new Date(link.date).toLocaleDateString()}</p>
    </>
  );
};

export default LinkCard;
