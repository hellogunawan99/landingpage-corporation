"use client";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

interface UserType {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<UserType[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    setLoading(false);
  };

  const handleAction = async (userId: string, action: string, userEmail: string) => {
    const confirmMessages: Record<string, string> = {
      suspend: "Suspend " + userEmail + "? They won't be able to log in.",
      activate: "Activate " + userEmail + "? They will be able to log in again.",
      promote: "Promote " + userEmail + " to EMPLOYER?",
      demote: "Demote " + userEmail + " to JOB_SEEKER?",
    };

    if (!confirm(confirmMessages[action] || "")) return;

    try {
      const currentUser = localStorage.getItem("currentUser");
      const adminEmail = currentUser ? JSON.parse(currentUser).email : "unknown";

      const res = await fetch("/api/admin/users/" + userId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, adminEmail, targetEmail: userEmail }),
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedRows.length === 0) return;

    const nonAdminRows = selectedRows.filter((r) => r.role !== "ADMIN");
    if (nonAdminRows.length === 0) {
      alert("No editable users selected");
      return;
    }

    const userIds = nonAdminRows.map((r) => r.id);
    const actionMap: Record<string, { action: string; message: string }> = {
      activate: { action: "activate", message: "Activate " + nonAdminRows.length + " users?" },
      suspend: { action: "suspend", message: "Suspend " + nonAdminRows.length + " users?" },
      promoteAll: { action: "changeRole", message: "Promote " + nonAdminRows.length + " users to Employer?" },
      demoteAll: { action: "changeRole", message: "Demote " + nonAdminRows.length + " users to Job Seeker?" },
    };

    if (!confirm(actionMap[bulkAction].message)) return;

    setBulkLoading(true);
    try {
      const currentUser = localStorage.getItem("currentUser");
      const adminEmail = currentUser ? JSON.parse(currentUser).email : "unknown";

      const body: any = {
        userIds,
        action: actionMap[bulkAction].action,
        adminEmail,
      };

      if (bulkAction === "promoteAll" || bulkAction === "demoteAll") {
        body.targetRole = bulkAction === "promoteAll" ? "EMPLOYER" : "JOB_SEEKER";
      }

      const res = await fetch("/api/admin/users/bulk-action", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setBulkAction("");
        setSelectedRows([]);
        fetchUsers();
      }
    } catch (error) {
      console.error("Bulk action failed:", error);
    }
    setBulkLoading(false);
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      ADMIN: "bg-red-100 text-red-800",
      EMPLOYER: "bg-blue-100 text-blue-800",
      JOB_SEEKER: "bg-green-100 text-green-800",
    };
    const labels: Record<string, string> = {
      ADMIN: "Admin",
      EMPLOYER: "Employer",
      JOB_SEEKER: "Job Seeker",
    };
    return <span className={"px-2 py-1 rounded text-xs font-medium " + (styles[role] || "bg-gray-100 text-gray-800")}>{labels[role] || role}</span>;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="text-green-600 text-xs">Active</span>
    ) : (
      <span className="text-red-600 text-xs">Suspended</span>
    );
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return (
      <span className="text-gray-500 text-xs">
        {year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds}
      </span>
    );
  };

  const columns = [
    {
      name: "No",
      cell: (row: UserType, index: number) => index + 1,
      width: "50px",
      sortable: false,
    },
    {
      name: "Name",
      selector: (row: UserType) => row.name || "—",
      sortable: true,
      minWidth: "150px",
      wrap: true,
    },
    {
      name: "Email",
      selector: (row: UserType) => row.email,
      sortable: true,
      minWidth: "250px",
      wrap: true,
    },
    {
      name: "Phone",
      selector: (row: UserType) => row.phone || "—",
      sortable: true,
      minWidth: "150px",
      wrap: true,
    },
    {
      name: "Role",
      selector: (row: UserType) => row.role,
      cell: (row: UserType) => getRoleBadge(row.role),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Status",
      selector: (row: UserType) => row.isActive,
      cell: (row: UserType) => getStatusBadge(row.isActive),
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Updated",
      selector: (row: UserType) => row.updatedAt,
      cell: (row: UserType) => formatTimestamp(row.updatedAt),
      sortable: true,
      minWidth: "110px",
    },
    {
      name: "Actions",
      cell: (row: UserType) => {
        if (row.role === "ADMIN") return <span className="text-gray-400">—</span>;
        return (
          <div className="flex gap-1">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  const action = e.target.value === "JOB_SEEKER" ? "demote" : "promote";
                  handleAction(row.id, action, row.email);
                  e.target.value = row.role;
                }
              }}
              className="px-2 py-1 text-xs border rounded bg-blue-50 border-blue-200 text-blue-700 cursor-pointer"
              value={row.role}
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  const action = e.target.value === "true" ? "activate" : "suspend";
                  handleAction(row.id, action, row.email);
                  e.target.value = String(row.isActive);
                }
              }}
              className={"px-2 py-1 text-xs border rounded cursor-pointer " + (row.isActive ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700")}
              value={String(row.isActive)}
            >
              <option value="true">Active</option>
              <option value="false">Suspended</option>
            </select>
          </div>
        );
      },
      minWidth: "200px",
    },
  ];

  const filteredUsers = users.filter((user) => {
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        (user.name && user.name.toLowerCase().includes(searchLower)) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    if (roleFilter !== "all" && user.role !== roleFilter) return false;
    if (statusFilter === "active" && !user.isActive) return false;
    if (statusFilter === "suspended" && user.isActive) return false;

    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage all users in the system</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md flex-1 max-w-md"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">All Roles</option>
              <option value="JOB_SEEKER">Job Seekers</option>
              <option value="EMPLOYER">Employers</option>
              <option value="ADMIN">Admins</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div className="p-3 bg-blue-50 border-b flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {selectedRows.length} user{selectedRows.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-1.5 text-xs border rounded-md bg-white"
              >
                <option value="">Select Bulk Action</option>
                <option value="activate">Activate All</option>
                <option value="suspend">Suspend All</option>
                <option value="promoteAll">Promote All to Employer</option>
                <option value="demoteAll">Demote All to Job Seeker</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction || bulkLoading}
                className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {bulkLoading ? "Processing..." : "Apply"}
              </button>
              <button
                onClick={() => {
                  setSelectedRows([]);
                  setBulkAction("");
                }}
                className="px-4 py-1.5 text-xs border rounded-md hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredUsers}
          progressPending={loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          striped
          highlightOnHover
          pointerOnHover
          persistTableHead
          responsive
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
          noDataComponent={
            <div className="p-8 text-center text-gray-500">
              No users found.
            </div>
          }
        />
      </div>
    </div>
  );
}
