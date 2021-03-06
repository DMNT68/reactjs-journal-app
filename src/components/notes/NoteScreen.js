import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);

  const { body, title, id } = values;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);

  const handleClick = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
      <NotesAppBar />
      <div className="notes__content animate__animated animate__fadeIn animate__faster">
        <input type="text" placeholder="Some awesome title" className="notes__title-input" autoComplete="off" name="title" value={title} onChange={handleInputChange} />
        <textarea placeholder="What happen today" className="notes__textarea" name="body" value={body} onChange={handleInputChange}></textarea>
        <div className="notes__image">{note.url && <img src={note.url} alt="img" />}</div>
      </div>
      <button className="btn btn-danger animate__animated animate__fadeIn animate__faster" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};
