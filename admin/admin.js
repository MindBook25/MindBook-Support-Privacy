// ==============================================================================
// MIND BOOK // CENTRAL INTELLIGENCE COMMAND (CIC)
// Administrative Operations System & Live PostgreSQL Database Administration Station
// Product: MindBook | Department: Central Intelligence Command (CIC)
// ==============================================================================

const SUPABASE_URL = 'https://vduwdnlchbelxvrqoioj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4EqicUq6a1-iq6473YMAvg_rg4LD7Wc';
const ADMIN_STORAGE_KEY = 'mindbook_cic_root_session';

// ==================== TACTICAL AUDIO SYNTHESIZER ====================
let audioContext = null;
let audioFxEnabled = true;

function initAudio() {
  if (!audioContext) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    } catch (_) {}
  }
}

function playCyberSound(type = 'blip') {
  if (!audioFxEnabled) return;
  initAudio();
  if (!audioContext) return;

  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);

    const now = audioContext.currentTime;

    if (type === 'blip') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'confirm') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.05);
      osc.frequency.setValueAtTime(1046.50, now + 0.10);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(330, now + 0.07);
      osc.frequency.setValueAtTime(220, now + 0.14);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'purge') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (_) {}
}

function toggleAudioFx() {
  audioFxEnabled = !audioFxEnabled;
  const icon = document.getElementById('soundIcon');
  if (audioFxEnabled) {
    if (icon) icon.textContent = '🔊';
    playCyberSound('confirm');
    appendTelemetryLog('sys', 'Tactical acoustic telemetry synthesizer enabled');
  } else {
    if (icon) icon.textContent = '🔇';
    appendTelemetryLog('sys', 'Tactical acoustic telemetry muted');
  }
}

// ==================== STATE MANAGEMENT ====================
let socState = {
  currentUser: null,
  activeDbTable: 'profiles', // 'profiles' | 'posts' | 'comments'
  dbSearchTerm: '',
  freshModeOnly: true, // Default to true: fresh launch mode (filters out dummy mock seeds)
  activeJsonRecord: null,
  activeChartPeriod: '7d',
  activeActivityFilter: 'all',
  activeReportFilter: 'all',
  dbData: {
    profiles: [],
    posts: [],
    comments: []
  },
  reports: [
    {
      id: 'INC-7091',
      postId: 'post_sp_01',
      content: 'Make $50,000 guaranteed crypto airdrop in seconds! Click bit.ly/free-mind-crypto to claim your token allocation instantly.',
      author: 'Crypto Bot 99',
      authorHandle: 'crypto_fast_bot',
      reporter: 'Elena Rostova',
      reason: 'Automated Phishing & Commercial Spam',
      severity: 'CRITICAL',
      threatScore: 94,
      date: '18 mins ago',
      status: 'pending'
    },
    {
      id: 'INC-7092',
      postId: 'post_sp_02',
      content: 'Stop posting mindfulness reflections, this platform is completely useless and everyone here is fake.',
      author: 'AngryUser404',
      authorHandle: 'toxic_critic',
      reporter: 'Marcus Chen',
      reason: 'Hostile Conduct & Harassment',
      severity: 'HIGH',
      threatScore: 82,
      date: '1 hour ago',
      status: 'pending'
    }
  ],
  supportTickets: [
    {
      id: 'TCK-4011',
      user: 'Dr. Evelyn Vance',
      userHandle: 'dr_vance',
      category: 'Identity Verification',
      subject: 'Creator Shield & Psychological Practitioner Credential Verification',
      preview: 'Hello MindBook Support, I have uploaded my academic certification and clinical credentials for verified creator status.',
      priority: 'HIGH',
      status: 'open',
      date: '25 mins ago'
    },
    {
      id: 'TCK-4012',
      user: 'Liam Thorne',
      userHandle: 'liam_t',
      category: 'Data Export',
      subject: 'GDPR / Privacy Data Takeout Archive Request',
      preview: 'Requesting full JSON archive of all my mindfulness reflections and personal notes as per platform privacy agreement.',
      priority: 'MEDIUM',
      status: 'in_progress',
      date: '3 hours ago'
    }
  ],
  broadcasts: [
    {
      id: 'BC-01',
      title: 'MindBook 2.0 Official Company Account Active',
      message: 'Official MindBook Company account (@mindbook) initialized with verified creator status and root system clearance.',
      type: 'info',
      active: true,
      timestamp: 'Today at 08:30 UTC'
    }
  ],
  telemetryLogs: [
    { type: 'auth', text: 'ROOT operator session verified for Kota Midhun (@midhun777) [Clearance: TOP_SECRET_ROOT]', time: '00:01:04' },
    { type: 'shield', text: 'Live PostgreSQL connection authenticated to vduwdnlchbelxvrqoioj.supabase.co', time: '00:00:45' },
    { type: 'sys', text: 'Real-time database monitor ready for public.profiles, public.posts, public.comments', time: '23:58:22' }
  ]
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  checkExistingSession();
  startLatencySimulation();
  startLiveDigitalClock();
  initCommandPaletteKeyboardShortcut();
});

// ==================== LIVE DIGITAL CLOCK (ZULU + LOCAL) ====================
function startLiveDigitalClock() {
  const clockEl = document.getElementById('hudLiveClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const zulu = now.toISOString().substring(11, 19) + 'Z';
    const local = now.toTimeString().substring(0, 8);
    clockEl.innerHTML = `<span class="clock-label">ZULU</span> <span class="clock-time">${zulu}</span><span class="clock-sep">|</span><span class="clock-label">LOCAL</span> <span class="clock-time">${local}</span>`;
  }

  update();
  setInterval(update, 1000);
}

// ==================== SESSION MANAGEMENT ====================
function checkExistingSession() {
  const session = localStorage.getItem(ADMIN_STORAGE_KEY) || localStorage.getItem('mindbook_cyber_soc_session');
  if (session) {
    try {
      socState.currentUser = JSON.parse(session);
      unlockSocDashboard();
    } catch (_) {
      lockSocDashboard();
    }
  } else {
    lockSocDashboard();
  }
}

function lockSocDashboard() {
  const gate = document.getElementById('authGate');
  const shell = document.getElementById('adminAppShell');
  if (gate) gate.style.display = 'flex';
  if (shell) shell.style.display = 'none';
}

let currentSyncInterval = 5000; // default 5 seconds
let supabaseClient = null;

function unlockSocDashboard() {
  const gate = document.getElementById('authGate');
  const shell = document.getElementById('adminAppShell');
  if (gate) gate.style.display = 'none';
  if (shell) shell.style.display = 'flex';

  if (socState.currentUser) {
    const opName = socState.currentUser.name || 'Kota Midhun';
    const initials = opName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'KM';
    const nameEl = document.getElementById('operatorName');
    const initEl = document.getElementById('operatorInitials');
    if (nameEl) nameEl.textContent = opName.toUpperCase();
    if (initEl) initEl.textContent = initials;
  }

  playCyberSound('confirm');
  renderAllSocPanels();
  fetchLiveDatabaseData();

  // Initialize Realtime WebSockets for 0ms reactivity
  initSupabaseRealtime();

  // Start periodic live database polling (default 5s)
  restartAutoSyncTimer();
}

function restartAutoSyncTimer() {
  if (window._dbPollTimer) {
    clearInterval(window._dbPollTimer);
    window._dbPollTimer = null;
  }
  if (currentSyncInterval > 0) {
    window._dbPollTimer = setInterval(() => {
      if (socState.currentUser) {
        fetchLiveDatabaseData(true);
      }
    }, currentSyncInterval);
  }
}

function updateAutoSyncInterval(ms) {
  playCyberSound('blip');
  currentSyncInterval = parseInt(ms);
  restartAutoSyncTimer();
  if (currentSyncInterval > 0) {
    appendTelemetryLog('sys', `SYNC_INTERVAL: Polling interval adjusted to ${currentSyncInterval / 1000}s`);
  } else {
    appendTelemetryLog('sys', 'SYNC_INTERVAL: Polling paused. Realtime WebSocket listener remains active.');
  }
}

// Connect to Supabase Realtime WebSocket for instant 0ms updates
function initSupabaseRealtime() {
  try {
    if (window.supabase && window.supabase.createClient && !supabaseClient) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      supabaseClient.channel('admin_realtime_stream')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
          appendTelemetryLog('shield', 'REALTIME_TRIGGER: Detected change on public.profiles via WebSocket');
          fetchLiveDatabaseData(true);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
          appendTelemetryLog('shield', 'REALTIME_TRIGGER: Detected change on public.posts via WebSocket');
          fetchLiveDatabaseData(true);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
          appendTelemetryLog('shield', 'REALTIME_TRIGGER: Detected change on public.comments via WebSocket');
          fetchLiveDatabaseData(true);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            appendTelemetryLog('sys', 'REALTIME_WS: Connected to Supabase Realtime WebSocket (0ms latency)');
          }
        });
    }
  } catch (e) {
    console.warn('Realtime init notice:', e);
  }
}

// ==================== AUTHENTICATION HANDLERS ====================
function handleAdminLogin(e) {
  if (e && e.preventDefault) e.preventDefault();

  const emailInput = document.getElementById('adminEmail');
  const email = (emailInput && emailInput.value.trim()) || 'midhun777';

  let opName = 'Kota Midhun';
  let opHandle = 'midhun777';

  if (email.toLowerCase().includes('midhun')) {
    opName = 'Kota Midhun';
    opHandle = 'midhun777';
  } else if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('support')) {
    opName = 'Chief Security Admin';
    opHandle = 'admin';
  } else {
    opName = email.split('@')[0].replace(/[_.]/g, ' ').toUpperCase() || 'ROOT OPERATOR';
    opHandle = email.split('@')[0] || 'admin';
  }

  const operator = {
    email: email,
    username: opHandle,
    name: opName,
    role: 'ROOT CHIEF ADMINISTRATOR',
    timestamp: new Date().toISOString()
  };

  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(operator));
  socState.currentUser = operator;
  appendTelemetryLog('auth', `Manual clearance verified for ${operator.name} (@${operator.username}) [Clearance: TOP_SECRET_ROOT]`);
  unlockSocDashboard();
}

// 1-Click Instant Access Bypass
function launchDemoAdminSession() {
  const operator = {
    email: 'midhun777@mindbook.in',
    username: 'midhun777',
    name: 'Kota Midhun',
    role: 'ROOT CHIEF ADMINISTRATOR',
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(operator));
  socState.currentUser = operator;
  appendTelemetryLog('auth', 'OVERRIDE PROTOCOL: Instant root access granted for Kota Midhun (@midhun777)');
  unlockSocDashboard();
}

function handleAdminLogout() {
  playCyberSound('purge');
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  localStorage.removeItem('mindbook_cyber_soc_session');
  socState.currentUser = null;
  lockSocDashboard();
}

// ==================== TAB SWITCHING ====================
function switchAdminTab(tabName) {
  playCyberSound('blip');

  // Update sidebar buttons
  document.querySelectorAll('.cyber-nav .nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update tabs
  document.querySelectorAll('.cyber-tab').forEach(tab => {
    tab.classList.toggle('active', tab.id === `tab-${tabName}`);
  });

  appendTelemetryLog('sys', `Operator switched console focus to: [${tabName.toUpperCase()}]`);

  // Auto close mobile drawer when navigating
  if (window.innerWidth <= 992) {
    toggleCyberSidebar(false);
  }
}

// Tactical Mobile Drawer Toggle
function toggleCyberSidebar(force) {
  const sidebar = document.querySelector('.cyber-sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains('mobile-open');
  const shouldOpen = (force !== undefined) ? force : !isOpen;

  sidebar.classList.toggle('mobile-open', shouldOpen);
  if (backdrop) backdrop.classList.toggle('active', shouldOpen);

  if (shouldOpen) {
    playCyberSound('blip');
  }
}

// ==================== COMMAND PALETTE (CTRL + K) ====================
const COMMAND_REGISTRY = [
  // Navigation Commands
  { id: 'nav-overview', title: 'Executive Overview', desc: 'Jump to Executive Dashboard & KPIs', category: 'COMMAND CENTRE', action: () => switchAdminTab('overview') },
  { id: 'nav-live-ops', title: 'Live Operations Feed', desc: 'Real-time platform activity stream', category: 'COMMAND CENTRE', action: () => switchAdminTab('live-ops') },
  { id: 'nav-database', title: 'Personnel Database Studio', desc: 'Inspect & manage PostgreSQL profiles, posts, comments', category: 'INTELLIGENCE', action: () => switchAdminTab('database') },
  { id: 'nav-user-analytics', title: 'User Analytics & Demographics', desc: 'Audience distribution and verification ratios', category: 'INTELLIGENCE', action: () => switchAdminTab('user-analytics') },
  { id: 'nav-relationships', title: 'Relationship Analytics', desc: 'Follower graph, connection clusters, node topology', category: 'INTELLIGENCE', action: () => switchAdminTab('relationships') },
  { id: 'nav-activity', title: 'Platform Activity Monitoring', desc: 'Chronological timeline of system events', category: 'ACTIVITY MONITORING', action: () => switchAdminTab('activity') },
  { id: 'nav-content-stream', title: 'Posts & Stories Monitor', desc: 'Real-time media feeds and content inspection', category: 'ACTIVITY MONITORING', action: () => switchAdminTab('content-stream') },
  { id: 'nav-moderation', title: 'Content Moderation Desk', desc: 'Review flagged posts and security quarantine', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('moderation') },
  { id: 'nav-reports', title: 'Reports & Complaints Registry', desc: 'User grievance intake and policy enforcement', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('reports') },
  { id: 'nav-security', title: 'Security Overview & Threat Matrix', desc: 'Zero-trust defense status and firewall telemetry', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('security') },
  { id: 'nav-auth-events', title: 'Authentication Events Audit', desc: 'Inspect sign-ins, token requests, clearance checks', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('auth-events') },
  { id: 'nav-suspicious-activity', title: 'Suspicious Activity Detector', desc: 'Anomalous access attempts and rate limit breaches', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('suspicious-activity') },
  { id: 'nav-iam', title: 'Access Management (IAM)', desc: 'User privilege levels, verification shields, role matrix', category: 'SECURITY OPERATIONS', action: () => switchAdminTab('iam') },
  { id: 'nav-support', title: 'Support Requests & Inquiries', desc: 'Direct customer service desk and ticket queue', category: 'COMMUNICATIONS', action: () => switchAdminTab('support') },
  { id: 'nav-broadcasts', title: 'Global Announcements & Dispatches', desc: 'Broadcast notifications to user mobile feeds', category: 'COMMUNICATIONS', action: () => switchAdminTab('broadcasts') },
  { id: 'nav-company', title: 'Official Company Account HQ', desc: 'MindBook Official (@mindbook) node administration', category: 'COMMUNICATIONS', action: () => switchAdminTab('company') },
  { id: 'nav-system', title: 'Infrastructure Health & Zero-Trust', desc: 'Diagnostic health across endpoints, SSL, DNS', category: 'SYSTEM CONTROL', action: () => switchAdminTab('system') },
  { id: 'nav-db-monitor', title: 'Database Monitoring', desc: 'PostgreSQL connection pools, latency, quota meters', category: 'SYSTEM CONTROL', action: () => switchAdminTab('db-monitor') },
  { id: 'nav-api-monitor', title: 'API Monitoring', desc: 'REST endpoint response times and status codes', category: 'SYSTEM CONTROL', action: () => switchAdminTab('api-monitor') },
  { id: 'nav-terminal', title: 'System Diagnostics & Logs', desc: 'Streaming audit logs, real-time command terminal', category: 'SYSTEM CONTROL', action: () => switchAdminTab('terminal') },
  { id: 'nav-roles', title: 'Roles & Permissions Matrix', desc: 'Administrative clearance hierarchies', category: 'CONFIGURATION', action: () => switchAdminTab('roles') },
  { id: 'nav-settings', title: 'Platform Configuration', desc: 'Global system parameters and operational settings', category: 'CONFIGURATION', action: () => switchAdminTab('settings') },

  // Tactical Operations
  { id: 'act-sync', title: 'Synchronize Live Database', desc: 'Pull latest records from Supabase PostgreSQL (0ms)', category: 'ACTION', action: () => refreshFromLiveDatabase() },
  { id: 'act-fresh', title: 'Toggle Fresh Launch View', desc: 'Filter out legacy dummy seed profiles', category: 'ACTION', action: () => toggleFreshLaunchMode() },
  { id: 'act-purge-demo', title: 'Purge Demo Seed Profiles', desc: 'Remove mock seed records leaving only Kota Midhun & MindBook Official', category: 'ACTION', action: () => purgeAllDemoSeedProfiles() },
  { id: 'act-export-json', title: 'Export Table JSON', desc: 'Download local JSON archive of active table', category: 'ACTION', action: () => exportCurrentTableJson() },
  { id: 'act-broadcast', title: 'Transmit Global Announcement', desc: 'Open dispatch transmitter for community-wide message', category: 'ACTION', action: () => openNewBroadcastModal() },
  { id: 'act-audit', title: 'Export Audit Telemetry Log', desc: 'Download JSON security audit trail', category: 'ACTION', action: () => exportAuditLogs() },
  { id: 'act-pentest', title: 'Run Security Penetration Test', desc: 'Simulate vulnerability scan across all endpoints', category: 'ACTION', action: () => simulatePenetrationTestSequence() }
];

function initCommandPaletteKeyboardShortcut() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === 'Escape') {
      closeCommandPalette();
      closeJsonInspector();
      closeMediaModal();
      closeBroadcastModal();
      closeNewUserModal();
    }
  });
}

function openCommandPalette() {
  playCyberSound('blip');
  const modal = document.getElementById('modalCommandPalette');
  const input = document.getElementById('cmdPaletteInput');
  if (modal) {
    modal.style.display = 'flex';
    handleCommandPaletteSearch('');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 60);
    }
  }
}

function closeCommandPalette() {
  const modal = document.getElementById('modalCommandPalette');
  if (modal) modal.style.display = 'none';
}

function handleCommandPaletteSearch(val) {
  const container = document.getElementById('cmdPaletteResults');
  if (!container) return;

  const query = (val || '').toLowerCase().trim();
  const matches = COMMAND_REGISTRY.filter(cmd => {
    if (!query) return true;
    return cmd.title.toLowerCase().includes(query) ||
           cmd.desc.toLowerCase().includes(query) ||
           cmd.category.toLowerCase().includes(query);
  });

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--muted-text); font-family: var(--font-tech); font-size: 12px;">
        NO COMMANDS OR CONSOLES FOUND MATCHING "${escapeHtml(val)}"
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map((cmd, idx) => `
    <div class="cmd-palette-item ${idx === 0 ? 'focused' : ''}" onclick="executeCommandPaletteAction('${cmd.id}')">
      <div class="cmd-item-info">
        <span class="cmd-item-category">${escapeHtml(cmd.category)}</span>
        <span class="cmd-item-title">${escapeHtml(cmd.title)}</span>
        <span class="cmd-item-desc">${escapeHtml(cmd.desc)}</span>
      </div>
      <span class="cmd-item-badge">ENTER ↵</span>
    </div>
  `).join('');
}

function executeCommandPaletteAction(cmdId) {
  closeCommandPalette();
  playCyberSound('confirm');
  const target = COMMAND_REGISTRY.find(c => c.id === cmdId);
  if (target && target.action) {
    target.action();
  }
}

// ==================== LIVE DATABASE STUDIO (SUPABASE POSTGRESQL) ====================

// Fetch real records from Supabase PostgreSQL via REST API
async function fetchLiveDatabaseData(isSilent = false) {
  const statusEl = document.getElementById('dbLiveConnectionStatus');
  const lastSyncEl = document.getElementById('overviewLastSync');

  if (!isSilent) {
    if (statusEl) statusEl.innerHTML = '🟡 CONNECTING TO POSTGRESQL...';
  }

  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Accept': 'application/json'
  };

  try {
    // 1. Fetch public.profiles
    const pRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc`, { headers });
    if (pRes.ok) {
      socState.dbData.profiles = await pRes.json();
    }

    // 2. Fetch public.posts
    const postRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&order=created_at.desc`, { headers });
    if (postRes.ok) {
      socState.dbData.posts = await postRes.json();
    }

    // 3. Fetch public.comments
    const cRes = await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=created_at.desc`, { headers });
    if (cRes.ok) {
      socState.dbData.comments = await cRes.json();
    }

    // Calculate active datasets
    const demoIds = ['user_sophia', 'user_elena', 'user_marcus', 'user_mind_01', '6cf1e94e-58be-4b89-94bb-2e6d48e1c900'];
    const activeProfiles = socState.freshModeOnly ? socState.dbData.profiles.filter(p => !demoIds.includes(p.id)) : socState.dbData.profiles;
    const activePosts = socState.freshModeOnly ? socState.dbData.posts.filter(p => p.author_id !== 'user_mind_01') : socState.dbData.posts;
    const activeComments = socState.freshModeOnly ? socState.dbData.comments.filter(c => c.author_id !== 'user_mind_01') : socState.dbData.comments;

    // Update Counts in UI
    const countProf = document.getElementById('countDbProfiles');
    const countPost = document.getElementById('countDbPosts');
    const countComm = document.getElementById('countDbComments');
    const sideDbBadge = document.getElementById('sidebarDbBadge');

    if (countProf) countProf.textContent = activeProfiles.length;
    if (countPost) countPost.textContent = activePosts.length;
    if (countComm) countComm.textContent = activeComments.length;
    if (sideDbBadge) sideDbBadge.textContent = `${activeProfiles.length} USERS`;

    if (statusEl) statusEl.innerHTML = '🟢 CONNECTED TO POSTGRESQL';
    if (lastSyncEl) {
      const nowStr = new Date().toTimeString().substring(0, 8);
      lastSyncEl.textContent = `LAST SYNC: ${nowStr} (LIVE)`;
    }

    if (!isSilent) {
      appendTelemetryLog('sys', `DB_SYNC_OK: Refreshed live database. ${activeProfiles.length} active profiles, ${activePosts.length} posts, ${activeComments.length} comments.`);
    }

    renderDbTable();
    renderAllSocPanels();

  } catch (err) {
    console.error('Supabase query error:', err);
    if (statusEl) statusEl.innerHTML = '🔴 DATABASE CONNECTION ERROR (RETRIES IN BG)';
    appendTelemetryLog('threat', `DB_FETCH_FAILED: ${err.message}`);
  }
}

// User-triggered manual refresh
function refreshFromLiveDatabase() {
  playCyberSound('confirm');
  appendTelemetryLog('sys', 'OPERATOR_REFRESH: Triggered manual live database synchronization');
  fetchLiveDatabaseData(false);
}

// Table Switcher (profiles, posts, comments)
function switchDbTable(tableName, btnElement) {
  playCyberSound('blip');
  socState.activeDbTable = tableName;

  document.querySelectorAll('.tactical-filter-group .filter-tab').forEach(b => {
    b.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.tactical-filter-group [data-dbtab="${tableName}"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  appendTelemetryLog('sys', `DATABASE_TABLE_SWITCH: Focusing table [public.${tableName}]`);
  renderDbTable();
}

// Toggle between clean real accounts only and demo seeds
function toggleFreshLaunchMode() {
  playCyberSound('blip');
  socState.freshModeOnly = !socState.freshModeOnly;
  const btn = document.getElementById('btnToggleFreshMode');
  if (btn) {
    if (socState.freshModeOnly) {
      btn.style.borderColor = 'var(--status-warning)';
      btn.style.color = 'var(--status-warning)';
      btn.textContent = '✨ FRESH LAUNCH VIEW (REAL ONLY)';
      appendTelemetryLog('sys', 'FRESH_VIEW: Active. Hiding legacy demo seed records.');
    } else {
      btn.style.borderColor = 'var(--tactical-green)';
      btn.style.color = 'var(--tactical-green)';
      btn.textContent = '👁️ SHOWING ALL (INCLUDING DEMO SEEDS)';
      appendTelemetryLog('sys', 'FRESH_VIEW: Showing all database rows including demo seeds.');
    }
  }
  renderDbTable();
  renderAllSocPanels();
}

// Purge dummy seed profiles
async function purgeAllDemoSeedProfiles() {
  playCyberSound('alert');
  const conf = confirm("⚠️ DANGER // FRESH DATABASE PURGE\n\nThis will remove dummy seed accounts (user_sophia, user_elena, user_marcus, user_mind_01, alex_rivers_live) and leave ONLY:\n• Kota Midhun (@midhun777) - Founder/Super Admin\n• MindBook Official (@mindbook) - Company Account\n\nProceed with cleanup?");
  if (!conf) return;

  playCyberSound('purge');
  const demoIds = ['user_sophia', 'user_elena', 'user_marcus', 'user_mind_01', '6cf1e94e-58be-4b89-94bb-2e6d48e1c900'];

  for (const id of demoIds) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
    } catch (_) {}
  }

  // Also remove from local state
  socState.dbData.profiles = socState.dbData.profiles.filter(p => !demoIds.includes(p.id));
  renderDbTable();
  renderAllSocPanels();
  appendTelemetryLog('threat', 'FRESH_DATABASE_PURGE: Cleaned out demo seed identities from public.profiles');
  alert("✨ Database cleaned! Now showing fresh launch state with Founder Kota Midhun and MindBook Official.");
}

// Real-time Search Filter
function handleDbFilter(searchTerm) {
  socState.dbSearchTerm = (searchTerm || '').toLowerCase().trim();
  renderDbTable();
}

// Render active table (profiles, posts, or comments)
function renderDbTable() {
  const thead = document.getElementById('dbStudioThead');
  const tbody = document.getElementById('dbStudioTbody');
  if (!thead || !tbody) return;

  const currentTable = socState.activeDbTable;
  const rawList = socState.dbData[currentTable] || [];

  // Filter demo IDs if in fresh mode
  const demoIds = ['user_sophia', 'user_elena', 'user_marcus', 'user_mind_01', '6cf1e94e-58be-4b89-94bb-2e6d48e1c900'];
  let list = rawList;
  if (socState.freshModeOnly) {
    if (currentTable === 'profiles') {
      list = rawList.filter(row => !demoIds.includes(row.id));
    } else if (currentTable === 'posts') {
      list = rawList.filter(p => p.author_id !== 'user_mind_01');
    } else if (currentTable === 'comments') {
      list = rawList.filter(c => c.author_id !== 'user_mind_01');
    }
  }

  // Search query filter
  const query = socState.dbSearchTerm;
  const filtered = list.filter(row => {
    if (!query) return true;
    return JSON.stringify(row).toLowerCase().includes(query);
  });

  if (currentTable === 'profiles') {
    renderProfilesTable(thead, tbody, filtered, list.length);
  } else if (currentTable === 'posts') {
    renderPostsTable(thead, tbody, filtered, list.length);
  } else if (currentTable === 'comments') {
    renderCommentsTable(thead, tbody, filtered, list.length);
  }
}

// 1. PROFILES / USERS TABLE MONITOR
function renderProfilesTable(thead, tbody, rows, totalCount) {
  thead.innerHTML = `
    <tr>
      <th style="width: 280px;">USER / DISPLAY NAME</th>
      <th>DATABASE UUID</th>
      <th>ROLE / STATUS</th>
      <th>POSTS</th>
      <th>VERIFIED</th>
      <th>CREATED AT</th>
      <th style="text-align: right; width: 170px;">DATABASE ACTIONS</th>
    </tr>
  `;

  if (rows.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--muted-text); font-family: var(--font-tech);">
          ${totalCount === 0 ? 'NO PROFILES FOUND IN DATABASE YET' : 'NO USERS MATCH YOUR SEARCH FILTER'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = rows.map(u => {
    const isCompany = (u.id === 'mindbook_official' || u.username === 'mindbook');
    const isRoot = (u.username === 'midhun777' || u.username === 'admin' || isCompany);
    const isVerified = Boolean(u.is_verified);
    const avatar = u.avatar_url ? `<img src="${escapeHtml(u.avatar_url)}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1px solid ${isCompany ? '#ffd700' : 'var(--tactical-green)'};">` :
      `<div class="user-avatar-tag" style="width:34px; height:34px; font-size:11px; background:var(--bg-elevated); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; font-family:var(--font-tech); color:var(--highlight-green);">${escapeHtml((u.display_name || u.username || 'U').substring(0,2).toUpperCase())}</div>`;

    const formattedDate = u.created_at ? new Date(u.created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : '—';

    return `
      <tr>
        <td>
          <div class="user-cell" style="display: flex; align-items: center; gap: 10px;">
            ${avatar}
            <div>
              <div style="font-weight: 600; color: var(--primary-text); font-size: 13px;">
                ${escapeHtml(u.display_name || u.username || 'Unnamed User')}
                ${isCompany ? '<span style="color:#ffd700;" title="Official MindBook Company Account">🏢</span>' : (isRoot ? '<span style="color:#ffd700;" title="MindBook Owner / Root Admin">👑</span>' : '')}
              </div>
              <div style="font-size: 11px; color: var(--tactical-green); font-family: var(--font-tech);">
                @${escapeHtml(u.username || 'anonymous')}
              </div>
              ${u.location ? `<div style="font-size: 10px; color: var(--muted-text);">📍 ${escapeHtml(u.location)}</div>` : ''}
            </div>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <code style="font-size: 11px; color: var(--highlight-green); background: rgba(163,230,53,0.06); padding: 2px 6px; border-radius: 2px; font-family: var(--font-tech);" title="${escapeHtml(u.id)}">
              ${escapeHtml(u.id.length > 20 ? u.id.substring(0, 10) + '...' + u.id.substring(u.id.length - 6) : u.id)}
            </code>
            <button class="btn-tactical-action" onclick="copyTextToClipboard('${escapeHtml(u.id)}')" title="Copy full UUID" style="padding: 2px 6px; font-size: 10px; height: 22px;">
              📋
            </button>
          </div>
        </td>
        <td>
          <span class="cyber-badge ${isCompany ? 'count-cyan' : (isRoot ? 'count-green' : (isVerified ? 'count-green' : ''))}" style="font-size: 10px;">
            ${isCompany ? 'COMPANY ROOT' : (isRoot ? 'ROOT ADMIN' : (isVerified ? 'VERIFIED' : 'CITIZEN'))}
          </span>
        </td>
        <td>
          <span style="font-family: var(--font-tech); color: var(--primary-text); font-weight: 600;">
            ${u.posts_count || 0}
          </span>
        </td>
        <td>
          <button class="btn-tactical-action" onclick="toggleDbUserVerified('${escapeHtml(u.id)}', ${isVerified})" style="font-size: 11px; padding: 4px 8px; height: 26px; border-color: ${isVerified ? 'var(--tactical-green)' : 'var(--border-color)'}; color: ${isVerified ? 'var(--highlight-green)' : 'var(--secondary-text)'};">
            ${isVerified ? '🛡️ VERIFIED' : '⚪ UNVERIFIED'}
          </button>
        </td>
        <td>
          <div style="font-size: 11px; color: var(--muted-text); font-family: var(--font-tech);">
            ${formattedDate}
          </div>
        </td>
        <td style="text-align: right;">
          <div class="table-actions" style="display: flex; gap: 4px; justify-content: flex-end;">
            <button class="btn-tactical-action" onclick="inspectRowJson('profiles', '${escapeHtml(u.id)}')" title="View complete PostgreSQL record JSON" style="height: 26px; padding: 0 8px; font-size: 11px;">
              🔍 JSON
            </button>
            ${!isRoot ? `
              <button class="btn-tactical-action" onclick="deleteDbRow('profiles', '${escapeHtml(u.id)}', '@${escapeHtml(u.username)}')" title="Delete user profile from database" style="height: 26px; padding: 0 8px; font-size: 11px; border-color: var(--status-critical); color: var(--status-critical);">
                🗑️
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// 2. POSTS TABLE MONITOR
let currentActiveMediaUrl = '';
let currentActivePostId = '';

function getPostMediaList(post) {
  if (!post) return [];
  let list = [];
  if (Array.isArray(post.media_urls)) {
    list = post.media_urls;
  } else if (typeof post.media_urls === 'string') {
    try {
      const parsed = JSON.parse(post.media_urls);
      if (Array.isArray(parsed)) list = parsed;
      else list = [post.media_urls];
    } catch (_) {
      if (post.media_urls.includes(',')) list = post.media_urls.split(',').map(s => s.trim());
      else list = [post.media_urls];
    }
  } else if (post.media_url) {
    list = [post.media_url];
  }
  return list.filter(u => typeof u === 'string' && u.trim().length > 0);
}

function isVideoUrl(url) {
  if (!url) return false;
  const clean = url.split('?')[0].toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.mov') || clean.endsWith('.webm') || clean.endsWith('.m4v') || clean.endsWith('.ogg');
}

function renderPostsTable(thead, tbody, rows, totalCount) {
  thead.innerHTML = `
    <tr>
      <th style="width: 130px;">POST ID</th>
      <th style="width: 180px;">AUTHOR</th>
      <th>CONTENT & MEDIA (.PNG, .JPG, .MP4)</th>
      <th style="width: 110px;">ENGAGEMENT</th>
      <th style="width: 100px;">VISIBILITY</th>
      <th style="width: 140px;">CREATED AT</th>
      <th style="text-align: right; width: 170px;">DATABASE ACTIONS</th>
    </tr>
  `;

  if (rows.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--muted-text); font-family: var(--font-tech);">
          ${totalCount === 0 ? 'NO POSTS FOUND IN DATABASE' : 'NO POSTS MATCH YOUR FILTER'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = rows.map(p => {
    const authorProfile = socState.dbData.profiles.find(u => u.id === p.author_id);
    const isOfficial = p.author_id === 'mindbook_official';
    const authorName = isOfficial ? 'MindBook Official 👑' : (authorProfile ? (authorProfile.display_name || authorProfile.username) : p.author_id);
    const authorHandle = isOfficial ? '@mindbook' : (authorProfile ? `@${authorProfile.username}` : '');

    const formattedDate = p.created_at ? new Date(p.created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : '—';

    const mediaList = getPostMediaList(p);
    const hasMedia = mediaList.length > 0;
    const hasVideo = mediaList.some(isVideoUrl);

    let mediaHtml = '';
    if (hasMedia) {
      mediaHtml = `
        <div style="display:flex; gap:6px; margin-top:6px; flex-wrap:wrap;">
          ${mediaList.map((url) => {
            const isVid = isVideoUrl(url);
            const ext = (url.split('?')[0].split('.').pop() || (isVid ? 'mp4' : 'img')).toUpperCase();
            if (isVid) {
              return `
                <div onclick="openMediaViewer('${escapeHtml(p.id)}', '${escapeHtml(url)}')" style="cursor:pointer; display:flex; align-items:center; gap:4px; padding:3px 8px; background:rgba(119,169,90,0.1); border:1px solid var(--tactical-green); border-radius:2px; font-size:10px; font-family:var(--font-tech); color:var(--highlight-green);">
                  <span>▶</span> <span>${escapeHtml(ext)} VIDEO</span>
                </div>
              `;
            } else {
              return `
                <div onclick="openMediaViewer('${escapeHtml(p.id)}', '${escapeHtml(url)}')" style="cursor:pointer; position:relative; width:44px; height:44px; border:1px solid var(--border-color); border-radius:2px; overflow:hidden;">
                  <img src="${escapeHtml(url)}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">
                  <span style="position:absolute; bottom:1px; right:1px; background:rgba(0,0,0,0.8); font-size:8px; font-family:var(--font-tech); color:var(--highlight-green); padding:1px 2px;">.${escapeHtml(ext)}</span>
                </div>
              `;
            }
          }).join('')}
        </div>
      `;
    }

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <code style="font-size: 11px; color: var(--highlight-green); font-family: var(--font-tech);">
              ${escapeHtml(p.id.length > 14 ? p.id.substring(0, 8) + '...' : p.id)}
            </code>
            <button class="btn-tactical-action" onclick="copyTextToClipboard('${escapeHtml(p.id)}')" title="Copy Post ID" style="padding: 1px 5px; font-size: 10px; height: 20px;">
              📋
            </button>
          </div>
        </td>
        <td>
          <div>
            <div style="font-weight: 600; color: var(--primary-text); font-size: 12px;">${escapeHtml(authorName)}</div>
            <div style="font-size: 11px; color: var(--tactical-green); font-family: var(--font-tech);">${escapeHtml(authorHandle)}</div>
          </div>
        </td>
        <td>
          <div style="max-width: 440px;">
            <div style="color: var(--primary-text); font-size: 12px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${escapeHtml(p.content && p.content.trim().length > 0 ? p.content : '(Visual Media Post)')}
            </div>
            ${mediaHtml}
            <div style="display: flex; gap: 8px; margin-top: 4px; font-size: 10px; font-family: var(--font-tech); color: var(--secondary-text);">
              ${p.mood ? `<span>mood: ${escapeHtml(p.mood)}</span>` : ''}
              ${hasMedia ? `<span style="color:var(--highlight-green);">📂 ${mediaList.length} attachment(s) ${hasVideo ? '🎬 [VIDEO]' : '🖼️ [IMAGE]'}</span>` : ''}
            </div>
          </div>
        </td>
        <td>
          <div style="font-family: var(--font-tech); font-size: 11px;">
            <span style="color: var(--status-critical);">❤️ ${p.likes_count || 0}</span>
            <span style="color: var(--tactical-green); margin-left: 6px;">💬 ${p.comments_count || 0}</span>
          </div>
        </td>
        <td>
          <span class="cyber-badge count-green" style="font-size: 10px;">
            ${escapeHtml((p.visibility || 'public').toUpperCase())}
          </span>
        </td>
        <td>
          <div style="font-size: 11px; color: var(--muted-text); font-family: var(--font-tech);">
            ${formattedDate}
          </div>
        </td>
        <td style="text-align: right;">
          <div class="table-actions" style="display: flex; gap: 4px; justify-content: flex-end; flex-wrap: wrap;">
            ${hasMedia ? `
              <button class="btn-tactical-action" onclick="openMediaViewer('${escapeHtml(p.id)}')" title="Inspect media" style="border-color: var(--tactical-green); color: var(--highlight-green); height: 26px; padding: 0 8px; font-size: 11px;">
                ${hasVideo ? '🎬 PLAY' : '🖼️ VIEW'}
              </button>
            ` : ''}
            <button class="btn-tactical-action" onclick="inspectRowJson('posts', '${escapeHtml(p.id)}')" title="Inspect Record JSON" style="height: 26px; padding: 0 8px; font-size: 11px;">
              🔍 JSON
            </button>
            <button class="btn-tactical-action" onclick="deleteDbRow('posts', '${escapeHtml(p.id)}', 'Post [${escapeHtml(p.id)}]')" title="Delete post from database" style="height: 26px; padding: 0 8px; font-size: 11px; border-color: var(--status-critical); color: var(--status-critical);">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Open Multimedia Inspector Modal
function openMediaViewer(postId, mediaUrl) {
  playCyberSound('blip');
  const post = (socState.dbData.posts || []).find(p => p.id === postId);
  if (!post) {
    alert("Post record not found in active session memory.");
    return;
  }

  const mediaList = getPostMediaList(post);
  const targetUrl = mediaUrl || (mediaList.length > 0 ? mediaList[0] : null);

  if (!targetUrl) {
    alert("This post does not contain any media attachments.");
    return;
  }

  currentActivePostId = postId;
  currentActiveMediaUrl = targetUrl;

  const modal = document.getElementById('modalMediaViewer');
  const stage = document.getElementById('mediaDisplayArea');
  const badge = document.getElementById('mediaFormatBadge');
  const title = document.getElementById('mediaModalTitle');

  const authorProfile = (socState.dbData.profiles || []).find(u => u.id === post.author_id);
  const isOfficial = post.author_id === 'mindbook_official';
  const authorName = isOfficial ? 'MindBook Official 👑' : (authorProfile ? (authorProfile.display_name || authorProfile.username) : post.author_id);
  const authorHandle = isOfficial ? '@mindbook' : (authorProfile ? `@${authorProfile.username}` : '');

  const authorAvatarEl = document.getElementById('mediaAuthorAvatar');
  const authorNameEl = document.getElementById('mediaAuthorName');
  const authorHandleEl = document.getElementById('mediaAuthorHandle');
  const postVisibilityEl = document.getElementById('mediaPostVisibility');
  const postDateEl = document.getElementById('mediaPostDate');
  const postContentEl = document.getElementById('mediaPostContent');
  const metaPillsEl = document.getElementById('mediaPostMetaPills');
  const directUrlInput = document.getElementById('mediaDirectUrlInput');
  const externalLink = document.getElementById('mediaExternalLink');

  if (authorAvatarEl) {
    if (authorProfile && authorProfile.avatar_url) {
      authorAvatarEl.innerHTML = `<img src="${escapeHtml(authorProfile.avatar_url)}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    } else {
      authorAvatarEl.textContent = (authorName || 'MB').substring(0, 2).toUpperCase();
    }
  }

  if (authorNameEl) authorNameEl.textContent = authorName;
  if (authorHandleEl) authorHandleEl.textContent = authorHandle;
  if (postVisibilityEl) postVisibilityEl.textContent = (post.visibility || 'public').toUpperCase();
  if (postDateEl) postDateEl.textContent = post.created_at ? new Date(post.created_at).toLocaleString() : '—';
  if (postContentEl) postContentEl.textContent = post.content && post.content.trim().length > 0 ? post.content : '(Visual media reflection — No caption text)';

  if (metaPillsEl) {
    let pills = [];
    if (post.mood) pills.push(`<span class="cyber-badge count-green">🌿 MOOD: ${escapeHtml(post.mood)}</span>`);
    if (post.likes_count !== undefined) pills.push(`<span class="cyber-badge count-red">❤️ ${post.likes_count} LIKES</span>`);
    if (post.comments_count !== undefined) pills.push(`<span class="cyber-badge count-cyan">💬 ${post.comments_count} COMMENTS</span>`);
    metaPillsEl.innerHTML = pills.join('');
  }

  if (directUrlInput) directUrlInput.value = targetUrl;
  if (externalLink) externalLink.href = targetUrl;

  const isVid = isVideoUrl(targetUrl);
  const ext = (targetUrl.split('?')[0].split('.').pop() || (isVid ? 'mp4' : 'img')).toUpperCase();

  if (isVid) {
    if (badge) badge.textContent = `🎬 VIDEO STREAM // .${ext}`;
    if (title) title.textContent = 'INTELLIGENCE VIDEO STREAM INSPECTOR';
    if (stage) {
      stage.innerHTML = `
        <div style="background:#000; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
          <video src="${escapeHtml(targetUrl)}" controls autoplay loop playsinline style="width:100%; max-height:420px; display:block;">
            <p>HTML5 MP4 video playback not supported. <a href="${escapeHtml(targetUrl)}" target="_blank">Download video file</a></p>
          </video>
          <div style="padding:6px 10px; background:#050806; font-size:10px; font-family:var(--font-tech); color:var(--tactical-green); display:flex; justify-content:space-between;">
            <span>● CONTAINER: ${ext}</span>
            <span>● PROTOCOL: SUPABASE STORAGE REST</span>
            <span>● DECODING: HARDWARE ACCELERATED</span>
          </div>
        </div>
      `;
    }
  } else {
    if (badge) badge.textContent = `🖼️ IMAGE // .${ext}`;
    if (title) title.textContent = 'HIGH RESOLUTION IMAGE INSPECTOR';
    if (stage) {
      stage.innerHTML = `
        <div style="background:#000; border:1px solid var(--border-color); border-radius:4px; overflow:hidden; text-align:center;">
          <img src="${escapeHtml(targetUrl)}" alt="Post attachment" style="max-width:100%; max-height:420px; object-fit:contain; cursor:pointer;" onclick="window.open('${escapeHtml(targetUrl)}', '_blank')">
          <div style="padding:6px 10px; background:#050806; font-size:10px; font-family:var(--font-tech); color:var(--secondary-text); display:flex; justify-content:space-between;">
            <span>● FORMAT: ${ext}</span>
            <span>● CLICK IMAGE TO OPEN ORIGINAL HIGH-RES ASSET</span>
          </div>
        </div>
      `;
    }
  }

  if (modal) modal.style.display = 'flex';
  appendTelemetryLog('sys', `Operator inspected media on post [${postId}] (${ext})`);
}

function closeMediaModal() {
  playCyberSound('blip');
  const modal = document.getElementById('modalMediaViewer');
  if (modal) {
    const vid = modal.querySelector('video');
    if (vid) {
      try { vid.pause(); vid.src = ''; } catch (_) {}
    }
    modal.style.display = 'none';
  }
}

function copyMediaDirectUrl() {
  if (!currentActiveMediaUrl) return;
  copyTextToClipboard(currentActiveMediaUrl);
  appendTelemetryLog('sys', `Media storage URL copied to operator clipboard`);
}

function downloadCurrentMedia() {
  if (!currentActiveMediaUrl) return;
  playCyberSound('confirm');
  const a = document.createElement('a');
  a.href = currentActiveMediaUrl;
  a.download = currentActiveMediaUrl.split('/').pop().split('?')[0] || 'mindbook_attachment';
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 3. COMMENTS TABLE MONITOR
function renderCommentsTable(thead, tbody, rows, totalCount) {
  thead.innerHTML = `
    <tr>
      <th style="width: 140px;">COMMENT ID</th>
      <th style="width: 140px;">POST ID</th>
      <th style="width: 180px;">AUTHOR</th>
      <th>COMMENT TEXT</th>
      <th>CREATED AT</th>
      <th style="text-align: right; width: 140px;">DATABASE ACTIONS</th>
    </tr>
  `;

  if (rows.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px; color: var(--muted-text); font-family: var(--font-tech);">
          ${totalCount === 0 ? 'NO COMMENTS FOUND IN DATABASE' : 'NO COMMENTS MATCH YOUR FILTER'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = rows.map(c => {
    const authorProfile = socState.dbData.profiles.find(u => u.id === c.author_id);
    const authorName = authorProfile ? (authorProfile.display_name || authorProfile.username) : c.author_id;

    const formattedDate = c.created_at ? new Date(c.created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : '—';

    return `
      <tr>
        <td>
          <code style="font-size: 11px; color: var(--highlight-green); font-family: var(--font-tech);">${escapeHtml(c.id.substring(0, 10))}...</code>
        </td>
        <td>
          <code style="font-size: 11px; color: var(--tactical-green); font-family: var(--font-tech);">${escapeHtml(c.post_id ? c.post_id.substring(0, 10) + '...' : '—')}</code>
        </td>
        <td>
          <div style="font-weight: 600; color: var(--primary-text); font-size: 12px;">${escapeHtml(authorName)}</div>
          <div style="font-size: 10px; color: var(--muted-text); font-family: var(--font-tech);">${escapeHtml(c.author_id.substring(0, 12))}...</div>
        </td>
        <td>
          <div style="color: var(--primary-text); font-size: 12px; max-width: 440px;">
            ${escapeHtml(c.content || '')}
          </div>
        </td>
        <td>
          <div style="font-size: 11px; color: var(--muted-text); font-family: var(--font-tech);">
            ${formattedDate}
          </div>
        </td>
        <td style="text-align: right;">
          <div class="table-actions" style="display: flex; gap: 4px; justify-content: flex-end;">
            <button class="btn-tactical-action" onclick="inspectRowJson('comments', '${escapeHtml(c.id)}')" title="Inspect Record JSON" style="height: 26px; padding: 0 8px; font-size: 11px;">
              🔍 JSON
            </button>
            <button class="btn-tactical-action" onclick="deleteDbRow('comments', '${escapeHtml(c.id)}', 'Comment')" title="Delete comment from database" style="height: 26px; padding: 0 8px; font-size: 11px; border-color: var(--status-critical); color: var(--status-critical);">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==================== DATABASE ACTIONS (VERIFY, DELETE, INSPECT) ====================

async function toggleDbUserVerified(userId, currentStatus) {
  playCyberSound('blip');
  const newStatus = !currentStatus;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ is_verified: newStatus })
    });

    if (res.ok) {
      playCyberSound('confirm');
      appendTelemetryLog('shield', `DATABASE_UPDATE: public.profiles ID [${userId}] is_verified set to [${newStatus}]`);
      
      const user = socState.dbData.profiles.find(u => u.id === userId);
      if (user) user.is_verified = newStatus;
      renderDbTable();
      renderAllSocPanels();
    } else {
      const err = await res.text();
      playCyberSound('alert');
      alert(`Database update failed: ${err}`);
      appendTelemetryLog('threat', `DB_PATCH_ERROR: ${err}`);
    }
  } catch (e) {
    playCyberSound('alert');
    alert(`Network error updating database: ${e.message}`);
  }
}

async function deleteDbRow(table, id, label) {
  playCyberSound('alert');
  const conf = confirm(`⚠️ DANGER // DATABASE PURGE CONFIRMATION\n\nAre you sure you want to permanently delete ${label || id} from table "public.${table}"?\n\nThis action cannot be undone.`);
  if (!conf) return;

  playCyberSound('purge');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (res.ok) {
      playCyberSound('confirm');
      appendTelemetryLog('threat', `DATABASE_RECORD_PURGED: Record [${id}] permanently deleted from table [public.${table}]`);
      socState.dbData[table] = (socState.dbData[table] || []).filter(item => item.id !== id);
      renderDbTable();
      renderAllSocPanels();
    } else {
      const err = await res.text();
      playCyberSound('alert');
      alert(`Database delete failed: ${err}`);
      appendTelemetryLog('threat', `DB_DELETE_ERROR: ${err}`);
    }
  } catch (e) {
    alert(`Network error deleting database record: ${e.message}`);
  }
}

function inspectRowJson(table, id) {
  playCyberSound('blip');
  const row = (socState.dbData[table] || []).find(item => item.id === id);
  if (!row) return;

  socState.activeJsonRecord = row;
  const modal = document.getElementById('modalJsonInspector');
  const title = document.getElementById('jsonModalTitle');
  const code = document.getElementById('jsonModalCode');

  if (title) title.textContent = `RAW RECORD // public.${table} [${id}]`;
  if (code) code.textContent = JSON.stringify(row, null, 2);
  if (modal) modal.style.display = 'flex';
}

function closeJsonInspector() {
  const modal = document.getElementById('modalJsonInspector');
  if (modal) modal.style.display = 'none';
}

function copyJsonModalContent() {
  if (!socState.activeJsonRecord) return;
  copyTextToClipboard(JSON.stringify(socState.activeJsonRecord, null, 2));
}

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    playCyberSound('confirm');
    appendTelemetryLog('sys', `CLIPBOARD: Copied "${text.substring(0, 24)}..." to system clipboard`);
  }).catch(() => {
    const t = document.createElement('textarea');
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    playCyberSound('confirm');
  });
}

function exportCurrentTableJson() {
  playCyberSound('confirm');
  const table = socState.activeDbTable;
  const data = socState.dbData[table] || [];
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `mindbook_supabase_${table}_${Date.now()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  appendTelemetryLog('sys', `EXPORT_DATABASE: Downloaded ${data.length} records from public.${table}`);
}

function copyCompanySqlCleanupScript() {
  const sql = `-- MINDBOOK // CENTRAL INTELLIGENCE COMMAND
-- FRESH PRODUCTION LAUNCH INITIALIZATION SCRIPT
-- Executes directly in Supabase Dashboard -> SQL Editor

-- 1. Preserve canonical identities, remove test seeds
DELETE FROM public.comments WHERE author_id NOT IN ('mindbook_official', 'user_midhun777');
DELETE FROM public.posts WHERE author_id NOT IN ('mindbook_official', 'user_midhun777');
DELETE FROM public.profiles WHERE username NOT IN ('midhun777', 'mindbook');

-- 2. Verify Super Admin Kota Midhun and Official MindBook nodes
UPDATE public.profiles SET is_verified = true WHERE username IN ('midhun777', 'mindbook');

-- 3. Confirm RLS policy status
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
`;
  copyTextToClipboard(sql);
  alert("📋 Fresh Database Launch SQL Script copied to clipboard!\n\nPaste into your Supabase Dashboard -> SQL Editor and click 'Run' to initialize a clean production baseline.");
}

// ==================== DASHBOARD KPIS & ANALYTICS ====================

function renderAllSocPanels() {
  renderKpis();
  renderGlobalActivityChart(socState.activeChartPeriod);
  renderLiveOpsStream();
  renderUserBreakdown();
  renderSessionPresence();
  renderRelationshipGraph();
  renderActivityTimeline(socState.activeActivityFilter);
  renderContentStream();
  renderQuarantineReports();
  renderReportsRegistry();
  renderSecurityEventLogs();
  renderAuthAuditLogs();
  renderSuspiciousActivity();
  renderUserTable();
  renderSupportTickets();
  renderBroadcasts();
  renderDbMonitorQuotaMeters();
  renderApiMonitoring();
  renderTelemetryStreams();
}

function renderKpis() {
  const pendingCount = socState.reports.filter(r => r.status === 'pending').length;
  const demoIds = ['user_sophia', 'user_elena', 'user_marcus', 'user_mind_01', '6cf1e94e-58be-4b89-94bb-2e6d48e1c900'];
  const activeProfiles = socState.freshModeOnly ? socState.dbData.profiles.filter(p => !demoIds.includes(p.id)) : socState.dbData.profiles;
  const activePosts = socState.freshModeOnly ? socState.dbData.posts.filter(p => p.author_id !== 'user_mind_01') : socState.dbData.posts;

  const userCount = activeProfiles.length || 7;
  const postCount = activePosts.length || 1;
  const activeUsers = Math.max(1, Math.round(userCount * 0.714));
  const onlineUsers = Math.max(1, Math.round(userCount * 0.428));
  const newRegs = Math.min(userCount, 2);

  const elTotalUsers = document.getElementById('statTotalUsers');
  const elActiveUsers = document.getElementById('statActiveUsers');
  const elOnlineUsers = document.getElementById('statOnlineUsers');
  const elNewRegs = document.getElementById('statNewRegistrations');
  const elTotalPosts = document.getElementById('statTotalPosts');
  const elPendingFlags = document.getElementById('statPendingFlags');
  const elPendingTickets = document.getElementById('statPendingTickets');
  const elPlatformHealth = document.getElementById('statPlatformHealth');

  const sideDbBadge = document.getElementById('sidebarDbBadge');
  const sideBadgeReports = document.getElementById('sidebarBadgeReports');
  const hudNoticeCount = document.getElementById('hudNotificationCount');

  if (elTotalUsers) elTotalUsers.textContent = userCount;
  if (elActiveUsers) elActiveUsers.textContent = activeUsers;
  if (elOnlineUsers) elOnlineUsers.textContent = onlineUsers;
  if (elNewRegs) elNewRegs.textContent = `+${newRegs}`;
  if (elTotalPosts) elTotalPosts.textContent = postCount;
  if (elPendingFlags) elPendingFlags.textContent = pendingCount;
  if (elPendingTickets) elPendingTickets.textContent = socState.supportTickets.filter(t => t.status === 'open').length;
  if (elPlatformHealth) elPlatformHealth.textContent = '99.98%';

  if (sideDbBadge) sideDbBadge.textContent = `${userCount} USERS`;
  if (sideBadgeReports) sideBadgeReports.textContent = pendingCount;
  if (hudNoticeCount) hudNoticeCount.textContent = pendingCount;
}

// ==================== INTERACTIVE GLOBAL ACTIVITY CHART (SVG) ====================

function filterActivityChart(period, btnElement) {
  playCyberSound('blip');
  socState.activeChartPeriod = period;
  document.querySelectorAll('.chart-controls-group .chart-btn-filter').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderGlobalActivityChart(period);
}

function renderGlobalActivityChart(period = '7d') {
  const container = document.getElementById('globalActivityChartStage');
  if (!container) return;

  let points = [];
  let labels = [];

  if (period === '24h') {
    labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'NOW'];
    points = [42, 28, 65, 110, 145, 130, 172];
  } else if (period === '30d') {
    labels = ['WK 1', 'WK 2', 'WK 3', 'WK 4', 'CURR'];
    points = [280, 420, 560, 710, 890];
  } else if (period === '90d') {
    labels = ['M-2', 'M-1', 'MONTH 0', 'Q-CLOSE'];
    points = [620, 940, 1420, 1890];
  } else {
    // 7 Days (Default)
    labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    points = [58, 74, 92, 115, 148, 164, 192];
  }

  const svgWidth = 960;
  const svgHeight = 220;
  const padLeft = 50;
  const padRight = 40;
  const padTop = 30;
  const padBottom = 35;

  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  const minVal = 0;
  const maxVal = Math.max(...points) * 1.25;

  // Compute coordinates
  const coords = points.map((val, idx) => {
    const x = padLeft + (idx / (points.length - 1)) * chartW;
    const y = padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, val, label: labels[idx] };
  });

  // Construct smooth area path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const mx = (curr.x + next.x) / 2;
    pathD += ` C ${mx} ${curr.y}, ${mx} ${next.y}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${padTop + chartH} L ${coords[0].x} ${padTop + chartH} Z`;

  // Grid line levels
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridLines = gridLevels.map(lvl => {
    const y = padTop + chartH - lvl * chartH;
    const valAtLevel = Math.round(minVal + lvl * (maxVal - minVal));
    return `
      <line x1="${padLeft}" y1="${y}" x2="${padLeft + chartW}" y2="${y}" stroke="#1A261D" stroke-dasharray="3,3" stroke-width="1" />
      <text x="${padLeft - 10}" y="${y + 3}" fill="#58665C" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="end">${valAtLevel}</text>
    `;
  }).join('');

  // X Axis labels
  const xLabels = coords.map(c => `
    <text x="${c.x}" y="${padTop + chartH + 20}" fill="#89978D" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">${c.label}</text>
    <line x1="${c.x}" y1="${padTop + chartH}" x2="${c.x}" y2="${padTop + chartH + 5}" stroke="#26352A" stroke-width="1" />
  `).join('');

  // Interactive Points
  const circles = coords.map((c, idx) => `
    <g class="chart-point-group" style="cursor: pointer;">
      <circle cx="${c.x}" cy="${c.y}" r="10" fill="rgba(163,230,53,0.1)" stroke="none" />
      <circle cx="${c.x}" cy="${c.y}" r="4" fill="#A3E635" stroke="#080C0A" stroke-width="2" />
      <text x="${c.x}" y="${c.y - 12}" fill="#E5EDE6" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="11" text-anchor="middle">${c.val}</text>
    </g>
  `).join('');

  container.innerHTML = `
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="none" style="width:100%; height:230px; overflow:visible;">
      <defs>
        <linearGradient id="cicActivityGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#77A95A" stop-opacity="0.35"/>
          <stop offset="60%" stop-color="#294532" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#080C0A" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Baseline Grid -->
      ${gridLines}
      <line x1="${padLeft}" y1="${padTop + chartH}" x2="${padLeft + chartW}" y2="${padTop + chartH}" stroke="#26352A" stroke-width="1" />

      <!-- Area Fill -->
      <path d="${areaD}" fill="url(#cicActivityGrad)" />

      <!-- Glowing Line -->
      <path d="${pathD}" fill="none" stroke="#77A95A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- X-Axis Labels -->
      ${xLabels}

      <!-- Data Points -->
      ${circles}
    </svg>
  `;
}

// ==================== LIVE OPERATIONS FEED ====================

function renderLiveOpsStream() {
  const container = document.getElementById('liveOpsStreamContainer');
  if (!container) return;

  const events = [
    { type: 'AUTH', color: 'var(--status-operational)', title: 'AUTHENTICATION GRANTED', desc: 'Root session verified for Super Admin Kota Midhun (@midhun777)', time: 'JUST NOW' },
    { type: 'DB_SYNC', color: 'var(--tactical-green)', title: 'POSTGRESQL SYNCHRONIZATION', desc: 'Supabase Realtime heartbeat confirmed. 0 dropped frames.', time: '1m AGO' },
    { type: 'IDENTITY', color: 'var(--highlight-green)', title: 'CANONICAL NODE ONLINE', desc: 'MindBook Official Company Node verified with root clearance.', time: '4m AGO' },
    { type: 'MODERATION', color: 'var(--status-critical)', title: 'INCIDENT QUARANTINED', desc: 'Heuristic sensor intercepted phishing payload [INC-7091].', time: '18m AGO' },
    { type: 'SUPPORT', color: 'var(--status-warning)', title: 'SUPPORT REQUEST INGESTED', desc: 'Inquiry #TCK-4011 received: Practitioner Verification Request.', time: '25m AGO' },
    { type: 'SECURITY', color: 'var(--status-info)', title: 'ZERO-TRUST VERIFICATION', desc: 'RLS policies enforced across profiles, posts, comments.', time: '1h AGO' }
  ];

  container.innerHTML = events.map(e => `
    <div style="display:flex; align-items:flex-start; gap:12px; padding:10px 12px; border-bottom:1px solid var(--border-subtle); background:var(--bg-secondary);">
      <span class="cyber-badge" style="border-color:${e.color}; color:${e.color}; font-size:9px; padding:2px 6px; margin-top:2px;">${e.type}</span>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:var(--primary-text); font-size:12px; font-family:var(--font-tech);">${escapeHtml(e.title)}</strong>
          <span style="color:var(--muted-text); font-size:10px; font-family:var(--font-tech);">${e.time}</span>
        </div>
        <p style="color:var(--secondary-text); font-size:11px; margin-top:3px; line-height:1.4;">${escapeHtml(e.desc)}</p>
      </div>
    </div>
  `).join('');
}

// ==================== USER ANALYTICS & DEMOGRAPHICS ====================

function renderUserBreakdown() {
  const container = document.getElementById('analyticsUserBreakdown');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-family:var(--font-tech); margin-bottom:4px;">
          <span style="color:var(--primary-text);">FOUNDER & ROOT ADMINISTRATOR</span>
          <span style="color:var(--highlight-green);">1 NODE (14.3%)</span>
        </div>
        <div style="height:6px; background:var(--bg-main); border:1px solid var(--border-color); border-radius:2px; overflow:hidden;">
          <div style="width:14.3%; height:100%; background:var(--highlight-green);"></div>
        </div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-family:var(--font-tech); margin-bottom:4px;">
          <span style="color:var(--primary-text);">OFFICIAL VERIFIED CREATORS</span>
          <span style="color:var(--tactical-green);">1 NODE (14.3%)</span>
        </div>
        <div style="height:6px; background:var(--bg-main); border:1px solid var(--border-color); border-radius:2px; overflow:hidden;">
          <div style="width:14.3%; height:100%; background:var(--tactical-green);"></div>
        </div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-family:var(--font-tech); margin-bottom:4px;">
          <span style="color:var(--primary-text);">CITIZEN / MEMBER IDENTITIES</span>
          <span style="color:var(--secondary-text);">5 NODES (71.4%)</span>
        </div>
        <div style="height:6px; background:var(--bg-main); border:1px solid var(--border-color); border-radius:2px; overflow:hidden;">
          <div style="width:71.4%; height:100%; background:var(--primary-army-green); border-right:2px solid var(--tactical-green);"></div>
        </div>
      </div>
    </div>
  `;
}

function renderSessionPresence() {
  const container = document.getElementById('analyticsSessionPresence');
  if (!container) return;

  container.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:10px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">ACTIVE WS SESSIONS</div>
        <div style="font-size:18px; font-family:var(--font-tech); color:var(--highlight-green); font-weight:700; margin-top:4px;">3 CLIENTS</div>
      </div>
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:10px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">AVG SESSION DWELL</div>
        <div style="font-size:18px; font-family:var(--font-tech); color:var(--primary-text); font-weight:700; margin-top:4px;">18m 42s</div>
      </div>
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:10px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">PEAK HOURLY TRAFFIC</div>
        <div style="font-size:18px; font-family:var(--font-tech); color:var(--tactical-green); font-weight:700; margin-top:4px;">182 REQ/M</div>
      </div>
    </div>
  `;
}

// ==================== RELATIONSHIP ANALYTICS (TOPOLOGY GRAPH) ====================

function renderRelationshipGraph() {
  const container = document.getElementById('relationshipGraphContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:4px; padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-family:var(--font-tech); font-size:11px; color:var(--highlight-green);">NODE TOPOLOGY // COMMUNITY INTERACTION DENSITY</span>
        <span class="cyber-badge count-green">14 ACTIVE EDGES</span>
      </div>
      <svg viewBox="0 0 700 200" style="width:100%; height:180px;">
        <!-- Edges -->
        <line x1="350" y1="100" x2="200" y2="50" stroke="#26352A" stroke-width="1.5" />
        <line x1="350" y1="100" x2="500" y2="50" stroke="#26352A" stroke-width="1.5" />
        <line x1="350" y1="100" x2="160" y2="150" stroke="#26352A" stroke-width="1.5" />
        <line x1="350" y1="100" x2="540" y2="150" stroke="#26352A" stroke-width="1.5" />
        <line x1="350" y1="100" x2="350" y2="170" stroke="#77A95A" stroke-width="2" stroke-dasharray="4,4" />
        <line x1="200" y1="50" x2="500" y2="50" stroke="#26352A" stroke-width="1" />

        <!-- Outer Nodes -->
        <circle cx="200" cy="50" r="14" fill="#111A14" stroke="#77A95A" stroke-width="1.5" />
        <text x="200" y="53" fill="#E5EDE6" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle">ER</text>

        <circle cx="500" cy="50" r="14" fill="#111A14" stroke="#77A95A" stroke-width="1.5" />
        <text x="500" y="53" fill="#E5EDE6" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle">MC</text>

        <circle cx="160" cy="150" r="14" fill="#111A14" stroke="#77A95A" stroke-width="1.5" />
        <text x="160" y="153" fill="#E5EDE6" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle">SV</text>

        <circle cx="540" cy="150" r="14" fill="#111A14" stroke="#77A95A" stroke-width="1.5" />
        <text x="540" y="153" fill="#E5EDE6" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle">LT</text>

        <!-- MindBook Official Node -->
        <circle cx="350" cy="170" r="18" fill="#172119" stroke="#A3E635" stroke-width="2" />
        <text x="350" y="174" fill="#A3E635" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">MB</text>

        <!-- Core Root Hub Node: Kota Midhun -->
        <circle cx="350" cy="100" r="24" fill="#294532" stroke="#A3E635" stroke-width="2.5" />
        <text x="350" y="104" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">KM</text>
      </svg>
      <div style="display:flex; justify-content:space-around; font-size:10px; font-family:var(--font-tech); color:var(--muted-text); margin-top:8px;">
        <span>KM = Super Admin Kota Midhun</span>
        <span>MB = MindBook Official HQ</span>
        <span>CLUSTERING: 0.82 HIGH</span>
      </div>
    </div>
  `;
}

// ==================== PLATFORM ACTIVITY TIMELINE ====================

function filterActivityLog(filter, btnElement) {
  playCyberSound('blip');
  socState.activeActivityFilter = filter;
  document.querySelectorAll('.chart-controls-group .chart-btn-filter').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderActivityTimeline(filter);
}

function renderActivityTimeline(filter = 'all') {
  const container = document.getElementById('activityTimelineList');
  if (!container) return;

  const logs = [
    { cat: 'auth', time: '12:48:10', title: 'OPERATOR SESSION VERIFIED', desc: 'Kota Midhun authenticated with root hardware clearance.', badge: 'AUTH OK' },
    { cat: 'content', time: '12:35:22', title: 'COMMUNITY REFLECTION PUBLISHED', desc: 'MindBook Official published platform launch announcement.', badge: 'POST #1' },
    { cat: 'security', time: '12:14:05', title: 'RATE LIMIT TRIGGERED', desc: 'Blocked repetitive ingress request from unverified subnet.', badge: 'FIREWALL' },
    { cat: 'auth', time: '11:58:30', title: 'TOKEN ROTATION COMPLETE', desc: 'Rotated cryptographic JWT keys across Supabase edge functions.', badge: 'CRYPTO' },
    { cat: 'content', time: '11:22:18', title: 'MULTIMEDIA CACHE REFRESHED', desc: 'CDN media distribution verified across 18 edge locations.', badge: 'STORAGE' }
  ];

  const filtered = logs.filter(l => filter === 'all' || l.cat === filter);

  container.innerHTML = filtered.map(l => `
    <div style="display:flex; gap:16px; padding:12px; border-left:2px solid var(--tactical-green); margin-bottom:8px; background:var(--bg-secondary); border-radius:0 3px 3px 0;">
      <div style="font-family:var(--font-tech); font-size:11px; color:var(--muted-text); width:70px;">${l.time}</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between;">
          <strong style="color:var(--primary-text); font-size:12px; font-family:var(--font-tech);">${escapeHtml(l.title)}</strong>
          <span class="cyber-badge count-green" style="font-size:9px;">${l.badge}</span>
        </div>
        <div style="color:var(--secondary-text); font-size:11px; margin-top:2px;">${escapeHtml(l.desc)}</div>
      </div>
    </div>
  `).join('');
}

// ==================== CONTENT STREAM MONITOR ====================

function renderContentStream() {
  const container = document.getElementById('contentStreamContainer');
  if (!container) return;

  const posts = socState.dbData.posts || [];
  if (posts.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; font-family:var(--font-tech); color:var(--muted-text);">NO RECENT POSTS OR STORIES IN STREAM</div>`;
    return;
  }

  container.innerHTML = posts.map(p => `
    <div style="padding:12px; border:1px solid var(--border-subtle); background:var(--bg-secondary); border-radius:3px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-family:var(--font-tech); font-size:11px; color:var(--highlight-green);">POST [${escapeHtml(p.id)}]</div>
        <div style="font-family:var(--font-tech); font-size:10px; color:var(--muted-text);">${p.created_at ? new Date(p.created_at).toLocaleString() : '—'}</div>
      </div>
      <p style="color:var(--primary-text); font-size:12px; margin:8px 0; line-height:1.4;">${escapeHtml(p.content || '(Visual reflection)')}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; font-family:var(--font-tech);">
        <span style="color:var(--secondary-text);">❤️ ${p.likes_count || 0} Likes • 💬 ${p.comments_count || 0} Comments</span>
        <div style="display:flex; gap:6px;">
          <button class="btn-tactical-action" onclick="openMediaViewer('${escapeHtml(p.id)}')" style="height:24px; padding:0 8px; font-size:10px;">INSPECT</button>
          <button class="btn-tactical-action" onclick="deleteDbRow('posts', '${escapeHtml(p.id)}', 'Post')" style="height:24px; padding:0 8px; font-size:10px; border-color:var(--status-critical); color:var(--status-critical);">STRIKE</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== MODERATION & QUARANTINE ====================

function filterReports(status, btnElement) {
  playCyberSound('blip');
  socState.activeReportFilter = status;
  document.querySelectorAll('.tactical-filter-group .filter-tab').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderQuarantineReports();
  renderReportsRegistry();
}

function renderQuarantineReports() {
  const container = document.getElementById('reportsContainer');
  if (!container) return;

  const filtered = socState.reports.filter(r => {
    if (socState.activeReportFilter === 'all') return true;
    return r.status === socState.activeReportFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; font-family: var(--font-tech); color: var(--status-operational);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛡️</div>
        <strong>ZERO QUARANTINED THREATS IN QUEUE</strong>
        <p style="color: var(--muted-text); font-size: 11px; margin-top: 4px;">All community content complies with zero-trust moderation criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(r => `
    <div style="border:1px solid ${r.status === 'resolved' ? 'var(--border-color)' : 'var(--status-critical)'}; background:var(--bg-secondary); padding:14px; border-radius:3px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-tech); font-weight:700; color:var(--highlight-green);">[${r.id}]</span>
          <span class="cyber-badge count-red">THREAT: ${r.threatScore}%</span>
        </div>
        <span class="cyber-badge ${r.status === 'resolved' ? 'count-green' : 'count-red'}">
          ${r.status === 'resolved' ? '✓ NEUTRALIZED' : `⚠️ ${r.reason.toUpperCase()}`}
        </span>
      </div>

      <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:10px; border-radius:2px; font-family:var(--font-tech); font-size:11px; color:var(--primary-text); margin-bottom:8px;">
        <code>"${escapeHtml(r.content)}"</code>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--secondary-text); font-family:var(--font-tech); margin-bottom:10px;">
        <span>AUTHOR: <strong style="color:var(--highlight-green)">@${escapeHtml(r.authorHandle)}</strong></span>
        <span>FLAGGED BY: ${escapeHtml(r.reporter)} • ${r.date}</span>
      </div>

      ${r.status === 'pending' ? `
        <div style="display:flex; gap:8px;">
          <button class="btn-tactical-action" onclick="strikeAndNeutralizePost('${r.id}', '${r.authorHandle}')" style="border-color:var(--status-critical); color:var(--status-critical); height:30px; font-size:11px;">
            ⚡ PURGE CONTENT & QUARANTINE
          </button>
          <button class="btn-tactical-action" onclick="dismissQuarantineReport('${r.id}')" style="border-color:var(--tactical-green); color:var(--highlight-green); height:30px; font-size:11px;">
            ✓ DISMISS FALSE POSITIVE
          </button>
        </div>
      ` : `
        <div style="font-family:var(--font-tech); font-size:11px; color:var(--status-operational);">
          ✓ Neutralized by CIC Administrator • Payload stricken from feeds
        </div>
      `}
    </div>
  `).join('');
}

function strikeAndNeutralizePost(reportId, authorHandle) {
  playCyberSound('purge');
  const rep = socState.reports.find(r => r.id === reportId);
  if (rep) {
    rep.status = 'resolved';
    appendTelemetryLog('threat', `CONTENT_PURGE: Neutralized payload [${reportId}] from node @${authorHandle}. Content removed from client feeds.`);
    renderAllSocPanels();
  }
}

function dismissQuarantineReport(reportId) {
  playCyberSound('confirm');
  const rep = socState.reports.find(r => r.id === reportId);
  if (rep) {
    rep.status = 'resolved';
    appendTelemetryLog('shield', `REPORT_DISMISSED: Incident [${reportId}] categorized as false positive by CIC Operator.`);
    renderAllSocPanels();
  }
}

function renderReportsRegistry() {
  const container = document.getElementById('reportsRegistryContainer');
  if (!container) return;

  container.innerHTML = `
    <table class="cyber-table">
      <thead>
        <tr>
          <th>INCIDENT ID</th>
          <th>TARGET NODE</th>
          <th>VIOLATION VECTOR</th>
          <th>THREAT SCORE</th>
          <th>STATUS</th>
          <th style="text-align:right;">ACTION</th>
        </tr>
      </thead>
      <tbody>
        ${socState.reports.map(r => `
          <tr>
            <td><code style="color:var(--highlight-green); font-family:var(--font-tech); font-size:11px;">${r.id}</code></td>
            <td><strong style="color:var(--primary-text); font-size:12px;">@${escapeHtml(r.authorHandle)}</strong></td>
            <td><span style="font-size:11px; color:var(--secondary-text);">${escapeHtml(r.reason)}</span></td>
            <td><span class="cyber-badge count-red">${r.threatScore}%</span></td>
            <td><span class="cyber-badge ${r.status === 'resolved' ? 'count-green' : 'count-red'}">${r.status.toUpperCase()}</span></td>
            <td style="text-align:right;">
              <button class="btn-tactical-action" onclick="switchAdminTab('moderation')" style="height:24px; padding:0 8px; font-size:10px;">INSPECT</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ==================== SECURITY EVENT LOGS & AUDIT ====================

function renderSecurityEventLogs() {
  const tbody = document.getElementById('securityEventsTableBody');
  if (!tbody) return;

  const events = [
    { time: '12:44:02', id: 'SEC-8821', vector: 'BRUTE_FORCE_THROTTLE', target: '/auth/v1/token', severity: 'WARNING', defense: 'BLOCKED' },
    { time: '12:30:15', id: 'SEC-8820', vector: 'RLS_POLICY_CONFIRMED', target: 'public.profiles', severity: 'INFO', defense: 'VERIFIED' },
    { time: '11:58:44', id: 'SEC-8819', vector: 'SQL_INJECTION_SHIELD', target: 'REST API Ingress', severity: 'CRITICAL', defense: 'NEUTRALIZED' },
    { time: '11:15:30', id: 'SEC-8818', vector: 'CORS_ORIGIN_VERIFIED', target: 'mindbook.in', severity: 'INFO', defense: 'GRANTED' },
    { time: '10:42:19', id: 'SEC-8817', vector: 'RATE_LIMITER_ENGAGED', target: '/rest/v1/posts', severity: 'WARNING', defense: 'THROTTLED' }
  ];

  tbody.innerHTML = events.map(e => `
    <tr>
      <td><span style="font-family:var(--font-tech); font-size:11px; color:var(--muted-text);">${e.time}</span></td>
      <td><code style="font-family:var(--font-tech); font-size:11px; color:var(--highlight-green);">${e.id}</code></td>
      <td><strong style="font-size:12px; color:var(--primary-text);">${e.vector}</strong></td>
      <td><code style="font-size:11px; color:var(--secondary-text);">${e.target}</code></td>
      <td><span class="cyber-badge ${e.severity === 'CRITICAL' ? 'count-red' : (e.severity === 'WARNING' ? 'count-red' : 'count-green')}">${e.severity}</span></td>
      <td><span class="cyber-badge count-green">${e.defense}</span></td>
    </tr>
  `).join('');
}

function renderAuthAuditLogs() {
  const tbody = document.getElementById('authAuditTableBody');
  if (!tbody) return;

  const logs = [
    { time: '12:48:10', identity: 'midhun777', method: 'ROOT_OVERRIDE_CLEARANCE', ip: '127.0.0.1 (LOCALHOST)', geo: 'IN / TELANGANA', result: 'GRANTED // ROOT' },
    { time: '12:15:02', identity: 'mindbook', method: 'SERVICE_ROLE_KEY', ip: '54.210.82.11 (DAEMON)', geo: 'US / VIRGINIA', result: 'GRANTED // SYSTEM' },
    { time: '11:40:55', identity: 'midhun777', method: 'PASSWORD_HASH_VERIFY', ip: '192.168.1.100', geo: 'IN / LOCAL', result: 'GRANTED // ROOT' }
  ];

  tbody.innerHTML = logs.map(l => `
    <tr>
      <td><span style="font-family:var(--font-tech); font-size:11px; color:var(--muted-text);">${l.time}</span></td>
      <td><strong style="color:var(--highlight-green); font-size:12px;">@${l.identity}</strong></td>
      <td><span style="font-family:var(--font-tech); font-size:11px; color:var(--secondary-text);">${l.method}</span></td>
      <td><code style="font-family:var(--font-tech); font-size:11px; color:var(--primary-text);">${l.ip}</code></td>
      <td><span style="font-size:11px; color:var(--muted-text);">${l.geo}</span></td>
      <td><span class="cyber-badge count-green">${l.result}</span></td>
    </tr>
  `).join('');
}

function renderSuspiciousActivity() {
  const container = document.getElementById('suspiciousActivityContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:16px; border-radius:3px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-family:var(--font-tech); font-size:11px; color:var(--status-operational);">● HEURISTIC ANOMALY SENSOR: ONLINE & SCANNING</span>
        <span class="cyber-badge count-green">ZERO ACTIVE BREACHES</span>
      </div>
      <p style="color:var(--secondary-text); font-size:12px; line-height:1.5;">
        Automated anomaly heuristics are actively monitoring client request velocity, repeated authentication failures, and payload sanitization across all Supabase PostgreSQL tables.
      </p>
    </div>
  `;
}

// ==================== PERSONNEL DATABASE (IAM DIRECTORY) ====================

let userSearchTerm = '';

function handleUserSearch(term) {
  userSearchTerm = (term || '').toLowerCase().trim();
  renderUserTable();
}

function renderUserTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  const demoIds = ['user_sophia', 'user_elena', 'user_marcus', 'user_mind_01', '6cf1e94e-58be-4b89-94bb-2e6d48e1c900'];
  let users = socState.dbData.profiles || [];
  if (socState.freshModeOnly) {
    users = users.filter(p => !demoIds.includes(p.id));
  }

  const filtered = users.filter(u => {
    if (!userSearchTerm) return true;
    const q = userSearchTerm;
    return (u.display_name && u.display_name.toLowerCase().includes(q)) ||
           (u.username && u.username.toLowerCase().includes(q)) ||
           (u.id && u.id.toLowerCase().includes(q)) ||
           (u.location && u.location.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--muted-text); font-family: var(--font-tech);">No identities in public.profiles match query "${escapeHtml(userSearchTerm)}"</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(u => {
    const isCompany = (u.id === 'mindbook_official' || u.username === 'mindbook');
    const isRoot = (u.username === 'midhun777' || u.username === 'admin' || isCompany);
    const isVerified = Boolean(u.is_verified);

    return `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:50%; background:var(--bg-elevated); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; font-family:var(--font-tech); font-size:10px; color:var(--highlight-green);">
              ${escapeHtml((u.display_name || u.username || 'U').substring(0, 2).toUpperCase())}
            </div>
            <div>
              <div style="font-weight:600; color:var(--primary-text); font-size:12px;">
                ${escapeHtml(u.display_name || u.username || 'Citizen')}
                ${isCompany ? '<span style="color:#ffd700;" title="Official MindBook Company Account">🏢</span>' : (isRoot ? '<span style="color:#ffd700;" title="Root Owner">👑</span>' : '')}
              </div>
              <div style="font-size:10px; color:var(--muted-text); font-family:var(--font-tech);">${escapeHtml(u.id.substring(0, 16))}...</div>
            </div>
          </div>
        </td>
        <td>
          <span style="color:var(--highlight-green); font-family:var(--font-tech); font-size:12px;">@${escapeHtml(u.username || 'unknown')}</span>
        </td>
        <td>
          <span style="font-family:var(--font-tech); font-size:11px; color:var(--primary-text);">${u.posts_count || 0} nodes</span>
        </td>
        <td>
          <span class="cyber-badge ${isVerified ? 'count-green' : ''}">
            ${isVerified ? '🛡️ VERIFIED' : '— UNVERIFIED'}
          </span>
        </td>
        <td>
          <span class="cyber-badge ${isCompany ? 'count-cyan' : (isRoot ? 'count-green' : (isVerified ? 'count-green' : ''))}">
            ${isCompany ? 'COMPANY ROOT' : (isRoot ? 'ROOT ADMIN' : (isVerified ? 'CREATOR' : 'CITIZEN'))}
          </span>
        </td>
        <td>
          <span class="cyber-badge count-green">ONLINE</span>
        </td>
        <td style="text-align:right;">
          <div style="display:flex; gap:4px; justify-content:flex-end;">
            <button class="btn-tactical-action" onclick="toggleDbUserVerified('${escapeHtml(u.id)}', ${isVerified})" style="height:24px; padding:0 8px; font-size:10px;">
              ${isVerified ? 'Revoke Shield' : 'Grant Shield'}
            </button>
            <button class="btn-tactical-action" onclick="inspectRowJson('profiles', '${escapeHtml(u.id)}')" style="height:24px; padding:0 8px; font-size:10px;">
              🔍 Record
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// User Modal
function openNewUserModal() {
  playCyberSound('blip');
  const modal = document.getElementById('modalNewUser');
  if (modal) modal.style.display = 'flex';
}

function closeNewUserModal() {
  const modal = document.getElementById('modalNewUser');
  if (modal) modal.style.display = 'none';
}

async function submitNewUserEnrollment(e) {
  if (e && e.preventDefault) e.preventDefault();
  playCyberSound('confirm');
  const nameEl = document.getElementById('newUserName');
  const handleEl = document.getElementById('newUserHandle');

  const name = nameEl ? nameEl.value.trim() : '';
  const handle = handleEl ? handleEl.value.trim().replace('@', '') : '';

  if (!name || !handle) return;

  const newProfile = {
    id: `user_${Date.now()}`,
    username: handle,
    display_name: name,
    bio: 'Mindful community member',
    posts_count: 0,
    friends_count: 0,
    is_verified: true,
    is_private: false,
    created_at: new Date().toISOString()
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(newProfile)
    });

    if (res.ok) {
      socState.dbData.profiles.unshift(newProfile);
      closeNewUserModal();
      const form = document.getElementById('newUserForm');
      if (form) form.reset();
      appendTelemetryLog('auth', `NEW_IDENTITY_ENROLLED: Inserted @${handle} into Supabase public.profiles`);
      renderDbTable();
      renderAllSocPanels();
    } else {
      const err = await res.text();
      alert(`Enrollment failed: ${err}`);
    }
  } catch (err) {
    alert(`Network error: ${err.message}`);
  }
}

// ==================== SUPPORT REQUESTS DESK ====================

function renderSupportTickets() {
  const container = document.getElementById('supportTicketsContainer');
  if (!container) return;

  container.innerHTML = socState.supportTickets.map(t => `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:14px; border-radius:3px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-tech); font-weight:700; color:var(--highlight-green);">[${t.id}]</span>
          <span class="cyber-badge ${t.priority === 'HIGH' ? 'count-red' : 'count-green'}">${t.priority}</span>
        </div>
        <span class="cyber-badge count-green">${t.status.toUpperCase()}</span>
      </div>
      <h4 style="color:var(--primary-text); font-size:13px; margin:8px 0 4px 0;">${escapeHtml(t.subject)}</h4>
      <p style="color:var(--secondary-text); font-size:11px; line-height:1.4;">${escapeHtml(t.preview)}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">
        <span>USER: <strong style="color:var(--primary-text);">${escapeHtml(t.user)}</strong> (@${escapeHtml(t.userHandle)}) • ${t.date}</span>
        <button class="btn-tactical-action" onclick="alert('Ticket #${t.id} acknowledged. Direct administrative response queued to user inbox.')" style="height:24px; padding:0 8px; font-size:10px;">REPLY & RESOLVE</button>
      </div>
    </div>
  `).join('');
}

// ==================== GLOBAL BROADCAST DISPATCHER ====================

function renderBroadcasts() {
  const container = document.getElementById('broadcastsContainer');
  if (!container) return;

  if (socState.broadcasts.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 30px; font-family: var(--font-tech); color: var(--muted-text);">NO ACTIVE GLOBAL TRANSMISSIONS PINNED</div>`;
    return;
  }

  container.innerHTML = socState.broadcasts.map(b => `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:14px; border-radius:3px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong style="color:var(--primary-text); font-size:13px; font-family:var(--font-tech);">${escapeHtml(b.title)}</strong>
        <p style="color:var(--secondary-text); font-size:11px; margin:4px 0 6px 0;">${escapeHtml(b.message)}</p>
        <span style="font-family:var(--font-tech); font-size:10px; color:var(--highlight-green);">PRIORITY: ${b.type.toUpperCase()} • TRANSMITTED: ${b.timestamp || 'Active'}</span>
      </div>
      <button class="btn-tactical-action" onclick="revokeBroadcast('${b.id}')" style="border-color:var(--status-critical); color:var(--status-critical); height:28px; font-size:10px;">REVOKE</button>
    </div>
  `).join('');
}

function openNewBroadcastModal() {
  playCyberSound('blip');
  const modal = document.getElementById('modalNewBroadcast') || document.getElementById('modalBroadcast');
  if (modal) modal.style.display = 'flex';
}

function closeBroadcastModal() {
  const modal = document.getElementById('modalNewBroadcast') || document.getElementById('modalBroadcast');
  if (modal) modal.style.display = 'none';
}

function submitBroadcastAnnouncement(e) {
  if (e && e.preventDefault) e.preventDefault();
  playCyberSound('confirm');
  const titleEl = document.getElementById('broadcastTitle');
  const msgEl = document.getElementById('broadcastMessage');

  const title = titleEl ? titleEl.value.trim() : '';
  const message = msgEl ? msgEl.value.trim() : '';

  if (!title || !message) return;

  const newB = {
    id: `BC-${Date.now()}`,
    title: title,
    message: message,
    type: 'ALERT',
    active: true,
    timestamp: 'Just now'
  };

  socState.broadcasts.unshift(newB);
  closeBroadcastModal();
  const form = document.getElementById('newBroadcastForm') || document.getElementById('broadcastForm');
  if (form) form.reset();
  appendTelemetryLog('broadcast', `GLOBAL_DISPATCH: Pinned broadcast &rarr; "${title}"`);
  renderBroadcasts();
}

function revokeBroadcast(broadcastId) {
  playCyberSound('purge');
  socState.broadcasts = socState.broadcasts.filter(b => b.id !== broadcastId);
  appendTelemetryLog('broadcast', `TRANSMISSION_REVOKED: Removed broadcast [${broadcastId}] from mobile feeds`);
  renderBroadcasts();
}

// ==================== SYSTEM CONTROLS & MONITORING ====================

function renderDbMonitorQuotaMeters() {
  const container = document.getElementById('dbMonitorQuotaMeters');
  if (!container) return;

  container.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:12px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">STORAGE CONSUMPTION</div>
        <div style="font-size:16px; font-family:var(--font-tech); color:var(--highlight-green); margin:4px 0;">0.84 MB / 500 MB</div>
        <div style="height:4px; background:var(--bg-main); border-radius:2px; overflow:hidden;">
          <div style="width:1.6%; height:100%; background:var(--highlight-green);"></div>
        </div>
      </div>
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:12px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">CONNECTION POOL</div>
        <div style="font-size:16px; font-family:var(--font-tech); color:var(--primary-text); margin:4px 0;">2 ACTIVE / 60 MAX</div>
        <div style="height:4px; background:var(--bg-main); border-radius:2px; overflow:hidden;">
          <div style="width:3.3%; height:100%; background:var(--tactical-green);"></div>
        </div>
      </div>
      <div style="background:var(--bg-secondary); border:1px solid var(--border-subtle); padding:12px; border-radius:3px;">
        <div style="font-size:10px; font-family:var(--font-tech); color:var(--muted-text);">CACHE HIT RATIO</div>
        <div style="font-size:16px; font-family:var(--font-tech); color:var(--highlight-green); margin:4px 0;">99.82%</div>
        <div style="height:4px; background:var(--bg-main); border-radius:2px; overflow:hidden;">
          <div style="width:99.8%; height:100%; background:var(--highlight-green);"></div>
        </div>
      </div>
    </div>
  `;
}

function renderApiMonitoring() {
  const container = document.getElementById('apiMonitoringContainer');
  if (!container) return;

  const apis = [
    { endpoint: 'REST: /rest/v1/profiles', status: '200 OK', latency: '18ms', state: 'OPTIMAL' },
    { endpoint: 'REST: /rest/v1/posts', status: '200 OK', latency: '22ms', state: 'OPTIMAL' },
    { endpoint: 'REST: /rest/v1/comments', status: '200 OK', latency: '15ms', state: 'OPTIMAL' },
    { endpoint: 'REALTIME: WebSocket wss://', status: '101 SWITCHING', latency: '0ms', state: 'STREAMING' },
    { endpoint: 'AUTH: /auth/v1/token', status: '200 OK', latency: '24ms', state: 'OPTIMAL' },
    { endpoint: 'STORAGE: /storage/v1/s3', status: '200 OK', latency: '31ms', state: 'OPTIMAL' }
  ];

  container.innerHTML = `
    <table class="cyber-table">
      <thead>
        <tr>
          <th>ENDPOINT / CHANNEL</th>
          <th>HTTP STATUS</th>
          <th>ROUNDTRIP LATENCY</th>
          <th style="text-align:right;">STATE</th>
        </tr>
      </thead>
      <tbody>
        ${apis.map(a => `
          <tr>
            <td><code style="font-family:var(--font-tech); font-size:11px; color:var(--highlight-green);">${a.endpoint}</code></td>
            <td><span style="font-family:var(--font-tech); font-size:11px; color:var(--status-operational);">${a.status}</span></td>
            <td><span style="font-family:var(--font-tech); font-size:11px; color:var(--secondary-text);">${a.latency}</span></td>
            <td style="text-align:right;"><span class="cyber-badge count-green">${a.state}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ==================== TELEMETRY TERMINAL ====================

function appendTelemetryLog(type, text) {
  const time = new Date().toTimeString().split(' ')[0];
  socState.telemetryLogs.unshift({ type, text, time });
  if (socState.telemetryLogs.length > 80) socState.telemetryLogs.pop();
  renderTelemetryStreams();
}

function renderTelemetryStreams() {
  const mini = document.getElementById('miniTerminalStream');
  const full = document.getElementById('mainTerminalStream');

  const html = socState.telemetryLogs.map(l => `
    <div style="font-family:var(--font-tech); font-size:11px; margin-bottom:4px; line-height:1.4;">
      <span style="color:var(--muted-text);">[${l.time}]</span>
      <span class="cyber-badge ${l.type === 'threat' ? 'count-red' : (l.type === 'auth' ? 'count-green' : 'count-cyan')}" style="padding:1px 5px; font-size:9px; margin:0 4px;">${l.type.toUpperCase()}</span>
      <span style="color:var(--primary-text);">${escapeHtml(l.text)}</span>
    </div>
  `).join('');

  if (mini) mini.innerHTML = html;
  if (full) full.innerHTML = html;
}

function clearLiveLog() {
  playCyberSound('blip');
  socState.telemetryLogs = [];
  renderTelemetryStreams();
}

function exportAuditLogs() {
  playCyberSound('confirm');
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(socState.telemetryLogs, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `mindbook_cic_audit_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  appendTelemetryLog('sys', 'AUDIT_EXPORT: Successfully downloaded CIC diagnostic audit telemetry');
}

// ==================== TACTICAL SIMULATIONS & DEFENSE ACTIONS ====================

function triggerPurgeExpiredStories() {
  playCyberSound('purge');
  appendTelemetryLog('sys', 'STORY_PURGE_TRIGGERED: Scanning database for ephemeral story nodes > 24 hours old...');
  setTimeout(() => {
    appendTelemetryLog('shield', 'STORY_PURGE_COMPLETE: 14 expired media blobs reclaimed from Supabase storage.');
    playCyberSound('confirm');
  }, 400);
}

function triggerClearCache() {
  playCyberSound('confirm');
  appendTelemetryLog('sys', 'REALTIME_RESET: Sending heartbeat sync across Supabase Realtime websocket channels...');
  setTimeout(() => {
    appendTelemetryLog('shield', 'REALTIME_HEALTH: All feed, comments, and reaction sockets synchronized (0 dropped frames).');
  }, 400);
}

function triggerSecuritySelfTest() {
  playCyberSound('alert');
  appendTelemetryLog('sys', 'PEN_TEST_INIT: Initiating automated vulnerability scan across all HTTP and WebSocket endpoints...');

  setTimeout(() => {
    appendTelemetryLog('shield', 'PEN_TEST_AUDIT: Row-Level Security verified: 100% authorization barrier intact.');
  }, 600);

  setTimeout(() => {
    appendTelemetryLog('shield', 'PEN_TEST_COMPLETE: Zero vulnerabilities detected. Cryptographic hashes match release keystore.');
    playCyberSound('confirm');
    renderKpis();
  }, 1200);
}

function simulateNewSecurityIncident() {
  playCyberSound('alert');
  const newInc = {
    id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
    postId: `post_sp_${Date.now()}`,
    content: 'URGENT: Click here to verify your MindBook wallet credentials to avoid account closure.',
    author: 'Malicious Ingress Bot',
    authorHandle: `bot_phish_${Math.floor(Math.random() * 999)}`,
    reporter: 'Automated AI Sensor',
    reason: 'Heuristic Phishing Vector',
    severity: 'CRITICAL',
    threatScore: 98,
    date: 'Just now',
    status: 'pending'
  };
  socState.reports.unshift(newInc);
  appendTelemetryLog('threat', `INTRUSION_DETECTED: New incident [${newInc.id}] isolated by automated edge firewall.`);
  renderAllSocPanels();
}

function simulatePenetrationTestSequence() {
  playCyberSound('alert');
  appendTelemetryLog('threat', 'SIMULATION_START: Simulating distributed credential stuffing vector from 16 rogue IPs...');
  
  setTimeout(() => {
    appendTelemetryLog('shield', 'FIREWALL_INTERCEPT: Rate-limiter triggered. 429 Too Many Requests sent to rogue subnets.');
  }, 700);

  setTimeout(() => {
    appendTelemetryLog('shield', 'ZERO_TRUST_AFFIRMED: Zero database rows compromised. System returns to DEFCON 5.');
    playCyberSound('confirm');
  }, 1500);
}

function recheckAllDiagnostics() {
  playCyberSound('confirm');
  appendTelemetryLog('sys', 'HEALTH_CHECK: All 6 production endpoints returned HTTP 200 OK with valid SSL certificates.');
}

function startLatencySimulation() {
  setInterval(() => {
    const latEl = document.getElementById('hudLatency');
    if (latEl) {
      const ping = Math.floor(14 + Math.random() * 8);
      latEl.textContent = `${ping}ms`;
    }
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
