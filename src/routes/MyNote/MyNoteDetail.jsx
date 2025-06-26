import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NoteApi from "../../api/noteAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function MyNoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const data = await NoteApi.getNote(id);
        setNote(data);
      } catch (err) {
        console.error(err);
        setError("노트를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 이 노트를 삭제하시겠어요?")) return;
    try {
      await NoteApi.deleteNote(id);
      navigate("/note");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!note) return <p>존재하지 않는 노트입니다.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-4xl shadow space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/note" className="text-sm text-blue-500 hover:underline">
          &larr; 뒤로
        </Link>
        <div className="space-x-2">
          <Link
            to={`/note/${id}/edit`}
            className="text-sm text-green-500 hover:underline"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:underline"
          >
            삭제
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold dark:text-white">{note.title}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500">{note.date}</p>
      <hr className="border-gray-200 dark:border-zinc-600" />

      <div className="prose prose-lg max-w-none font-pretendard text-gray-800 min-h-[200px] mb-8 dark:text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            h1: (props) => (
              <h1 className="text-3xl font-bold my-4" {...props} />
            ),
            h2: (props) => (
              <h2 className="text-2xl font-semibold my-3" {...props} />
            ),
            ul: (props) => <ul className="list-disc ml-6 mb-2" {...props} />,
            li: (props) => <li className="mb-1" {...props} />,
            p: (props) => <p className="mb-2" {...props} />,
            a: (props) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              />
            ),
            code: (props) => (
              <code
                className="inline bg-zinc-200 text-pink-600 px-1 py-0.5 rounded font-mono text-base"
                {...props}
              />
            ),
            pre: (props) => (
              <pre
                className="bg-zinc-200 rounded p-5 my-5 font-mono text-base leading-relaxed overflow-x-auto"
                {...props}
              />
            ),
          }}
        >
          {note.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
