document.addEventListener('DOMContentLoaded', () => {
  handleCookieConsent();
  handleSocialLinksConsent();
});

function handleCookieConsent() {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookies = document.getElementById('accept-cookies');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'block';
  }

  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
  });
}

function handleSocialLinksConsent() {
  const socialLinks = document.querySelectorAll('.social-link');
  const consentPopup = document.getElementById('consent-popup');
  const consentPlatform = document.getElementById('consent-platform');
  const consentYes = document.getElementById('consent-yes');
  const consentNo = document.getElementById('consent-no');

  socialLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetHref = link.href;
      const targetDeeplink = link.getAttribute('data-deeplink');
      const platform = link.dataset.platform;

      consentPlatform.textContent = platform;
      consentPopup.style.display = 'flex';

      consentYes.addEventListener('click', () => {
        consentPopup.style.display = 'none';
        deepLink(link);
      }, { once: true });

      consentNo.addEventListener('click', () => {
        consentPopup.style.display = 'none';
      }, { once: true });
    });
  });
}

function deepLink(element) {
  const deeplink = element.getAttribute('data-deeplink');
  const androidUrl = element.getAttribute('data-android-url');
  const iosUrl = element.getAttribute('data-ios-url');
  const webUrl = element.getAttribute('data-web-url');
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let url;

  if (/android/i.test(userAgent)) {
    url = androidUrl;
  } else if (/iPad|iPhone|iPod/.test(userAgent) || !window.MSStream) {
    url = iosUrl;
  } else {
    url = webUrl;
  }

  window.location.href = deeplink || url;

  setTimeout(() => {
    if (deeplink && !document.hasFocus()) {
      window.location.href = webUrl;
    }
  }, 1000);
}
