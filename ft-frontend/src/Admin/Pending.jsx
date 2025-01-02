import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AlertCircle,
  User,
  Phone,
  Clock,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Pending = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState({
    amount: "",
    paymentMethod: "Cash",
    upiTransactionId: "",
  });
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ftbackend.vercel.app/api/admin/pending-request",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingUsers(response.data.pendingUsers);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch pending users."
        );
      }
    };

    fetchPendingUsers();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setVerificationMessage("");
    setTransactionDetails({
      amount: "",
      paymentMethod: "Cash",
      upiTransactionId: "",
    });
    setIsVerified(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetails({ ...transactionDetails, [name]: value });
  };

  const handleVerify = async () => {
    if (
      !transactionDetails.amount ||
      parseFloat(transactionDetails.amount) <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    if (
      transactionDetails.paymentMethod === "UPI" &&
      !transactionDetails.upiTransactionId
    ) {
      alert("Please enter a UPI Transaction ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        amount: transactionDetails.amount.toString(),
        paymentMethod: transactionDetails.paymentMethod.toUpperCase(),
      };

      if (transactionDetails.paymentMethod === "UPI") {
        payload.upiTransactionId = transactionDetails.upiTransactionId;
      }

      const response = await axios.post(
        `https://ftbackend.vercel.app/api/admin/payment-verification/${selectedUser.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVerificationMessage(response.data.message);
      setIsVerified(true);
    } catch (err) {
      console.error(
        "Error during verification:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to verify payment.");
    }
  };

  const handleApprove = async () => {
    if (!isVerified) {
      alert("Payment must be verified before approval.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://ftbackend.vercel.app/api/admin/approve/${selectedUser.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // Display success message
      setPendingUsers((prev) =>
        prev.filter((user) => user.id !== selectedUser.id)
      ); // Remove approved user
      setSelectedUser(null); // Close modal

      // Navigate to AllUsers component
      navigate("/all-users");
    } catch (err) {
      console.error("Error approving user:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to approve user.");
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://ftbackend.vercel.app/api/admin/reject/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // Show success message
      setPendingUsers((prev) =>
        prev.filter((user) => user.id !== selectedUser.id)
      ); // Remove rejected user from the list
      setSelectedUser(null); // Close modal
    } catch (err) {
      console.error("Error rejecting user:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to reject user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pending Users</h2>
            <p className="mt-2 text-gray-600">
              Review and manage user verification requests
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <p className="text-blue-700 font-medium">
              {pendingUsers.length} Pending Request
              {pendingUsers.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {pendingUsers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewUser(user)}
                    className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              No pending requests
            </p>
            <p className="text-gray-400 text-sm mt-2">
              All user verification requests have been processed
            </p>
          </div>
        )}

        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    User Verification
                  </h3>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{selectedUser.userName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Aadhar</p>
                    <p className="font-medium">{selectedUser.aadhar}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">PAN</p>
                    <p className="font-medium">{selectedUser.pan}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">GSTIN</p>
                    <p className="font-medium">{selectedUser.gstin || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium">
                      {new Date(selectedUser.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={transactionDetails.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mode of Payment
                    </label>
                    <select
                      name="paymentMethod"
                      value={transactionDetails.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>

                  {transactionDetails.paymentMethod === "UPI" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI Transaction ID
                      </label>
                      <input
                        type="text"
                        name="upiTransactionId"
                        value={transactionDetails.upiTransactionId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter UPI Transaction ID"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                {verificationMessage && (
                  <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 font-medium">
                      {verificationMessage}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleVerify}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Verify Payment
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={!isVerified}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isVerified
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Approve User
                  </button>

                  <button
                    onClick={handleReject}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Reject User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;
