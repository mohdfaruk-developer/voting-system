# 🗳️ Online Voting System

The **Online Voting System** is a secure and user-friendly web application designed to facilitate digital elections. This system streamlines the voting process by allowing authenticated users to request voter IDs, nominate themselves, and cast votes in active elections. Admin users can manage elections and voter participation efficiently.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure login system for users and admin
- Role-based access control (User/Admin)

### 🙋‍♂️ User Features
1. **Voter ID Request**  
   Users can request the creation of their voter ID for election eligibility.

2. **Nomination Request**  
   Eligible users can submit requests to nominate themselves for specific elections.

3. **Voting**  
   Authenticated users can cast their vote in ongoing elections for their preferred candidate.

4. **Dashboard View**  
   Users can view:
   - Status of their requests
   - Active and upcoming elections
   - Past election participation and results

### 🛠️ Admin Features
1. **Request Management**  
   Admin users can:
   - Review user requests (Voter ID, Nomination)
   - Approve or reject requests with status updates

2. **Election Management**  
   Admins can create and manage elections, including defining timeframes and candidates.

3. **Voter List**  
   Admins can view and manage the list of registered voters.

---

## 📦 Tech Stack

### 🌐 Frontend
- React.js
- JavaScript
- HTML, CSS
- Tailwind CSS

### 🔙 Backend
- PHP
- Laravel Framework

### 🗄️ Database
- MySQL

---

## 🛠️ Local Setup Instructions

### 🔧 Prerequisites

Make sure the following are installed on your local machine:

- Node.js and npm
- PHP >= 8.2
- Composer
- MySQL
- Git

---

### 🔹 Backend Setup (Laravel + MySQL)

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohdfaruk-developer/voting-system.git

2. **Navigate to the project directory**
   ```bash
   cd online-voting-system

3. **Install PHP dependencies**
   ```bash
   composer install

4. **Create a copy of the .env file**
   ```bash
   cp .env.example .env

5. **Generate application key**
    ```bash
    php artisan key:generate

6. **Configure .env with your MySQL database credentials**

7. **Run migrations**
    ```bash
    php artisan migrate

8. **Install node dependencies**
    ```bash
    npm install

9. **Start the node development server**
    ```bash
    npm run dev

8. **Start the PHP development server**
    ```bash
    php artisan serve
