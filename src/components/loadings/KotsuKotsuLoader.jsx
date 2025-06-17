export default function KotsuKotsuLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <div
        className="loader"
        style={{
          fontSize: "clamp(5rem, 8vw, 6rem)", // 최소 1.5rem, 최대 3rem, 뷰포트 기준 커짐
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          marginLeft: "200px",
        }}
      />
    </div>
  );
}
