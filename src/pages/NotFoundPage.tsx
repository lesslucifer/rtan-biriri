import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-md">
        <h1 className="text-8xl md:text-9xl font-bold mb-4 text-blue-600">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
          Không tìm thấy trang
        </h2>

        <p className="text-lg mb-8 text-gray-600">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Quay lại
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}
