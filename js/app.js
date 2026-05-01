// Initial data loaded from CSV
const initialMembers = [
  { name: "Creator: Ares Bandebo-Cambra", info: "Hi, I am the creator of the Leaf Confederacy. I hope you will all work hard to contribute to the community and I cannot wait to see your creations. " },
  { name: "Yes(Athul the spy)", info: "no" },
  { name: "Ben fierro wolf", info: "I hate tiny Pepe Caleb u should call him that he hates it also ares is my goat GO LEAFS" },
  { name: "Angel Raúl Concha", info: "leaf" },
  { name: "James", info: "" },
  { name: "i signed", info: "moss." },
  { name: "Phuoc Ha", info: "" },
  { name: "Tom", info: "Hello" },
  { name: "Ryker B. A. Shwartzton", info: "A wealthy investor dedicated to keeping his lawn in shape." },
  { name: "zen", info: "HI" },
  { name: "Paulina Sepulveda", info: "what is this? im very confused" },
  { name: "I accept(Dante)", info: "googoogaga" },
  { name: "Nikko", info: "Leaf" },
  { name: "Jiahao", info: "ok" },
  { name: "TUNG TUNG THOMAS", info: "my dih hurts" },
  { name: "Elizabeth Wait", info: "I am Elizabeth, I like leaves and trees." },
  { name: "sofia yelyashkevich", info: "yo what r the people in the union" },
  { name: "6hank7", info: "i eat leafs" },
  { name: "Perri Spayde", info: "amercian baddie paulina is latina baddie she just forgot to put it in her bio is this a cult?" },
  { name: "Bronson", info: "You know me. im a good person to have on your team" },
  { name: "ansophi", info: "leafs all the way" },
  { name: "Laurel Sedgwick", info: "this is lwk dumb but ill have fomo otherwise." },
  { name: "lyla", info: "im so awesome" }
];

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

// Initialize State in Local Storage
let members = JSON.parse(localStorage.getItem('leafMembers')) || initialMembers;
let posts = JSON.parse(localStorage.getItem('leafPosts')) || [];

// Clean up duplicate or slight variations of Ares' name
const uniqueMembers = [];
const seenNames = new Set();
members.forEach(member => {
    // Manually filter out any extra version of the creator's name
    if (member.name !== "Creator: Ares Bandebo-Cambra" && 
        member.name.toLowerCase().includes("ares") && 
        (member.name.toLowerCase().includes("bandebo") || member.name.toLowerCase().includes("cambra") || member.name.trim().toLowerCase() === "ares")) {
        return; // Skip this duplicate
    }

    if (!seenNames.has(member.name)) {
        seenNames.add(member.name);
        uniqueMembers.push(member);
    }
});
members = uniqueMembers;
localStorage.setItem('leafMembers', JSON.stringify(members));

// Save initial members to localStorage if it was empty
if (!localStorage.getItem('leafMembers')) {
    localStorage.setItem('leafMembers', JSON.stringify(initialMembers));
}

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
        members.push({ name, info });
        localStorage.setItem('leafMembers', JSON.stringify(members));
        renderMembers();
        document.getElementById('signupForm').reset();
        alert('Welcome to The Leaf Confederacy!');
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
