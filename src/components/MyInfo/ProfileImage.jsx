import { FiCamera } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import ImageAPI from "../../api/imageAPI";
import { updateProfileImage } from "../../store/reducers/authSlice";
import { useDispatch } from "react-redux";

export default function ProfileImage({ src }) {
  const fileInputRef = useRef(null);
  const defaultImage =
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  const dispatch = useDispatch();

  // src가 null이거나 빈 값이면 defaultImage
  const initial = src ? src : defaultImage;
  const [imageSrc, setImageSrc] = useState(initial);

  // src가 바뀔 때만 반영 (null이면 무조건 defaultImage)
  useEffect(() => {
    setImageSrc(src ? src : defaultImage);
  }, [src]);

  // 파일 업로드 핸들러: 미리보기 + 서버 업로드
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageSrc(URL.createObjectURL(file)); // 미리보기용 (로컬 Blob URL)

      const res = await ImageAPI.uploadProfileImage(file);
      setImageSrc(res.imageUrl); // S3 URL로 교체
      dispatch(updateProfileImage(res.imageUrl));
    } catch (error) {
      alert("이미지 업로드 실패!");
      console.error(error);
      setImageSrc(src ? src : defaultImage);
    }
  };

  return (
    <div className="relative w-32 h-32">
      <img
        src={imageSrc}
        alt="profile"
        className="w-32 h-32 object-cover rounded-full"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer dark:text-black"
      >
        <FiCamera className="text-xl" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
