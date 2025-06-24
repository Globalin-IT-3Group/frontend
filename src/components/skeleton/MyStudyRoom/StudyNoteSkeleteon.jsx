import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

export default function StudyNoteSkeleteon() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {/* 글쓰기 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border border-blue-600 bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow transition cursor-pointer"
          onClick={() =>
            navigate(`/study/mystudyroom/${studyRoomId}/notes/new`)
          }
        >
          ✏️ 글쓰기
        </button>
      </div>

      {/* 노트 목록 컴포넌트 */}
      <li className="shadow-md px-4 py-4 bg-white mb-5 flex flex-col">
        <div className="flex justify-between gap-4 items-center">
          {/* 제목/날짜 */}
          <div className="flex items-start gap-4 w-full">
            {/* 썸네일 */}
            <Skeleton width={85} height={85} />

            <div className="flex-1 flex flex-col justify-start">
              <div className="flex items-start justify-between">
                {/* 제목+미리보기 */}
                <div className="space-y-2">
                  <div className="block max-w-[380px]">
                    <Skeleton width={200} height={25} />
                  </div>
                  <div className="block max-w-[150px]">
                    <Skeleton width={100} height={25} />
                  </div>
                </div>
                {/* 날짜 */}
                <span className="ml-4 whitespace-nowrap mt-1">
                  <Skeleton width={70} height={20} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 프로필/닉네임 + 좋아요/댓글 */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {/* 프로필/닉네임 */}
          <div className="flex items-center gap-2">
            <Skeleton circle width={35} height={35} />
            <Skeleton width={30} height={20} />
          </div>

          {/* 좋아요/댓글수 */}
          <div className="flex items-center gap-3">
            <Skeleton circle width={30} height={30} />
            <Skeleton circle width={30} height={30} />
          </div>
        </div>
      </li>
    </div>
  );
}
