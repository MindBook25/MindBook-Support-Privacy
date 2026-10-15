// MindBook Google Support Center UI Helper
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '64px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '16px 24px';
      navLinks.style.boxShadow = '0 4px 12px rgba(60,64,67,0.15)';
      navLinks.style.borderBottom = '1px solid #DADCE0';
    });
  }

  // Live Help Search Filter
  const searchInput = document.getElementById('help-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const topicCards = document.querySelectorAll('.topic-card');
      const faqItems = document.querySelectorAll('.accordion-item');

      if (topicCards.length) {
        topicCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(q) ? 'flex' : 'none';
        });
      }

      if (faqItems.length) {
        faqItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? 'block' : 'none';
        });
      }
    });
  }

  // Sidebar Scrollspy
  const sections = document.querySelectorAll('.article-body section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  if (sections.length && sidebarLinks.length) {
    window.addEventListener('scroll', () => {
      let currentId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) {
          currentId = sec.getAttribute('id');
        }
      });

      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    });
  }
});

// Accordion Toggle Function
function toggleGoogleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle('open');
}

// "Was this helpful?" Feedback Handler
function submitHelpfulFeedback(btn, isHelpful) {
  const widget = btn.closest('.helpful-widget');
  if (widget) {
    widget.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; color: #1E8E3E; font-weight: 500;">
        <span>✓</span> Thank you for your feedback! It helps improve the MindBook Help Center.
      </div>
    `;
  }
}

// Simple Toast Notification
function showGoogleToast(msg) {
  let toast = document.getElementById('google-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'google-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '24px';
    toast.style.backgroundColor = '#323232';
    toast.style.color = '#FFFFFF';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '4px';
    toast.style.fontSize = '0.9rem';
    toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4000);
}
