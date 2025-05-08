import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import mockCampaigns from "./data/mockCampaigns";
import CampaignList from "./pages/CampaignList";
import CampaignForm from "./pages/CampaignForm";


function App() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };
  
  return (
    <div className="container">
      {toast && (
  <div style={{ 
    background: "linear-gradient(135deg, #f39c12, #e67e22)",
    color: "#fff",
    padding: "12px 20px",
    marginBottom: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
   
  }}>
    {toast}
  </div>
)}
      <Routes>
      <Route path="/" element={<CampaignList campaigns={campaigns} setCampaigns={setCampaigns} showToast={showToast} />} />
<Route path="/create" element={<CampaignForm campaigns={campaigns} setCampaigns={setCampaigns} showToast={showToast} />} />
<Route path="/edit/:id" element={<CampaignForm campaigns={campaigns} setCampaigns={setCampaigns} showToast={showToast} />} />

      </Routes>
    </div>
  );
}

export default App;
