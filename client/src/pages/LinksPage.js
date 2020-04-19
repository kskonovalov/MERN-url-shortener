import React, { useState, useCallback, useContext, useEffect } from 'react';

import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Links page</h1>
      <LinksList links={links} />
    </div>
  );
};

export default LinksPage;
