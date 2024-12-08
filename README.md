
# **Car Auction System**

A real-time car auction system that supports live bidding using WebSocket, MySQL, and Redis.

---

## **Features**
- Live WebSocket-based bidding system.
- MySQL database for storing auction and user data.
- Redis caching for real-time bid updates and rate-limiting.

---

## **Project Structure**
```
/backend          - Node.js WebSocket server
/frontend         - Next.js application
```

---

## **Setup Instructions**

### **1. Prerequisites**
- **Node.js** (version 18+)
- **MySQL** (version 8+)
- **Redis** (version 5+)
- **Docker** (optional, for containerized setup)

---

### **2. Clone the Repository**
```bash
git clone https://github.com/arunanuwantha/car-auction-system.git
cd car-auction-system
```

---

### **3. Backend Setup**

#### **Run Mysql And Redic on Docker**
Alread Added docker-compose.yml file with MYSQL and REDIS configurations.
```bash
cd backend
docker-compose up -d
```
to verify containers,
```bash
docker ps
```

#### **Install Backend Dependencies**
```bash
cd backend
npm install
```

#### **Environment Variables**
Create a `.env` file in the `backend/src` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_password
DB_NAME=auction_system
REDIS_HOST=localhost
WS_PORT=8080
```

#### **Start the Backend Server**
```bash
cd src
node server.js
```

The server will start on `http://localhost:8080`.

---

### **4. Frontend Setup**

#### **Install Dependencies**
```bash
cd frontend
npm install
```

#### **Start the Frontend**
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`.

---

## **Usage Instructions**

### **1. Access the Frontend**
- Open your browser and navigate to `http://localhost:3000`.
- Enter a username and join the auction.

### **2. Place Bids**
- Select an auction and place a bid in real-time.

### **3. Monitor Updates**
- View real-time updates for highest bids and auction statuses.

---

## **Scaling and Performance**

- **Rate Limiting**: Redis is used to enforce rate limits (1 bid per second per user).
- **Horizontal Scaling**:
  - Use a load balancer (e.g., NGINX) to distribute WebSocket connections.
  - Scale the backend using Docker or Kubernetes.
- **Caching**:
  - Redis caches the highest bid for each auction, reducing database load.

---

## **Testing**

### **1. Run Unit Tests**
```bash
npm test
```
---
