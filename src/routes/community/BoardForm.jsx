import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import BoardApi from "../../api/boardAPI";
import { getCommands } from "@uiw/react-md-editor/commands-cn";
import Swal from "sweetalert2";

export default function BoardForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit"); // boardId

  const editConfirm = async () => {
    const result = await Swal.fire({
      title: "글을 수정하시겠습니까?",
      text: "취소시 수정중인 글로 돌아갑니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  const registerConfirm = async () => {
    const result = await Swal.fire({
      title: "글을 등록하시겠습니까?",
      text: "취소시 작성중인 글로 돌아갑니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "등록",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  const editSuccess = async () => {
    await Swal.fire({
      title: "글 수정 완료!",
      text: "글이 정상적으로 수정되었습니다.",
      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,
      //showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "닫기",
      //cancelButtonText: "취소",
    });
  };

  const registerSuccess = async () => {
    await Swal.fire({
      title: "글 등록 완료!",
      text: "글이 정상적으로 등록되었습니다.",
      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,
      //showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "닫기",
      //cancelButtonText: "취소",
    });
  };

  const commands = getCommands().filter((cmd) =>
    [
      "bold",
      "italic",
      "strikethrough",
      "quote",
      "code",
      "link",
      "image",
    ].includes(cmd.name)
  );

  // 1. edit 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (editId) {
      setLoading(true);
      BoardApi.getBoardDetail(editId)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        })
        .finally(() => setLoading(false));
    }
  }, [editId]);

  // 2. 저장 로직 분기
  const handleBoardSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        const confirmed = await editConfirm();
        if (!confirmed) {
          setLoading(false);
          return;
        }
        await BoardApi.updateBoard(editId, { title, content });
        editSuccess();
      } else {
        const confirmed = await registerConfirm();
        if (!confirmed) {
          setLoading(false);
          return;
        }
        await BoardApi.createBoard({ title, content });
        registerSuccess();
      }
      navigate("/community");
    } catch (error) {
      alert("저장 실패!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="w-full h-full flex flex-col items-center py-2">
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-700 rounded-2xl flex flex-col gap-8 p-0">
        {/* 커뮤니티 글 작성 타이틀 */}
        <div className="w-full flex justify-center items-center py-8 border-b dark:border-b-white">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {editId ? "커뮤니티 글 수정" : "커뮤니티 글 작성"}
          </h1>
        </div>
        <div className="flex w-full h-[560px] px-8 gap-6">
          {/* 왼쪽: 제목 + 에디터 */}
          <div className="w-1/2 h-full flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full text-2xl font-bold border-none outline-none bg-transparent my-3 dark:text-white placeholder-gray-400"
              disabled={loading}
            />
            <div className="flex-1 flex flex-col">
              <MDEditor
                value={content}
                onChange={setContent}
                height={504}
                preview="edit"
                commands={commands}
                extraCommands={[]}
                textareaProps={{
                  placeholder: "여기에 내용을 작성하세요...",
                  className: "bg-transparent min-h-[400px] text-base",
                }}
                disabled={loading}
              />
            </div>
          </div>
          {/* 오른쪽: 프리뷰 */}
          <div className="w-1/2 h-full shadow-xl overflow-y-auto bg-gray-100 p-6">
            {title && (
              <div className="text-3xl font-bold mb-4 break-words">{title}</div>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: (props) => (
                  <h1 className="text-3xl font-bold my-4" {...props} />
                ),
                h2: (props) => (
                  <h2 className="text-2xl font-semibold my-3" {...props} />
                ),
                ul: (props) => (
                  <ul className="list-disc ml-6 mb-2" {...props} />
                ),
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
              {content}
            </ReactMarkdown>
          </div>
        </div>
        {/* 버튼 영역 */}
        <div className="flex justify-end px-8 mb-8 gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition cursor-pointer"
            onClick={handleBack}
            disabled={loading}
          >
            뒤로
          </button>
          <button
            onClick={handleBoardSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
            disabled={loading}
          >
            {editId ? "수정" : "게시"}
          </button>
        </div>
      </div>
    </div>
  );
}
