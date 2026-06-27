<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HEROO Logistics – Ultimate Professional</title>

    <!-- Tailwind + Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

    <style>
        /* ─── Full Styles ─── */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            transition: 0.3s;
            min-height: 100vh;
            background: #f3f4f6;
            color: #1f2937;
        }
        .dark body {
            background: #0f172a;
            color: #e2e8f0;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            z-index: -1;
            background: linear-gradient(135deg, #e0e7ff, #f3e8ff, #fce7f3, #f0fdf4);
            background-size: 400% 400%;
            animation: grad 20s ease infinite;
        }
        .dark .bg-overlay {
            background: linear-gradient(135deg, #0f172a, #1e1b4b, #0c0a2a);
        }
        @keyframes grad {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        .page {
            display: none;
            animation: fade 0.4s ease;
        }
        .page.active {
            display: block;
        }
        @keyframes fade {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .nav-link {
            cursor: pointer;
            padding: 0.5rem 0.75rem;
            border-radius: 0.75rem;
            transition: 0.2s;
            font-weight: 500;
            color: #4b5563;
        }
        .dark .nav-link {
            color: #9ca3af;
        }
        .nav-link:hover {
            background: rgba(59, 130, 246, 0.08);
        }
        .nav-link.active {
            background: rgba(59, 130, 246, 0.15);
            color: #2563eb;
        }
        .dark .nav-link.active {
            background: rgba(59, 130, 246, 0.25);
            color: #60a5fa;
        }
        .card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border-radius: 1.5rem;
            padding: 1.5rem;
            border: 1px solid rgba(203, 213, 225, 0.4);
            transition: 0.3s;
        }
        .dark .card {
            background: rgba(30, 41, 59, 0.7);
            border-color: rgba(51, 65, 85, 0.5);
        }
        .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }
        #map {
            height: 400px;
            width: 100%;
            border-radius: 16px;
            z-index: 1;
        }
        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 99999;
            display: none;
            align-items: center;
            gap: 12px;
            background: #1f2937;
            color: white;
            padding: 14px 28px;
            border-radius: 14px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        }
        .toast.show {
            display: flex;
        }
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(6px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
        }
        .modal-overlay.open {
            display: flex;
        }
        .modal-box {
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 480px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .dark .modal-box {
            background: #1e293b;
        }
        .step-circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            border: 2px solid #d1d5db;
            background: white;
            transition: 0.3s;
        }
        .dark .step-circle {
            background: #1e293b;
            border-color: #4b5563;
        }
        .step-circle.active {
            border-color: #3b82f6;
            background: #3b82f6;
            color: white;
        }
        .step-circle.done {
            border-color: #22c55e;
            background: #22c55e;
            color: white;
        }
        .star {
            font-size: 1.8rem;
            color: #d1d5db;
            cursor: pointer;
            transition: 0.2s;
        }
        .dark .star {
            color: #4b5563;
        }
        .star.active {
            color: #f59e0b;
        }
        .dark .star.active {
            color: #fbbf24;
        }
        .lang-btn {
            padding: 0.25rem 0.5rem;
            border-radius: 0.5rem;
            font-size: 0.7rem;
            font-weight: 600;
            transition: 0.2s;
            cursor: pointer;
            background: transparent;
            border: none;
            color: #4b5563;
        }
        .dark .lang-btn {
            color: #9ca3af;
        }
        .lang-btn.active {
            background: #2563eb;
            color: white;
        }
        .dark .lang-btn.active {
            background: #2563eb;
            color: white;
        }
        .lang-btn:hover {
            background: #e5e7eb;
        }
        .dark .lang-btn:hover {
            background: #374151;
        }
        .chat-bubble {
            max-width: 80%;
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            font-size: 0.9rem;
        }
        .chat-bubble.bot {
            background: #e5e7eb;
            align-self: flex-start;
            border-bottom-left-radius: 0;
            color: #1f2937;
        }
        .chat-bubble.user {
            background: #2563eb;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0;
        }
        .dark .chat-bubble.bot {
            background: #374151;
            color: #e2e8f0;
        }
        .hidden {
            display: none !important;
        }
        .upload-area {
            border: 2px dashed #d1d5db;
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: 0.3s;
        }
        .dark .upload-area {
            border-color: #4b5563;
        }
        .upload-area:hover {
            border-color: #2563eb;
            background: rgba(37, 99, 235, 0.05);
        }
        .upload-area.dragover {
            border-color: #2563eb;
            background: rgba(37, 99, 235, 0.1);
        }
        .upload-preview {
            max-height: 150px;
            border-radius: 0.75rem;
            object-fit: cover;
        }
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .badge-green {
            background: #dcfce7;
            color: #166534;
        }
        .dark .badge-green {
            background: #166534;
            color: #dcfce7;
        }
        .badge-yellow {
            background: #fef3c7;
            color: #92400e;
        }
        .dark .badge-yellow {
            background: #92400e;
            color: #fef3c7;
        }
        .badge-blue {
            background: #dbeafe;
            color: #1e40af;
        }
        .dark .badge-blue {
            background: #1e40af;
            color: #dbeafe;
        }
        .badge-red {
            background: #fee2e2;
            color: #991b1b;
        }
        .dark .badge-red {
            background: #991b1b;
            color: #fee2e2;
        }
        .badge-purple {
            background: #ede9fe;
            color: #5b21b6;
        }
        .dark .badge-purple {
            background: #5b21b6;
            color: #ede9fe;
        }
        .badge-gray {
            background: #f3f4f6;
            color: #374151;
        }
        .dark .badge-gray {
            background: #374151;
            color: #f3f4f6;
        }
    </style>
</head>
<body>
    <div class="bg-overlay"></div>

    <!-- Toast -->
    <div id="toast" class="toast">
        <i id="toastIcon" class="fas fa-check-circle text-green-400 text-xl"></i>
        <span id="toastMsg">Success</span>
    </div>

    <!-- Navbar -->
    <nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <i class="fas fa-truck-fast text-2xl text-blue-600 dark:text-blue-400"></i>
                    <span class="text-2xl font-extrabold text-blue-700 dark:text-blue-400">HEROO</span>
                    <span class="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">v3.0</span>
                </div>

                <!-- Nav Links -->
                <div class="hidden md:flex items-center space-x-1" id="navLinks">
                    <a class="nav-link active" data-page="home"><i class="fas fa-home mr-1"></i><span data-i18n="nav.home">Home</span></a>
                    <a class="nav-link" data-page="trucks"><i class="fas fa-truck mr-1"></i><span data-i18n="nav.trucks">Trucks</span></a>
                    <a class="nav-link" data-page="bookings"><i class="fas fa-box mr-1"></i><span data-i18n="nav.book">Book</span></a>
                    <a class="nav-link" data-page="wheat"><i class="fas fa-wheat-awn mr-1"></i><span data-i18n="nav.wheat">Wheat</span></a>
                    <a class="nav-link" data-page="tracking"><i class="fas fa-map mr-1"></i><span data-i18n="nav.tracking">Track</span></a>
                    <a class="nav-link" data-page="driver"><i class="fas fa-id-card mr-1"></i><span data-i18n="nav.driver">Driver</span></a>
                    <a class="nav-link" data-page="admin"><i class="fas fa-chart-simple mr-1"></i><span data-i18n="nav.admin">Admin</span></a>
                </div>

                <!-- Right -->
                <div class="flex items-center space-x-2">
                    <!-- Language Switcher -->
                    <div class="flex space-x-1">
                        <button class="lang-btn active" data-lang="en">EN</button>
                        <button class="lang-btn" data-lang="om">OM</button>
                        <button class="lang-btn" data-lang="am">አማ</button>
                    </div>

                    <!-- Theme Toggle -->
                    <button onclick="toggleTheme()" class="text-gray-600 dark:text-gray-300 text-lg p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i id="themeIcon" class="fas fa-moon"></i>
                    </button>

                    <!-- User -->
                    <span id="userDisplay" class="text-sm text-gray-700 dark:text-gray-300 hidden">
                        <i class="fas fa-user-circle mr-1"></i><span id="userName">Guest</span>
                    </span>
                    <button id="loginBtn" class="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Login</button>
                    <button id="logoutBtn" class="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition hidden">Logout</button>
                    <button id="mobileMenuBtn" class="md:hidden text-gray-600 dark:text-gray-300 text-xl p-1.5"><i class="fas fa-bars"></i></button>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="md:hidden hidden pb-3 border-t border-gray-200 dark:border-gray-700 pt-2 flex flex-col space-y-1"></div>
        </div>
    </nav>

    <!-- Main Content -->
    <main id="mainContent" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-130px)]"></main>

    <!-- Footer -->
    <footer class="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md">
        &copy; 2026 HEROO Logistics. <span data-i18n="footer.rights">All rights reserved.</span>
    </footer>

    <!-- AI Assistant Button -->
    <button id="aiToggle" class="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition transform hover:scale-110">
        <i class="fas fa-robot text-xl"></i>
        <span class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
    </button>

    <!-- AI Chat Window -->
    <div id="aiChat" class="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[500px] hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 rounded-t-2xl">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"><i class="fas fa-robot text-white text-sm"></i></div>
                <span class="font-bold text-gray-900 dark:text-white" data-i18n="ai.title">AI Assistant</span>
                <span class="text-xs text-green-600 dark:text-green-400 font-medium" data-i18n="ai.online">● Online</span>
            </div>
            <button id="aiClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><i class="fas fa-times"></i></button>
        </div>
        <div id="aiMessages" class="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]"></div>
        <div id="aiQuickReplies" class="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-100 dark:border-gray-700"></div>
        <div class="p-3 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
            <input id="aiInput" type="text" placeholder="Ask me anything..." class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500" />
            <button id="aiSend" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal-overlay">
        <div class="modal-box relative">
            <button onclick="closeModal()" class="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">&times;</button>
            <div id="modalBody"></div>
        </div>
    </div>

    <!-- ============================================================ -->
    <!-- JAVASCRIPT – All-in-One Ultimate -->
    <!-- ============================================================ -->
    <script>
        // ═══════════════════════════════════════════════════════════════════
        // 1. DATA LAYER
        // ═══════════════════════════════════════════════════════════════════

        let trucks = JSON.parse(localStorage.getItem('heroo_trucks')) || [
            { id: 1, plate: 'AA-1234', type: 'Flatbed', capacity: 5000, price: 45, location: 'Addis Ababa', owner: 'Demo',
                status: 'available', rating: 4.5, image: '' },
            { id: 2, plate: 'BB-5678', type: 'Reefer', capacity: 3000, price: 55, location: 'Adama', owner: 'Demo',
                status: 'on_trip', rating: 4.2, image: '' }
        ];
        let bookings = JSON.parse(localStorage.getItem('heroo_bookings')) || [
            { id: 101, cargo: 'Grain', weight: 2000, pickup: 'Bole, Addis', dropoff: 'Mekelle', distance: 550, price: 25000,
                customer: 'Abebe K.', status: 'delivered', date: '2026-06-20' },
            { id: 102, cargo: 'Machinery', weight: 3500, pickup: 'Adama', dropoff: 'Hawassa', distance: 220, price: 17600,
                customer: 'Bontu T.', status: 'in_transit', date: '2026-06-24' }
        ];
        let wheat = JSON.parse(localStorage.getItem('heroo_wheat')) || [
            { id: 1, qty: 1000, priceKg: 35.5, grade: 'Grade A', location: 'Bishoftu', seller: 'Chala D.', image: '' },
            { id: 2, qty: 500, priceKg: 32.0, grade: 'Grade B', location: 'Adama', seller: 'Demo Farmer', image: '' }
        ];
        let currentUser = JSON.parse(localStorage.getItem('heroo_user')) || null;
        let currentLang = localStorage.getItem('heroo_lang') || 'en';
        let currentPage = 'home';
        let map = null,
            marker = null,
            trackInterval = null;
        let revChart = null,
            utilChart = null;
        let uploadData = [];

        // ═══════════════════════════════════════════════════════════════════
        // 2. TRANSLATIONS (i18n)
        // ═══════════════════════════════════════════════════════════════════

        const i18n = {
            en: {
                nav: { home: 'Home', trucks: 'Trucks', book: 'Book', wheat: 'Wheat', tracking: 'Track', driver: 'Driver',
                    admin: 'Admin' },
                home: {
                    hero: 'Move Cargo. Trade Wheat. Track Live.',
                    sub: 'HEROO connects truck owners, farmers, and businesses across Ethiopia.',
                    cta_truck: 'Register Truck',
                    cta_cargo: 'Book Cargo',
                    owners: 'Truck Owners',
                    owners_desc: 'List your fleet, set rates, and get hired instantly.',
                    wheat: 'Wheat Marketplace',
                    wheat_desc: 'Buy and sell wheat with transparent pricing.',
                    tracking: 'Live Tracking',
                    tracking_desc: 'Monitor your shipments in real-time on an interactive map.'
                },
                trucks: { title: 'Trucks', register: 'Register Truck', plate: 'Plate Number', type: 'Truck Type',
                    capacity: 'Capacity (kg)', price: 'Price per km (ETB)', location: 'Current Location',
                    image: 'Truck Image', submit: 'Register Truck', cancel: 'Cancel', empty: 'No trucks available.',
                    book: 'Book This Truck', available: 'Available', on_trip: 'On Trip', maintenance: 'Maintenance',
                    booked: 'Booked' },
                bookings: { title: 'Book Cargo', new: 'New Booking', cargo: 'Cargo Type', desc: 'Description',
                    weight: 'Weight (kg)', pickup: 'Pickup Address', dropoff: 'Dropoff Address', distance: 'Distance (km)',
                    price: 'Estimated Price (ETB)', submit: 'Create Booking', list: 'Your Bookings', empty: 'No bookings yet',
                    pay: 'Pay via Telebirr', pending: 'Pending', confirmed: 'Confirmed', assigned: 'Assigned',
                    in_transit: 'In Transit', delivered: 'Delivered', cancelled: 'Cancelled' },
                wheat: { title: 'Wheat Marketplace', list: 'List Wheat', qty: 'Quantity (kg)', priceKg: 'Price per kg (ETB)',
                    grade: 'Quality Grade', location: 'Location', desc: 'Description', image: 'Wheat Image',
                    submit: 'List Wheat', grade_a: 'Grade A', grade_b: 'Grade B', standard: 'Standard', empty: 'No wheat listings.',
                    contact: 'Contact Seller' },
                tracking: { title: 'Live Shipment Tracking', placeholder: 'Enter booking number', start: 'Start Tracking',
                    stop: 'Stop Tracking', status: 'Status', waiting: 'Enter a booking ID and click Start Tracking',
                    connected: 'Connected', disconnected: 'Disconnected', booking: 'Booking Details', cargo: 'Cargo',
                    route: 'Route' },
                driver: { title: 'Driver Dashboard', welcome: 'Welcome back', trucks: 'My Trucks', trips: 'Active Trips',
                    earnings: 'Total Earnings', rating: 'Rating', empty: 'No trips yet' },
                admin: { title: 'Admin Dashboard', welcome: 'Welcome back', users: 'Total Users', trucks: 'Total Trucks',
                    bookings: 'Total Bookings', revenue: 'Total Revenue', overview: 'Overview', recent: 'Recent Bookings' },
                auth: { login: 'Login', logout: 'Logout', register: 'Register', email: 'Email', password: 'Password',
                    name: 'Full Name', phone: 'Phone', confirm: 'Confirm Password', role: 'I am a', customer: 'Customer',
                    owner: 'Truck Owner', submit: 'Sign In', create: 'Create Account', welcome: 'Welcome Back',
                    no_account: "Don't have an account?", has_account: 'Already have an account?' },
                ai: { title: 'AI Assistant', online: 'Online', placeholder: 'Ask me anything...', quick_track: 'Track Shipment',
                    quick_truck: 'Register Truck', quick_wheat: 'Wheat Prices', quick_payment: 'Payment' },
                footer: { rights: 'All rights reserved.' },
                common: { loading: 'Loading...', error: 'An error occurred', save: 'Save', cancel: 'Cancel', close: 'Close',
                    search: 'Search...' }
            },
            om: {
                nav: { home: 'Mana', trucks: 'Makiinaawwan', book: 'Imisa', wheat: 'Qamadii', tracking: 'Argisiisaa',
                    driver: 'Oofata', admin: 'Admin' },
                home: {
                    hero: 'Imisa Jigoo. Daldala Qamadii. Argisiisaa Lubbuun.',
                    sub: 'HEROO abbootii makiinaa, qotee bulaa fi daldaltoota Itoophiyaa walitti qabdi.',
                    cta_truck: 'Makiinaa Galmeessi',
                    cta_cargo: 'Imisa Jigoo',
                    owners: 'Abbootii Makiinaa',
                    owners_desc: 'Makiinaa keessan tarreessi, gatii kaa\'i, fi yeroo tokko itti fayyadamuu dandeessu.',
                    wheat: 'Gabaa Qamadii',
                    wheat_desc: 'Qamadii gatii ifa ta\'een bituu fi gurguruu.',
                    tracking: 'Argisiisaa Lubbuun',
                    tracking_desc: 'Imisa keessan maappii irratti yeroo haqaatti argisiisaa.'
                },
                trucks: { title: 'Makiinaawwan', register: 'Makiinaa Galmeessi', plate: 'Lakkoofsa Plate',
                    type: 'Gosa Makiinaa', capacity: 'Dandeettii (kg)', price: 'Gatii km tokkotti (ETB)',
                    location: 'Bakka Ammaa', image: 'Fota Makiinaa', submit: 'Makiinaa Galmeessi', cancel: 'Haqu',
                    empty: 'Makiinaan argamu hin jiru.', book: 'Makiinaa kana Qabuu', available: 'Argama',
                    on_trip: 'Imisa Irra', maintenance: 'Suphama', booked: 'Qabame' },
                bookings: { title: 'Imisa Jigoo', new: 'Imisa Haaraa', cargo: 'Gosa Jigoo', desc: 'Ibsa',
                    weight: 'Ulfina (kg)', pickup: 'Bakka Fudhatamaa', dropoff: 'Bakka Galmaa', distance: 'Fageenya (km)',
                    price: 'Gatii Tilmaamaa (ETB)', submit: 'Imisa Uumi', list: 'Imisa Keessan', empty: 'Imisa hin jiru',
                    pay: 'Telebirr itti kaffali', pending: 'Eegama', confirmed: 'Mirkaneesse', assigned: 'Ramadame',
                    in_transit: 'Imisa Irra', delivered: 'Dhiyaate', cancelled: 'Haquame' },
                wheat: { title: 'Gabaa Qamadii', list: 'Qamadii Tarreessi', qty: 'Hamma (kg)', priceKg: 'Gatii kg tokkotti (ETB)',
                    grade: 'Sadarkaa', location: 'Bakka', desc: 'Ibsa', image: 'Fota Qamadii', submit: 'Qamadii Tarreessi',
                    grade_a: 'Sadarkaa A', grade_b: 'Sadarkaa B', standard: 'Idilaa', empty: 'Qamadiin tarreeffame hin jiru.',
                    contact: 'Bittaa Quunnami' },
                tracking: { title: 'Argisiisaa Lubbuun', placeholder: 'Lakkoofsa imisa galchi', start: 'Argisiisaa Eegali',
                    stop: 'Argisiisaa Dhaabi', status: 'Haala', waiting: 'Lakkoofsa imisa galchii \'Argisiisaa Eegali\' tuquu',
                    connected: 'Walqabate', disconnected: 'Walqabaa hin qabu', booking: 'Ibsa Imisa', cargo: 'Jigoo',
                    route: 'Karaa' },
                driver: { title: 'Oofata', welcome: 'Baga nagaan deebite', trucks: 'Makiinaa Koo', trips: 'Imisa Irraa',
                    earnings: 'Galii Guutuu', rating: 'Madaalla', empty: 'Imisa hin jiru' },
                admin: { title: 'Admin', welcome: 'Baga nagaan deebite', users: 'Fayyadamtoota', trucks: 'Makiinaawwan',
                    bookings: 'Imisa', revenue: 'Galii', overview: 'Gura', recent: 'Imisa haaraa' },
                auth: { login: 'Seenuu', logout: 'Bahi', register: 'Galmeessi', email: 'Imeelii', password: 'Icciitii',
                    name: 'Maqaa guutuu', phone: 'Lakkoofsa Bilbilaa', confirm: 'Icciitii mirkaneessi',
                    role: 'Ani', customer: 'Maamila', owner: 'Abbaa makiinaa', submit: 'Seenuu',
                    create: 'Galmeessi', welcome: 'Baga nagaan deebite', no_account: 'Herroo hin qabduu?',
                    has_account: 'Herroo qabdaa?' },
                ai: { title: 'Gargaaraa AI', online: 'Walqabate', placeholder: 'Waan barbaadde na gaafadhu...',
                    quick_track: 'Imisa Argisiisaa', quick_truck: 'Makiinaa Galmeessi', quick_wheat: 'Gatii Qamadii',
                    quick_payment: 'Kaffaltii' },
                footer: { rights: 'Mirri hundi qabame.' },
                common: { loading: 'Eegachaa...', error: 'Dogoggora uumame', save: 'Olkessi', cancel: 'Haqu', close: 'Cufi',
                    search: 'Barbaadi...' }
            },
            am: {
                nav: { home: 'መነሻ', trucks: 'መኪኖች', book: 'ጭነት', wheat: 'ስንዴ', tracking: 'ክትትል', driver: 'አሽከርካሪ',
                    admin: 'አስተዳዳሪ' },
                home: {
                    hero: 'ጭነት አንቀሳቅስ። ስንዴ ንግድ። በቀጥታ ተከታተል።',
                    sub: 'HEROO የመኪና ባለቤቶችን፣ አርሶ አደሮችን እና ንግዶችን በኢትዮጵያ ያገናኛል።',
                    cta_truck: 'መኪና ይመዝገቡ',
                    cta_cargo: 'ጭነት ይዘዙ',
                    owners: 'የመኪና ባለቤቶች',
                    owners_desc: 'መኪኖችዎን ይዘርዝሩ፣ ዋጋ ይስጡ፣ በፍጥነት ይቀጠሩ።',
                    wheat: 'የስንዴ ገበያ',
                    wheat_desc: 'ስንዴን ግልፅ በሆነ ዋጋ ይግዙ እና ይሽጡ።',
                    tracking: 'በቀጥታ ክትትል',
                    tracking_desc: 'ጭነትዎን በእውነተኛ ጊዜ በካርታ ላይ ይከታተሉ።'
                },
                trucks: { title: 'መኪኖች', register: 'መኪና ይመዝገቡ', plate: 'ታገር ቁጥር', type: 'የመኪና አይነት',
                    capacity: 'አቅም (ኪ.ግ)', price: 'በአንድ ኪሜ ዋጋ (ብር)', location: 'አሁን ያለበት ቦታ', image: 'የመኪና ምስል',
                    submit: 'መኪና ይመዝገቡ', cancel: 'ይቅር', empty: 'በአሁኑ ጊዜ ምንም መኪና የለም።', book: 'ይህን መኪና ይዘዙ',
                    available: 'ይገኛል', on_trip: 'በመንገድ ላይ', maintenance: 'ጥገና', booked: 'ተይዟል' },
                bookings: { title: 'ጭነት ይዘዙ', new: 'አዲስ ትዕዛዝ', cargo: 'የጭነት አይነት', desc: 'መግለጫ',
                    weight: 'ክብደት (ኪ.ግ)', pickup: 'የሚወሰድበት አድራሻ', dropoff: 'የሚደርስበት አድራሻ', distance: 'ርቀት (ኪሜ)',
                    price: 'የተገመተ ዋጋ (ብር)', submit: 'ትዕዛዝ ይፍጠሩ', list: 'ትዕዛዞችዎ', empty: 'እስካሁን ምንም ትዕዛዝ የለም',
                    pay: 'በተሌብር ይክፈሉ', pending: 'በመጠበቅ ላይ', confirmed: 'ተረጋግጧል', assigned: 'ተመድቧል',
                    in_transit: 'በመንገድ ላይ', delivered: 'ደርሷል', cancelled: 'ተሰርዟል' },
                wheat: { title: 'የስንዴ ገበያ', list: 'ስንዴ ይዘርዝሩ', qty: 'ብዛት (ኪ.ግ)', priceKg: 'በአንድ ኪሎ ዋጋ (ብር)',
                    grade: 'ደረጃ', location: 'ቦታ', desc: 'መግለጫ', image: 'የስንዴ ምስል', submit: 'ስንዴ ይዘርዝሩ',
                    grade_a: 'ደረጃ ሀ', grade_b: 'ደረጃ ለ', standard: 'መደበኛ', empty: 'ምንም የስንዴ ዝርዝሮች የሉም።',
                    contact: 'ሻጩን ያግኙ' },
                tracking: { title: 'በቀጥታ ክትትል', placeholder: 'የትዕዛዝ ቁጥር ያስገቡ', start: 'ክትትል ጀምር',
                    stop: 'ክትትል አቁም', status: 'ሁኔታ', waiting: 'የትዕዛዝ ቁጥር ያስገቡ እና "ክትትል ጀምር" ይጫኑ',
                    connected: 'ተገናኝቷል', disconnected: 'ተገናኝቷል', booking: 'የትዕዛዝ ዝርዝሮች', cargo: 'ጭነት',
                    route: 'መንገድ' },
                driver: { title: 'አሽከርካሪ', welcome: 'እንኳን ደህና መጡ', trucks: 'መኪኖቼ', trips: 'ጉዞዎች',
                    earnings: 'ገቢ', rating: 'ደረጃ', empty: 'ምንም ጉዞ የለም' },
                admin: { title: 'አስተዳዳሪ', welcome: 'እንኳን ደህና መጡ', users: 'ተጠቃሚዎች', trucks: 'መኪኖች',
                    bookings: 'ትዕዛዞች', revenue: 'ገቢ', overview: 'አጠቃላይ', recent: 'የቅርብ ጊዜ ትዕዛዞች' },
                auth: { login: 'ግባ', logout: 'ውጣ', register: 'ተመዝገብ', email: 'ኢሜል', password: 'የይለፍ ቃል',
                    name: 'ሙሉ ስም', phone: 'ስልክ', confirm: 'የይለፍ ቃል ያረጋግጡ', role: 'እኔ', customer: 'ደንበኛ',
                    owner: 'የመኪና ባለቤት', submit: 'ግባ', create: 'መለያ ይፍጠሩ', welcome: 'እንኳን ደህና መጡ',
                    no_account: 'መለያ የለዎትም?', has_account: 'መለያ አለዎት?' },
                ai: { title: 'አሳሽ AI', online: 'ተገናኝቷል', placeholder: 'ማንኛውንም ነገር ጠይቀኝ...',
                    quick_track: 'ጭነት ተከታተል', quick_truck: 'መኪና ይመዝገቡ', quick_wheat: 'የስንዴ ዋጋ',
                    quick_payment: 'ክፍያ' },
                footer: { rights: 'መብቱ በህግ የተጠበቀ ነው።' },
                common: { loading: 'በመጫን ላይ...', error: 'ስህተት ተከስቷል', save: 'አስቀምጥ', cancel: 'ይቅር',
                    close: 'ዝጋ', search: 'ፈልግ...' }
            }
        };

        function t(key) {
            const keys = key.split('.');
            let val = i18n[currentLang] || i18n.en;
            for (let k of keys) {
                if (val && val[k] !== undefined) val = val[k];
                else return key;
            }
            return val || key;
        }

        function updateI18n() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                el.textContent = t(el.dataset.i18n);
            });
            // Update page content
            renderPage(currentPage);
        }

        function setLang(lang) {
            currentLang = lang;
            localStorage.setItem('heroo_lang', lang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            updateI18n();
        }

        // Init language buttons
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.addEventListener('click', () => setLang(b.dataset.lang));
        });
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

        // ═══════════════════════════════════════════════════════════════════
        // 3. THEME
        // ═══════════════════════════════════════════════════════════════════

        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            document.getElementById('themeIcon').className = document.documentElement.classList.contains('dark') ?
                'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        if (localStorage.getItem('theme') === 'dark') toggleTheme();

        // ═══════════════════════════════════════════════════════════════════
        // 4. TOAST
        // ═══════════════════════════════════════════════════════════════════

        function showToast(msg, icon = 'fa-check-circle', color = 'text-green-400') {
            const t = document.getElementById('toast');
            document.getElementById('toastMsg').textContent = msg;
            document.getElementById('toastIcon').className = `fas ${icon} ${color} text-xl`;
            t.classList.add('show');
            clearTimeout(t._timeout);
            t._timeout = setTimeout(() => t.classList.remove('show'), 3500);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 5. AUTH
        // ═══════════════════════════════════════════════════════════════════

        function updateUI() {
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const userDisplay = document.getElementById('userDisplay');
            const userName = document.getElementById('userName');
            if (currentUser) {
                loginBtn.classList.add('hidden');
                logoutBtn.classList.remove('hidden');
                userDisplay.classList.remove('hidden');
                userName.textContent = currentUser.name + ' (' + currentUser.role + ')';
            } else {
                loginBtn.classList.remove('hidden');
                logoutBtn.classList.add('hidden');
                userDisplay.classList.add('hidden');
            }
        }

        document.getElementById('loginBtn').addEventListener('click', () => {
            const role = prompt('Login as: (customer / truck_owner / admin)', 'customer');
            if (role) {
                const name = prompt('Your name:', 'Demo User');
                if (name) {
                    currentUser = { name, role };
                    localStorage.setItem('heroo_user', JSON.stringify(currentUser));
                    updateUI();
                    showToast(`Welcome ${name}!`, 'fa-user-check', 'text-green-400');
                    renderPage('home');
                }
            }
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('heroo_user');
            updateUI();
            showToast('Logged out.', 'fa-sign-out-alt', 'text-gray-400');
            renderPage('home');
        });
        updateUI();

        // ═══════════════════════════════════════════════════════════════════
        // 6. NAVIGATION
        // ═══════════════════════════════════════════════════════════════════

        function renderPage(page) {
            currentPage = page;
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));

            const pages = {
                home: renderHome,
                trucks: renderTrucks,
                bookings: renderBookings,
                wheat: renderWheat,
                tracking: renderTracking,
                driver: renderDriver,
                admin: renderAdmin
            };
            if (pages[page]) pages[page]();
            else renderHome();

            document.getElementById('mobileMenu').classList.add('hidden');
            if (page === 'tracking') setTimeout(initMap, 400);
            if (page === 'admin') setTimeout(initCharts, 400);
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (!currentUser && ['trucks', 'bookings', 'wheat', 'tracking', 'driver', 'admin'].includes(page)) {
                    showToast('Please login first.', 'fa-exclamation-circle', 'text-yellow-400');
                    return;
                }
                if (page === 'admin' && currentUser?.role !== 'admin') {
                    showToast('Admin access only.', 'fa-lock', 'text-red-400');
                    return;
                }
                renderPage(page);
            });
        });

        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });

        // ═══════════════════════════════════════════════════════════════════
        // 7. HOME PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderHome() {
            const main = document.getElementById('mainContent');
            main.innerHTML = `
                <div class="page active" id="page-home">
                    <div class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 md:p-14 mb-10 shadow-2xl">
                        <h1 class="text-4xl md:text-6xl font-extrabold">${t('home.hero')}</h1>
                        <p class="text-xl opacity-90 my-4">${t('home.sub')}</p>
                        <button onclick="renderPage('trucks')" class="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition">${t('home.cta_truck')}</button>
                        <button onclick="renderPage('bookings')" class="bg-yellow-400 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 ml-4 transition">${t('home.cta_cargo')}</button>
                    </div>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="card text-center"><div class="text-5xl mb-3">🚚</div><h3 class="text-xl font-bold">${t('home.owners')}</h3><p class="text-gray-600 dark:text-gray-400">${t('home.owners_desc')}</p></div>
                        <div class="card text-center"><div class="text-5xl mb-3">🌾</div><h3 class="text-xl font-bold">${t('home.wheat')}</h3><p class="text-gray-600 dark:text-gray-400">${t('home.wheat_desc')}</p></div>
                        <div class="card text-center"><div class="text-5xl mb-3">📡</div><h3 class="text-xl font-bold">${t('home.tracking')}</h3><p class="text-gray-600 dark:text-gray-400">${t('home.tracking_desc')}</p></div>
                    </div>
                    <div class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">⭐ Trusted by 50+ truck owners • 200+ shipments • 98% satisfaction</div>
                </div>
            `;
        }

        // ═══════════════════════════════════════════════════════════════════
        // 8. TRUCKS PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderTrucks() {
            const main = document.getElementById('mainContent');
            const list = trucks.map(t => `
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mb-2 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        ${t.image ? `<img src="${t.image}" alt="${t.plate}" class="w-16 h-16 object-cover rounded-lg mr-3 inline-block" />` : ''}
                        <span class="font-bold text-blue-600">${t.plate}</span> ${t.type} | ${t.price} ETB/km
                        <div class="text-xs text-gray-400">📍 ${t.location} | ⭐ ${t.rating||0}</div>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full ${t.status==='available'?'badge-green':'badge-yellow'}">${t('trucks.'+t.status.replace('-','_'))||t.status}</span>
                </div>
            `).join('') || `<p class="text-gray-500">${t('trucks.empty')}</p>`;

            main.innerHTML = `
                <div class="page active" id="page-trucks">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-truck text-blue-600"></i> ${t('trucks.title')}</h2>
                    <div class="grid lg:grid-cols-2 gap-8">
                        <div class="card">
                            <h3 class="text-xl font-bold mb-4">${t('trucks.register')}</h3>
                            <form onsubmit="event.preventDefault(); registerTruck();">
                                <input id="plate" placeholder="${t('trucks.plate')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <select id="type" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60"><option>Flatbed</option><option>Reefer</option><option>Box Truck</option><option>Tipper</option><option>Tanker</option></select>
                                <input id="capacity" type="number" placeholder="${t('trucks.capacity')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="price" type="number" step="0.1" placeholder="${t('trucks.price')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="location" placeholder="${t('trucks.location')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" />
                                <!-- Image Upload -->
                                <div class="upload-area mb-3" onclick="document.getElementById('truckImage').click()">
                                    <i class="fas fa-upload text-2xl text-gray-400"></i>
                                    <p class="text-sm text-gray-500">${t('trucks.image')}</p>
                                    <img id="truckPreview" class="upload-preview hidden mt-2" />
                                    <input type="file" id="truckImage" accept="image/*" class="hidden" onchange="previewImage(this, 'truckPreview')" />
                                </div>
                                <button type="submit" class="bg-green-600 text-white p-3 rounded-xl w-full font-bold hover:bg-green-700 transition">${t('trucks.submit')}</button>
                            </form>
                        </div>
                        <div><h3 class="text-xl font-bold mb-4">${t('trucks.title')}</h3><div id="truckList">${list}</div></div>
                    </div>
                </div>
            `;
        }

        function registerTruck() {
            if (!currentUser) return showToast('Login first', 'fa-exclamation-circle', 'text-yellow-400');
            const plate = document.getElementById('plate').value.trim();
            if (!plate) return showToast('Enter plate number');
            const image = document.getElementById('truckPreview').src || '';
            trucks.push({
                id: Date.now(),
                plate,
                type: document.getElementById('type').value,
                capacity: parseInt(document.getElementById('capacity').value) || 0,
                price: parseFloat(document.getElementById('price').value) || 0,
                location: document.getElementById('location').value || 'Unknown',
                owner: currentUser.name,
                status: 'available',
                rating: 0,
                image: image
            });
            localStorage.setItem('heroo_trucks', JSON.stringify(trucks));
            showToast('Truck registered!');
            renderPage('trucks');
        }

        // ═══════════════════════════════════════════════════════════════════
        // 9. BOOKINGS PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderBookings() {
            const main = document.getElementById('mainContent');
            const list = bookings.map(b => `
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mb-2">
                    <div class="flex justify-between"><span class="font-bold">${b.cargo}</span> <span class="font-semibold text-blue-600">${b.price} ETB</span></div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">${b.pickup} → ${b.dropoff}</div>
                    <div class="flex justify-between mt-1"><span class="text-xs">${b.date}</span><span class="text-xs px-2 py-1 rounded-full ${b.status==='delivered'?'badge-green':b.status==='pending'?'badge-yellow':'badge-blue'}">${t('bookings.'+b.status.replace('-','_'))||b.status}</span></div>
                </div>
            `).join('') || `<p class="text-gray-500">${t('bookings.empty')}</p>`;

            main.innerHTML = `
                <div class="page active" id="page-bookings">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-box text-blue-600"></i> ${t('bookings.title')}</h2>
                    <div class="grid lg:grid-cols-2 gap-8">
                        <div class="card">
                            <h3 class="text-xl font-bold mb-4">${t('bookings.new')}</h3>
                            <form onsubmit="event.preventDefault(); bookCargo();">
                                <input id="cargoType" placeholder="${t('bookings.cargo')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="weight" type="number" placeholder="${t('bookings.weight')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="pickup" placeholder="${t('bookings.pickup')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="dropoff" placeholder="${t('bookings.dropoff')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="distance" type="number" step="0.1" placeholder="${t('bookings.distance')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required oninput="document.getElementById('estPrice').textContent = (this.value * 40).toFixed(0)" />
                                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-3 text-center"><span class="font-bold">${t('bookings.price')}: </span><span id="estPrice" class="text-2xl text-blue-600">0</span> ETB</div>
                                <button type="submit" class="bg-yellow-500 text-white p-3 rounded-xl w-full font-bold hover:bg-yellow-600 transition">${t('bookings.submit')}</button>
                                <button type="button" onclick="handleTelebirr()" class="mt-2 bg-green-600 text-white p-3 rounded-xl w-full font-bold hover:bg-green-700 transition"><i class="fas fa-mobile-alt mr-2"></i>${t('bookings.pay')}</button>
                            </form>
                        </div>
                        <div><h3 class="text-xl font-bold mb-4">${t('bookings.list')}</h3><div id="bookingList">${list}</div></div>
                    </div>
                </div>
            `;
        }

        function bookCargo() {
            if (!currentUser) return showToast('Login first');
            const distance = parseFloat(document.getElementById('distance').value) || 0;
            bookings.push({
                id: Date.now(),
                cargo: document.getElementById('cargoType').value || 'Unknown',
                weight: parseInt(document.getElementById('weight').value) || 0,
                pickup: document.getElementById('pickup').value || 'N/A',
                dropoff: document.getElementById('dropoff').value || 'N/A',
                distance: distance,
                price: distance * 40,
                customer: currentUser.name,
                status: 'pending',
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('heroo_bookings', JSON.stringify(bookings));
            showToast('Booked!');
            renderPage('bookings');
        }

        function handleTelebirr() {
            showToast('⏳ Processing Telebirr payment...', 'fa-spinner fa-spin', 'text-blue-400');
            setTimeout(() => {
                showToast('✅ Payment successful! (Mock)', 'fa-check-circle', 'text-green-400');
            }, 2000);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 10. WHEAT PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderWheat() {
            const main = document.getElementById('mainContent');
            const list = wheat.map(w => `
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mb-2 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        ${w.image ? `<img src="${w.image}" alt="Wheat" class="w-16 h-16 object-cover rounded-lg mr-3 inline-block" />` : ''}
                        <span class="font-bold">${w.qty} kg</span> ${w.grade}
                        <div class="text-sm">${w.priceKg} ETB/kg | 📍 ${w.location}</div>
                    </div>
                    <span class="text-sm">${w.seller}</span>
                </div>
            `).join('') || `<p class="text-gray-500">${t('wheat.empty')}</p>`;

            main.innerHTML = `
                <div class="page active" id="page-wheat">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-wheat-awn text-amber-600"></i> ${t('wheat.title')}</h2>
                    <div class="grid lg:grid-cols-2 gap-8">
                        <div class="card">
                            <h3 class="text-xl font-bold mb-4">${t('wheat.list')}</h3>
                            <form onsubmit="event.preventDefault(); listWheat();">
                                <input id="qty" type="number" placeholder="${t('wheat.qty')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <input id="priceKg" type="number" step="0.1" placeholder="${t('wheat.priceKg')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" required />
                                <select id="grade" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60"><option value="Grade A">${t('wheat.grade_a')}</option><option value="Grade B">${t('wheat.grade_b')}</option><option value="Standard">${t('wheat.standard')}</option></select>
                                <input id="wheatLoc" placeholder="${t('wheat.location')}" class="w-full p-3 border rounded-xl mb-3 bg-gray-50 dark:bg-gray-700/60" />
                                <!-- Image Upload -->
                                <div class="upload-area mb-3" onclick="document.getElementById('wheatImage').click()">
                                    <i class="fas fa-upload text-2xl text-gray-400"></i>
                                    <p class="text-sm text-gray-500">${t('wheat.image')}</p>
                                    <img id="wheatPreview" class="upload-preview hidden mt-2" />
                                    <input type="file" id="wheatImage" accept="image/*" class="hidden" onchange="previewImage(this, 'wheatPreview')" />
                                </div>
                                <button type="submit" class="bg-amber-600 text-white p-3 rounded-xl w-full font-bold hover:bg-amber-700 transition">${t('wheat.submit')}</button>
                            </form>
                        </div>
                        <div><h3 class="text-xl font-bold mb-4">${t('wheat.title')}</h3><div id="wheatList">${list}</div></div>
                    </div>
                </div>
            `;
        }

        function listWheat() {
            if (!currentUser) return showToast('Login first');
            const image = document.getElementById('wheatPreview').src || '';
            wheat.push({
                id: Date.now(),
                qty: parseInt(document.getElementById('qty').value) || 0,
                priceKg: parseFloat(document.getElementById('priceKg').value) || 0,
                grade: document.getElementById('grade').value || 'Standard',
                location: document.getElementById('wheatLoc').value || 'Unknown',
                seller: currentUser.name,
                image: image
            });
            localStorage.setItem('heroo_wheat', JSON.stringify(wheat));
            showToast('Wheat listed!');
            renderPage('wheat');
        }

        // ═══════════════════════════════════════════════════════════════════
        // 11. IMAGE UPLOAD HELPERS
        // ═══════════════════════════════════════════════════════════════════

        function previewImage(input, previewId) {
            const preview = document.getElementById(previewId);
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                };
                reader.readAsDataURL(input.files[0]);
                showToast('Image loaded!', 'fa-check', 'text-green-400');
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 12. TRACKING PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderTracking() {
            const main = document.getElementById('mainContent');
            main.innerHTML = `
                <div class="page active" id="page-tracking">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-map-location-dot text-red-600"></i> ${t('tracking.title')}</h2>
                    <div class="card">
                        <div class="flex flex-wrap gap-4 items-end mb-4">
                            <div class="flex-1 min-w-[180px]">
                                <label class="block text-sm font-medium mb-1">${t('tracking.placeholder')}</label>
                                <input id="trackingId" type="text" class="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700/60" placeholder="Enter ID" value="101" />
                            </div>
                            <button onclick="startTracking()" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"><i class="fas fa-play mr-2"></i>${t('tracking.start')}</button>
                            <button onclick="stopTracking()" class="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"><i class="fas fa-stop mr-2"></i>${t('tracking.stop')}</button>
                        </div>
                        <div id="map"></div>
                        <div id="trackStatus" class="mt-4 text-center font-medium text-gray-600 dark:text-gray-400">${t('tracking.waiting')}</div>
                        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                            <h4 class="font-bold text-sm mb-3">📜 ${t('tracking.booking')}</h4>
                            <div class="grid grid-cols-4 gap-2 text-center text-xs">
                                <div><div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>${t('bookings.pending')}</div>
                                <div><div class="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>${t('bookings.assigned')}</div>
                                <div><div class="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1 animate-pulse"></div>${t('bookings.in_transit')}</div>
                                <div><div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>${t('bookings.delivered')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(initMap, 400);
        }

        function initMap() {
            if (map) return;
            map = L.map('map').setView([9.03, 38.74], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
            marker = L.marker([9.03, 38.74]).addTo(map).bindPopup('📍 Location');
        }

        function startTracking() {
            if (trackInterval) clearInterval(trackInterval);
            if (!map) initMap();
            let lat = 9.03,
                lng = 38.74;
            const statusEl = document.getElementById('trackStatus');
            trackInterval = setInterval(() => {
                lat += (Math.random() - 0.5) * 0.004;
                lng += (Math.random() - 0.5) * 0.004;
                if (marker) { marker.setLatLng([lat, lng]);
                    map.panTo([lat, lng]); }
                statusEl.textContent = `🔄 Live: ${lat.toFixed(5)}, ${lng.toFixed(5)} (${new Date().toLocaleTimeString()})`;
            }, 1500);
            showToast('Tracking started!');
        }

        function stopTracking() {
            if (trackInterval) { clearInterval(trackInterval);
                trackInterval = null;
                document.getElementById('trackStatus').textContent = '⏹️ Stopped.';
                showToast('Tracking stopped.'); }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 13. DRIVER PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderDriver() {
            const main = document.getElementById('mainContent');
            main.innerHTML = `
                <div class="page active" id="page-driver">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-id-card text-blue-600"></i> ${t('driver.title')}</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="card text-center"><div class="text-2xl font-bold text-blue-600">3</div><div class="text-sm text-gray-500">${t('driver.trucks')}</div></div>
                        <div class="card text-center"><div class="text-2xl font-bold text-green-600">5</div><div class="text-sm text-gray-500">${t('driver.trips')}</div></div>
                        <div class="card text-center"><div class="text-2xl font-bold text-yellow-600">42,500</div><div class="text-sm text-gray-500">${t('driver.earnings')}</div></div>
                        <div class="card text-center"><div class="text-2xl font-bold text-purple-600">4.8</div><div class="text-sm text-gray-500">${t('driver.rating')}</div></div>
                    </div>
                    <div class="card">
                        <h3 class="font-bold text-lg mb-4">${t('driver.trips')}</h3>
                        <div class="space-y-3">
                            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex justify-between items-center"><span><span class="font-bold text-blue-600">#102</span> Addis → Dire Dawa</span><span class="text-xs px-2 py-1 rounded-full badge-green">${t('bookings.in_transit')}</span></div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex justify-between items-center"><span><span class="font-bold text-blue-600">#105</span> Adama → Hawassa</span><span class="text-xs px-2 py-1 rounded-full badge-blue">${t('bookings.assigned')}</span></div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex justify-between items-center"><span><span class="font-bold text-blue-600">#108</span> Jimma → Addis</span><span class="text-xs px-2 py-1 rounded-full badge-yellow">${t('bookings.pending')}</span></div>
                        </div>
                    </div>
                </div>
            `;
        }

        // ═══════════════════════════════════════════════════════════════════
        // 14. ADMIN PAGE
        // ═══════════════════════════════════════════════════════════════════

        function renderAdmin() {
            const main = document.getElementById('mainContent');
            main.innerHTML = `
                <div class="page active" id="page-admin">
                    <h2 class="text-3xl font-bold mb-6"><i class="fas fa-chart-simple text-purple-600"></i> ${t('admin.title')}</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="card border-l-4 border-blue-500"><div class="text-2xl font-bold text-blue-600">42</div><div class="text-sm text-gray-500">${t('admin.users')}</div></div>
                        <div class="card border-l-4 border-green-500"><div class="text-2xl font-bold text-green-600">18</div><div class="text-sm text-gray-500">${t('admin.trucks')}</div></div>
                        <div class="card border-l-4 border-yellow-500"><div class="text-2xl font-bold text-yellow-600">128K</div><div class="text-sm text-gray-500">${t('admin.revenue')}</div></div>
                        <div class="card border-l-4 border-purple-500"><div class="text-2xl font-bold text-purple-600">25</div><div class="text-sm text-gray-500">${t('admin.bookings')}</div></div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="card"><h4 class="font-bold mb-3">📊 Revenue Trend</h4><canvas id="revChart" height="200"></canvas></div>
                        <div class="card"><h4 class="font-bold mb-3">🚚 Truck Utilization</h4><canvas id="utilChart" height="200"></canvas></div>
                    </div>
                    <div class="mt-8 card">
                        <h4 class="font-bold mb-3">📋 ${t('admin.recent')}</h4>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 dark:bg-gray-700/50"><tr><th class="p-3 text-left">ID</th><th class="p-3 text-left">Customer</th><th class="p-3 text-left">Amount</th><th class="p-3 text-left">Status</th></tr></thead>
                                <tbody><tr><td class="p-3">#101</td><td>Abebe K.</td><td>25,000 ETB</td><td><span class="badge-green">Delivered</span></td></tr>
                                <tr><td class="p-3">#102</td><td>Bontu T.</td><td>18,500 ETB</td><td><span class="badge-yellow">In Transit</span></td></tr>
                                <tr><td class="p-3">#103</td><td>Chala D.</td><td>32,000 ETB</td><td><span class="badge-blue">Pending</span></td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(initCharts, 400);
        }

        function initCharts() {
            if (revChart) return;
            const ctx1 = document.getElementById('revChart');
            if (!ctx1) return;
            revChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{ label: 'Revenue', data: [12000, 18000, 15000, 22000, 27000, 21000, 32000],
                        borderColor: '#3b82f6', fill: true, tension: 0.4 }]
                },
                options: { responsive: true, plugins: { legend: { display: false } } }
            });
            const ctx2 = document.getElementById('utilChart');
            if (ctx2) {
                utilChart = new Chart(ctx2, {
                    type: 'doughnut',
                    data: { labels: ['Available', 'On Trip', 'Maintenance'],
                        datasets: [{ data: [20, 14, 8], backgroundColor: ['#22c55e', '#eab308', '#ef4444'] }] }
                });
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 15. AI ASSISTANT
        // ═══════════════════════════════════════════════════════════════════

        let aiMessages = [
            { text: "👋 Hello! I'm HEROO AI. How can I help you today?", sender: 'bot' }
        ];
        let aiOpen = false;

        document.getElementById('aiToggle').addEventListener('click', () => {
            aiOpen = !aiOpen;
            document.getElementById('aiChat').classList.toggle('hidden', !aiOpen);
            if (aiOpen) renderAIMessages();
        });
        document.getElementById('aiClose').addEventListener('click', () => {
            aiOpen = false;
            document.getElementById('aiChat').classList.add('hidden');
        });

        const aiQuickReplies = [
            { label: t('ai.quick_track'), msg: 'How do I track my shipment?' },
            { label: t('ai.quick_truck'), msg: 'How do I register a truck?' },
            { label: t('ai.quick_wheat'), msg: 'How to sell wheat?' },
            { label: t('ai.quick_payment'), msg: 'How to pay via Telebirr?' }
        ];

        function renderAIMessages() {
            const container = document.getElementById('aiMessages');
            container.innerHTML = aiMessages.map(m =>
                `<div class="flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}">
                    <div class="chat-bubble ${m.sender}">${m.text}</div>
                </div>`
            ).join('');
            container.scrollTop = container.scrollHeight;
            // Quick replies
            const qc = document.getElementById('aiQuickReplies');
            qc.innerHTML = aiQuickReplies.map(q =>
                `<button onclick="aiSend('${q.msg}')" class="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-full transition">${q.label}</button>`
            ).join('');
        }

        function aiSend(msg) {
            const input = document.getElementById('aiInput');
            const text = msg || input.value.trim();
            if (!text) return;
            aiMessages.push({ text, sender: 'user' });
            input.value = '';
            renderAIMessages();

            setTimeout(() => {
                let reply = "🤔 I'm not sure. Please ask about: Tracking, Trucks, Wheat, or Payments.";
                const q = text.toLowerCase();
                if (q.includes('track') || q.includes('shipment') || q.includes('location'))
                    reply =
                    "📡 Go to Tracking page, enter your booking ID, and click Start Tracking. You'll see live location updates!";
                else if (q.includes('truck') || q.includes('register') || q.includes('vehicle'))
                    reply =
                    "🚚 Go to Trucks page, fill out the form (plate, type, capacity, price), and click Register Truck.";
                else if (q.includes('wheat') || q.includes('sell') || q.includes('grain') || q.includes('buy'))
                    reply =
                    "🌾 Go to Wheat page, enter quantity, price per kg, grade, location, and click List Wheat.";
                else if (q.includes('pay') || q.includes('telebirr') || q.includes('money') || q.includes('cost'))
                    reply =
                    "💳 After booking, click 'Pay via Telebirr' button. You'll be redirected to Telebirr checkout.";
                else if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
                    reply = "👋 Hello! Welcome to HEROO Logistics. Ask me about tracking, trucks, wheat, or payments!";
                else if (q.includes('admin') || q.includes('dashboard'))
                    reply = "📊 Admin Dashboard shows total users, trucks, bookings, revenue, and analytics charts.";
                else if (q.includes('help') || q.includes('support'))
                    reply =
                    "🆘 I can help with: Truck Registration, Cargo Booking, Wheat Trading, Real-time Tracking, and Payments. Just ask me anything!";
                aiMessages.push({ text: reply, sender: 'bot' });
                renderAIMessages();
            }, 500);
        }

        document.getElementById('aiSend').addEventListener('click', () => aiSend());
        document.getElementById('aiInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') aiSend(); });

        // ═══════════════════════════════════════════════════════════════════
        // 16. MODAL
        // ═══════════════════════════════════════════════════════════════════

        function openModal(content) {
            document.getElementById('modalBody').innerHTML = content;
            document.getElementById('modal').classList.add('open');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('open');
        }
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });

        // ═══════════════════════════════════════════════════════════════════
        // 17. INIT
        // ═══════════════════════════════════════════════════════════════════

        // Set initial language
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

        // Render home
        renderPage('home');

        console.log('🚀 HEROO Logistics – Ultimate Professional loaded!');
        console.log(`📊 Data: ${trucks.length} trucks, ${bookings.length} bookings, ${wheat.length} wheat listings`);
        console.log(`👤 User: ${currentUser ? currentUser.name + ' (' + currentUser.role + ')' : 'Guest'}`);
        console.log(`🌍 Language: ${currentLang}`);
    </script>
</body>
</html>