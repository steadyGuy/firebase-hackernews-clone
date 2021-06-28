import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebaseContext';
import { ILink } from './CreateLink';
import { LinkItem } from './LinkItem';
import formatDistance from 'date-fns/formatDistance'

export const LinkDetail = () => {
  const { firebase, user } = useContext(FirebaseContext);
  const { linkId } = useParams();
  const [link, setLink] = useState<ILink | null>(null);
  const [commentText, setCommentText] = useState('');
  const linkRef = firebase.db.collection('links').doc(linkId);

  const getLink = async () => {
    const doc = await linkRef.get();
    setLink({ ...doc.data() as Omit<ILink, 'id'>, id: doc.id });
  }

  const handleAddComment = async (e: FormEvent<HTMLButtonElement>) => {
    if (!user) {
      return alert('Вы должны быть авторизированы чтобы оставить комментарий');
    }
    const doc = await linkRef.get();
    if (doc.exists) {
      const prevComments = doc.data()?.comments;
      const comment = {
        postedBy: { id: user.uid, name: user.displayName },
        created: Date.now(),
        text: commentText,
      };
      await linkRef.update({ comments: [...prevComments, comment] });
      setLink((prev: any) => ({
        ...prev,
        comments: [...prevComments, comment],
      }));
      setCommentText('');
    }
  }

  useEffect(() => {

    getLink();

  }, []);

  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea rows={6} cols={60} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
      <div>
        <button className="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      {link.comments.map((comment, idx) => (
        <div key={idx}>
          <p className="comment-author">
            {comment.postedBy.name} | {formatDistance(Date.now(), comment.created)}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )
}
