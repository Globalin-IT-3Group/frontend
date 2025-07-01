import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NoteApi from "../../api/noteAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { HiArrowLeft, HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";

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
    const result = await Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      text: "삭제된 글은 복구할 수 없습니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#0033CF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await NoteApi.deleteNote(id);
        Swal.fire({
          title: "삭제 완료!",
          text: "글이 정상적으로 삭제되었습니다.",
          imageUrl: "/success.svg",
          imageWidth: 120,
          imageHeight: 120,
          showCancelButton: false,
          confirmButtonColor: "#0033CF",
          confirmButtonText: "닫기",
        });
        navigate("/note");
      } catch (err) {
        console.error(err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <KotsuKotsuLoader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!note) return <p>존재하지 않는 노트입니다.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-4xl shadow space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-700 py-1 rounded transition flex items-center cursor-pointer"
        >
          <HiArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          <button
            className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition cursor-pointer
              "
            onClick={() => navigate(`/note/${id}/edit`)}
          >
            <HiOutlinePencilSquare className="w-5 h-6" /> 수정
          </button>
          <button
            className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition cursor-pointer
              "
            onClick={() => handleDelete()}
          >
            <FaRegTrashCan className="w-4 h-6" /> 삭제
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
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
    </div>
  );
}
