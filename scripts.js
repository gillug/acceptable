<script type='text/javascript' src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
        
    <script type='text/javascript'>
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
    </script>
