# Campaign Management System – Frontend Challenge

A React-based Campaign Management Dashboard that allows users to create, view, update, and delete marketing campaigns with full validation and user-friendly features.

## 🚀 Tech Stack

- **React.js** (Functional Components & Hooks)
- **React Router DOM**
- **Plain CSS** (Custom styling without UI libraries)

## 📁 Project Structure
src/
│
├── pages/
│ ├── CampaignList.jsx
│ └── CampaignForm.jsx
├── data/
│ └── mockCampaigns.js
├── styles/
│ ├── CampaignList.css
│ └── CampaignForm.css
│

├── App.jsx
└── main.jsx

## ✅ Features Implemented

### 🎯 Core Requirements

-  List all campaigns
-  Create a new campaign
-  Edit an existing campaign
-  Delete a campaign with a custom modal
-  Auto-generated `id` using `Date.now()`
-  Toggle `active` status (boolean)
-  Form validation (name, budget > 0, date rules)

### 🌟 Bonus Features

-  Filter/Search by name
-  Show only active campaigns
-  Toast messages on success
-  Responsive layout and styling using plain CSS

## 🧪 Validation Rules

- Campaign name is required
- Budget must be a number > 0
- Start and end dates are required
- Start date must be before end date

## 🛠️ Setup Instructions

1. **Clone the repository**
```bash
git clone 
cd Campaign-Management-System

Install dependencies: npm install
Run the app: npm run dev

💡 Design Decisions
Used local useState to simulate a backend (mock data)

Built CampaignForm to work for both create and edit routes

Used Date.now() for unique IDs

Created a custom modal for deletion instead of window.confirm

Moved styles to a dedicated CampaignList.css and CampaignForm.css file

