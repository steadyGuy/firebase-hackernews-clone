import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { FirebaseContext } from '../../context/firebaseContext'

import { ILink } from './CreateLink';
import { LinkItem } from './LinkItem';

export const LinkList = () => {
  const { firebase } = useContext(FirebaseContext);
  const location = useLocation();
  const [links, setLinks] = useState<ILink[]>([]);
  const isNewPage = location.pathname.includes('new');

  const getLinks = async () => {
    // await firebase.db.collection('links').get();
    await firebase.db.collection('links').orderBy('created', 'desc').onSnapshot((snapshot) => {
      setLinks(snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      }));
    });
  }


  useEffect(() => {

    getLinks();

  }, []);

  const renderLinks = () => {
    debugger;
    if (isNewPage) {
      return links;
    }
    debugger;
    return links.slice().sort((a, b) => b.votes.length - a.votes.length);
  }

  return (
    <div>
      {renderLinks().map((link, i) => (
        <LinkItem key={link.id} showCount={true} link={link} index={i + 1} />
      ))}
    </div>
  )
}
