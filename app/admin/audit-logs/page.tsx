"use client";

import { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";

interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetUserId: string | null;
  details: string | null;
  createdAt: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (actionFilter !== "all") {
        params.append("action", actionFilter);
      }
      const url = "/api/admin/audit-logs" + (params.toString() ? "?" + params.toString() : "");
      const res = await fetch(url);
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
    setLoading(false);
  };

  const getActionBadge = (action: string) => {
    const styles: Record<string, string> = {
      SUSPEND_USER: "bg-red-100 text-red-800",
      ACTIVATE_USER: "bg-green-100 text-green-800",
      PROMOTE_TO_EMPLOYER: "bg-blue-100 text-blue-800",
      DEMOTE_TO_JOB_SEEKER: "bg-yellow-100 text-yellow-800",
    };
    const labels: Record<string, string> = {
      SUSPEND_USER: "Suspended",
      ACTIVATE_USER: "Activated",
      PROMOTE_TO_EMPLOYER: "Promoted",
      DEMOTE_TO_JOB_SEEKER: "Demoted",
    };
    return <span className={"px-2 py-1 rounded text-xs font-medium " + (styles[action] || "bg-gray-100 text-gray-800")}>{labels[action] || action}</span>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  };

  const columns = [
    {
      name: "No",
      cell: (row: AuditLog, index: number) => index + 1,
      width: "50px",
      sortable: false,
    },
    {
      name: "Action",
      selector: (row: AuditLog) => row.action,
      cell: (row: AuditLog) => getActionBadge(row.action),
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Admin",
      selector: (row: AuditLog) => row.adminEmail,
      sortable: true,
      minWidth: "250px",
      wrap: true,
    },
    {
      name: "Details",
      selector: (row: AuditLog) => row.details || "",
      sortable: true,
      minWidth: "400px",
      wrap: true,
    },
    {
      name: "Timestamp",
      selector: (row: AuditLog) => row.createdAt,
      cell: (row: AuditLog) => formatDate(row.createdAt),
      sortable: true,
      minWidth: "160px",
    },
  ];

  const filteredLogs = useMemo(() => {
    if (!search) return logs;
    const searchLower = search.toLowerCase();
    return logs.filter(
      (log) =>
        log.adminEmail.toLowerCase().includes(searchLower) ||
        (log.details && log.details.toLowerCase().includes(searchLower)) ||
        log.action.toLowerCase().includes(searchLower) ||
        new Date(log.createdAt).toLocaleString().toLowerCase().includes(searchLower) ||
        formatDate(log.createdAt).toLowerCase().includes(searchLower)
    );
  }, [logs, search]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 mt-1">
          Track all admin actions in the system
        </p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex gap-4">
          <input
            type="text"
            placeholder="Search by admin, user, details, or timestamp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-full max-w-md"
          />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="all">All Actions</option>
            <option value="SUSPEND_USER">Suspended</option>
            <option value="ACTIVATE_USER">Activated</option>
            <option value="PROMOTE_TO_EMPLOYER">Promoted</option>
            <option value="DEMOTE_TO_JOB_SEEKER">Demoted</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={filteredLogs}
          progressPending={loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          striped
          highlightOnHover
          pointerOnHover
          persistTableHead
          responsive
          noDataComponent={
            <div className="p-8 text-center text-gray-500">
              No audit logs found.
            </div>
          }
        />
      </div>
    </div>
  );
}
