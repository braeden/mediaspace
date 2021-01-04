chrome.devtools.network.onRequestFinished.addListener(function (req) {
    req.getContent((s) => {
        if (req.request.url.includes(".m3u8") && req.request.url.includes("jsonp")) {
            const o = JSON.parse(s.split('(')[1].split(')')[0])
            chrome.devtools.inspectedWindow.eval(`console.warn('ffmpeg -i "${o.flavors[o.flavors.length-1].url}" -c copy', '"'+document.title.trim().replace(/[^a-zA-Z0-9]/g,'_')+'.mp4"')`)
        }
    })
});
