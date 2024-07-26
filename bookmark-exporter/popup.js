document.getElementById('exportBtn').addEventListener('click', () => {
    chrome.bookmarks.getTree((bookmarks) => {
        let links = [];
        collectLinks(bookmarks, links);
        
        let textContent = links.join('\n'); // Join links with a newline
        downloadTextFile(textContent, 'bookmarks.txt');
    });
});

function collectLinks(bookmarks, links) {
    bookmarks.forEach(bookmark => {
        if (bookmark.url) {
            links.push(bookmark.url); // Add the URL if it exists
        }
        if (bookmark.children) {
            collectLinks(bookmark.children, links); // Recursively collect links from children
        }
    });
}

function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
