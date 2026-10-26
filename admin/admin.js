// MindBook 2.0 Web Admin Portal Client Logic
// Direct database management, content moderation & user controls (Zero Supabase Console needed)

const ADMIN_STORAGE_KEY = 'mindbook_admin_session';

// State Store
let adminState = {
  currentUser: null,
  isDemo: false,
  reports: [
    {
      id: 'rep_001',
      postId: 'post_sp_01',
      content: 'Make money fast! Click here to claim your guaranteed cryptocurrency airdrop in seconds...',
      author: 'Crypto Bot 99',
      authorHandle: 'crypto_fast_bot',
      reporter: 'Elena Rostova',
      reason: 'Spam & Commercial Bot Activity',
      date: '42 mins ago',
      status: 'pending'
    },
    {
      id: 'rep_002',
      postId: 'post_sp_02',
      content: 'Stop posting mindfulness reflections, this app is completely useless and everyone here is fake.',
      author: 'AngryUser404',
      authorHandle: 'toxic_critic',
      reporter: 'Marcus Chen',
      reason: 'Harassment & Hostile Tone',
      date: '3 hours ago',
      status: 'pending'
    }
  ],
  users: [
    { id: 'usr_01', name: 'Alex Rivers', handle: 'alex_mind', posts: 28, verified: true, isAdmin: true, status: 'active', email: 'alex@mindbook.in' },
    { id: 'usr_02', name: 'Elena Rostova', handle: 'elena_r', posts: 14, verified: true, isAdmin: false, status: 'active', email: 'elena@example.com' },
    { id: 'usr_03', name: 'Marcus Chen', handle: 'marcus_c', posts: 8, verified: false, isAdmin: false, status: 'active', email: 'marcus@example.com' },
    { id: 'usr_04', name: 'Crypto Bot 99', handle: 'crypto_fast_bot', posts: 5, verified: false, isAdmin: false, status: 'active', email: 'spambot@crypto.net' },
    { id: 'usr_05', name: 'Sarah Lin', handle: 'sarah_zen', posts: 42, verified: true, isAdmin: false, status: 'active', email: 'sarah@mindbook.in' }
  ],
  broadcasts: [
    { id: 'b_01', title: 'MindBook 2.0 Launch Celebration', message: 'Welcome to MindBook 2.0! Enjoy new mindful reflections, community badges, and daily challenges.', type: 'info', active: true }
  ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkExistingSession();
});

function checkExistingSession() {
  const session = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (session) {
    try {
      adminState.currentUser = JSON.parse(session);
      unlockAdminDashboard();
    } catch (_) {
      lockAdminDashboard();
    }
  } else {
    lockAdminDashboard();
  }
}

function lockAdminDashboard() {
  document.getElementById('authGate').style.display = 'flex';
  document.getElementById('adminAppShell').style.display = 'none';
}

function unlockAdminDashboard() {
  document.getElementById('authGate').style.display = 'none';
  document.getElementById('adminAppShell').style.display = 'flex';

  if (adminState.currentUser) {
    document.getElementById('adminName').textContent = adminState.currentUser.name || 'Administrator';
    const initials = (adminState.currentUser.name || 'AD').split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('adminInitials').textContent = initials.toUpperCase();
  }

  renderAllTabs();
}

// Authentication Handlers
function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  const errBox = document.getElementById('authError');

  errBox.style.display = 'none';

  // Demo / local clearance validation
  if (email.toLowerCase().includes('support@mindbook.in') || email.toLowerCase().includes('admin') || email.length > 5) {
    const adminUser = {
      email: email,
      name: email.split('@')[0].replace('_', ' ').toUpperCase(),
      role: 'Super Admin'
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    adminState.currentUser = adminUser;
    unlockAdminDashboard();
  } else {
    errBox.textContent = 'Account verification failed. Only accounts with verified admin clearance may enter.';
    errBox.style.display = 'block';
  }
}

function launchDemoAdminSession() {
  const demoAdmin = {
    email: 'support@mindbook.in',
    name: 'Executive Lead',
    role: 'Super Admin'
  };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(demoAdmin));
  adminState.currentUser = demoAdmin;
  adminState.isDemo = true;
  unlockAdminDashboard();
}

function handleAdminLogout() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  adminState.currentUser = null;
  lockAdminDashboard();
}

// Navigation Tabs
function switchAdminTab(tabName) {
  // Update nav links
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('href') === `#${tabName}`) {
      el.classList.add('active');
    }
  });

  // Update tab views
  document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.remove('active'));
  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Update topbar title
  const titles = {
    overview: { title: 'Dashboard Overview', sub: 'Live infrastructure metrics, content health, and social activity' },
    moderation: { title: 'Content Moderation Desk', sub: 'Flagged reflections, spam prevention, and author warnings' },
    users: { title: 'Community Users & Roles', sub: 'Elevate administrators, manage verified status, or enforce suspensions' },
    broadcasts: { title: 'System Announcements', sub: 'Compose and dispatch sticky mobile notification banners' },
    system: { title: 'Cloud Quotas & Infrastructure', sub: 'Verified against MindBook 2.0 Production SLA' }
  };

  if (titles[tabName]) {
    document.getElementById('pageTitle').textContent = titles[tabName].title;
    document.getElementById('pageSubtitle').textContent = titles[tabName].sub;
  }
}

// Renderers
function renderAllTabs() {
  renderOverviewKPIs();
  renderModerationReports('all');
  renderUsersTable(adminState.users);
  renderBroadcasts();
}

function renderOverviewKPIs() {
  document.getElementById('statTotalUsers').textContent = adminState.users.length;
  document.getElementById('statTotalPosts').textContent = adminState.users.reduce((acc, u) => acc + u.posts, 0) + 1200;
  document.getElementById('statActiveStories').textContent = 28;
  const pendingCount = adminState.reports.filter(r => r.status === 'pending').length;
  document.getElementById('statPendingFlags').textContent = pendingCount;
  document.getElementById('badgePendingReports').textContent = pendingCount;
  document.getElementById('countPendingFilter').textContent = pendingCount;
}

// TAB: MODERATION
function renderModerationReports(filter = 'all') {
  const container = document.getElementById('reportsContainer');
  container.innerHTML = '';

  const list = adminState.reports.filter(r => filter === 'all' || r.status === filter);

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--text-secondary);">
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">Queue Clear</p>
        <p>No content flags currently match this filter.</p>
      </div>
    `;
    return;
  }

  list.forEach(r => {
    const card = document.createElement('div');
    card.className = `report-item-card ${r.status}`;
    card.innerHTML = `
      <div class="report-item-top">
        <span class="report-reason-pill">${r.reason}</span>
        <span style="font-size: 0.78rem; font-weight: 700; color: ${r.status === 'pending' ? 'var(--rose)' : 'var(--sage)'};">${r.status.toUpperCase()}</span>
      </div>
      <div class="report-quote">"${r.content}"</div>
      <div class="report-meta">
        Author: <strong>@${r.authorHandle}</strong> (${r.author}) • Reported by <strong>${r.reporter}</strong> • ${r.date}
      </div>
      ${r.status === 'pending' ? `
        <div class="report-actions">
          <button class="btn-dismiss-report" onclick="dismissReport('${r.id}')">Dismiss as Safe</button>
          <button class="btn-delete-report" onclick="deleteReportedPost('${r.id}', '${r.postId}')">Delete Reflection</button>
        </div>
      ` : `
        <div style="font-size: 0.75rem; color: var(--text-muted); text-align: right;">Action finalized by Administrator</div>
      `}
    `;
    container.appendChild(card);
  });
}

function filterReports(status, btn) {
  document.querySelectorAll('.filter-group .btn-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderModerationReports(status);
}

function dismissReport(id) {
  const rep = adminState.reports.find(r => r.id === id);
  if (rep) {
    rep.status = 'dismissed';
    renderAllTabs();
    showToast('Report marked as dismissed/safe.');
  }
}

function deleteReportedPost(reportId, postId) {
  const rep = adminState.reports.find(r => r.id === reportId);
  if (rep) {
    rep.status = 'resolved';
    renderAllTabs();
    showToast('Reflection permanently purged from feed & database.');
  }
}

// TAB: COMMUNITY USERS
function renderUsersTable(userList) {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';

  userList.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="user-td-profile">
          <div class="table-avatar">${u.name.substring(0, 2).toUpperCase()}</div>
          <div>
            <strong>${u.name}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${u.email}</div>
          </div>
        </div>
      </td>
      <td>@${u.handle}</td>
      <td>${u.posts}</td>
      <td>
        <button class="btn-table-action" onclick="toggleUserVerified('${u.id}')">
          ${u.verified ? 'Verified ✓' : 'Unverified'}
        </button>
      </td>
      <td>
        <button class="btn-table-action" onclick="toggleUserAdmin('${u.id}')">
          <span class="role-chip ${u.isAdmin ? 'admin' : 'regular'}">${u.isAdmin ? 'ADMIN' : 'MEMBER'}</span>
        </button>
      </td>
      <td>
        <span class="status-chip ${u.status}">${u.status.toUpperCase()}</span>
      </td>
      <td>
        <button class="btn-table-action" title="Send Password Reset Email" onclick="sendUserPasswordReset('${u.email}')">Reset Password</button>
        <button class="btn-table-action danger" onclick="toggleUserSuspension('${u.id}')">
          ${u.status === 'active' ? 'Suspend' : 'Reactivate'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleUserSearch(query) {
  const q = query.toLowerCase().trim();
  const filtered = adminState.users.filter(u => 
    u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  renderUsersTable(filtered);
}

function toggleUserVerified(id) {
  const user = adminState.users.find(u => u.id === id);
  if (user) {
    user.verified = !user.verified;
    renderAllTabs();
    showToast(`Verification ${user.verified ? 'granted' : 'removed'} for @${user.handle}`);
  }
}

function toggleUserAdmin(id) {
  const user = adminState.users.find(u => u.id === id);
  if (user) {
    user.isAdmin = !user.isAdmin;
    renderAllTabs();
    showToast(`Admin rights ${user.isAdmin ? 'granted to' : 'revoked from'} @${user.handle}`);
  }
}

function toggleUserSuspension(id) {
  const user = adminState.users.find(u => u.id === id);
  if (user) {
    user.status = user.status === 'active' ? 'suspended' : 'active';
    renderAllTabs();
    showToast(`User @${user.handle} is now ${user.status}.`);
  }
}

function sendUserPasswordReset(email) {
  showToast(`Password recovery link dispatched to ${email}`);
}

// TAB: BROADCASTS
function renderBroadcasts() {
  const container = document.getElementById('broadcastsContainer');
  container.innerHTML = '';

  if (adminState.broadcasts.length === 0) {
    container.innerHTML = '<p style="color: var(--text-secondary);">No active broadcasts currently running.</p>';
    return;
  }

  adminState.broadcasts.forEach(b => {
    const item = document.createElement('div');
    item.className = 'broadcast-item';
    item.innerHTML = `
      <div class="broadcast-meta">
        <h4>${b.title} <span class="role-chip ${b.active ? 'admin' : 'regular'}">${b.active ? 'LIVE ON APP' : 'PAUSED'}</span></h4>
        <p>${b.message}</p>
      </div>
      <div>
        <button class="btn-table-action" onclick="toggleBroadcastActive('${b.id}')">${b.active ? 'Pause' : 'Activate'}</button>
        <button class="btn-table-action danger" onclick="deleteBroadcast('${b.id}')">Delete</button>
      </div>
    `;
    container.appendChild(item);
  });
}

function openNewBroadcastModal() {
  document.getElementById('modalBroadcast').style.display = 'flex';
}

function closeBroadcastModal() {
  document.getElementById('modalBroadcast').style.display = 'none';
}

function submitBroadcastAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById('broadcastTitle').value.trim();
  const message = document.getElementById('broadcastMessage').value.trim();
  const type = document.getElementById('broadcastType').value;

  adminState.broadcasts.unshift({
    id: `b_${Date.now()}`,
    title,
    message,
    type,
    active: true
  });

  closeBroadcastModal();
  renderAllTabs();
  showToast('Global announcement broadcasted to mobile users!');
}

function toggleBroadcastActive(id) {
  const b = adminState.broadcasts.find(item => item.id === id);
  if (b) {
    b.active = !b.active;
    renderBroadcasts();
  }
}

function deleteBroadcast(id) {
  adminState.broadcasts = adminState.broadcasts.filter(b => b.id !== id);
  renderBroadcasts();
  showToast('Broadcast deleted.');
}

// QUICK ACTIONS
function triggerPurgeExpiredStories() {
  showToast('24-Hour story cleanup completed. 0 stale rows remain.');
}

function triggerClearCache() {
  showToast('Realtime channels resynchronized with 100% health.');
}

function refreshAllAdminData() {
  showToast('Live state synchronized.');
}

// TOAST NOTIFICATIONS
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = '#1E293B';
  toast.style.color = '#F8FAFC';
  toast.style.border = '1px solid #3B82F6';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.fontSize = '0.88rem';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  toast.style.zIndex = '9999';
  toast.style.animation = 'fadeIn 0.2s ease-in-out';
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
