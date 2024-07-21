function deepLink(element) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var urlParams = new URLSearchParams(window.location.search);
    var androidUrl = urlParams.get('android');
    var iosUrl = urlParams.get('ios');
    var webUrl = urlParams.get('web');

    if (/android/i.test(userAgent)) {
        window.location = androidUrl;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location = iosUrl;
    } else {
        window.location = webUrl;
    }
}
