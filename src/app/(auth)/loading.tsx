export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/15 backdrop-blur-sm z-50">
      <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
