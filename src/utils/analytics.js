// Simple analytics tracking
export const setupAnalytics = () => {
  const trackEvent = (category, action, label) => {
    if (window.gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  };

  // Track form interactions
  document.querySelector('#contact-form').addEventListener('focus', () => {
    trackEvent('Form', 'Focus', 'Contact Form');
  }, true);

  // Track scroll depth
  let maxScroll = 0;
  document.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
        trackEvent('Scroll', 'Depth', `${maxScroll}%`);
      }
    }
  }, { passive: true });

  // Track time on page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('Engagement', 'Time', `${timeSpent}s`);
  });
};