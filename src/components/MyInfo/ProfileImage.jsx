import { FiCamera } from "react-icons/fi";
import { useRef, useState } from "react";

export default function ProfileImage() {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-32 h-32">
      <img
        src={imageSrc}
        alt="profile"
        className="w-32 h-32 object-cover rounded-full"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow hover:bg-gray-100"
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
