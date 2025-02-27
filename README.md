# 💰 MobiCash - Digital Financial Services Platform

## 📌 Project Overview
MobiCash is a digital financial services platform designed to facilitate secure money transfers, cash-out services, and financial management for users, agents, and administrators. Built using the **MERN stack**, this platform ensures seamless transactions while providing robust user authentication and role-based access control.

MobiCash empowers users in Bangladesh to manage their finances efficiently with a user-friendly interface and real-time transaction processing.

## 🌐 Live Links
- **Frontend:** [MobiCash Frontend](https://mobicash-528e2.web.app/)
- **Backend:** [MobiCash Backend](https://mobi-cash-backend.vercel.app/)

## 🔑 User, Agent & Admin Credentials
To explore different roles on the platform, use the following credentials:

### 🔹 Admin Credentials:
- **Email:** admin@gmail.com
- **Password:** admin1234

### 🔹 Agent Credentials:
- **Email:** agent@gmail.com
- **Password:** agent1234

### 🔹 User Credentials:
- **Email:** user@gmail.com
- **Password:** user1234

For NID verification user this nid number: 1234567890.

⚠️ **Note:** These credentials are for testing purposes only. Update them in the database before deploying in production.

---

## 🚀 Key Features

### 🔐 **Secure Authentication & Role Management**
- Users, agents, and admins have distinct roles with specific permissions.
- Firebase authentication ensures secure login and access management.

### 💸 **Money Transfer & Cash Out**
- Users can send money and cash out securely.
- Transaction history is available for tracking all financial activities.

### 📊 **User Dashboard**
- Displays account balance, total transactions, and recent activity.
- Provides insights into financial behavior.

### 🏦 **Agent Portal**
- Agents can manage transactions, verify cash-out requests, and track earnings.
- Ensures transparency and efficiency in financial services.

### ⚠️ **Admin Panel**
- Admins can monitor platform activity, manage users, and approve/reject agents.
- Provides the ability to ban/unban accounts if necessary.

### 🛡 **Security & Fraud Prevention**
- Role-based access control to prevent unauthorized actions.
- User accounts can be banned if fraudulent activities are detected.

---

## 🛠️ Technologies Used

### **Frontend**
- ⚛️ **Framework:** React.js
- 🎨 **Styling:** Tailwind CSS
- 🔄 **State Management:** Context API
- 🔑 **Authentication:** Firebase
- 🚀 **Routing:** React Router

### **Backend** (Hosted separately)
- 🔧 **Framework:** Express.js
- 🗃 **Database:** MongoDB (Local for development, MongoDB Atlas for production)
- 🔗 **ODM:** Mongoose
- 🔑 **Authentication:** Firebase & Role-based Access Control

---

## 🛠 Installation and Setup (Local Development)

### 📍 Prerequisites
- Node.js installed on your system
- MongoDB (Local or MongoDB Atlas)
- Firebase project set up

### 📂 Frontend Setup
```sh
# Clone the repository
git clone <https://github.com/NaeemMajumder/MobiCash-frontend>

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Create a .env file and add necessary environment variables
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_BACKEND_URL=http://localhost:5000

# Start the development server
npm run dev
```

### 📂 Backend Setup (For Reference)
If you're setting up the backend locally:
```sh
# Clone the backend repository
git clone <backend-repo-link>

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Set up environment variables in a .env file
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
FIREBASE_CONFIG=<your-firebase-config>

# Start the backend server
node index.js
```

---

## 📢 Future Enhancements
- 📱 **Mobile App Support** – Develop a mobile app for better accessibility.
- 📊 **Analytics Dashboard** – Insights on transactions, user activity, and trends.
- 🏦 **Loan & Savings Features** – Expand financial services to include micro-loans and savings accounts.
- 🛠 **Enhanced Fraud Detection** – AI-powered anomaly detection in transactions.

---

## 🤝 Contribution
We welcome contributions! If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request 🚀

For any issues or feature requests, feel free to open a discussion or raise an issue!

---

🚀 **MobiCash – Empowering Digital Transactions in Bangladesh!**
