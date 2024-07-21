            document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
                // Cookie consent banner
                const cookieConsent = document.getElementById(&#39;cookie-consent&#39;);
                const acceptCookies = document.getElementById(&#39;accept-cookies&#39;);

                if (!localStorage.getItem(&#39;cookiesAccepted&#39;)) {
                    cookieConsent.style.display = &#39;block&#39;;
                }

                acceptCookies.addEventListener(&#39;click&#39;, () =&gt; {
                    localStorage.setItem(&#39;cookiesAccepted&#39;, &#39;true&#39;);
                    cookieConsent.style.display = &#39;none&#39;;
                });

                // Redirect consent popup
                const socialLinks = document.querySelectorAll(&#39;.social-link&#39;);
                const consentPopup = document.getElementById(&#39;consent-popup&#39;);
                const consentPlatform = document.getElementById(&#39;consent-platform&#39;);
                const consentYes = document.getElementById(&#39;consent-yes&#39;);
                const consentNo = document.getElementById(&#39;consent-no&#39;);
                let targetHref, targetDeeplink;

                socialLinks.forEach(link =&gt; {
                    link.addEventListener(&#39;click&#39;, event =&gt; {
                        event.preventDefault();
                        targetHref = link.href;
                        targetDeeplink = link.getAttribute(&#39;data-deeplink&#39;);
                        consentPlatform.textContent = link.dataset.platform;
                        consentPopup.style.display = &#39;flex&#39;;
                    });
                });

                consentYes.addEventListener(&#39;click&#39;, () =&gt; {
                    consentPopup.style.display = &#39;none&#39;;
                    window.location.href = targetDeeplink;
                    setTimeout(() =&gt; {
                        window.location.href = targetHref;
                    }, 1000);
                });

                consentNo.addEventListener(&#39;click&#39;, () =&gt; {
                    consentPopup.style.display = &#39;none&#39;;
                });
            });
