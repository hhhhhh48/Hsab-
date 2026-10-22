(function() {
    // 1. Google Analytics (استبدل G-XXXXXXXXXX بمعرفك الحقيقي لاحقًا)
    const GA_ID = 'G-XXXXXXXXXX';
    if (GA_ID !== 'G-XXXXXXXXXX') {
        const s = document.createElement('script');
        s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments);};
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const container = document.querySelector('.container');
        const firstContent = document.querySelector('.content-section');

        // 2. حقن أزرار المشاركة
        if (container && firstContent) {
            const shareDiv = document.createElement('div');
            shareDiv.className = 'share-buttons';
            shareDiv.innerHTML = 
                '<button class="share-btn twitter" onclick="shareOn(\'twitter\')">Twitter</button>' +
                '<button class="share-btn facebook" onclick="shareOn(\'facebook\')">Facebook</button>' +
                '<button class="share-btn whatsapp" onclick="shareOn(\'whatsapp\')">WhatsApp</button>' +
                '<button class="share-btn copy" onclick="copyLink()">Copy Link</button>';
            container.insertBefore(shareDiv, firstContent);
        }

        // 3. زر تبديل اللغة (ليس على الصفحات العربية)
        if (!window.location.pathname.includes('-ar')) {
            const lang = document.createElement('a');
            lang.href = 'index-ar.html';
            lang.className = 'lang-switch';
            lang.textContent = '🌐 العربية';
            document.body.appendChild(lang);
        }
    });

    window.shareOn = function(platform) {
        const url = window.location.href;
        const text = 'Check out this free calculator!';
        let shareUrl = '';
        if (platform === 'twitter') shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
        else if (platform === 'facebook') shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
        else if (platform === 'whatsapp') shareUrl = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url);
        if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=500');
    };

    window.copyLink = function() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('✅ Link copied!'))
            .catch(() => alert('Copy failed'));
    };
})();
