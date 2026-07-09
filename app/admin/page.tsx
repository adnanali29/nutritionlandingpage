"use client";

import { useState, useEffect } from "react";
import "./admin.css";

// Reusable SVG Icons for the Admin Sidebar and Buttons
const IconDashboard = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
  </svg>
);

const IconImage = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconUserGroup = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconSparkles = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconChat = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconClipboardList = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const IconSettings = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconDownload = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconPlus = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
  </svg>
);

const IconTrash = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconEdit = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconLock = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconLogout = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function AdminPanel() {
  // Authentication Gate State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Dynamic state matching db.json structure
  const [heroBgs, setHeroBgs] = useState<string[]>([]);
  const [avatarIcons, setAvatarIcons] = useState<string[]>([]);
  const [transformations, setTransformations] = useState<any[]>([]);
  const [foodPlan, setFoodPlan] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  // Settings states
  const [adminEmail, setAdminEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Search, filter, and drawer states for Consultations dashboard
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<any | null>(null);

  // Modals management
  const [currentModal, setCurrentModal] = useState<string | null>(null); // "hero" | "avatar" | "transformation" | "dish" | "testimonial"
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Form input states
  const [inputUrl, setInputUrl] = useState("");
  const [tfForm, setTfForm] = useState({ name: "", disease: "", imageUrl: "" });
  const [dishForm, setDishForm] = useState({ label: "", tag: "", imageUrl: "" });
  const [testiForm, setTestiForm] = useState({ name: "", program: "", result: "", quote: "", imageUrl: "" });

  // Notifications Toast states
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Check Session Authentication on Mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("admin_auth");
    if (sessionAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    if (!isLoggedIn) return;

    async function loadData() {
      try {
        const [contentRes, consultRes, settingsRes] = await Promise.all([
          fetch("/api/content"),
          fetch("/api/consultations"),
          fetch("/api/settings")
        ]);

        if (contentRes.ok) {
          const content = await contentRes.json();
          setHeroBgs(content.heroBgs || []);
          setAvatarIcons(content.avatarIcons || []);
          setTransformations(content.transformations || []);
          setFoodPlan(content.foodPlan || []);
          setSuccessStories(content.successStories || []);
        } else {
          addToast("Failed to fetch page contents", "error");
        }

        if (consultRes.ok) {
          const consults = await consultRes.json();
          // Sort consultations by newest first
          setConsultations(
            consults.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          );
        } else {
          addToast("Failed to fetch client consultations", "error");
        }

        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          setAdminEmail(settings.email || "");
          setNewEmail(settings.email || "");
        }
      } catch (err) {
        console.error("Failed to fetch database data:", err);
        addToast("Network error. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [isLoggedIn]);

  // Handle Admin Login submission
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      addToast("Both fields are required", "error");
      return;
    }
    setAuthLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword.trim() })
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("admin_auth", "true");
        setIsLoggedIn(true);
        addToast("Logged in successfully!");
      } else {
        addToast(data.error || "Invalid credentials", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Network error. Try again.", "error");
    } finally {
      setAuthLoading(false);
    }
  }

  // Handle Logout
  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    setIsLoggedIn(false);
    setLoginPassword("");
    addToast("Logged out successfully");
  }

  // Universal Content Saver
  async function saveContent(updatedContent: any) {
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent)
      });
      if (response.ok) {
        addToast("Changes saved successfully!");
        return true;
      } else {
        addToast("Error saving changes", "error");
        return false;
      }
    } catch (err) {
      console.error(err);
      addToast("Network error while saving", "error");
      return false;
    }
  }

  // Update Consultation Request (Status & Notes) via API PUT
  async function handleUpdateConsultation(status?: string, notes?: string) {
    if (!selectedConsultation) return;
    try {
      const payload: any = { id: selectedConsultation.id };
      if (status !== undefined) payload.status = status;
      if (notes !== undefined) payload.notes = notes;

      const response = await fetch("/api/consultations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        addToast("Consultation updated successfully!");
        // Update local state arrays
        setConsultations((prev) =>
          prev.map((c) => (c.id === selectedConsultation.id ? { ...c, ...payload } : c))
        );
        setSelectedConsultation((prev: any) => ({ ...prev, ...payload }));
      } else {
        addToast("Error updating consultation", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Network error while updating", "error");
    }
  }

  // Update credentials in Settings
  async function handleUpdateSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) {
      addToast("Email cannot be empty", "error");
      return;
    }
    try {
      const payload: any = { email: newEmail.trim() };
      if (newPassword.trim()) {
        payload.password = newPassword.trim();
      }

      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setAdminEmail(newEmail.trim());
        setNewPassword("");
        addToast("Credentials updated successfully!");
      } else {
        addToast("Error updating settings", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Network error. Please try again.", "error");
    }
  }

  // Export consultations as CSV spreadsheet
  function handleDownloadCSV() {
    if (consultations.length === 0) {
      addToast("No consultations to download", "error");
      return;
    }

    const headers = [
      "Client Name",
      "Phone Number",
      "Email Address",
      "Age (Yrs)",
      "Gender",
      "Height",
      "Health Concern",
      "Preferred Date",
      "Preferred Time Slot",
      "Status",
      "Call Notes",
      "Received Date"
    ];

    const rows = consultations.map((c) => [
      c.name || "",
      c.phone || "",
      c.email || "",
      c.age || "",
      c.gender || "",
      c.height || "",
      c.concern || "",
      c.preferredDate || "",
      c.preferredTime || "",
      c.status || "pending",
      c.notes || "",
      c.createdAt ? new Date(c.createdAt).toLocaleString() : ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((val) => `"${val.toString().replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `addy_fitness_consultations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Consultations CSV exported successfully!");
  }

  // 1. Hero Background operations
  async function handleAddHeroBg() {
    if (!inputUrl.trim()) return;
    const newList = [...heroBgs, inputUrl.trim()];
    const success = await saveContent({ heroBgs: newList, avatarIcons, transformations, foodPlan, successStories });
    if (success) {
      setHeroBgs(newList);
      setInputUrl("");
      setCurrentModal(null);
    }
  }

  async function handleDeleteHeroBg(index: number) {
    if (!confirm("Are you sure you want to delete this background image?")) return;
    const newList = heroBgs.filter((_, i) => i !== index);
    const success = await saveContent({ heroBgs: newList, avatarIcons, transformations, foodPlan, successStories });
    if (success) {
      setHeroBgs(newList);
    }
  }

  // 2. Avatar Stack operations
  async function handleAddAvatar() {
    if (!inputUrl.trim()) return;
    const newList = [...avatarIcons, inputUrl.trim()];
    const success = await saveContent({ heroBgs, avatarIcons: newList, transformations, foodPlan, successStories });
    if (success) {
      setAvatarIcons(newList);
      setInputUrl("");
      setCurrentModal(null);
    }
  }

  async function handleDeleteAvatar(index: number) {
    if (!confirm("Are you sure you want to delete this small avatar icon?")) return;
    const newList = avatarIcons.filter((_, i) => i !== index);
    const success = await saveContent({ heroBgs, avatarIcons: newList, transformations, foodPlan, successStories });
    if (success) {
      setAvatarIcons(newList);
    }
  }

  // 3. Transformations operations
  async function handleSaveTransformation() {
    if (!tfForm.name.trim() || !tfForm.disease.trim()) {
      addToast("Name and concern/disease are required", "error");
      return;
    }

    let newList = [...transformations];
    if (modalMode === "add") {
      newList.push({
        id: Date.now().toString(),
        label: `Before / After — Member ${transformations.length + 1}`,
        name: tfForm.name.trim(),
        disease: tfForm.disease.trim(),
        imageUrl: tfForm.imageUrl.trim()
      });
    } else if (modalMode === "edit" && editIndex !== null) {
      newList[editIndex] = {
        ...newList[editIndex],
        name: tfForm.name.trim(),
        disease: tfForm.disease.trim(),
        imageUrl: tfForm.imageUrl.trim()
      };
    }

    const success = await saveContent({ heroBgs, avatarIcons, transformations: newList, foodPlan, successStories });
    if (success) {
      setTransformations(newList);
      setTfForm({ name: "", disease: "", imageUrl: "" });
      setCurrentModal(null);
    }
  }

  async function handleDeleteTransformation(index: number) {
    if (!confirm("Are you sure you want to delete this transformation card?")) return;
    const newList = transformations.filter((_, i) => i !== index);
    const success = await saveContent({ heroBgs, avatarIcons, transformations: newList, foodPlan, successStories });
    if (success) {
      setTransformations(newList);
    }
  }

  // 4. Plate & Plan operations
  async function handleSaveDish() {
    if (!dishForm.label.trim() || !dishForm.tag.trim()) {
      addToast("Dish name and tag are required", "error");
      return;
    }

    let newList = [...foodPlan];
    if (modalMode === "add") {
      newList.push({
        id: Date.now().toString(),
        label: dishForm.label.trim(),
        tag: dishForm.tag.trim(),
        imageUrl: dishForm.imageUrl.trim()
      });
    } else if (modalMode === "edit" && editIndex !== null) {
      newList[editIndex] = {
        ...newList[editIndex],
        label: dishForm.label.trim(),
        tag: dishForm.tag.trim(),
        imageUrl: dishForm.imageUrl.trim()
      };
    }

    const success = await saveContent({ heroBgs, avatarIcons, transformations, foodPlan: newList, successStories });
    if (success) {
      setFoodPlan(newList);
      setDishForm({ label: "", tag: "", imageUrl: "" });
      setCurrentModal(null);
    }
  }

  async function handleDeleteDish(index: number) {
    if (!confirm("Are you sure you want to delete this dish card?")) return;
    const newList = foodPlan.filter((_, i) => i !== index);
    const success = await saveContent({ heroBgs, avatarIcons, transformations, foodPlan: newList, successStories });
    if (success) {
      setFoodPlan(newList);
    }
  }

  // 5. Success Stories Testimonials operations
  async function handleSaveTestimonial() {
    if (!testiForm.name.trim() || !testiForm.quote.trim()) {
      addToast("Client Name and Testimonial Quote are required", "error");
      return;
    }

    let newList = [...successStories];
    if (modalMode === "add") {
      newList.push({
        id: Date.now().toString(),
        name: testiForm.name.trim(),
        program: testiForm.program.trim() || "Clinical Nutrition Program",
        result: testiForm.result.trim() || "✓ Improved health indicators",
        quote: testiForm.quote.trim(),
        imageUrl: testiForm.imageUrl.trim()
      });
    } else if (modalMode === "edit" && editIndex !== null) {
      newList[editIndex] = {
        ...newList[editIndex],
        name: testiForm.name.trim(),
        program: testiForm.program.trim(),
        result: testiForm.result.trim(),
        quote: testiForm.quote.trim(),
        imageUrl: testiForm.imageUrl.trim()
      };
    }

    const success = await saveContent({ heroBgs, avatarIcons, transformations, foodPlan, successStories: newList });
    if (success) {
      setSuccessStories(newList);
      setTestiForm({ name: "", program: "", result: "", quote: "", imageUrl: "" });
      setCurrentModal(null);
    }
  }

  async function handleDeleteTestimonial(index: number) {
    if (!confirm("Are you sure you want to delete this success story?")) return;
    const newList = successStories.filter((_, i) => i !== index);
    const success = await saveContent({ heroBgs, avatarIcons, transformations, foodPlan, successStories: newList });
    if (success) {
      setSuccessStories(newList);
    }
  }

  // Search/Filter consultations list
  const filteredConsultations = consultations.filter((req) => {
    const term = searchQuery.toLowerCase();
    return (
      req.id?.toLowerCase().includes(term) ||
      req.name?.toLowerCase().includes(term) ||
      req.phone?.toLowerCase().includes(term) ||
      req.concern?.toLowerCase().includes(term) ||
      req.email?.toLowerCase().includes(term)
    );
  });

  // ================= RENDER AUTHENTICATION VIEW =================
  if (!isLoggedIn) {
    return (
      <div className="admin-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px" }}>
        <div className="panel-card" style={{ width: "420px", maxWidth: "100%", padding: "40px", boxAlign: "center", margin: 0 }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: "28px", fontWeight: "800", letterSpacing: "-1px", color: "var(--admin-primary)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <IconLock /> Addy Admin
            </div>
            <p style={{ margin: "6px 0 0", color: "var(--admin-text-muted)", fontSize: "14px" }}>
              Enter administrator credentials to gain portal access.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="admin-input-group" style={{ margin: 0 }}>
              <label>Email Address</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. admin@addy.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-input-group" style={{ margin: 0 }}>
              <label>Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-btn-block"
              style={{ padding: "14px", marginTop: "8px" }}
              disabled={authLoading}
            >
              {authLoading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        </div>

        {/* TOAST ALERTS */}
        <div className="toast-container">
          {toasts.map((t) => (
            <div className={`toast ${t.type}`} key={t.id}>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= RENDER LOADING SCREEN =================
  if (loading) {
    return (
      <div className="admin-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid var(--admin-primary)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "600", color: "var(--admin-text-muted)" }}>Loading Dashboard...</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* ================= SIDEBAR ================= */}
        <aside className="admin-sidebar">
          <div>
            <div className="sidebar-logo">
              <span>Addy</span> Fitness Admin
            </div>
            <nav className="sidebar-menu">
              <button
                className={`menu-btn${activeTab === "dashboard" ? " active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <IconDashboard /> Dashboard
              </button>
              <button
                className={`menu-btn${activeTab === "hero" ? " active" : ""}`}
                onClick={() => setActiveTab("hero")}
              >
                <IconImage /> Hero & Avatars
              </button>
              <button
                className={`menu-btn${activeTab === "transformations" ? " active" : ""}`}
                onClick={() => setActiveTab("transformations")}
              >
                <IconUserGroup /> Transformations
              </button>
              <button
                className={`menu-btn${activeTab === "food" ? " active" : ""}`}
                onClick={() => setActiveTab("food")}
              >
                <IconSparkles /> Your Plate, Our Plan
              </button>
              <button
                className={`menu-btn${activeTab === "testimonials" ? " active" : ""}`}
                onClick={() => setActiveTab("testimonials")}
              >
                <IconChat /> Success Stories
              </button>
              <button
                className={`menu-btn${activeTab === "consultations" ? " active" : ""}`}
                onClick={() => setActiveTab("consultations")}
              >
                <IconClipboardList /> Consultations
              </button>
              <button
                className={`menu-btn${activeTab === "settings" ? " active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <IconSettings /> settings
              </button>
            </nav>
          </div>

          <div className="sidebar-footer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div>v1.0.0 · Local Mode</div>
                <div style={{ fontSize: "10px", marginTop: "2px", opacity: 0.7 }}>{adminEmail}</div>
              </div>
              <button
                onClick={handleLogout}
                style={{ background: "transparent", border: "none", color: "#EF4444", padding: "4px", display: "flex", cursor: "pointer" }}
                title="Log Out"
              >
                <IconLogout />
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="admin-main">
          {/* Header */}
          <header className="admin-header">
            <div>
              <h1>
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "hero" && "Hero Section & Icons"}
                {activeTab === "transformations" && "Client Transformations"}
                {activeTab === "food" && "Your Plate, Our Plan"}
                {activeTab === "testimonials" && "Success Stories (Testimonials)"}
                {activeTab === "consultations" && "Free Consultation Submissions"}
                {activeTab === "settings" && "Credentials & Settings"}
              </h1>
              <p style={{ margin: "4px 0 0", color: "var(--admin-text-muted)", fontSize: "14px" }}>
                {activeTab === "dashboard" && "Overall fitness clinic statistics and status indicator."}
                {activeTab === "hero" && "Update background sliding images and small member avatar stacks."}
                {activeTab === "transformations" && "Add, edit, or delete client journey stories, names, and concerns."}
                {activeTab === "food" && "Manage clinically-balanced meals, taglines, and dish preview cards."}
                {activeTab === "testimonials" && "Manage approved medical reviews and client transformations details."}
                {activeTab === "consultations" && "Review client clinical history records, contact numbers, and slots."}
                {activeTab === "settings" && "Modify administrator login email address and security access passwords."}
              </p>
            </div>
            <div className="header-actions">
              {activeTab === "consultations" && (
                <button className="admin-btn admin-btn-secondary" onClick={handleDownloadCSV}>
                  <IconDownload /> Download all as CSV
                </button>
              )}
              <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">
                View Landing Page
              </a>
            </div>
          </header>

          {/* ================= TABS PANELS ================= */}

          {/* TAB 1: OVERVIEW DASHBOARD */}
          <div className={`tab-panel${activeTab === "dashboard" ? " active" : ""}`}>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Consultations Requested</h3>
                  <div className="stat-number">{consultations.length}</div>
                </div>
                <div className="stat-icon"><IconClipboardList /></div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Hero Images</h3>
                  <div className="stat-number">{heroBgs.length}</div>
                </div>
                <div className="stat-icon"><IconImage /></div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Transformations</h3>
                  <div className="stat-number">{transformations.length}</div>
                </div>
                <div className="stat-icon"><IconUserGroup /></div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Healthy Dishes</h3>
                  <div className="stat-number">{foodPlan.length}</div>
                </div>
                <div className="stat-icon"><IconSparkles /></div>
              </div>
            </div>

            {/* Quick Consultation list inside Dashboard */}
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Recent Consultation Bookings</h2>
                <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setActiveTab("consultations")}>
                  View All Submissions
                </button>
              </div>

              {consultations.length === 0 ? (
                <div className="empty-state">
                  <IconClipboardList />
                  <h3>No Consultations Available</h3>
                  <p>When clients submit the "Get Your Free Plan" form, requests will appear here instantly.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Phone Number</th>
                        <th>Health Concern</th>
                        <th>Booking Slot</th>
                        <th>Received Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultations.slice(0, 5).map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedConsultation(item)}
                          className={item.status === "contacted" ? "contacted-row" : ""}
                        >
                          <td><strong>{item.name}</strong></td>
                          <td>{item.phone}</td>
                          <td>
                            <span className="item-card-subtitle" style={{ fontSize: "11px", padding: "2px 8px" }}>
                              {item.concern}
                            </span>
                          </td>
                          <td>{item.preferredDate} ({item.preferredTime})</td>
                          <td style={{ color: "var(--admin-text-muted)" }}>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* TAB 2: HERO & AVATARS */}
          <div className={`tab-panel${activeTab === "hero" ? " active" : ""}`}>
            {/* Background Images */}
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Background Slideshow Images</h2>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setModalMode("add");
                    setInputUrl("");
                    setCurrentModal("hero");
                  }}
                >
                  <IconPlus /> Add Slide Image
                </button>
              </div>

              {heroBgs.length === 0 ? (
                <div className="empty-state">
                  <IconImage />
                  <h3>No background slideshow images</h3>
                  <p>Add image URLs to show in the landing page Hero section.</p>
                </div>
              ) : (
                <div className="image-list-grid">
                  {heroBgs.map((url, index) => (
                    <div className="image-item-card" key={index}>
                      <div className="image-preview-box">
                        <img src={url} alt={`Hero BG ${index + 1}`} onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"; }} />
                      </div>
                      <div className="image-item-actions">
                        <span className="image-url-text">{url}</span>
                        <button className="admin-btn admin-btn-danger admin-btn-sm trash-btn-sm" onClick={() => handleDeleteHeroBg(index)} title="Delete slide">
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Small Avatars Stack */}
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Avatar Stack Small Icons</h2>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setModalMode("add");
                    setInputUrl("");
                    setCurrentModal("avatar");
                  }}
                >
                  <IconPlus /> Add Avatar Icon
                </button>
              </div>

              {avatarIcons.length === 0 ? (
                <div className="empty-state">
                  <IconUserGroup />
                  <h3>No avatar icons configured</h3>
                  <p>Add member face URLs to show in the small hero avatar circle list.</p>
                </div>
              ) : (
                <div className="image-list-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                  {avatarIcons.map((url, index) => (
                    <div className="image-item-card" key={index}>
                      <div className="image-preview-box ratio-square" style={{ padding: "10px" }}>
                        <img src={url} alt={`Avatar Icon ${index + 1}`} style={{ borderRadius: "50%" }} onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"; }} />
                      </div>
                      <div className="image-item-actions">
                        <span className="image-url-text">{url}</span>
                        <button className="admin-btn admin-btn-danger admin-btn-sm trash-btn-sm" onClick={() => handleDeleteAvatar(index)} title="Delete avatar">
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TAB 3: TRANSFORMATIONS */}
          <div className={`tab-panel${activeTab === "transformations" ? " active" : ""}`}>
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Real Customer Transformations</h2>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setModalMode("add");
                    setTfForm({ name: "", disease: "", imageUrl: "" });
                    setCurrentModal("transformation");
                  }}
                >
                  <IconPlus /> Add Transformation
                </button>
              </div>

              {transformations.length === 0 ? (
                <div className="empty-state">
                  <IconUserGroup />
                  <h3>No Transformations Registered</h3>
                  <p>Add client photos, names, and health results details.</p>
                </div>
              ) : (
                <div className="content-grid">
                  {transformations.map((item, index) => (
                    <div className="item-admin-card" key={item.id || index}>
                      <div className="image-preview-box">
                        <img src={item.imageUrl} alt={item.name} onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"; }} />
                      </div>
                      <div className="item-card-body">
                        <span className="item-card-subtitle">{item.disease}</span>
                        <h3 className="item-card-title">{item.name}</h3>
                        <p className="item-card-desc" style={{ fontSize: "12px" }}>
                          Identified as: {item.label || `Member Card ${index + 1}`}
                        </p>
                        <div className="item-card-actions">
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() => {
                              setModalMode("edit");
                              setEditIndex(index);
                              setTfForm({
                                name: item.name || "",
                                disease: item.disease || "",
                                imageUrl: item.imageUrl || ""
                              });
                              setCurrentModal("transformation");
                            }}
                          >
                            <IconEdit /> Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm trash-btn-sm"
                            onClick={() => handleDeleteTransformation(index)}
                            title="Delete Transformation"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TAB 4: YOUR PLATE, OUR PLAN */}
          <div className={`tab-panel${activeTab === "food" ? " active" : ""}`}>
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Your Plate, Our Plan - Dish Configurations</h2>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setModalMode("add");
                    setDishForm({ label: "", tag: "", imageUrl: "" });
                    setCurrentModal("dish");
                  }}
                >
                  <IconPlus /> Add Dish Card
                </button>
              </div>

              {foodPlan.length === 0 ? (
                <div className="empty-state">
                  <IconSparkles />
                  <h3>No Dishes Configured</h3>
                  <p>Configured dishes, taglines, and healthy recipes appear on the menu slider.</p>
                </div>
              ) : (
                <div className="content-grid">
                  {foodPlan.map((item, index) => (
                    <div className="item-admin-card" key={item.id || index}>
                      <div className="image-preview-box">
                        <img src={item.imageUrl} alt={item.label} onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"; }} />
                      </div>
                      <div className="item-card-body">
                        <span className="item-card-subtitle" style={{ background: "rgba(233, 162, 59, 0.1)", color: "#E9A23B" }}>
                          {item.tag}
                        </span>
                        <h3 className="item-card-title">{item.label}</h3>
                        <div className="item-card-actions" style={{ marginTop: "auto" }}>
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() => {
                              setModalMode("edit");
                              setEditIndex(index);
                              setDishForm({
                                label: item.label || "",
                                tag: item.tag || "",
                                imageUrl: item.imageUrl || ""
                              });
                              setCurrentModal("dish");
                            }}
                          >
                            <IconEdit /> Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm trash-btn-sm"
                            onClick={() => handleDeleteDish(index)}
                            title="Delete Dish"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TAB 5: TESTIMONIALS */}
          <div className={`tab-panel${activeTab === "testimonials" ? " active" : ""}`}>
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Success Stories (Testimonials Data)</h2>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setModalMode("add");
                    setTestiForm({ name: "", program: "", result: "", quote: "", imageUrl: "" });
                    setCurrentModal("testimonial");
                  }}
                >
                  <IconPlus /> Add Testimonial
                </button>
              </div>

              {successStories.length === 0 ? (
                <div className="empty-state">
                  <IconChat />
                  <h3>No Success Stories</h3>
                  <p>Submit client reviews, health programs, and lost kg records.</p>
                </div>
              ) : (
                <div className="content-grid">
                  {successStories.map((item, index) => (
                    <div className="item-admin-card" key={item.id || index}>
                      <div className="image-preview-box" style={{ aspectRatio: "4/3" }}>
                        <img src={item.imageUrl} alt={item.name} onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"; }} />
                      </div>
                      <div className="item-card-body">
                        <span className="item-card-subtitle" style={{ background: "rgba(75, 108, 88, 0.1)", color: "#4B6C58" }}>
                          {item.program}
                        </span>
                        <h3 className="item-card-title">{item.name}</h3>
                        <div style={{ background: "#fbfbf8", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", color: "var(--admin-primary)", border: "1px solid var(--admin-border)", width: "fit-content" }}>
                          {item.result}
                        </div>
                        <p className="item-card-desc" style={{ fontStyle: "italic", borderLeft: "2px solid var(--admin-border)", paddingLeft: "10px", marginTop: "4px" }}>
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <div className="item-card-actions">
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() => {
                              setModalMode("edit");
                              setEditIndex(index);
                              setTestiForm({
                                name: item.name || "",
                                program: item.program || "",
                                result: item.result || "",
                                quote: item.quote || "",
                                imageUrl: item.imageUrl || ""
                              });
                              setCurrentModal("testimonial");
                            }}
                          >
                            <IconEdit /> Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm trash-btn-sm"
                            onClick={() => handleDeleteTestimonial(index)}
                            title="Delete Testimonial"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TAB 6: CONSULTATIONS DASHBOARD */}
          <div className={`tab-panel${activeTab === "consultations" ? " active" : ""}`}>
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Clinical Assessments Request Logs</h2>
                <div style={{ width: "300px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Search by name, disease, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {filteredConsultations.length === 0 ? (
                <div className="empty-state">
                  <IconClipboardList />
                  <h3>No Consultations Matches</h3>
                  <p>Try refining your search keyword or wait for user inputs.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Client Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Health Concern</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConsultations.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedConsultation(item)}
                          className={item.status === "contacted" ? "contacted-row" : ""}
                        >
                          <td><code style={{ fontFamily: "Space Mono, monospace", fontWeight: "700", color: "var(--admin-primary)" }}>{item.id}</code></td>
                          <td><strong>{item.name}</strong></td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="item-card-subtitle" style={{ fontSize: "11px", padding: "2px 8px" }}>
                              {item.concern}
                            </span>
                          </td>
                          <td>
                            {item.preferredDate} ({item.preferredTime})
                          </td>
                          <td>
                            <span className={`status-badge ${item.status || "pending"}`}>
                              {item.status || "pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* TAB 7: CREDENTIALS SETTINGS */}
          <div className={`tab-panel${activeTab === "settings" ? " active" : ""}`}>
            <div className="panel-card" style={{ maxWidth: "600px" }}>
              <div className="panel-card-header">
                <h2>Admin Account Credentials</h2>
              </div>

              <form onSubmit={handleUpdateSettings}>
                <div className="admin-input-group">
                  <label>Current Portal Email</label>
                  <div style={{ padding: "12px 16px", background: "var(--admin-bg-light)", borderRadius: "10px", fontSize: "14px", fontWeight: "600", border: "1px solid var(--admin-border)" }}>
                    {adminEmail}
                  </div>
                </div>

                <div className="admin-input-group" style={{ marginTop: "20px" }}>
                  <label>New Email Address Address</label>
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="Enter new login email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-input-group" style={{ marginTop: "20px" }}>
                  <label>New Security Password</label>
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="Enter new password (leave blank to keep current)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: "24px", padding: "12px 24px" }}>
                  Save Account Settings
                </button>
              </form>
            </div>
          </div>

        </main>
      </div>

      {/* ================= MODALS COMPONENT ================= */}

      {/* Hero Slide Image Modal */}
      <div className={`modal-overlay${currentModal === "hero" ? " active" : ""}`}>
        <div className="modal-box">
          <div className="modal-header">
            <h3>Add Hero Background Slide</h3>
            <button className="drawer-close" onClick={() => setCurrentModal(null)}>×</button>
          </div>
          <div className="admin-input-group">
            <label>Image URL *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="https://example.com/slide.jpg"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="admin-btn admin-btn-secondary" onClick={() => setCurrentModal(null)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleAddHeroBg}>Save Slide</button>
          </div>
        </div>
      </div>

      {/* Hero Avatar Image Modal */}
      <div className={`modal-overlay${currentModal === "avatar" ? " active" : ""}`}>
        <div className="modal-box">
          <div className="modal-header">
            <h3>Add Avatar Icon</h3>
            <button className="drawer-close" onClick={() => setCurrentModal(null)}>×</button>
          </div>
          <div className="admin-input-group">
            <label>Avatar Photo URL *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="https://images.unsplash.com/photo-..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="admin-btn admin-btn-secondary" onClick={() => setCurrentModal(null)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleAddAvatar}>Save Avatar</button>
          </div>
        </div>
      </div>

      {/* Transformation Modal */}
      <div className={`modal-overlay${currentModal === "transformation" ? " active" : ""}`}>
        <div className="modal-box">
          <div className="modal-header">
            <h3>{modalMode === "add" ? "Add Client Transformation" : "Edit Transformation"}</h3>
            <button className="drawer-close" onClick={() => setCurrentModal(null)}>×</button>
          </div>
          <div className="admin-input-group">
            <label>Client Name *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Ramesh Sharma"
              value={tfForm.name}
              onChange={(e) => setTfForm({ ...tfForm, name: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Disease / Concern Overcame *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. PCOS & Bloating"
              value={tfForm.disease}
              onChange={(e) => setTfForm({ ...tfForm, disease: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Before / After Image URL</label>
            <input
              type="text"
              className="admin-input"
              placeholder="https://example.com/transformation.jpg"
              value={tfForm.imageUrl}
              onChange={(e) => setTfForm({ ...tfForm, imageUrl: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button className="admin-btn admin-btn-secondary" onClick={() => setCurrentModal(null)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSaveTransformation}>Save Info</button>
          </div>
        </div>
      </div>

      {/* Plate & Plan Dish Modal */}
      <div className={`modal-overlay${currentModal === "dish" ? " active" : ""}`}>
        <div className="modal-box">
          <div className="modal-header">
            <h3>{modalMode === "add" ? "Add Food Plan Dish" : "Edit Dish Details"}</h3>
            <button className="drawer-close" onClick={() => setCurrentModal(null)}>×</button>
          </div>
          <div className="admin-input-group">
            <label>Dish Name *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Sprouts Salad"
              value={dishForm.label}
              onChange={(e) => setDishForm({ ...dishForm, label: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Tagline / Benefit *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Muscle Gain, Gut Friendly"
              value={dishForm.tag}
              onChange={(e) => setDishForm({ ...dishForm, tag: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Dish Image URL</label>
            <input
              type="text"
              className="admin-input"
              placeholder="https://example.com/dish.jpg"
              value={dishForm.imageUrl}
              onChange={(e) => setDishForm({ ...dishForm, imageUrl: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button className="admin-btn admin-btn-secondary" onClick={() => setCurrentModal(null)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSaveDish}>Save Dish</button>
          </div>
        </div>
      </div>

      {/* Testimonial Modal */}
      <div className={`modal-overlay${currentModal === "testimonial" ? " active" : ""}`}>
        <div className="modal-box" style={{ width: "550px" }}>
          <div className="modal-header">
            <h3>{modalMode === "add" ? "Add Client Story Review" : "Edit Success Story"}</h3>
            <button className="drawer-close" onClick={() => setCurrentModal(null)}>×</button>
          </div>
          <div className="admin-input-group">
            <label>Client Name & Age *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Priya Patel, 28"
              value={testiForm.name}
              onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Clinical Program Joined</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. HIIT & Weight Management"
              value={testiForm.program}
              onChange={(e) => setTestiForm({ ...testiForm, program: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Result Outcome Pill</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. ↓ Lost 15kg, improved energy"
              value={testiForm.result}
              onChange={(e) => setTestiForm({ ...testiForm, result: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Client Photo URL</label>
            <input
              type="text"
              className="admin-input"
              placeholder="https://example.com/client.jpg"
              value={testiForm.imageUrl}
              onChange={(e) => setTestiForm({ ...testiForm, imageUrl: e.target.value })}
            />
          </div>
          <div className="admin-input-group">
            <label>Testimonial Quote *</label>
            <textarea
              className="admin-textarea"
              placeholder="Paste patient review text..."
              value={testiForm.quote}
              onChange={(e) => setTestiForm({ ...testiForm, quote: e.target.value })}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="admin-btn admin-btn-secondary" onClick={() => setCurrentModal(null)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSaveTestimonial}>Save Review</button>
          </div>
        </div>
      </div>

      {/* ================= CLIENT DETAILS SIDE DRAWER ================= */}
      <div className={`drawer-backdrop${selectedConsultation ? " active" : ""}`} onClick={() => setSelectedConsultation(null)}>
        <div className="drawer active" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h2>Client Clinical Profile</h2>
            <button className="drawer-close" onClick={() => setSelectedConsultation(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {selectedConsultation && (
            <div>
              <div className="drawer-section" style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "30px", background: "var(--admin-bg-light)", padding: "20px", borderRadius: "14px", border: "1px solid var(--admin-border)" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--admin-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "700", fontFamily: "var(--font-poppins)" }}>
                  {selectedConsultation.name ? selectedConsultation.name.charAt(0).toUpperCase() : "C"}
                </div>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>{selectedConsultation.name}</h2>
                  <span className={`status-badge ${selectedConsultation.status || "pending"}`} style={{ marginTop: "6px" }}>{selectedConsultation.status || "pending"}</span>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Contact Information</h3>
                <div className="drawer-grid">
                  <div className="drawer-item">
                    <div className="drawer-item-label">Phone Number</div>
                    <div className="drawer-item-value">
                      <a href={`tel:${selectedConsultation.phone}`} style={{ color: "var(--admin-primary)" }}>{selectedConsultation.phone}</a>
                    </div>
                  </div>
                  <div className="drawer-item">
                    <div className="drawer-item-label">Email Address</div>
                    <div className="drawer-item-value">
                      <a href={`mailto:${selectedConsultation.email}`} style={{ color: "var(--admin-primary)" }}>{selectedConsultation.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Medical Assessment Profile</h3>
                <div className="drawer-grid">
                  <div className="drawer-item">
                    <div className="drawer-item-label">Age</div>
                    <div className="drawer-item-value">{selectedConsultation.age} yrs</div>
                  </div>
                  <div className="drawer-item">
                    <div className="drawer-item-label">Gender</div>
                    <div className="drawer-item-value" style={{ textTransform: "capitalize" }}>{selectedConsultation.gender || "Not Specified"}</div>
                  </div>
                  <div className="drawer-item">
                    <div className="drawer-item-label">Height</div>
                    <div className="drawer-item-value">{selectedConsultation.height || "Not Specified"}</div>
                  </div>
                  <div className="drawer-item">
                    <div className="drawer-item-label">Main Health Concern</div>
                    <div className="drawer-item-value" style={{ color: "var(--admin-primary)" }}>{selectedConsultation.concern}</div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Consultation Preferences</h3>
                <div className="drawer-grid">
                  <div className="drawer-item">
                    <div className="drawer-item-label">Preferred Date</div>
                    <div className="drawer-item-value">{selectedConsultation.preferredDate}</div>
                  </div>
                  <div className="drawer-item">
                    <div className="drawer-item-label">Preferred Slot</div>
                    <div className="drawer-item-value">{selectedConsultation.preferredTime}</div>
                  </div>
                  <div className="drawer-item-full" style={{ marginTop: "16px" }}>
                    <div className="drawer-item-label">Received At</div>
                    <div className="drawer-item-value">
                      {new Date(selectedConsultation.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Notes Section */}
              <div className="drawer-section">
                <h3>Call Notes (Post Consultation)</h3>
                <textarea
                  className="admin-textarea"
                  placeholder="Record summary concern or notes after calling client..."
                  value={selectedConsultation.notes || ""}
                  onChange={(e) => {
                    setSelectedConsultation({
                      ...selectedConsultation,
                      notes: e.target.value
                    });
                  }}
                  style={{ height: "90px", fontSize: "13px" }}
                ></textarea>
                <button
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  style={{ marginTop: "8px" }}
                  onClick={() => handleUpdateConsultation(undefined, selectedConsultation.notes)}
                >
                  Save Notes
                </button>
              </div>

              <div className="drawer-section" style={{ marginTop: "32px", borderTop: "1px solid var(--admin-border)", paddingTop: "24px" }}>
                <h3>Update Assessment Status</h3>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className={`admin-btn ${selectedConsultation.status === "pending" || !selectedConsultation.status ? "admin-btn-primary" : "admin-btn-secondary"} admin-btn-sm`}
                    style={{ flexGrow: 1 }}
                    onClick={() => handleUpdateConsultation("pending")}
                  >
                    Pending
                  </button>
                  <button
                    className={`admin-btn ${selectedConsultation.status === "contacted" ? "admin-btn-primary" : "admin-btn-secondary"} admin-btn-sm`}
                    style={{ flexGrow: 1 }}
                    onClick={() => handleUpdateConsultation("contacted")}
                  >
                    Contacted
                  </button>
                  <button
                    className={`admin-btn ${selectedConsultation.status === "archived" ? "admin-btn-primary" : "admin-btn-secondary"} admin-btn-sm`}
                    style={{ flexGrow: 1 }}
                    onClick={() => handleUpdateConsultation("archived")}
                  >
                    Archive
                  </button>
                </div>
                <div style={{ marginTop: "12px", fontSize: "11px", color: "var(--admin-text-muted)", textAlign: "center" }}>
                  Action status is saved in the local clinical database.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= TOAST ALERTS ================= */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div className={`toast ${t.type}`} key={t.id}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
