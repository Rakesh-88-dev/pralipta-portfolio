import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MailOpen,
  MessageCircle,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  deleteMessage,
  getMessages,
  updateMessage,
} from "../services/messageService";

import StateMessage from "../components/StateMessage";

const statusConfig = {
  unread: {
    label: "Unread",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  read: {
    label: "Read",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
  replied: {
    label: "Replied",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  archived: {
    label: "Archived",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.read;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}) {
  return (
    <div className="rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#526174]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#172033]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function MessageModal({
  message,
  onClose,
  onDelete,
  onStatusChange,
}) {
  if (!message) return null;

  const handleStatusChange = async (status) => {
    await onStatusChange(message._id, status);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/35 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E3EAF2] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7EA8D8]">
              Message details
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#172033]">
              Contact message
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526174] transition hover:bg-[#F5F8FC] hover:text-[#172033]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF1F8] text-sm font-bold text-[#123B68]">
              {getInitials(message.name)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-[#172033]">
                {message.name}
              </h3>

              <a
                href={`mailto:${message.email}`}
                className="mt-1 block break-all text-sm text-[#526174] hover:text-[#123B68]"
              >
                {message.email}
              </a>
            </div>

            <StatusBadge status={message.status} />
          </div>

          <div className="mt-6 grid gap-4 rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                Received
              </p>

              <p className="mt-1 text-sm font-medium text-[#172033]">
                {formatDateTime(message.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                Replied
              </p>

              <p className="mt-1 text-sm font-medium text-[#172033]">
                {formatDateTime(message.repliedAt)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
              Subject
            </p>

            <p className="mt-2 text-base font-semibold text-[#172033]">
              {message.subject || "No subject"}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
              Message
            </p>

            <div className="mt-2 whitespace-pre-wrap rounded-xl border border-[#E3EAF2] bg-white p-4 text-sm leading-7 text-[#526174]">
              {message.message}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
              Update status
            </p>

            <div className="flex flex-wrap gap-2">
              {Object.keys(statusConfig).map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={message.status === status}
                  onClick={() => handleStatusChange(status)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    message.status === status
                      ? "cursor-default border-[#123B68] bg-[#123B68] text-white"
                      : "border-[#E3EAF2] bg-white text-[#526174] hover:border-[#B8C9DC] hover:text-[#123B68]"
                  }`}
                >
                  {statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#E3EAF2] bg-[#FBFCFE] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => onDelete(message._id)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>

          <div className="flex gap-3">
            <a
              href={`mailto:${message.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123B68] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E3157]"
            >
              <Mail size={16} />
              Reply by email
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E3EAF2] bg-white px-4 py-2.5 text-sm font-semibold text-[#526174] transition hover:bg-[#F5F8FC]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({
  onCancel,
  onConfirm,
  deleting,
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#172033]/35 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 size={20} />
        </div>

        <h2 className="mt-5 text-lg font-bold text-[#172033]">
          Delete this message?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#526174]">
          This action cannot be undone. The contact message will be
          permanently removed.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-lg border border-[#E3EAF2] bg-white px-4 py-2.5 text-sm font-semibold text-[#526174] transition hover:bg-[#F5F8FC]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {deleting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadMessages = async (showRefreshState = false) => {
    try {
      setError("");

      if (showRefreshState) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getMessages();

      const messageList = Array.isArray(data)
        ? data
        : data?.messages || data?.items || [];

      setMessages(messageList);
    } catch (err) {
      console.error("Failed to load messages:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load messages."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const stats = useMemo(() => {
    return {
      total: messages.length,

      unread: messages.filter(
        (message) => message.status === "unread"
      ).length,

      replied: messages.filter(
        (message) => message.status === "replied"
      ).length,

      archived: messages.filter(
        (message) => message.status === "archived"
      ).length,
    };
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return [...messages]
      .filter((message) => {
        if (statusFilter === "all") return true;

        return message.status === statusFilter;
      })
      .filter((message) => {
        if (!query) return true;

        return [
          message.name,
          message.email,
          message.subject,
          message.message,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
  }, [messages, searchTerm, statusFilter]);

  const handleOpenMessage = async (message) => {
    setSelectedMessage(message);

    if (message.status === "unread") {
      try {
        const updatedMessage = await updateMessage(
          message._id,
          {
            status: "read",
          }
        );

        setMessages((currentMessages) =>
          currentMessages.map((item) =>
            item._id === message._id
              ? updatedMessage || {
                  ...item,
                  status: "read",
                }
              : item
          )
        );

        setSelectedMessage(
          updatedMessage || {
            ...message,
            status: "read",
          }
        );

        window.dispatchEvent(
          new Event("messages-updated")
        );
      } catch (err) {
        console.error(
          "Failed to mark message as read:",
          err
        );
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updatedMessage = await updateMessage(id, {
        status,
      });

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message._id === id
            ? updatedMessage || {
                ...message,
                status,
              }
            : message
        )
      );

      setSelectedMessage((currentMessage) =>
        currentMessage?._id === id
          ? updatedMessage || {
              ...currentMessage,
              status,
            }
          : currentMessage
      );

      toast.success("Message status updated.");

      window.dispatchEvent(
        new Event("messages-updated")
      );
    } catch (err) {
      console.error(
        "Failed to update message:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to update message status."
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      await deleteMessage(deleteId);

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message._id !== deleteId
        )
      );

      if (selectedMessage?._id === deleteId) {
        setSelectedMessage(null);
      }

      setDeleteId(null);

      toast.success("Message deleted successfully.");

      window.dispatchEvent(
        new Event("messages-updated")
      );
    } catch (err) {
      console.error(
        "Failed to delete message:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to delete message."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            Communication
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
            Messages
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526174]">
            Manage messages submitted through Pralipta&apos;s
            portfolio contact form.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadMessages(true)}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#E3EAF2] bg-white px-4 py-2.5 text-sm font-semibold text-[#526174] shadow-sm transition hover:border-[#C8D5E4] hover:text-[#123B68] disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total messages"
          value={stats.total}
          icon={MessageCircle}
          iconClassName="bg-[#EAF1F8] text-[#123B68]"
        />

        <StatCard
          label="Unread"
          value={stats.unread}
          icon={Mail}
          iconClassName="bg-blue-50 text-blue-600"
        />

        <StatCard
          label="Replied"
          value={stats.replied}
          icon={Check}
          iconClassName="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          label="Archived"
          value={stats.archived}
          icon={Archive}
          iconClassName="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Messages Card */}
      <div className="mt-6 rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-[#E3EAF2] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8798]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search messages..."
              className="h-11 w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] pl-10 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-11 rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-3 text-sm font-medium text-[#526174] outline-none focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
          >
            <option value="all">All statuses</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* State / Content */}
        {loading ? (
          <StateMessage
            type="loading"
            title="Loading messages"
            message="Please wait while we load your portfolio messages."
          />
        ) : error ? (
          <StateMessage
            type="error"
            title="Unable to load messages"
            message={error}
            onRetry={() => loadMessages()}
          />
        ) : messages.length === 0 ? (
          <StateMessage
            type="empty"
            title="No messages yet"
            message="Messages submitted through the public portfolio contact form will appear here."
          />
        ) : filteredMessages.length === 0 ? (
          <StateMessage
            type="empty"
            title="No matching messages"
            message="Try changing your search or status filter."
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#E3EAF2] bg-[#FBFCFE] text-left">
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                      Sender
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                      Subject
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                      Status
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                      Received
                    </th>

                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#7A8798]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages.map((message) => (
                    <tr
                      key={message._id}
                      className={`border-b border-[#EEF2F6] transition last:border-b-0 hover:bg-[#FBFCFE] ${
                        message.status === "unread"
                          ? "bg-[#F8FBFF]"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenMessage(message)
                          }
                          className="flex items-center gap-3 text-left"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF1F8] text-xs font-bold text-[#123B68]">
                            {getInitials(message.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#172033]">
                              {message.name}
                            </p>

                            <p className="max-w-[220px] truncate text-xs text-[#7A8798]">
                              {message.email}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="max-w-[280px] px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenMessage(message)
                          }
                          className="text-left"
                        >
                          <p className="truncate text-sm font-medium text-[#172033]">
                            {message.subject ||
                              "No subject"}
                          </p>

                          <p className="mt-0.5 max-w-[280px] truncate text-xs text-[#7A8798]">
                            {message.message}
                          </p>
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={message.status}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#526174]">
                          <Clock3 size={15} />

                          {formatDate(message.createdAt)}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenMessage(message)
                            }
                            className="rounded-lg border border-[#E3EAF2] p-2 text-[#526174] transition hover:border-[#B8C9DC] hover:text-[#123B68]"
                            title="View message"
                          >
                            <MailOpen size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(message._id)
                            }
                            className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                            title="Delete message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List */}
            <div className="divide-y divide-[#EEF2F6] md:hidden">
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className="p-5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenMessage(message)
                    }
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1F8] text-xs font-bold text-[#123B68]">
                      {getInitials(message.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-bold text-[#172033]">
                          {message.name}
                        </p>

                        <StatusBadge
                          status={message.status}
                        />
                      </div>

                      <p className="mt-1 truncate text-xs text-[#7A8798]">
                        {message.email}
                      </p>

                      <p className="mt-3 truncate text-sm font-semibold text-[#172033]">
                        {message.subject ||
                          "No subject"}
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#526174]">
                        {message.message}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-[#7A8798]">
                        <Clock3 size={14} />

                        {formatDate(message.createdAt)}
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="mt-1 shrink-0 text-[#9AA6B5]"
                    />
                  </button>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteId(message._id)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-[#E3EAF2] px-5 py-4 text-xs text-[#7A8798] sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredMessages.length} of{" "}
                {messages.length} messages
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded-lg border border-[#E3EAF2] p-2 text-[#B0BAC6]"
                >
                  <ChevronLeft size={15} />
                </button>

                <span className="rounded-lg bg-[#123B68] px-3 py-2 font-semibold text-white">
                  1
                </span>

                <button
                  type="button"
                  disabled
                  className="rounded-lg border border-[#E3EAF2] p-2 text-[#B0BAC6]"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-5 flex items-center gap-2 text-xs text-[#7A8798]">
        <User size={14} />
        Messages are received from the public portfolio contact
        form.
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={(id) => setDeleteId(id)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Delete Modal */}
      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
}