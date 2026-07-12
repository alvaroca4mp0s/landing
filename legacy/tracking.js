(() => {
  const fired = new Set();

  const getDevice = () => (window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop');

  const getUtm = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '(direct)',
      utm_medium: params.get('utm_medium') || '(none)',
      utm_campaign: params.get('utm_campaign') || '(not-set)',
    };
  };

  const baseProps = () => ({
    page: window.location.pathname,
    device: getDevice(),
    ...getUtm(),
  });

  const track = (name, props = {}) => {
    const payload = { ...baseProps(), ...props };

    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: payload });
    }

    window.dispatchEvent(new CustomEvent('redlocal:track', { detail: { name, payload } }));
  };

  // Exponer helper para debug/manual tracking
  window.redlocalTrack = track;

  // page_view explícito
  track('page_view');

  // CTA clicks declarativos
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-track]');
    if (!el) return;

    track(el.dataset.track, {
      section: el.dataset.trackLocation || 'unknown',
      cta_text: (el.dataset.trackLabel || el.textContent || '').trim(),
      href: el.getAttribute('href') || '',
    });
  });

  // Outbound WhatsApp defensivo (por si faltara data-track)
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    if (link.dataset.track) return;
    link.addEventListener('click', () => {
      track('whatsapp_click', {
        section: 'unknown',
        cta_text: (link.textContent || '').trim(),
        href: link.getAttribute('href') || '',
      });
    });
  });

  // Scroll depth
  const scrollMilestones = [50, 90];
  window.addEventListener(
    'scroll',
    () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.round((window.scrollY / maxScroll) * 100);

      scrollMilestones.forEach((m) => {
        const key = `scroll_${m}`;
        if (progress >= m && !fired.has(key)) {
          fired.add(key);
          track(key);
        }
      });
    },
    { passive: true }
  );

  // Section views
  if ('IntersectionObserver' in window) {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target.id;
          const key = `section_view:${section}`;
          if (fired.has(key)) return;
          fired.add(key);
          track('section_view', { section });
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => io.observe(section));
  }

  // FAQ open
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      const question = (item.querySelector('summary')?.textContent || '').trim();
      track('faq_open', { question, section: 'faq' });
    });
  });
})();
