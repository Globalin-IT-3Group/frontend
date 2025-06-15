import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { getCommands } from "@uiw/react-md-editor/commands-cn";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function BoardForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <div className="w-full h-full flex flex-col items-center py-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl flex flex-col gap-8 p-0">
        <div className="flex w-full h-[600px] px-8 gap-6">
          {/* 왼쪽: 제목 + 에디터 */}
          <div className="w-1/2 h-full flex flex-col">
            {/* 제목 */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full text-3xl font-bold border-none outline-none bg-transparent mb-6 placeholder-gray-400"
            />
            {/* 에디터 */}
            <div className="flex-1 flex flex-col">
              <MDEditor
                value={content}
                onChange={setContent}
                height={540}
                preview="edit"
                commands={commands}
                extraCommands={[]}
                textareaProps={{
                  placeholder: "여기에 내용을 작성하세요...",
                  className: "bg-transparent min-h-[400px] text-base",
                }}
              />
            </div>
          </div>
          {/* 오른쪽: 프리뷰 */}
          <div className="w-1/2 h-full shadow-xl overflow-y-auto bg-gray-100 p-6">
            {/* 제목 */}
            {title && (
              <div className="text-3xl font-bold mb-4 break-words">{title}</div>
            )}
            {/* 마크다운 프리뷰 (줄바꿈 지원) */}
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
        {/* 작성 버튼 */}
        <div className="flex justify-end px-8 mb-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">
            게시
          </button>
        </div>
      </div>
    </div>
  );
}
