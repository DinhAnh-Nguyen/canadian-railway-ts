// app/admin/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>
        <h1>Admin Dashboard</h1>
        {/* Admin-only content */}
      </div>
    </ProtectedRoute>
  );
}