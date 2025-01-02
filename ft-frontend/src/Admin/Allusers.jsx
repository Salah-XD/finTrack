import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, Search } from "lucide-react";

const Alluser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://ftbackend.vercel.app/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUsers(data.Users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  // Filter and sort users based on search term and creation date
  const filteredUsers = users
    .filter((user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">All Users</h2>
          <p className="text-gray-600">Manage and view all registered users</p>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800 shadow-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {filteredUsers.length > 0 ? (
          <div className="grid gap-8">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100"
              >
                <div className="border-b border-gray-100/50 px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-inner">
                      <span className="text-blue-600 font-bold text-xl">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                      {user.name || "Unnamed User"}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoItem label="Email" value={user.email} />
                    <InfoItem label="Phone" value={user.phone} />
                    <InfoItem label="Username" value={user.userName} />
                    <InfoItem label="Aadhar" value={user.aadhar} />
                    <InfoItem label="PAN" value={user.pan} />
                    <InfoItem label="GSTIN" value={user.gstin} />
                    <InfoItem
                      label="Created"
                      value={new Date(user.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm
                  ? "No users found matching your search."
                  : "No users found."}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {searchTerm
                  ? "Try a different search term"
                  : "Users will appear here once they register"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="space-y-2 p-5 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-gray-200">
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </p>
    <p className="text-gray-900 font-medium tracking-tight">{value || "N/A"}</p>
  </div>
);

export default Alluser;
