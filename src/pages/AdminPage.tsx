import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-600 to-purple-300 px-4 py-4">
      <div className="w-full h-full mt-8">
        <AdminPanel />
      </div>
    </div>
  );
}
