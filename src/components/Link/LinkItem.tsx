import React, { FC, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ILink } from './CreateLink'
import formatDistance from 'date-fns/formatDistance';
import { FirebaseContext } from '../../context/firebaseContext'

type LinkItemProps = {
  link: ILink;
  index?: number;
  showCount: boolean;
}

export const LinkItem: FC<LinkItemProps> = ({ link, index, showCount }) => {

  const { firebase, user } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleVote = async () => {

    if (!user) {
      return navigate('/login');
    }

    const voteRef = firebase.db.collection('links').doc(link.id);
    const doc = await voteRef.get();
    if (doc.exists) {
      const prevVotes = doc.data()?.votes;
      if (prevVotes.find((v: any) => v.votedBy.id === user.uid)) return;
      const vote = { votedBy: { id: user.uid, name: user.displayName } };
      await voteRef.update({ votes: [...prevVotes, vote] });
    }
  }

  const handleDeleteLink = async () => {
    try {
      const linkRef = firebase.db.collection('links').doc(link.id);
      await linkRef.delete();
    } catch (err) {
      console.log(err);
    }

  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button pointer" onClick={handleVote}>
          ↑
        </div>
        <div className="ml1">
          <div>
            <a href={link.url} className="black no-underline">{link.description}</a>
            <span className="link">({link.url})</span>
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes by {link.postedBy.name} {formatDistance(Date.now(), link.created)}
            {" | "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}
            </Link>
            {postedByAuthUser && (
              <>
                {" | "}
                <span className="delete-button" onClick={handleDeleteLink}>
                  delete
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
