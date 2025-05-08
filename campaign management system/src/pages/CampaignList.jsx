import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/CampaignList.css";


const CampaignList = ({ campaigns, setCampaigns, showToast }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const handleDelete = (id) => {
    const updated = campaigns.filter((c) => c.id !== id);
    setCampaigns(updated);
    setShowModal(false);
    showToast("Campaign deleted!");
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchName = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchActive = showActiveOnly ? c.active : true;
    return matchName && matchActive;
  });

  return (
    <div className="container">
      <h2>Campaigns</h2>
      <Link to="/create">
        <button>Create New Campaign</button>
      </Link>
      <div style={{ margin: "10px 0" }} className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <label>
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={() => setShowActiveOnly(!showActiveOnly)}
          />
          Show Active Only
        </label>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }} className="campaign-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Budget</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td  className="actions">{campaign.name}</td>
              <td  className="actions">{campaign.startDate}</td>
              <td  className="actions">{campaign.endDate}</td>
              <td  className="actions">${campaign.budget}</td>
              <td  className="actions">{campaign.active ? "✅" : "❌"}</td>
              <td  className="actions">
                <Link to={`/edit/${campaign.id}`} >
                  <button className="editButton">Edit</button>
                </Link>
                <button
                  onClick={() => {
                    setCampaignToDelete(campaign);
                    setShowModal(true);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
     {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <p>
          Are you sure you want to delete{" "}
          <strong>{campaignToDelete?.name}</strong>?
        </p>
      </div>
      <div className="modal-buttons">
        <button 
          onClick={() => setShowModal(false)}
          aria-label="Cancel deletion"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDelete(campaignToDelete.id)}
          aria-label="Confirm deletion"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};



export default CampaignList;
