// // const websiteUrl = 'http://fast-img.herokuapp.com/image/?'

// // chrome.contextMenus.onClicked.addListener((info, tab) => {
// //     chrome.storage.sync.get({
// //         qual: 80,
// //         scale: 2
// //     }, items => {
// //         const searchParams = new URLSearchParams({
// //             url: info.srcUrl || info.linkUrl,
// //             ...items
// //         });
// //         chrome.tabs.create({
// //             url: websiteUrl + searchParams
// //         })
// //     });

// // });

// // chrome.contextMenus.create({
// //     title: 'Open with fast-img',
// //     contexts: ['image', 'link'],
// //     targetUrlPatterns: [
// //         '*://*/*.jpeg',
// //         '*://*/*.jpg',
// //         '*://*/*.png',
// //         '*://*/*.svg',
// //         '*://*/*.gif'
// //     ]
// // });

// // chrome.storage.sync.get({
// //     allRequests: false
// // }, items => {
// //     console.log("got here", items)
// //     if (items.allRequests) {
// //         chrome.webRequest.onBeforeRequest.addListener(
// //             function (details) {
// //                 let searchParams
// //                 console.log(details.url);
// //                 searchParams = new URLSearchParams({
// //                     url: details.url,
// //                     qual: 1,
// //                     scale: 2
// //                 });
// //                 return ({
// //                     redirectUrl: websiteUrl + searchParams
// //                 })
// //             }, {
// //                 urls: [
// //                     '*://*/*.jpeg',
// //                     '*://*/*.jpg',
// //                     '*://*/*.png',
// //                 ]
// //             },
// //             ['blocking', 'requestBody']
// //         );
// //     }
// // })

// chrome.devtools.network.onRequestFinished.addListener(function hello (r) {
//     console.log(r)

// })

chrome.devtools.network.onRequestFinished.addListener(function (req) {

    req.getContent((s) => {
        if (req.request.url.includes(".m3u8") && req.request.url.includes("jsonp")) {
            // chrome.devtools.inspectedWindow.eval('console.log("GOTTTT IT2")')
            // chrome.devtools.inspectedWindow.eval(`console.log('HERE we go: ${JSON.stringify(s)}')`)
            let o = JSON.parse(s.split('(')[1].split(')')[0])
            // chrome.devtools.inspectedWindow.eval("let test = ")
            chrome.devtools.inspectedWindow.eval(`console.warn('ffmpeg -i "${o.flavors[o.flavors.length-1].url}" -c copy', '"'+document.title.trim().replaceAll(':', '').replaceAll(' ', '-')+'.mp4"')`)
            //[0].replaceAll(' ', '-')+'.mp4'
            // chrome.devtools.inspectedWindow.eval('console.log("GOTTTT IT3")')
            // req.getContent((s) => chrome.devtools.inspectedWindow.eval(`console.log("${s}")`))
            // chrome.devtools.inspectedWindow.eval(`console.log('${JSON.stringify(req.getContent)}', '${JSON.stringify(req.request.getContent)}')`)
    
        }
    })
    // Displayed sample TCP connection time here
    // chrome.devtools.inspectedWindow.eval(`console.log('hloasd ${JSON.stringify(req.request.url)}')`);
    // if (req.url.includes(""))


    // console.log(req.timings.connect);
});

// chrome.devtools.network.onRequestFinished.addListener(
//     function (request) {
//         if (request.response.bodySize > 24) {
//             chrome.devtools.inspectedWindow.eval(
//                 'console.log("Large image: " + unescape("' +
//                 escape(request.request.url) + '"))');
//         }
//     }
// );