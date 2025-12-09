🏡 Wealth Map – U.S. Real Estate Admin Portal

An interactive real-estate admin platform that allows employees and administrators to efficiently browse, manage, and visualize U.S. property listings with a clean and responsive UI.

📌 Overview

Wealth Map is a feature-rich web application built for managing U.S. real estate property data.
The platform integrates map-based filtering, enabling users to explore properties by:

City
Property type (Residential, Commercial, etc.)

The project focuses on clarity, dynamic visualization, and seamless navigation, ensuring that users can quickly find and manage relevant property information.

🚀 Features
🔎 Dynamic Property Visualization

Interactive map powered by integrated APIs

Location-based filtering

Property markers with quick info popup

🏷️ Property Management

View property details

Categorized filtering

Quick lookup by city or state

🧭 Smooth Navigation

Clean, minimal UI using Tailwind CSS

Responsive layout

Fast page transitions

🔐 Authentication (Optional)

Firebase authentication for secure access (Admin/Employee roles)

⚙️ Setup Instructions

1️⃣ Clone the Repo
git clone "repo link"
cd wealth-map

2️⃣ Install Dependencies
npm install

3️⃣ Add Firebase Configuration

Create a .env file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id

4️⃣ Run the App
npm run dev
