import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  Menu,
  UserCircle,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  Award,
  Image,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Wrench,
  X,
  ArrowRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getMessages } from "../services/messageService";

const searchItems = [
  {
    label: "Dashboard",
    description: "Portfolio overview and statistics",
    path: "/dashboard",
    keywords: "dashboard home overview stats",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    description: "Manage profile information",
    path: "/dashboard/profile",
    keywords: "profile personal information bio contact",
    icon: UserCircle,
  },
  {
    label: "Education",
    description: "Manage education records",
    path: "/dashboard/education",
    keywords: "education degree university college academic",
    icon: GraduationCap,
  },
  {
    label: "Experience",
    description: "Manage work experience",
    path: "/dashboard/experience",
    keywords: "experience work job company employment career",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    description: "Manage portfolio projects",
    path: "/dashboard/projects",
    keywords: "projects portfolio work case study",
    icon: FolderKanban,
  },
  {
    label: "Skills",
    description: "Manage professional skills",
    path: "/dashboard/skills",
    keywords: "skills abilities expertise proficiency",
    icon: Wrench,
  },
  {
    label: "Certifications",
    description: "Manage certifications and credentials",
    path: "/dashboard/certifications",
    keywords:
      "certifications certificates credentials courses training",
    icon: Award,
  },
  {
    label: "Media",
    description: "Manage portfolio media",
    path: "/dashboard/media",
    keywords: "media images documents videos files upload",
    icon: Image,
  },
  {
    label: "Messages",
    description: "View portfolio contact messages",
    path: "/dashboard/messages",
    keywords: "messages contact enquiries inquiries email",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    description: "Manage portfolio settings",
    path: "/dashboard/settings",
    keywords: "settings configuration website social links colors",
    icon: Settings,
  },
];

export default function Header({ onMenuClick }) {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] =
    useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const adminName = admin?.name || "Admin";

  const initials = adminName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /*
   * ----------------------------------------
   * SEARCH
   * ----------------------------------------
   */

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = normalizedQuery
    ? searchItems.filter((item) => {
        const searchableText = [
          item.label,
          item.description,
          item.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : searchItems.slice(0, 5);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchOpen(true);
  };

  const handleSearchSelect = (path) => {
    navigate(path);

    setSearchQuery("");
    setSearchOpen(false);
    setMobileSearchOpen(false);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearchQuery("");
      setSearchOpen(false);
      setMobileSearchOpen(false);
      return;
    }

    if (
      event.key === "Enter" &&
      filteredItems.length > 0
    ) {
      event.preventDefault();

      handleSearchSelect(filteredItems[0].path);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen((current) => {
      const nextState = !current;

      if (nextState) {
        setSearchOpen(true);
      } else {
        setSearchOpen(false);
      }

      return nextState;
    });
  };

  /*
   * ----------------------------------------
   * NOTIFICATIONS
   * ----------------------------------------
   */

  const loadNotifications = async () => {
    try {
      setNotificationsLoading(true);

      const data = await getMessages();

      const messages = Array.isArray(data)
        ? data
        : data?.messages || data?.items || [];

      /*
       * Only unread messages are notifications.
       *
       * Newest message appears first.
       *
       * Only the latest 5 unread messages are shown.
       */
      const unreadMessages = messages
        .filter((message) => message.status === "unread")
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        )
        .slice(0, 5);

      setNotifications(unreadMessages);
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );
    } finally {
      setNotificationsLoading(false);
    }
  };

  /*
   * Initial notification load
   * + automatic refresh every 30 seconds
   * + instant refresh when Messages page updates a message
   */
  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    const handleMessagesUpdated = () => {
      loadNotifications();
    };

    window.addEventListener(
      "messages-updated",
      handleMessagesUpdated
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "messages-updated",
        handleMessagesUpdated
      );
    };
  }, []);

  const handleNotificationToggle = () => {
    setNotificationsOpen((current) => !current);

    /*
     * Refresh immediately whenever the dropdown
     * is opened so it always contains the latest data.
     */
    if (!notificationsOpen) {
      loadNotifications();
    }
  };

  const handleNotificationClick = () => {
    setNotificationsOpen(false);

    navigate("/dashboard/messages");
  };

  const formatNotificationDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
   * ----------------------------------------
   * CLICK OUTSIDE
   * ----------------------------------------
   */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
        setMobileSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * ----------------------------------------
   * ROUTE CHANGE
   * ----------------------------------------
   */

  useEffect(() => {
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setSearchQuery("");
    setNotificationsOpen(false);
  }, [location.pathname]);

  /*
   * ----------------------------------------
   * UI
   * ----------------------------------------
   */

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#E3EAF2] bg-white/95 px-4 backdrop-blur-sm sm:px-5 lg:px-8">
      {/* Left section */}
      <div className="flex items-center gap-1">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#607084] transition hover:bg-[#F5F8FC] hover:text-[#123B68] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu
            size={21}
            strokeWidth={1.8}
          />
        </button>

        {/* Mobile search button */}
        <button
          type="button"
          onClick={toggleMobileSearch}
          className={`rounded-lg p-2 transition md:hidden ${
            mobileSearchOpen
              ? "bg-[#EEF4FA] text-[#123B68]"
              : "text-[#607084] hover:bg-[#F5F8FC] hover:text-[#123B68]"
          }`}
          aria-label="Search"
          aria-expanded={mobileSearchOpen}
        >
          <Search
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Desktop Search */}
      <div
        ref={searchRef}
        className="hidden w-full max-w-md md:block"
      >
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.7}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA6B5]"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search your portfolio..."
            className="h-10 w-full rounded-xl border border-[#E3EAF2] bg-[#F8FAFC] pl-10 pr-10 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] hover:border-[#D2DCE7] focus:border-[#7EA8D8] focus:bg-white focus:ring-4 focus:ring-[#7EA8D8]/10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#8996A8] transition hover:bg-[#EEF4FA] hover:text-[#123B68]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          {/* Desktop search results */}
          {searchOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_16px_45px_rgba(18,59,104,0.12)]">
              <div className="border-b border-[#EEF1F5] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8996A8]">
                  {normalizedQuery
                    ? "Search Results"
                    : "Quick Navigation"}
                </p>
              </div>

              {filteredItems.length > 0 ? (
                <div className="max-h-[360px] overflow-y-auto p-2">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() =>
                          handleSearchSelect(item.path)
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F5F8FC]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FA] text-[#123B68]">
                          <Icon
                            size={17}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#172033]">
                            {item.label}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-[#8996A8]">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F8FC] text-[#8996A8]">
                    <Search size={18} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#172033]">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-[#8996A8]">
                    Try searching for a portfolio section.
                  </p>
                </div>
              )}

              <div className="border-t border-[#EEF1F5] bg-[#FAFBFD] px-4 py-2.5">
                <p className="text-[11px] text-[#8996A8]">
                  Press{" "}
                  <span className="rounded border border-[#D9E2EC] bg-white px-1.5 py-0.5 font-medium text-[#68768A]">
                    Enter
                  </span>{" "}
                  to open the first result
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search panel */}
      {mobileSearchOpen && (
        <div className="absolute left-0 right-0 top-[76px] z-40 border-b border-[#E3EAF2] bg-white px-4 py-3 shadow-sm md:hidden">
          <div
            ref={searchRef}
            className="relative"
          >
            <Search
              size={18}
              strokeWidth={1.7}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA6B5]"
            />

            <input
              type="search"
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search your portfolio..."
              className="h-11 w-full rounded-xl border border-[#E3EAF2] bg-[#F8FAFC] pl-10 pr-10 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#7EA8D8] focus:bg-white focus:ring-4 focus:ring-[#7EA8D8]/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#8996A8] transition hover:bg-[#EEF4FA] hover:text-[#123B68]"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}

            {/* Mobile search results */}
            {searchOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_16px_45px_rgba(18,59,104,0.12)]">
                <div className="border-b border-[#EEF1F5] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8996A8]">
                    {normalizedQuery
                      ? "Search Results"
                      : "Quick Navigation"}
                  </p>
                </div>

                {filteredItems.length > 0 ? (
                  <div className="max-h-[55vh] overflow-y-auto p-2">
                    {filteredItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.path}
                          type="button"
                          onClick={() =>
                            handleSearchSelect(item.path)
                          }
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F5F8FC]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FA] text-[#123B68]">
                            <Icon
                              size={17}
                              strokeWidth={1.8}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#172033]">
                              {item.label}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-[#8996A8]">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-5 py-8 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F8FC] text-[#8996A8]">
                      <Search size={18} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#172033]">
                      No results found
                    </p>

                    <p className="mt-1 text-xs text-[#8996A8]">
                      Try searching for a portfolio section.
                    </p>
                  </div>
                )}

                <div className="border-t border-[#EEF1F5] bg-[#FAFBFD] px-4 py-2.5">
                  <p className="text-[11px] text-[#8996A8]">
                    Press{" "}
                    <span className="rounded border border-[#D9E2EC] bg-white px-1.5 py-0.5 font-medium text-[#68768A]">
                      Enter
                    </span>{" "}
                    to open the first result
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={handleNotificationToggle}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-[#607084] transition ${
              notificationsOpen
                ? "bg-[#EEF4FA] text-[#123B68]"
                : "hover:bg-[#F5F8FC] hover:text-[#123B68]"
            }`}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell
              size={19}
              strokeWidth={1.7}
            />

            {notifications.length > 0 && (
              <>
                {/* Unread count */}
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#123B68] px-1 text-[9px] font-bold text-white shadow-sm">
                  {notifications.length > 9
                    ? "9+"
                    : notifications.length}
                </span>

                {/* Small live indicator */}
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 animate-pulse rounded-full bg-[#7EA8D8]" />
              </>
            )}
          </button>

          {/* Notification dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[calc(100vw-32px)] max-w-[360px] overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_18px_50px_rgba(18,59,104,0.14)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#EEF1F5] px-5 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#172033]">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-[#8996A8]">
                    {notifications.length > 0
                      ? `${notifications.length} unread message${
                          notifications.length === 1
                            ? ""
                            : "s"
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
                  <Bell size={17} />
                </div>
              </div>

              {/* Loading */}
              {notificationsLoading ? (
                <div className="flex items-center justify-center px-5 py-10">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E3EAF2] border-t-[#123B68]" />
                </div>
              ) : notifications.length > 0 ? (
                <>
                  {/* Messages */}
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((message) => (
                      <button
                        key={message._id}
                        type="button"
                        onClick={handleNotificationClick}
                        className="flex w-full gap-3 border-b border-[#F0F3F7] px-5 py-4 text-left transition hover:bg-[#F8FAFC]"
                      >
                        {/* Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FA] text-[#123B68]">
                          <MessageSquare size={16} />
                        </div>

                        {/* Message content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-[#172033]">
                              {message.name ||
                                "Unknown sender"}
                            </p>

                            <span className="shrink-0 text-[10px] text-[#9AA6B5]">
                              {formatNotificationDate(
                                message.createdAt
                              )}
                            </span>
                          </div>

                          <p className="mt-0.5 truncate text-xs font-medium text-[#526174]">
                            {message.subject ||
                              "New portfolio message"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8996A8]">
                            {message.message}
                          </p>
                        </div>

                        {/* Unread dot */}
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#123B68]" />
                      </button>
                    ))}
                  </div>

                  {/* View all */}
                  <button
                    type="button"
                    onClick={handleNotificationClick}
                    className="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-[#123B68] transition hover:bg-[#F5F8FC]"
                  >
                    View all messages
                    <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                /* Empty state */
                <div className="px-5 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F8FC] text-[#8996A8]">
                    <Bell size={22} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#172033]">
                    No new notifications
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8996A8]">
                    New portfolio contact messages will
                    appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-1 hidden h-7 w-px bg-[#E3EAF2] sm:block" />

        {/* Admin profile */}
        <div className="flex items-center gap-3 pl-1">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-[#172033]">
              {adminName}
            </p>

            <p className="text-[11px] text-[#8A98AA]">
              Administrator
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1F8] text-xs font-semibold text-[#123B68]">
            {initials || "AD"}
          </div>
        </div>
      </div>
    </header>
  );
}