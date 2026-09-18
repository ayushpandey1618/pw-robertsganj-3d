/**
 * API Handler & Async Communication
 * Physics Wallah Coaching Helpline Robertsganj
 */

const PWApi = {
  // Toast notifications
  showToast(message, isSuccess = true) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    const iconEl = document.getElementById('toast-icon');

    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (isSuccess) {
      toast.style.borderColor = 'var(--pw-emerald)';
      iconEl.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      iconEl.style.color = 'var(--pw-emerald)';
    } else {
      toast.style.borderColor = 'var(--pw-red)';
      iconEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
      iconEl.style.color = 'var(--pw-red)';
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  },

  // Submit Counseling Enquiry
  async submitEnquiry(formData) {
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Enquiry API Error:', err);
      return { success: false, error: 'Network error. Please call 074288 90305 directly.' };
    }
  },

  // Calculate NSAT Scholarship
  async calculateScholarship(studentData) {
    try {
      const response = await fetch('/api/scholarship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Scholarship API Error:', err);
      return { success: false, error: 'Failed to calculate. Please call our helpline.' };
    }
  },

  // Share Center Details
  shareCenter() {
    const shareData = {
      title: 'Physics Wallah Coaching Helpline Robertsganj',
      text: 'Physics Wallah Coaching Helpline Robertsganj | IIT JEE, NEET Coaching Classes. Tagore Nagar, Robertsganj UP 231216. Call: 074288 90305',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log('Share canceled', err));
    } else {
      navigator.clipboard.writeText(
        `Physics Wallah Coaching Helpline Robertsganj\nTagore Nagar, Robertsganj, UP 231216\nPhone: 074288 90305\nMap Plus Code: M3P8+GH Robertsganj`
      ).then(() => {
        PWApi.showToast('Center details copied to clipboard!');
      }).catch(() => {
        PWApi.showToast('Helpline: 074288 90305 | Tagore Nagar, Robertsganj');
      });
    }
  }
};

window.PWApi = PWApi;
