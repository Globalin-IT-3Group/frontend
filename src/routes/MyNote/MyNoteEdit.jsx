// src/routes/MyNote/MyNoteEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NoteApi from "../../api/noteAPI";
import MyNoteForm from "./MyNoteForm"; // 경로 조정
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";

export default function MyNoteEdit() {
  const { id } = useParams();
  const [existingNote, setExistingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NoteApi.getNote(id)
      .then((data) => setExistingNote(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <KotsuKotsuLoader />;
  if (!existingNote) return <p>노트를 찾을 수 없습니다.</p>;

  return <MyNoteForm mode="edit" existingNote={existingNote} />;
}
