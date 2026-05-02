const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1eoFd74CrjOyFa7waXbrLnDOkrOCCdsZruTEqju7WeBE/gviz/tq?tqx=out:csv&gid=1339113680';
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8aVRTjayYcGiXMmkG-u4GEVDzA0y02D_eLiKlKBw0PKjWLQ/formResponse';
const ENTRY_NAME = 'entry.258904391';
const ENTRY_INFO = 'entry.1474977758';

let members = [];
let posts = JSON.parse(localStorage.getItem('leafPosts')) || [];

const games = [
    { title: "Leaf Blowing Rotation", url: "https://codepen.io/LEAFY_GREEN/embed/gbLOQqQ?default-tab=result" },
    { title: "Leaftris", url: "https://codepen.io/LEAFY_GREEN/embed/GgNRwaw?default-tab=result" },
    { title: "Leaf Snake", url: "https://codepen.io/LEAFY_GREEN/embed/qEqBKjW?default-tab=result" },
    { title: "Leaf Pong", url: "https://codepen.io/LEAFY_GREEN/embed/OPbJExm?default-tab=result" },
    { title: "Flappy Leaf", url: "https://codepen.io/LEAFY_GREEN/embed/GgNRwEx?default-tab=result" },
    { title: "Tiny Leaves", url: "https://codepen.io/LEAFY_GREEN/embed/VYmwVXr?default-tab=result" },
    { title: "Leaf Thief Public Beta", url: "https://scratch.mit.edu/projects/1314417413/embed" },
    { title: "Leaf Blower Revolution", url: "https://gx.games/games/og14id/leaf-blower-revolution-idle-game/" }
];

// Fetch members from Google Sheet
async function fetchAndSyncMembers() {
    try {
        // Add a timestamp cache-buster to force the browser to get the freshest data
        const response = await fetch(SHEET_CSV_URL + '&t=' + Date.now());
        const csvText = await response.text();
        
        Papa.parse(csvText, {
            header: false,
            complete: function(results) {
                const rows = results.data.slice(1); // skip header
                const sheetMembers = rows.map(row => ({
                    name: row[1] ? row[1].trim() : "",
                    info: row[2] ? row[2].trim() : ""
                })).filter(m => m.name !== "");
                
                members = [...sheetMembers];
                
                // Auto-sync any locally signed-up users to the global Google Form
                // and keep them visible on the screen if Google Sheets is still processing the CSV cache
                let localMembers = JSON.parse(localStorage.getItem('leafMembers')) || [];
                let pendingLocals = [];
                
                localMembers.forEach(localMem => {
                    const exists = sheetMembers.find(sm => sm.name.toLowerCase() === localMem.name.toLowerCase());
                    if (!exists) {
                        // Resubmit in background just in case
                        submitToGoogleForm(localMem.name, localMem.info || "");
                        // Add them to the visible members list so they don't disappear while Google Sheets updates
                        members.push(localMem);
                        pendingLocals.push(localMem);
                    }
                });
                
                // Cleanup local storage to only keep the pending ones
                localStorage.setItem('leafMembers', JSON.stringify(pendingLocals));
                
                renderMembers();
            }
        });
    } catch(err) {
        console.error("Error fetching members:", err);
    }
}

function submitToGoogleForm(name, info) {
    const formData = new URLSearchParams();
    formData.append(ENTRY_NAME, name);
    formData.append(ENTRY_INFO, info);
    
    fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    }).catch(e => console.error("Error syncing", name, e));
}

// Start fetching right away
fetchAndSyncMembers();

// Navigation logic for SPA
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');
        navigateTo(target);
    });
});

window.navigateTo = function(target) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === target) {
            link.classList.add('active');
        }
    });
    document.getElementById(target).classList.add('active');
    window.scrollTo(0, 0);
};

// Render Members List
function renderMembers() {
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';
    members.forEach(member => {
        const div = document.createElement('div');
        div.className = 'member-card';
        div.innerHTML = `
            <h4>${escapeHTML(member.name)}</h4>
            ${member.info ? `<p>"${escapeHTML(member.info)}"</p>` : ''}
        `;
        membersList.appendChild(div);
    });
}

// Render Games Grid
function renderGames() {
    const gamesGrid = document.querySelector('.games-grid');
    gamesGrid.innerHTML = '';
    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-card';
        let content = '';
        
        if (game.url.includes('embed')) {
            let height = game.url.includes('scratch') ? "402" : "300";
            content = `<iframe src="${game.url}" width="100%" height="${height}" frameborder="0" allow="fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`;
        } else {
            content = `<div class="game-preview">🍃</div>`;
        }

        div.innerHTML = `
            ${content}
            <div class="game-info">
                <h3>${escapeHTML(game.title)}</h3>
                ${!game.url.includes('embed') ? `<a href="${game.url}" target="_blank" class="btn btn-secondary">Play Game on External Site</a>` : `<button class="btn btn-primary" onclick="this.parentElement.previousElementSibling.requestFullscreen().catch(err => alert('Fullscreen is not supported by your browser.'))" style="margin-top: 10px;">Play Fullscreen</button>`}
            </div>
        `;
        gamesGrid.appendChild(div);
    });
}

// Render Community Posts
function renderPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    if (posts.length === 0) {
        postsList.innerHTML = '<p>No posts yet. Be the first to start a discussion or share a site!</p>';
        return;
    }
    
    // Sort posts newest first
    [...posts].reverse().forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        const date = new Date(post.timestamp).toLocaleString();
        div.innerHTML = `
            <h4>${escapeHTML(post.title)}</h4>
            <div class="post-meta">Posted on ${date}</div>
            <p>${escapeHTML(post.content).replace(/\n/g, '<br>')}</p>
        `;
        postsList.appendChild(div);
    });
}

// Event Listeners for Forms
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('memberName').value;
    const info = document.getElementById('memberInfo').value;
    
    if (name) {
        // Show immediately locally
        members.push({ name, info });
        renderMembers();
        
        // Save to local storage for the background auto-sync feature
        let localMembers = JSON.parse(localStorage.getItem('leafMembers')) || [];
        localMembers.push({ name, info });
        localStorage.setItem('leafMembers', JSON.stringify(localMembers));
        
        // Send to Google Form in the background
        submitToGoogleForm(name, info);
        
        document.getElementById('signupForm').reset();
        alert('Welcome to The Leaf Confederacy! Your name has been globally synced.');
    }
});

document.getElementById('postForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    if (title && content) {
        posts.push({ title, content, timestamp: Date.now() });
        localStorage.setItem('leafPosts', JSON.stringify(posts));
        renderPosts();
        document.getElementById('postForm').reset();
    }
});

// Helper Function for escaping HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}

// Initial Renders on Page Load
renderMembers();
renderGames();
renderPosts();
