<!-- SONIC Dashboard - Premium SaaS Edition -->

<!DOCTYPE html>



<html class="light" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<title>SONIC Telecom Admin Dashboard</title>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<script id="tailwind-config">

&nbsp;       tailwind.config = {

&nbsp;           darkMode: "class",

&nbsp;           theme: {

&nbsp;               extend: {

&nbsp;                   colors: {

&nbsp;                       "primary-fixed": "#ff7937",

&nbsp;                       "on-background": "#2c2f30",

&nbsp;                       "secondary-fixed-dim": "#d1d5da",

&nbsp;                       "primary-container": "#ff7937",

&nbsp;                       "background": "#f5f6f7",

&nbsp;                       "tertiary-container": "#69f6b8",

&nbsp;                       "on-error-container": "#570008",

&nbsp;                       "on-tertiary-container": "#005a3c",

&nbsp;                       "primary": "#9e3c00",

&nbsp;                       "inverse-on-surface": "#9b9d9e",

&nbsp;                       "tertiary-fixed-dim": "#58e7ab",

&nbsp;                       "on-primary-container": "#411400",

&nbsp;                       "on-secondary-fixed-variant": "#585c60",

&nbsp;                       "on-surface-variant": "#595c5d",

&nbsp;                       "surface-container": "#e6e8ea",

&nbsp;                       "on-tertiary-fixed-variant": "#006544",

&nbsp;                       "primary-fixed-dim": "#f16b24",

&nbsp;                       "surface-container-highest": "#dadddf",

&nbsp;                       "secondary-fixed": "#e0e3e8",

&nbsp;                       "inverse-primary": "#ed6821",

&nbsp;                       "on-primary-fixed-variant": "#511b00",

&nbsp;                       "secondary": "#585c60",

&nbsp;                       "surface-variant": "#dadddf",

&nbsp;                       "on-error": "#ffefee",

&nbsp;                       "outline-variant": "#abadae",

&nbsp;                       "on-surface": "#2c2f30",

&nbsp;                       "on-secondary-fixed": "#3c4044",

&nbsp;                       "tertiary-dim": "#005c3d",

&nbsp;                       "on-primary": "#fff0ea",

&nbsp;                       "surface-dim": "#d1d5d7",

&nbsp;                       "secondary-container": "#e0e3e8",

&nbsp;                       "error-container": "#fb5151",

&nbsp;                       "error": "#b31b25",

&nbsp;                       "on-secondary-container": "#4e5256",

&nbsp;                       "surface-bright": "#f5f6f7",

&nbsp;                       "primary-dim": "#8b3400",

&nbsp;                       "tertiary": "#006947",

&nbsp;                       "on-tertiary": "#c8ffe0",

&nbsp;                       "outline": "#757778",

&nbsp;                       "on-secondary": "#f0f3f8",

&nbsp;                       "secondary-dim": "#4c5054",

&nbsp;                       "on-tertiary-fixed": "#00452d",

&nbsp;                       "inverse-surface": "#0c0f10",

&nbsp;                       "tertiary-fixed": "#69f6b8",

&nbsp;                       "surface-tint": "#9e3c00",

&nbsp;                       "surface-container-lowest": "#ffffff",

&nbsp;                       "surface-container-high": "#e0e3e4",

&nbsp;                       "surface": "#f5f6f7",

&nbsp;                       "error-dim": "#9f0519",

&nbsp;                       "surface-container-low": "#eff1f2",

&nbsp;                       "on-primary-fixed": "#000000"

&nbsp;                   },

&nbsp;                   fontFamily: {

&nbsp;                       "headline": \["Inter"],

&nbsp;                       "body": \["Inter"],

&nbsp;                       "label": \["Inter"]

&nbsp;                   },

&nbsp;                   borderRadius: {

&nbsp;                       "DEFAULT": "0.75rem",

&nbsp;                       "lg": "1rem",

&nbsp;                       "xl": "1.25rem",

&nbsp;                       "full": "9999px"

&nbsp;                   },

&nbsp;               },

&nbsp;           },

&nbsp;       }

&nbsp;   </script>

<style>

&nbsp;       body { font-family: 'Inter', sans-serif; }

&nbsp;       .material-symbols-outlined {

&nbsp;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&nbsp;           vertical-align: middle;

&nbsp;       }

&nbsp;       .glass-card {

&nbsp;           background: rgba(255, 255, 255, 0.8);

&nbsp;           backdrop-filter: blur(12px);

&nbsp;           -webkit-backdrop-filter: blur(12px);

&nbsp;       }

&nbsp;   </style>

</head>

<body class="bg-background text-on-surface antialiased flex min-h-screen">

<!-- SideNavBar (Authority: JSON \& Design System) -->

<aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-slate-950 border-r border-slate-800/50 shadow-2xl p-4 space-y-2">

<div class="mb-8 px-4 py-6">

<h1 class="text-xl font-bold text-white tracking-widest">SONIC</h1>

<p class="text-xs text-slate-500 font-medium uppercase tracking-tighter mt-1">Telecom Admin</p>

</div>

<nav class="flex-grow space-y-1">

<a class="flex items-center gap-3 px-4 py-3 text-orange-500 bg-orange-500/10 rounded-xl transition-all cursor-pointer" href="#">

<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>

<span class="font-inter text-sm font-medium">Dashboard</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl transition-all cursor-pointer" href="#">

<span class="material-symbols-outlined" data-icon="group">group</span>

<span class="font-inter text-sm font-medium">Customers</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl transition-all cursor-pointer" href="#">

<span class="material-symbols-outlined" data-icon="confirmation\_number">confirmation\_number</span>

<span class="font-inter text-sm font-medium">Vouchers</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl transition-all cursor-pointer" href="#">

<span class="material-symbols-outlined" data-icon="help">help</span>

<span class="font-inter text-sm font-medium">Help</span>

</a>

</nav>

<div class="pt-4 border-t border-slate-800/50">

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl transition-all cursor-pointer" href="#">

<span class="material-symbols-outlined" data-icon="logout">logout</span>

<span class="font-inter text-sm font-medium">Logout</span>

</a>

</div>

</aside>

<!-- Main Content Area -->

<main class="flex-grow md:ml-64 min-h-screen flex flex-col">

<!-- TopNavBar (Authority: JSON \& Design System) -->

<header class="flex justify-between items-center px-8 w-full h-16 sticky top-0 z-40 bg-white dark:bg-slate-900 border-none shadow-none font-inter antialiased text-slate-800">

<div class="flex items-center gap-4">

<span class="md:hidden material-symbols-outlined text-on-surface-variant cursor-pointer" data-icon="menu">menu</span>

<div class="relative hidden sm:block">

<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>

<input class="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-inverse-primary/30 transition-all" placeholder="Search MSISDN or Customer..." type="text"/>

</div>

</div>

<div class="flex items-center gap-6">

<button class="relative hover:bg-slate-100 p-2 rounded-full transition-all active:scale-95">

<span class="material-symbols-outlined text-slate-500" data-icon="notifications">notifications</span>

<span class="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>

</button>

<button class="hover:bg-slate-100 p-2 rounded-full transition-all active:scale-95">

<span class="material-symbols-outlined text-slate-500" data-icon="settings">settings</span>

</button>

<div class="h-8 w-px bg-surface-container"></div>

<div class="flex items-center gap-3">

<div class="text-right hidden lg:block">

<p class="text-sm font-bold leading-none">Amine Ben Ali</p>

<p class="text-\[10px] text-on-surface-variant uppercase tracking-widest font-bold mt-1">Super Admin</p>

</div>

<img alt="User profile avatar" class="w-10 h-10 rounded-xl object-cover ring-2 ring-surface-container shadow-sm" data-alt="Close up portrait of a professional middle-aged man with short dark hair in a clean minimalist office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC720hgYVrkqGNro\_eE4HR\_cjADL3PwFwLdXze-mjbUdTPTPhtFYheNxUybst\_z4tNpRG-NvEXG7cOTaAza49siTl7nIydO8spOpZisV4pAXUk8l1h1I10gNcLZqQ9tFRmIQK9CDg4vQFLzCpywpcNrPrHyOFprePd2P09WMR42HGVlfzWIXkbyy3ItMkPMGNtfHG8T8sCYU70AT-amCZj1-rDZcxI83Mi9OVT53wtKFCLfWR7Si1XGLdxapDNWzeThNV94Q9nOERRt"/>

</div>

</div>

</header>

<!-- Canvas -->

<div class="p-8 space-y-10">

<!-- Bento Grid Header: Subscriber Overview -->

<section class="grid grid-cols-1 lg:grid-cols-12 gap-6">

<!-- Hero Main Balance Card -->

<div class="lg:col-span-8 bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl shadow-xl flex flex-col justify-between relative overflow-hidden group">

<div class="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">

<span class="material-symbols-outlined text-\[240px]" data-icon="account\_balance\_wallet">account\_balance\_wallet</span>

</div>

<div class="relative z-10">

<div class="flex justify-between items-start">

<div>

<h2 class="text-on-primary/80 font-medium tracking-wide uppercase text-xs mb-2">Main Balance</h2>

<div class="flex items-baseline gap-2">

<span class="text-white text-5xl font-black tracking-tight">250.000</span>

<span class="text-on-primary/90 text-2xl font-bold">DT</span>

</div>

</div>

<div class="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/20">

<span class="material-symbols-outlined text-white" data-icon="contact\_phone">contact\_phone</span>

<span class="text-white font-bold ml-2">+216 55 123 456</span>

</div>

</div>

</div>

<div class="mt-12 flex gap-4 relative z-10">

<button class="bg-white text-primary font-bold px-6 py-3 rounded-DEFAULT hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">

<span class="material-symbols-outlined text-sm" data-icon="add\_circle">add\_circle</span>

&nbsp;                           Refill Account

&nbsp;                       </button>

<button class="bg-white/10 text-white font-bold px-6 py-3 rounded-DEFAULT hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">

<span class="material-symbols-outlined text-sm" data-icon="history">history</span>

&nbsp;                           Transaction Logs

&nbsp;                       </button>

</div>

</div>

<!-- Status Sidebar Bento -->

<div class="lg:col-span-4 flex flex-col gap-6">

<div class="bg-surface-container-lowest p-6 rounded-xl border border-transparent shadow-sm flex items-center justify-between">

<div>

<p class="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Subscription Status</p>

<h3 class="text-xl font-bold mt-1">Fiber Home Plus</h3>

</div>

<span class="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold ring-1 ring-tertiary/20">Active</span>

</div>

<div class="bg-surface-container-low p-6 rounded-xl flex-grow flex flex-col justify-center">

<p class="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Data Usage Plan</p>

<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden mb-3">

<div class="h-full bg-primary-fixed w-\[68%] rounded-full"></div>

</div>

<div class="flex justify-between items-center">

<span class="text-sm font-bold text-on-surface">34.2 GB used</span>

<span class="text-sm text-on-surface-variant">50 GB Total</span>

</div>

</div>

</div>

</section>

<!-- Secondary Section: Tables \& Details -->

<section class="grid grid-cols-1 xl:grid-cols-3 gap-8">

<!-- Dedicated Accounts Table -->

<div class="xl:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">

<div class="p-6 flex justify-between items-center bg-surface-container-low/30">

<h3 class="font-bold text-lg">Dedicated Accounts</h3>

<button class="text-primary-fixed font-bold text-sm flex items-center gap-1 hover:underline">

&nbsp;                           View All <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</button>

</div>

<div class="overflow-x-auto">

<table class="w-full text-left">

<thead>

<tr class="bg-surface-container-low/50">

<th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Account Name</th>

<th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Balance</th>

<th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Expiry Date</th>

<th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>

</tr>

</thead>

<tbody class="divide-y divide-surface-container-low">

<tr class="hover:bg-surface-container-low/20 transition-colors">

<td class="px-6 py-5 font-bold text-sm">Internet Bonus 4G</td>

<td class="px-6 py-5 text-sm">2.500 GB</td>

<td class="px-6 py-5 text-sm text-on-surface-variant">31 Aug 2025</td>

<td class="px-6 py-5">

<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-\[10px] font-black uppercase tracking-wider">Active</span>

</td>

</tr>

<tr class="hover:bg-surface-container-low/20 transition-colors">

<td class="px-6 py-5 font-bold text-sm">Loyalty Points</td>

<td class="px-6 py-5 text-sm">4,520 pts</td>

<td class="px-6 py-5 text-sm text-on-surface-variant">15 Dec 2025</td>

<td class="px-6 py-5">

<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-\[10px] font-black uppercase tracking-wider">Active</span>

</td>

</tr>

<tr class="hover:bg-surface-container-low/20 transition-colors">

<td class="px-6 py-5 font-bold text-sm">Night Bundle</td>

<td class="px-6 py-5 text-sm">0.000 MB</td>

<td class="px-6 py-5 text-sm text-on-surface-variant">Expired</td>

<td class="px-6 py-5">

<span class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-\[10px] font-black uppercase tracking-wider">Empty</span>

</td>

</tr>

<tr class="hover:bg-surface-container-low/20 transition-colors">

<td class="px-6 py-5 font-bold text-sm">International Voice</td>

<td class="px-6 py-5 text-sm">15.00 DT</td>

<td class="px-6 py-5 text-sm text-on-surface-variant">30 Sep 2025</td>

<td class="px-6 py-5">

<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-\[10px] font-black uppercase tracking-wider">Active</span>

</td>

</tr>

</tbody>

</table>

</div>

</div>

<!-- Quick Actions / Mini Bento -->

<div class="space-y-6">

<div class="bg-inverse-surface p-6 rounded-xl text-white shadow-lg overflow-hidden relative group">

<div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16"></div>

<h4 class="text-lg font-bold mb-4 relative z-10">Quick Support</h4>

<div class="space-y-3 relative z-10">

<button class="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group/btn">

<span class="flex items-center gap-3">

<span class="material-symbols-outlined text-primary-fixed" data-icon="sim\_card">sim\_card</span>

<span class="text-sm font-medium">SIM Replacement</span>

</span>

<span class="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform" data-icon="chevron\_right">chevron\_right</span>

</button>

<button class="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group/btn">

<span class="flex items-center gap-3">

<span class="material-symbols-outlined text-primary-fixed" data-icon="block">block</span>

<span class="text-sm font-medium">Suspend Line</span>

</span>

<span class="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform" data-icon="chevron\_right">chevron\_right</span>

</button>

<button class="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group/btn">

<span class="flex items-center gap-3">

<span class="material-symbols-outlined text-primary-fixed" data-icon="receipt\_long">receipt\_long</span>

<span class="text-sm font-medium">Invoice History</span>

</span>

<span class="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform" data-icon="chevron\_right">chevron\_right</span>

</button>

</div>

</div>

<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent">

<h4 class="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-4">Device Info</h4>

<div class="flex items-center gap-4">

<div class="bg-surface-container w-16 h-16 rounded-xl flex items-center justify-center">

<span class="material-symbols-outlined text-3xl text-on-surface-variant" data-icon="smartphone">smartphone</span>

</div>

<div>

<p class="font-bold text-on-surface">iPhone 15 Pro Max</p>

<p class="text-xs text-on-surface-variant">IMEI: 356890123456789</p>

</div>

</div>

</div>

</div>

</section>

</div>

</main>

<!-- Navigation suppression check: Standard dashboard, Nav shell included -->

</body></html>



<!-- Customer Management -->

<!DOCTYPE html>



<html class="light" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<script id="tailwind-config">

&nbsp;       tailwind.config = {

&nbsp;           darkMode: "class",

&nbsp;           theme: {

&nbsp;               extend: {

&nbsp;                   colors: {

&nbsp;                       "surface-dim": "#d1d5d7",

&nbsp;                       "on-tertiary": "#c8ffe0",

&nbsp;                       "tertiary-dim": "#005c3d",

&nbsp;                       "surface-variant": "#dadddf",

&nbsp;                       "tertiary-fixed": "#69f6b8",

&nbsp;                       "on-secondary": "#f0f3f8",

&nbsp;                       "background": "#f5f6f7",

&nbsp;                       "primary-container": "#ff7937",

&nbsp;                       "outline-variant": "#abadae",

&nbsp;                       "primary-fixed-dim": "#f16b24",

&nbsp;                       "on-secondary-fixed": "#3c4044",

&nbsp;                       "surface-bright": "#f5f6f7",

&nbsp;                       "on-tertiary-container": "#005a3c",

&nbsp;                       "secondary-container": "#e0e3e8",

&nbsp;                       "surface-container-lowest": "#ffffff",

&nbsp;                       "secondary-fixed": "#e0e3e8",

&nbsp;                       "on-secondary-fixed-variant": "#585c60",

&nbsp;                       "primary-fixed": "#ff7937",

&nbsp;                       "primary-dim": "#8b3400",

&nbsp;                       "primary": "#9e3c00",

&nbsp;                       "on-error": "#ffefee",

&nbsp;                       "on-error-container": "#570008",

&nbsp;                       "secondary": "#585c60",

&nbsp;                       "on-tertiary-fixed-variant": "#006544",

&nbsp;                       "inverse-primary": "#ed6821",

&nbsp;                       "surface": "#f5f6f7",

&nbsp;                       "outline": "#757778",

&nbsp;                       "on-surface-variant": "#595c5d",

&nbsp;                       "on-primary-fixed-variant": "#511b00",

&nbsp;                       "secondary-fixed-dim": "#d1d5da",

&nbsp;                       "inverse-on-surface": "#9b9d9e",

&nbsp;                       "surface-tint": "#9e3c00",

&nbsp;                       "on-secondary-container": "#4e5256",

&nbsp;                       "tertiary-fixed-dim": "#58e7ab",

&nbsp;                       "secondary-dim": "#4c5054",

&nbsp;                       "tertiary-container": "#69f6b8",

&nbsp;                       "on-tertiary-fixed": "#00452d",

&nbsp;                       "on-primary": "#fff0ea",

&nbsp;                       "on-primary-fixed": "#000000",

&nbsp;                       "surface-container": "#e6e8ea",

&nbsp;                       "error-container": "#fb5151",

&nbsp;                       "surface-container-low": "#eff1f2",

&nbsp;                       "surface-container-highest": "#dadddf",

&nbsp;                       "error": "#b31b25",

&nbsp;                       "inverse-surface": "#0c0f10",

&nbsp;                       "on-primary-container": "#411400",

&nbsp;                       "on-surface": "#2c2f30",

&nbsp;                       "error-dim": "#9f0519",

&nbsp;                       "surface-container-high": "#e0e3e4",

&nbsp;                       "tertiary": "#006947",

&nbsp;                       "on-background": "#2c2f30"

&nbsp;                   },

&nbsp;                   fontFamily: {

&nbsp;                       "headline": \["Inter"],

&nbsp;                       "body": \["Inter"],

&nbsp;                       "label": \["Inter"]

&nbsp;                   },

&nbsp;                   borderRadius: {

&nbsp;                       "DEFAULT": "0.75rem",

&nbsp;                       "lg": "1rem",

&nbsp;                       "xl": "1.25rem",

&nbsp;                       "full": "9999px"

&nbsp;                   },

&nbsp;               },

&nbsp;           },

&nbsp;       }

&nbsp;   </script>

<style>

&nbsp;       .material-symbols-outlined {

&nbsp;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&nbsp;           vertical-align: middle;

&nbsp;       }

&nbsp;       body { font-family: 'Inter', sans-serif; }

&nbsp;       .glass-header {

&nbsp;           background: rgba(255, 255, 255, 0.8);

&nbsp;           backdrop-filter: blur(12px);

&nbsp;       }

&nbsp;       .primary-gradient {

&nbsp;           background: linear-gradient(135deg, #9e3c00 0%, #ff7937 100%);

&nbsp;       }

&nbsp;   </style>

</head>

<body class="bg-surface text-on-surface font-body antialiased">

<!-- Side Navigation Bar -->

<aside class="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-900 dark:bg-black shadow-2xl flex flex-col border-r border-slate-800 z-50">

<div class="p-6">

<h1 class="text-2xl font-black tracking-tighter text-white">SONIC</h1>

<p class="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Customer Care</p>

</div>

<nav class="flex-1 px-4 space-y-1 mt-4">

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-lg group" href="#">

<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>

<span class="font-medium text-sm">Dashboard</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 bg-orange-600/10 text-orange-500 border-r-4 border-orange-600 transition-all rounded-lg group" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

<span class="font-medium text-sm">Customers</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-lg group" href="#">

<span class="material-symbols-outlined" data-icon="cell\_tower">cell\_tower</span>

<span class="font-medium text-sm">MSISDN Lookup</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-lg group" href="#">

<span class="material-symbols-outlined" data-icon="payments">payments</span>

<span class="font-medium text-sm">Financials</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-lg group" href="#">

<span class="material-symbols-outlined" data-icon="support\_agent">support\_agent</span>

<span class="font-medium text-sm">Support</span>

</a>

</nav>

<div class="p-4 mt-auto border-t border-slate-800">

<button class="w-full primary-gradient text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 active:scale-95 transition-transform mb-4">

&nbsp;               New Request

&nbsp;           </button>

<div class="space-y-1">

<a class="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-all text-sm" href="#">

<span class="material-symbols-outlined" data-icon="settings">settings</span>

<span>Settings</span>

</a>

<a class="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-all text-sm" href="#">

<span class="material-symbols-outlined" data-icon="logout">logout</span>

<span>Logout</span>

</a>

</div>

</div>

</aside>

<!-- Top Navigation Bar -->

<header class="fixed top-0 right-0 w-\[calc(100%-16rem)] h-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm">

<div class="flex items-center gap-6 w-1/2">

<div class="relative w-full max-w-md">

<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>

<input class="w-full bg-surface-container-low border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container transition-all" placeholder="Quick search MSISDN, Name..." type="text"/>

</div>

</div>

<div class="flex items-center gap-4">

<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">

<span class="material-symbols-outlined" data-icon="notifications">notifications</span>

</button>

<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">

<span class="material-symbols-outlined" data-icon="help\_outline">help\_outline</span>

</button>

<div class="h-8 w-px bg-outline-variant/30 mx-2"></div>

<div class="flex items-center gap-3 cursor-pointer group">

<div class="text-right">

<p class="text-xs font-bold text-on-surface leading-tight">Admin User</p>

<p class="text-\[10px] text-on-surface-variant leading-tight">Super Admin</p>

</div>

<img alt="User Profile Avatar" class="w-10 h-10 rounded-xl object-cover ring-2 ring-surface-container" data-alt="Close up portrait of a professional male administrator in a modern office setting with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP\_vXQ1auSz1n52gedKaCLItbUOWNBHYj\_Oo\_oC7PLWaDX57ufTy4Q1Ykmfgl226JwA7O2qhdCfFbl0oW7Mcv8mRqG9FlzKzszH\_NEXcEHKWeWsxnNtGwKo-d3S7yD3M8EOemTLw5jvbN5ULtua3C8\_JBem3QoK7oDkEl831828\_\_01-GUmp1SF9Qz6vSDJXk09XOpyMQXkYeHT-eHuXcSYf0XLgqP50ysBJbwjRUqYfL092XZWksAVfhzjcYEt12Xt0R23lfqxXmM"/>

</div>

</div>

</header>

<!-- Main Content Canvas -->

<main class="ml-64 pt-24 px-8 pb-12 min-h-screen">

<!-- Page Header Section -->

<div class="flex items-end justify-between mb-8">

<div>

<nav class="flex text-xs text-on-surface-variant gap-2 mb-2">

<span>Platform</span>

<span>/</span>

<span class="text-primary font-semibold">Customer Management</span>

</nav>

<h2 class="text-3xl font-black text-on-surface tracking-tight">Customer Management</h2>

<p class="text-on-surface-variant text-sm mt-1">Manage, verify and monitor customer accounts across the Sonic network.</p>

</div>

<button class="primary-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95">

<span class="material-symbols-outlined text-lg" data-icon="person\_add">person\_add</span>

&nbsp;               Add New Customer

&nbsp;           </button>

</div>

<!-- Filter \& Search Bento Area -->

<div class="grid grid-cols-12 gap-6 mb-8">

<div class="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">

<div class="flex-1 w-full">

<label class="block text-\[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 ml-1">Search by MSISDN</label>

<div class="relative">

<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">cell\_tower</span>

<input class="w-full bg-surface-container-low border-none rounded-xl py-3 pl-10 pr-4 text-sm font-semibold focus:ring-2 focus:ring-primary-container transition-all" placeholder="+212 6XX XXX XXX" type="text"/>

</div>

</div>

<div class="w-full md:w-48">

<label class="block text-\[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 ml-1">Account Status</label>

<select class="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-container">

<option>All Statuses</option>

<option>Active</option>

<option>Inactive</option>

<option>Suspended</option>

</select>

</div>

<button class="mt-5 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold text-sm hover:bg-surface-variant transition-colors flex items-center gap-2">

<span class="material-symbols-outlined text-lg">filter\_list</span>

&nbsp;                   Filters

&nbsp;               </button>

</div>

<div class="col-span-12 lg:col-span-4 bg-primary-container/10 p-6 rounded-xl border border-primary-container/20 flex items-center gap-4">

<div class="h-12 w-12 rounded-xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">

<span class="material-symbols-outlined" data-icon="groups">groups</span>

</div>

<div>

<p class="text-\[10px] font-bold text-primary-container uppercase tracking-widest">Total Active Users</p>

<h3 class="text-2xl font-black text-on-surface">1,284,092</h3>

<p class="text-xs text-on-tertiary-container flex items-center gap-1 mt-0.5">

<span class="material-symbols-outlined text-sm">trending\_up</span>

&nbsp;                       +2.4% this month

&nbsp;                   </p>

</div>

</div>

</div>

<!-- High-Fidelity Data Table Section -->

<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">

<div class="overflow-x-auto">

<table class="w-full text-left border-collapse">

<thead>

<tr class="bg-surface-container-low">

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest">Customer Name</th>

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest">MSISDN</th>

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest">Plan Type</th>

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest">Status</th>

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest">Solde / Balance</th>

<th class="px-6 py-4 text-\[11px] font-black text-on-surface-variant uppercase tracking-widest text-right">Actions</th>

</tr>

</thead>

<tbody class="divide-y divide-surface-container">

<!-- Row 1 -->

<tr class="hover:bg-surface-container-low/50 transition-colors group">

<td class="px-6 py-4">

<div class="flex items-center gap-3">

<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">AK</div>

<div>

<p class="text-sm font-bold text-on-surface">Amine Kadiri</p>

<p class="text-\[11px] text-on-surface-variant">amine.k@example.com</p>

</div>

</div>

</td>

<td class="px-6 py-4">

<span class="text-sm font-mono font-medium text-on-surface">+212 661 234 567</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-\[11px] font-bold">Premium Unlimited</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-\[11px] font-bold inline-flex items-center gap-1">

<span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>

&nbsp;                                   Active

&nbsp;                               </span>

</td>

<td class="px-6 py-4">

<span class="text-sm font-black text-on-surface">145.50 MAD</span>

</td>

<td class="px-6 py-4 text-right space-x-2">

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="View History">

<span class="material-symbols-outlined text-lg" data-icon="history">history</span>

</button>

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit Customer">

<span class="material-symbols-outlined text-lg" data-icon="edit">edit</span>

</button>

</td>

</tr>

<!-- Row 2 -->

<tr class="hover:bg-surface-container-low/50 transition-colors group">

<td class="px-6 py-4">

<div class="flex items-center gap-3">

<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">SB</div>

<div>

<p class="text-sm font-bold text-on-surface">Sarah Bennani</p>

<p class="text-\[11px] text-on-surface-variant">s.bennani@cloud.ma</p>

</div>

</div>

</td>

<td class="px-6 py-4">

<span class="text-sm font-mono font-medium text-on-surface">+212 662 987 654</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-\[11px] font-bold">Sonic Go 20GB</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-\[11px] font-bold inline-flex items-center gap-1">

<span class="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>

&nbsp;                                   Inactive

&nbsp;                               </span>

</td>

<td class="px-6 py-4">

<span class="text-sm font-black text-on-surface">0.00 MAD</span>

</td>

<td class="px-6 py-4 text-right space-x-2">

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="history">history</span>

</button>

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="edit">edit</span>

</button>

</td>

</tr>

<!-- Row 3 -->

<tr class="hover:bg-surface-container-low/50 transition-colors group">

<td class="px-6 py-4">

<div class="flex items-center gap-3">

<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">MT</div>

<div>

<p class="text-sm font-bold text-on-surface">Mehdi Tazi</p>

<p class="text-\[11px] text-on-surface-variant">m.tazi@enterprise.com</p>

</div>

</div>

</td>

<td class="px-6 py-4">

<span class="text-sm font-mono font-medium text-on-surface">+212 660 111 222</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-\[11px] font-bold">Business Elite</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-\[11px] font-bold inline-flex items-center gap-1">

<span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>

&nbsp;                                   Active

&nbsp;                               </span>

</td>

<td class="px-6 py-4">

<span class="text-sm font-black text-on-surface">1,020.00 MAD</span>

</td>

<td class="px-6 py-4 text-right space-x-2">

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="history">history</span>

</button>

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="edit">edit</span>

</button>

</td>

</tr>

<!-- Row 4 -->

<tr class="hover:bg-surface-container-low/50 transition-colors group">

<td class="px-6 py-4">

<div class="flex items-center gap-3">

<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">YL</div>

<div>

<p class="text-sm font-bold text-on-surface">Yasmine Lahlou</p>

<p class="text-\[11px] text-on-surface-variant">yasmine.l@mail.ma</p>

</div>

</div>

</td>

<td class="px-6 py-4">

<span class="text-sm font-mono font-medium text-on-surface">+212 770 444 555</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-\[11px] font-bold">Sonic Lite</span>

</td>

<td class="px-6 py-4">

<span class="px-3 py-1 rounded-full bg-error-container/20 text-error text-\[11px] font-bold inline-flex items-center gap-1">

<span class="w-1.5 h-1.5 rounded-full bg-error"></span>

&nbsp;                                   Suspended

&nbsp;                               </span>

</td>

<td class="px-6 py-4">

<span class="text-sm font-black text-on-surface">-12.30 MAD</span>

</td>

<td class="px-6 py-4 text-right space-x-2">

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="history">history</span>

</button>

<button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all">

<span class="material-symbols-outlined text-lg" data-icon="edit">edit</span>

</button>

</td>

</tr>

</tbody>

</table>

</div>

<!-- Table Footer Pagination -->

<div class="p-6 bg-surface-container-low/30 border-t border-surface-container flex items-center justify-between">

<p class="text-xs text-on-surface-variant font-medium">Showing 1-4 of 1,284,092 customers</p>

<div class="flex items-center gap-2">

<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant">

<span class="material-symbols-outlined text-lg">chevron\_left</span>

</button>

<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>

<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface font-bold text-xs">2</button>

<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface font-bold text-xs">3</button>

<span class="text-xs text-on-surface-variant px-1">...</span>

<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface font-bold text-xs">320,102</button>

<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant">

<span class="material-symbols-outlined text-lg">chevron\_right</span>

</button>

</div>

</div>

</div>

<!-- Secondary Insights Grid -->

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary">

<div class="flex items-center justify-between mb-4">

<span class="text-\[10px] font-black text-on-surface-variant uppercase tracking-widest">Recent Activity</span>

<span class="material-symbols-outlined text-primary-container">bolt</span>

</div>

<ul class="space-y-4">

<li class="flex gap-3">

<div class="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5"></div>

<div>

<p class="text-xs font-bold text-on-surface leading-none">New Registration</p>

<p class="text-\[10px] text-on-surface-variant mt-1">Amine Kadiri · 2 mins ago</p>

</div>

</li>

<li class="flex gap-3">

<div class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>

<div>

<p class="text-xs font-bold text-on-surface leading-none">Plan Upgrade</p>

<p class="text-\[10px] text-on-surface-variant mt-1">Mehdi Tazi · 15 mins ago</p>

</div>

</li>

</ul>

</div>

<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm">

<div class="flex items-center justify-between mb-4">

<span class="text-\[10px] font-black text-on-surface-variant uppercase tracking-widest">Top Plans</span>

<span class="material-symbols-outlined text-secondary">pie\_chart</span>

</div>

<div class="space-y-3">

<div>

<div class="flex justify-between text-\[11px] mb-1">

<span class="font-bold">Premium Unlimited</span>

<span class="text-on-surface-variant">62%</span>

</div>

<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">

<div class="bg-primary h-full w-\[62%]"></div>

</div>

</div>

<div>

<div class="flex justify-between text-\[11px] mb-1">

<span class="font-bold">Sonic Go 20GB</span>

<span class="text-on-surface-variant">28%</span>

</div>

<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">

<div class="bg-secondary h-full w-\[28%]"></div>

</div>

</div>

</div>

</div>

<div class="relative rounded-xl overflow-hidden group">

<img alt="Network Infrastructure" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Modern high-tech data center interior with servers and blue ambient lighting, representing network infrastructure and speed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa50PCLcYOGkwb\_-IPkj1uD5Hv0nSclYSxFCINkwB52kB0cgKlF3\_bxZamIyOLdxP0Vvk1hEv1RFuRjw7Z8DsvhehzptbLy7jAC2NFbyfK9CDivI-T-J6ldMJAwzVnhJ2Ti7lYffISOVyTxE0aqtGWwFqv1yApnQCPxS9C8-CfrTPgMzO9OFVWkzhGMH7HLFgDWPopFmOI2etWK4n0zzUQoFtpsUbRSsu--B\_WDoN7DLRPMC-H5e1w4U9IVz6JJjHOrc4tRKyEHjY5"/>

<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-6 flex flex-col justify-end">

<h4 class="text-white font-black text-lg leading-tight">Sonic Network 5G Status</h4>

<p class="text-white/70 text-xs mt-1">All nodes operational in Casablanca District.</p>

<button class="mt-4 text-white text-\[10px] font-bold uppercase tracking-widest bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg w-fit transition-all">

&nbsp;                       View Live Map

&nbsp;                   </button>

</div>

</div>

</div>

</main>

<!-- Contextual FAB (Only on Management screen) -->

<button class="fixed bottom-8 right-8 w-14 h-14 rounded-full primary-gradient text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-90 z-50">

<span class="material-symbols-outlined text-2xl" data-icon="add" style="font-variation-settings: 'wght' 700;">add</span>

</button>

</body></html>



<!-- UI Components \& Forms -->

<!DOCTYPE html>



<html class="light" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<script id="tailwind-config">

&nbsp;     tailwind.config = {

&nbsp;       darkMode: "class",

&nbsp;       theme: {

&nbsp;         extend: {

&nbsp;           colors: {

&nbsp;             "surface-dim": "#d1d5d7",

&nbsp;             "on-tertiary": "#c8ffe0",

&nbsp;             "tertiary-dim": "#005c3d",

&nbsp;             "surface-variant": "#dadddf",

&nbsp;             "tertiary-fixed": "#69f6b8",

&nbsp;             "on-secondary": "#f0f3f8",

&nbsp;             "background": "#f5f6f7",

&nbsp;             "primary-container": "#ff7937",

&nbsp;             "outline-variant": "#abadae",

&nbsp;             "primary-fixed-dim": "#f16b24",

&nbsp;             "on-secondary-fixed": "#3c4044",

&nbsp;             "surface-bright": "#f5f6f7",

&nbsp;             "on-tertiary-container": "#005a3c",

&nbsp;             "secondary-container": "#e0e3e8",

&nbsp;             "surface-container-lowest": "#ffffff",

&nbsp;             "secondary-fixed": "#e0e3e8",

&nbsp;             "on-secondary-fixed-variant": "#585c60",

&nbsp;             "primary-fixed": "#ff7937",

&nbsp;             "primary-dim": "#8b3400",

&nbsp;             "primary": "#9e3c00",

&nbsp;             "on-error": "#ffefee",

&nbsp;             "on-error-container": "#570008",

&nbsp;             "secondary": "#585c60",

&nbsp;             "on-tertiary-fixed-variant": "#006544",

&nbsp;             "inverse-primary": "#ed6821",

&nbsp;             "surface": "#f5f6f7",

&nbsp;             "outline": "#757778",

&nbsp;             "on-surface-variant": "#595c5d",

&nbsp;             "on-primary-fixed-variant": "#511b00",

&nbsp;             "secondary-fixed-dim": "#d1d5da",

&nbsp;             "inverse-on-surface": "#9b9d9e",

&nbsp;             "surface-tint": "#9e3c00",

&nbsp;             "on-secondary-container": "#4e5256",

&nbsp;             "tertiary-fixed-dim": "#58e7ab",

&nbsp;             "secondary-dim": "#4c5054",

&nbsp;             "tertiary-container": "#69f6b8",

&nbsp;             "on-tertiary-fixed": "#00452d",

&nbsp;             "on-primary": "#fff0ea",

&nbsp;             "on-primary-fixed": "#000000",

&nbsp;             "surface-container": "#e6e8ea",

&nbsp;             "error-container": "#fb5151",

&nbsp;             "surface-container-low": "#eff1f2",

&nbsp;             "surface-container-highest": "#dadddf",

&nbsp;             "error": "#b31b25",

&nbsp;             "inverse-surface": "#0c0f10",

&nbsp;             "on-primary-container": "#411400",

&nbsp;             "on-surface": "#2c2f30",

&nbsp;             "error-dim": "#9f0519",

&nbsp;             "surface-container-high": "#e0e3e4",

&nbsp;             "tertiary": "#006947",

&nbsp;             "on-background": "#2c2f30"

&nbsp;           },

&nbsp;           fontFamily: {

&nbsp;             "headline": \["Inter"],

&nbsp;             "body": \["Inter"],

&nbsp;             "label": \["Inter"]

&nbsp;           },

&nbsp;           borderRadius: {"DEFAULT": "0.75rem", "lg": "1rem", "xl": "1.25rem", "full": "9999px"},

&nbsp;         },

&nbsp;       },

&nbsp;     }

&nbsp;   </script>

<style>

&nbsp;       .material-symbols-outlined {

&nbsp;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&nbsp;       }

&nbsp;       .signature-gradient {

&nbsp;           background: linear-gradient(135deg, #9e3c00 0%, #ff7937 100%);

&nbsp;       }

&nbsp;       .glass-panel {

&nbsp;           background: rgba(255, 255, 255, 0.7);

&nbsp;           backdrop-filter: blur(12px);

&nbsp;       }

&nbsp;   </style>

</head>

<body class="bg-background text-on-surface font-body selection:bg-primary-container/30">

<!-- Side Navigation Bar -->

<aside class="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-900 dark:bg-black shadow-2xl z-50 flex flex-col border-r border-slate-800">

<div class="p-6">

<div class="flex items-center gap-3">

<div class="w-8 h-8 rounded-lg signature-gradient flex items-center justify-center">

<span class="material-symbols-outlined text-white text-lg" data-icon="bolt" style="font-variation-settings: 'FILL' 1;">bolt</span>

</div>

<h1 class="text-2xl font-black tracking-tighter text-white">SONIC</h1>

</div>

<p class="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Customer Care</p>

</div>

<nav class="flex-1 px-4 space-y-2 mt-4">

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>

<span class="font-medium">Dashboard</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

<span class="font-medium">Customers</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="cell\_tower">cell\_tower</span>

<span class="font-medium">MSISDN Lookup</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="payments">payments</span>

<span class="font-medium">Financials</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 bg-orange-600/10 text-orange-500 border-r-4 border-orange-600 transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="support\_agent" style="font-variation-settings: 'FILL' 1;">support\_agent</span>

<span class="font-medium">Support</span>

</a>

</nav>

<div class="p-4 mt-auto border-t border-slate-800/50">

<button class="w-full signature-gradient text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">

<span class="material-symbols-outlined text-sm" data-icon="add">add</span>

&nbsp;               New Request

&nbsp;           </button>

<div class="mt-4 space-y-1">

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="settings">settings</span>

<span class="font-medium text-sm">Settings</span>

</a>

<a class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all rounded-xl" href="#">

<span class="material-symbols-outlined" data-icon="logout">logout</span>

<span class="font-medium text-sm">Logout</span>

</a>

</div>

</div>

</aside>

<!-- Top Navigation Bar -->

<header class="fixed top-0 right-0 w-\[calc(100%-16rem)] h-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">

<div class="flex items-center flex-1 max-w-xl">

<div class="relative w-full group">

<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>

<input class="w-full bg-surface-container-low border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Search MSISDN, customer name, or transaction ID..." type="text"/>

</div>

</div>

<div class="flex items-center gap-4">

<button class="p-2 hover:bg-surface-container rounded-lg transition-colors relative">

<span class="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>

<span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>

</button>

<button class="p-2 hover:bg-surface-container rounded-lg transition-colors">

<span class="material-symbols-outlined text-on-surface-variant" data-icon="help\_outline">help\_outline</span>

</button>

<div class="h-8 w-\[1px] bg-outline-variant/20 mx-2"></div>

<div class="flex items-center gap-3">

<div class="text-right">

<p class="text-sm font-bold text-on-surface leading-none">Sarah Jenkins</p>

<p class="text-\[10px] text-on-surface-variant uppercase tracking-tighter mt-1">Senior Agent</p>

</div>

<img alt="Sarah Jenkins" class="w-10 h-10 rounded-full border-2 border-primary-container" data-alt="close up headshot of a professional smiling woman with modern office lighting and soft background bokeh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEmid0GsQ6cDlhQPbN64jg-q8rl76x4rtGAajl-kBi6YNR2sQlVW2kIoAh3mS9kZuD9DndtgBeQ6rfJHIqY83wZd\_JGwS1jDc0DQ\_eRX6-DV462gG5ybktr40u9qOtKcCRKahysNh2nr1QtvvJaJDspcG4MR32Jib7LF0opBCrRmn7XYq2NXeA8mU5xZ3rt9wfaRhTqtFfh1XJq-ET\_kAvHKVRusb3vghtxCmiUMi-s0lNIWKcUJt2PaYdFRW7HGmcKcqRlFdpcDoo"/>

</div>

</div>

</header>

<!-- Main Content Canvas -->

<main class="pl-64 pt-16 min-h-screen">

<div class="p-10 max-w-7xl mx-auto space-y-12">

<!-- Hero Header Section -->

<section class="space-y-2">

<h2 class="text-4xl font-black tracking-tight text-on-surface">UI Kit \&amp; Components</h2>

<p class="text-on-surface-variant text-lg max-w-2xl">A curated collection of the SONIC design system building blocks. Purpose-built for clarity, speed, and editorial precision.</p>

</section>

<!-- Bento Grid Layout for UI Components -->

<div class="grid grid-cols-12 gap-8 items-start">

<!-- Buttons Section -->

<div class="col-span-12 lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-8">

<div class="flex items-center justify-between border-b border-surface-container pb-4">

<h3 class="text-xl font-bold text-on-surface">Action Components</h3>

<span class="px-3 py-1 bg-primary/10 text-primary text-\[10px] font-bold uppercase tracking-widest rounded-full">Buttons</span>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10">

<div class="space-y-4">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Primary Actions</label>

<div class="flex flex-col gap-3">

<button class="signature-gradient text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all text-center">

&nbsp;                                   Primary Solid

&nbsp;                               </button>

<button class="bg-primary-container text-on-primary-container py-3 px-6 rounded-xl font-bold hover:bg-primary-fixed active:scale-95 transition-all flex items-center justify-center gap-2">

<span class="material-symbols-outlined text-sm" data-icon="send" style="font-variation-settings: 'FILL' 1;">send</span>

&nbsp;                                   Container Button

&nbsp;                               </button>

</div>

</div>

<div class="space-y-4">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Secondary \&amp; Ghost</label>

<div class="flex flex-col gap-3">

<button class="bg-secondary-container text-on-secondary-container py-3 px-6 rounded-xl font-bold hover:bg-secondary-fixed transition-all">

&nbsp;                                   Secondary Tonal

&nbsp;                               </button>

<button class="bg-transparent text-primary py-3 px-6 rounded-xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">

<span class="material-symbols-outlined text-sm" data-icon="history">history</span>

&nbsp;                                   Ghost Action

&nbsp;                               </button>

</div>

</div>

<div class="space-y-4">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Outlined \&amp; Utility</label>

<div class="flex flex-wrap gap-3">

<button class="border-2 border-outline-variant/30 text-on-surface py-2 px-6 rounded-xl font-bold hover:border-primary/50 transition-all">

&nbsp;                                   Outline

&nbsp;                               </button>

<button class="bg-error-container/10 text-error py-2 px-6 rounded-xl font-bold hover:bg-error-container/20 transition-all">

&nbsp;                                   Destructive

&nbsp;                               </button>

</div>

</div>

<div class="space-y-4">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Status Pills</label>

<div class="flex flex-wrap gap-2">

<span class="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold flex items-center gap-1.5">

<span class="w-1.5 h-1.5 bg-on-tertiary-container rounded-full"></span>

&nbsp;                                   Active

&nbsp;                               </span>

<span class="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-bold">

&nbsp;                                   Draft

&nbsp;                               </span>

<span class="px-4 py-1.5 bg-error/10 text-error rounded-full text-xs font-bold">

&nbsp;                                   Suspended

&nbsp;                               </span>

</div>

</div>

</div>

</div>

<!-- Form Fields Section -->

<div class="col-span-12 lg:col-span-5 space-y-8">

<div class="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">

<div class="flex items-center justify-between border-b border-surface-container pb-4">

<h3 class="text-xl font-bold text-on-surface">Data Inputs</h3>

<span class="px-3 py-1 bg-primary/10 text-primary text-\[10px] font-bold uppercase tracking-widest rounded-full">Forms</span>

</div>

<div class="space-y-5">

<div class="space-y-2">

<label class="text-sm font-bold text-on-surface-variant">Customer MSISDN</label>

<div class="relative group">

<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors">phone\_iphone</span>

<input class="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none" placeholder="+212 600 000 000" type="text"/>

</div>

<p class="text-\[10px] text-on-surface-variant/70 italic px-1">Must be in international format (e.g. +212)</p>

</div>

<div class="space-y-2">

<label class="text-sm font-bold text-on-surface-variant">Request Category</label>

<div class="relative">

<select class="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary/20 transition-all outline-none">

<option>Technical Support</option>

<option>Billing Inquiry</option>

<option>New Subscription</option>

<option>MSISDN Swapping</option>

</select>

<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">unfold\_more</span>

</div>

</div>

<div class="grid grid-cols-2 gap-4">

<div class="space-y-4 p-4 bg-surface-container-low rounded-xl">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Selection</label>

<div class="space-y-3">

<label class="flex items-center gap-3 cursor-pointer group">

<input checked="" class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox"/>

<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Priority Lane</span>

</label>

<label class="flex items-center gap-3 cursor-pointer group">

<input class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox"/>

<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Notify User</span>

</label>

</div>

</div>

<div class="space-y-4 p-4 bg-surface-container-low rounded-xl">

<label class="text-\[10px] font-black uppercase text-on-surface-variant tracking-widest">Channel</label>

<div class="space-y-3">

<label class="flex items-center gap-3 cursor-pointer group">

<input checked="" class="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20" name="channel" type="radio"/>

<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Digital</span>

</label>

<label class="flex items-center gap-3 cursor-pointer group">

<input class="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20" name="channel" type="radio"/>

<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Voice</span>

</label>

</div>

</div>

</div>

</div>

</div>

<!-- Additional Detail Card -->

<div class="bg-inverse-surface p-8 rounded-xl text-white space-y-4">

<div class="flex items-center gap-3">

<span class="material-symbols-outlined text-primary-fixed" data-icon="auto\_awesome">auto\_awesome</span>

<h4 class="font-bold">Design Tip</h4>

</div>

<p class="text-sm text-slate-400 leading-relaxed">

&nbsp;                           Always prioritize "Surface Toning" over hard borders. Use the <span class="text-primary-fixed">surface-container-low</span> class to create depth without visual noise.

&nbsp;                       </p>

</div>

</div>

</div>

<!-- Complex Data Component Showcase -->

<section class="space-y-6">

<h3 class="text-2xl font-bold text-on-surface">Layout Patterns</h3>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

<!-- Glassmorphism Card -->

<div class="relative overflow-hidden group h-64 rounded-xl flex flex-col justify-end p-6 border border-white/20">

<img alt="cyber technology" class="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" data-alt="modern abstract high-tech circuit background with glowing orange lines and deep charcoal surfaces" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsePhag2OxMbc5PiGLReVoAkzhvieBnQBar2cRw8foidsD8m\_8xEGkdRMTrxcDq4trc9pn\_Gtjabz\_11Pb8I6u6v6-Ye\_u3kvWEdOAkKnYwPTrC9I2xrYK9dr6AxwZ3F-GYArB3rr24QNqypWCvykeWKWue2ZjS2aF\_EKcraL\_VS2NR\_RhgGLoG4e5goWd6XlHfKICw8PW2GmLSa509Jv3ap5Inw0b-878p3tNjYTy18wE5LqqimB3FDaXW3uM1vw3XSpl3cVakJmS"/>

<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

<div class="relative glass-panel p-4 rounded-xl border border-white/30">

<h4 class="font-bold text-slate-900">Advanced Telemetry</h4>

<p class="text-xs text-slate-700 mt-1">Real-time network usage visualization</p>

</div>

</div>

<!-- Nested Surface Card -->

<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-primary/10 transition-colors space-y-4">

<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

<span class="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>

</div>

<div class="space-y-1">

<h4 class="font-bold text-on-surface text-lg">Predictive Care</h4>

<p class="text-sm text-on-surface-variant">Automated churn prediction algorithms for high-value MSISDNs.</p>

</div>

<div class="pt-2 flex items-center justify-between">

<span class="text-\[10px] font-black uppercase text-on-surface-variant/60 tracking-tighter">System Ready</span>

<button class="text-primary text-xs font-bold hover:underline">Manage AI Models</button>

</div>

</div>

<!-- Info Surface Card -->

<div class="bg-surface-container p-1 rounded-xl">

<div class="bg-surface-container-lowest m-2 p-5 rounded-lg space-y-4">

<div class="flex items-start justify-between">

<div>

<p class="text-\[10px] font-black text-on-surface-variant uppercase tracking-widest">Active Solde</p>

<h5 class="text-3xl font-black text-on-surface mt-1">1,450.00 <span class="text-sm font-medium text-on-surface-variant">DH</span></h5>

</div>

<div class="bg-tertiary-container/30 p-2 rounded-lg">

<span class="material-symbols-outlined text-tertiary" data-icon="account\_balance\_wallet" style="font-variation-settings: 'FILL' 1;">account\_balance\_wallet</span>

</div>

</div>

<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">

<div class="h-full signature-gradient w-\[72%] rounded-full"></div>

</div>

<p class="text-\[10px] text-on-surface-variant text-center font-medium">72% of monthly quota utilized</p>

</div>

</div>

</div>

</section>

</div>

<!-- Footer Visual Reference -->

<footer class="bg-surface-container-low border-t border-surface-variant mt-20 p-10">

<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

<div class="space-y-2">

<div class="flex items-center gap-2 opacity-50 grayscale">

<div class="w-6 h-6 rounded-md signature-gradient"></div>

<span class="font-black tracking-tighter text-on-surface">SONIC CARE</span>

</div>

<p class="text-xs text-on-surface-variant">© 2024 Sonic Communications Design Lab. All rights reserved.</p>

</div>

<div class="flex gap-10">

<div class="space-y-3">

<p class="text-\[10px] font-black text-on-surface uppercase tracking-widest">Resources</p>

<ul class="text-xs text-on-surface-variant space-y-2 font-medium">

<li class="hover:text-primary transition-colors"><a href="#">Documentation</a></li>

<li class="hover:text-primary transition-colors"><a href="#">Asset Library</a></li>

<li class="hover:text-primary transition-colors"><a href="#">Tokens JSON</a></li>

</ul>

</div>

<div class="space-y-3">

<p class="text-\[10px] font-black text-on-surface uppercase tracking-widest">System</p>

<ul class="text-xs text-on-surface-variant space-y-2 font-medium">

<li class="hover:text-primary transition-colors"><a href="#">Platform V2.4</a></li>

<li class="hover:text-primary transition-colors"><a href="#">Changelog</a></li>

<li class="hover:text-primary transition-colors"><a href="#">Support</a></li>

</ul>

</div>

</div>

</div>

</footer>

</main>

</body></html>

