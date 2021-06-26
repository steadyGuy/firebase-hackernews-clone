import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { FirebaseContext } from '../../context/firebaseContext';
import useFormValidation from '../../hooks/useFormValidation';
import validateCreateLink from '../../utils/validateCreateLink';

const INITIAL_STATE = {
  description: '',
  url: '',
}

export interface ICreateLinkForm {
  description: string,
  url: string,
}

export interface ILink {
  id?: string;
  url: string;
  description: string;
  postedBy: {
    id: string;
    name: string | null;
  },
  votes: any[],
  comments: any[],
  created: number | Date;
}

export const CreateLink = () => {
  const { firebase, user } = useContext(FirebaseContext)
  const navigate = useNavigate();

  const handleCreateLink = async () => {
    if (!user) {
      return navigate('/login');
    }
    const { url, description } = form;
    const newLink: ILink = {
      url,
      description,
      postedBy: {
        id: user.uid,
        name: user.displayName,
      },
      votes: [],
      comments: [],
      created: Date.now()
    }
    await firebase.db.collection('links').add(newLink);
    return navigate('/');
  }

  const { handleChange, handleSubmit, handleBlur, form, errors } =
    useFormValidation<ICreateLinkForm>(INITIAL_STATE, validateCreateLink, handleCreateLink);

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        value={form.description}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.description && 'error-input'}
      />

      {errors.description && <p className="error-text">{errors.description}</p>}

      <input
        name="url"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        value={form.url}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.url && 'error-input'}
      />

      {errors.url && <p className="error-text">{errors.url}</p>}

      <button className="button" type="submit">Submit</button>
    </form>
  )
}
