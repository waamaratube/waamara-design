heroo-logistics/
│
├── index.html                    # Single file – All-in-One
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   ├── logger.js
│   │   │   ├── upload.js
│   │   │   └── socket.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validator.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Truck.js
│   │   │   ├── Booking.js
│   │   │   ├── Wheat.js
│   │   │   └── Tracking.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── trucks.js
│   │   │   ├── bookings.js
│   │   │   ├── wheat.js
│   │   │   ├── tracking.js
│   │   │   ├── payment.js
│   │   │   ├── admin.js
│   │   │   └── upload.js
│   │   ├── services/
│   │   │   ├── paymentService.js
│   │   │   └── emailService.js
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   ├── logs/
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── ecosystem.config.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── LanguageSwitcher.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── TrackingMap.jsx
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useSocket.js
│   │   │   └── useToast.js
│   │   ├── locales/
│   │   │   ├── en/translation.json
│   │   │   ├── om/translation.json
│   │   │   └── am/translation.json
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Trucks.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Wheat.jsx
│   │   │   ├── Tracking.jsx
│   │   │   ├── Driver.jsx
│   │   │   └── Admin.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── i18n.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── nginx/
│   └── nginx.conf
│
├── scripts/
│   ├── deploy.sh
│   ├── backup.sh
│   ├── monitor.sh
│   └── setup-ssl.sh
│
├── .github/workflows/
│   ├── deploy.yml
│   └── test.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
├── README.md
└── LICENSE