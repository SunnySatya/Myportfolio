import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaEnvelope,
  FaShieldAlt,
  FaComments,
  FaSearch,
  FaUserShield,
  FaUser,
  FaCalendarAlt,
  FaInbox,
  FaExclamationTriangle,
} from "react-icons/fa";
import { showToast } from "../components/Toast";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Check if user is admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      showToast("Access denied. Admin only.", "error");
      navigate("/");
      return;
    }
  }, [navigate]);

  // Get user email for auth header
  const getUserEmail = useCallback(() => {
    // Try to get email from localStorage or use a stored value
    return localStorage.getItem("userEmail") || "";
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = getUserEmail();
        const headers = {
          "Content-Type": "application/json",
        };
        if (email) headers["X-User-Email"] = email;

        const [statsRes, usersRes, contactsRes] = await Promise.all([
          fetch("/api/admin/stats", { headers }),
          fetch("/api/admin/users", { headers }),
          fetch("/api/admin/contacts", { headers }),
        ]);

        const statsData = await statsRes.json();
        const usersData = await usersRes.json();
        const contactsData = await contactsRes.json();

        if (statsData.success) setStats(statsData.stats);
        if (usersData.success) setUsers(usersData.users);
        if (contactsData.success) setContacts(contactsData.contacts);
      } catch (error) {
        console.error("Admin fetch error:", error);
        showToast("Failed to load admin data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getUserEmail]);

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm),
  );

  // Filter contacts by search
  const filteredContacts = contacts.filter(
    (c) =>
      c.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <section className="admin-page page-section">
        <div className="container">
          <div className="admin-loading">
            <div className="admin-spinner" />
          </div>
        </div>
      </section>
    );
  }

  // Check if not admin (redirected)
  if (!localStorage.getItem("isAdmin") === "true") return null;

  return (
    <section className="admin-page page-section">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <h1 className="gradient-text">
            <FaUserShield /> Admin Dashboard
          </h1>
          <p>Manage your application users and contact inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card" style={{ animationDelay: "0.05s" }}>
            <div className="admin-stat-icon users">
              <FaUsers />
            </div>
            <div className="admin-stat-info">
              <h3>{stats?.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="admin-stat-card" style={{ animationDelay: "0.1s" }}>
            <div className="admin-stat-icon contacts">
              <FaComments />
            </div>
            <div className="admin-stat-info">
              <h3>{stats?.totalContacts || 0}</h3>
              <p>Contact Messages</p>
            </div>
          </div>

          <div className="admin-stat-card" style={{ animationDelay: "0.15s" }}>
            <div className="admin-stat-icon admins">
              <FaShieldAlt />
            </div>
            <div className="admin-stat-info">
              <h3>{stats?.totalAdmins || 0}</h3>
              <p>Admins</p>
            </div>
          </div>

          <div className="admin-stat-card" style={{ animationDelay: "0.2s" }}>
            <div className="admin-stat-icon messages">
              <FaInbox />
            </div>
            <div className="admin-stat-info">
              <h3>{stats?.totalUsers > 0 ? "Active" : "N/A"}</h3>
              <p>Platform Status</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-section-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setSearchTerm("");
            }}
          >
            <FaShieldAlt /> Dashboard
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("users");
              setSearchTerm("");
            }}
          >
            <FaUsers /> Users ({users.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("contacts");
              setSearchTerm("");
            }}
          >
            <FaEnvelope /> Contacts ({contacts.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>
                <FaUser /> Recent Users
              </h3>
              <span className="admin-table-count">Last 5 registrations</span>
            </div>
            <div className="admin-table-scroll">
              {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <strong>{user.username}</strong>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone || "—"}</td>
                        <td>
                          <span
                            className={`admin-badge ${user.isAdmin ? "admin" : "user"}`}
                          >
                            {user.isAdmin ? (
                              <>
                                <FaShieldAlt /> Admin
                              </>
                            ) : (
                              <>
                                <FaUser /> User
                              </>
                            )}
                          </span>
                        </td>
                        <td className="admin-timestamp">
                          <FaCalendarAlt />{" "}
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admin-empty">
                  <FaUsers />
                  <h4>No users yet</h4>
                  <p>Users will appear here after registration</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>
                <FaUsers /> All Users
              </h3>
              <div className="admin-search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="admin-table-scroll">
              {filteredUsers.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <strong>{user.username}</strong>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone || "—"}</td>
                        <td>
                          <span
                            className={`admin-badge ${user.isAdmin ? "admin" : "user"}`}
                          >
                            {user.isAdmin ? (
                              <>
                                <FaShieldAlt /> Admin
                              </>
                            ) : (
                              <>
                                <FaUser /> User
                              </>
                            )}
                          </span>
                        </td>
                        <td className="admin-timestamp">
                          <FaCalendarAlt />{" "}
                          {new Date(
                            user.createdAt || Date.now(),
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admin-empty">
                  <FaExclamationTriangle />
                  <h4>No users found</h4>
                  <p>
                    {searchTerm
                      ? "Try a different search term"
                      : "No users registered yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>
                <FaEnvelope /> Contact Messages
              </h3>
              <div className="admin-search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by name, email or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="admin-table-scroll">
              {filteredContacts.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>
                          <strong>{contact.username}</strong>
                        </td>
                        <td>{contact.email}</td>
                        <td>
                          <div
                            className="admin-msg-cell"
                            title={contact.message}
                          >
                            {contact.message}
                          </div>
                        </td>
                        <td className="admin-timestamp">
                          <FaCalendarAlt />{" "}
                          {new Date(
                            contact.createdAt || Date.now(),
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admin-empty">
                  <FaEnvelope />
                  <h4>No messages found</h4>
                  <p>
                    {searchTerm
                      ? "Try a different search term"
                      : "No contact messages yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
