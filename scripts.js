document.addEventListener('DOMContentLoaded', () => {
    handleCookieConsent();
    handleSocialLinksConsent();
    handleDeepLinks();
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
        redirectTo(targetDeeplink, targetHref);
    });

    consentNo.addEventListener('click', () => {
        consentPopup.style.display = 'none';
    });
}

function handleDeepLinks() {
    document.querySelectorAll('.link-list a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const platform = getPlatform();
            const androidUrl = this.getAttribute('data-android-url');
            const iosUrl = this.getAttribute('data-ios-url');
            const webUrl = this.getAttribute('data-web-url');

            let appUrl;
            if (platform === 'android') {
                appUrl = androidUrl;
            } else if (platform === 'ios') {
                appUrl = iosUrl;
            } else {
                window.location = webUrl;
                return;
            }

            // Try to open the app URL
            window.location = appUrl;

            // If the app is not opened within 1 second, redirect to the web URL
            setTimeout(() => {
                window.location = webUrl;
            }, 1000);
        });
    });
}

function redirectTo(deeplink, webLink) {
    window.location.href = deeplink;
    window.addEventListener('pagehide', () => {
        window.location.href = webLink;
    });
}

function getPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    return 'web';
}
