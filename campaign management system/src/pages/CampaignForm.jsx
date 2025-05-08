import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CampaignForm.css";

const CampaignForm = ({ campaigns, setCampaigns, showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const existing = isEdit ? campaigns.find((c) => c.id === parseInt(id)) : null;

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    budget: "",
    active: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existing) {
      setForm(existing);
    }
  }, [existing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const errs = validate();
    setIsFormValid(Object.keys(errs).length === 0);
  }, [form]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.budget || form.budget <= 0) errs.budget = "Budget must be > 0";
    if (!form.startDate) errs.startDate = "Start date is required";
    if (!form.endDate) errs.endDate = "End date is required";
    if (form.startDate && form.endDate && form.startDate > form.endDate)
      errs.date = "Start date must be before end date";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (isEdit) {
      const updated = campaigns.map((c) =>
        c.id === existing.id ? { ...form, id: existing.id } : c
      );
      setCampaigns(updated);
      showToast("Campaign updated!");
    } else {
      const newCampaign = { ...form, id: Date.now() };
      setCampaigns([...campaigns, newCampaign]);
      showToast("Campaign created!");
    }

    navigate("/");
  };

  return (
    <div className="campaign-form-container">
      <h2>{isEdit ? "Edit Campaign" : "Create Campaign"}</h2>
      <button onClick={() => navigate("/")} className="back-button">
        Back to Campaigns
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate}</span>
          )}
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
          {errors.endDate && (
            <span className="error-message">{errors.endDate}</span>
          )}
        </div>

        <div className="form-group">
          <label>Budget ($)</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
          />
          {errors.budget && (
            <span className="error-message">{errors.budget}</span>
          )}
        </div>

        <div className="form-group">
          <label>Active</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            <span>{form.active ? "Active" : "Inactive"}</span>
          </div>
        </div>

        {errors.date && <span className="error-message">{errors.date}</span>}

        <button type="submit" className="submit-button" disabled={!isFormValid}>
          {isEdit ? "Update Campaign" : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
