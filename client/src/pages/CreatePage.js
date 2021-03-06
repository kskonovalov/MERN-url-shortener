import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async event => {
    event.preventDefault();
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { url: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        console.log(data);
        console.log('added');
        console.log(`/detail/${data.url._id}`);
        history.push(`/detail/${data.url._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <h1>Create link</h1>
        <div className="input-field">
          <input
            placeholder="Link"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Input link, please</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
