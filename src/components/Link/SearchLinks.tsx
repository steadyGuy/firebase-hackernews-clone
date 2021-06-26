import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../context/firebaseContext';
import { ILink } from './CreateLink';
import { LinkItem } from './LinkItem';

export const SearchLinks = () => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [filter, setFilter] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<ILink[]>([]);
  const { firebase } = useContext(FirebaseContext);

  const handleSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = filter.toLocaleLowerCase();
    setFilteredLinks(links.filter(link => {
      return link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name?.toLowerCase().includes(query);
    }));
  }

  const getInitialLinks = async () => {
    const snapshot = await firebase.db.collection('links').get();

    const links = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
  }

  useEffect(() => {

    getInitialLinks();

  }, [])

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={e => setFilter(e.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((link, i) => (
        <LinkItem key={link.id} showCount={false} link={link} index={i + 1} />
      ))}
    </div>
  );
}
