document.addEventListener('DOMContentLoaded', () => {
    // Cookie consent banner
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    // Redirect consent popup
    const socialLinks = document.querySelectorAll('.social-link');
    const consentPopup = document.getElementById('consent-popup');
    const consentPlatform = document.getElementById('consent-platform');
    const consentNo = document.getElementById('consent-no');
    const consentYes = document.getElementById('consent-yes');
    let targetHref, targetDeeplink;

    socialLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            targetHref = link.href;
            targetDeeplink = link.getAttribute('data-deeplink');
            consentPlatform.textContent = link.dataset.platform;
            consentPopup.style.display = 'flex';
        });
    });

    consentYes.addEventListener('click', () => {
        consentPopup.style.display = 'none';
        window.location.href = targetDeeplink;
        window.addEventListener('pagehide', () => {
            window.location.href = targetHref;
        });
    });

    consentNo.addEventListener('click', () => {
        consentPopup.style.display = 'none';
    });
});
