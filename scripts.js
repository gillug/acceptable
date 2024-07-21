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
    let targetUrl = '';
    let targetPlatform = '';

    socialLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            targetPlatform = link.dataset.platform;
            consentPlatform.textContent = targetPlatform;
            targetUrl = determineUrl(link);
            consentPopup.style.display = 'block';
        });
    });

    consentYes.addEventListener('click', () => {
        consentPopup.style.display = 'none';
        window.location.href = targetUrl;
    });

    consentNo.addEventListener('click', () => {
        consentPopup.style.display = 'none';
    });
}

function determineUrl(link) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let url;
    
    if (/android/i.test(userAgent)) {
        url = link.getAttribute('data-android-url');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        url = link.getAttribute('data-ios-url');
    } else {
        url = link.getAttribute('data-web-url');
    }
    
    return url;
}
