// src/components/ProfileAvatar.jsx
export default function ProfileAvatar({
  src,
  alt = "profile",
  size = 10, // Tailwind w-10, h-10 기준
  borderSize = 8, // 안쪽 흰 원 크기 (w-8, h-8)
  imgSize = 8, // 이미지 크기 (w-7, h-7)
  onClick,
  style = {},
}) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full p-1
        bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500
        flex items-center justify-center transition duration-250 hover:scale-120 hover:via-blue-500`}
      style={style}
      onClick={onClick}
    >
      <div
        className={`bg-white w-${borderSize} h-${borderSize} rounded-full flex items-center justify-center`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-${imgSize} h-${imgSize} object-cover rounded-full`}
        />
      </div>
    </div>
  );
}
