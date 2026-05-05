const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1eoFd74CrjOyFa7waXbrLnDOkrOCCdsZruTEqju7WeBE/gviz/tq?tqx=out:csv&gid=1339113680';
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8aVRTjayYcGiXMmkG-u4GEVDzA0y02D_eLiKlKBw0PKjWLQ/formResponse';
const ENTRY_NAME = 'entry.258904391';
const ENTRY_INFO = 'entry.1474977758';

let members = [];
let posts = JSON.parse(localStorage.getItem('leafPosts')) || [];
let stories = JSON.parse(localStorage.getItem('leafStories')) || [];
let admins = [];

const leavesDB = [
    { name: "Oak Leaf", emoji: "🍂", description: "A deeply lobed leaf from the mighty oak tree, often turning brilliant colors in the fall.", representation: "Strength, endurance, and deep, unshakeable roots within the community." },
    { name: "Maple Leaf", emoji: "🍁", description: "A broad leaf with pointed lobes, famous for its vivid red and orange autumn displays.", representation: "Balance, promise, and the sweet rewards of patience." },
    { name: "Willow Leaf", emoji: "🌿", description: "Long, slender leaves that drape elegantly from the weeping willow's branches.", representation: "Flexibility, adaptability, and the ability to bend without breaking in the wind." },
    { name: "Ginkgo Leaf", emoji: "🍃", description: "A unique, fan-shaped leaf from an ancient tree species that has survived for millions of years.", representation: "Longevity, resilience, and a connection to the ancient past." },
    { name: "Mint Leaf", emoji: "🌱", description: "A small, textured leaf with a famously refreshing and cool aroma.", representation: "Clarity, revitalization, and bringing fresh ideas to the table." },
    { name: "Monstera Leaf", emoji: "🪴", description: "A large, tropical leaf characterized by its natural holes and splits.", representation: "Growth, uniqueness, and finding beauty in our imperfections." },
    { name: "Four-Leaf Clover", emoji: "🍀", description: "A rare variation of the common three-leaved clover.", representation: "Uncommon luck, hope, faith, and love." },
    { name: "Pine Needle", emoji: "🌲", description: "Thin, sharp leaves that stays green through the harshest of winters.", representation: "Steadfastness, eternal youth, and remaining true to oneself in all seasons." },
    { name: "Eucalyptus Leaf", emoji: "🐨", description: "A fragrant, slightly curved, silvery-green leaf.", representation: "Healing, protection, and purifying the air around us." },
    { name: "Fern Frond", emoji: "🌿", description: "A complex, feathery leaf that unrolls from a tight spiral as it grows.", representation: "New beginnings, endless fascination, and complex beauty." },
    { name: "Bay Leaf", emoji: "🍲", description: "An aromatic leaf often used to add depth and flavor to stews.", representation: "Victory, success, and the subtle spices of life." },
    { name: "Lotus Leaf", emoji: "🪷", description: "A large, water-repellent leaf that floats gracefully on ponds.", representation: "Purity, rising above the muddy waters, and spiritual awakening." },
    { name: "Olive Leaf", emoji: "🕊️", description: "A small, silvery-green leaf from the ancient olive tree.", representation: "Peace, reconciliation, and extending a hand in friendship." },
    { name: "Birch Leaf", emoji: "🍃", description: "A small, heart-shaped leaf with jagged edges from a white-barked tree.", representation: "Renewal, pioneering spirit, and lighting the way for others." },
    { name: "Holly Leaf", emoji: "🎄", description: "A dark green, glossy leaf with sharp, prickly edges.", representation: "Protection, foresight, and enduring through the dark half of the year." },
    { name: "Banana Leaf", emoji: "🍌", description: "A massive, flexible leaf used in many cultures for cooking and shelter.", representation: "Generosity, utility, and wrapping others in care." },
    { name: "Palm Frond", emoji: "🌴", description: "A large, sweeping leaf from a tropical palm tree.", representation: "Victory, triumph, and the relaxing breeze of a warm day." },
    { name: "Ivy Leaf", emoji: "🌿", description: "A lobed, evergreen leaf that climbs and clings to any surface.", representation: "Fidelity, eternal life, and strong, unbreakable attachments." },
    { name: "Basil Leaf", emoji: "🍝", description: "A smooth, tender leaf with a sweet and peppery aroma.", representation: "Good wishes, love, and adding flavor to the community." },
    { name: "Sycamore Leaf", emoji: "🍂", description: "A large, broad leaf from a massive shade tree.", representation: "Protection, shelter, and providing comfort to those in need." },
    { name: "Tea Leaf", emoji: "🍵", description: "The small, serrated leaf responsible for the world's most popular beverage.", representation: "Calmness, reflection, and taking time to sit and think." },
    { name: "Bamboo Leaf", emoji: "🎋", description: "A long, narrow leaf from the fastest-growing grass in the world.", representation: "Resilience, continuous growth, and graceful flexibility." },
    { name: "Chestnut Leaf", emoji: "🌰", description: "A large, toothed leaf from a nut-bearing tree.", representation: "Provision, foresight, and gathering resources for the future." },
    { name: "Fig Leaf", emoji: "🌿", description: "A deeply lobed, rough-textured leaf from an ancient fruit tree.", representation: "Modesty, enlightenment, and uncovering hidden truths." },
    { name: "Acacia Leaf", emoji: "🦒", description: "A compound leaf made of many tiny, feathery leaflets.", representation: "Endurance, immortality, and surviving in harsh conditions." },
    { name: "Rosemary Leaf", emoji: "🌿", description: "A needle-like leaf with a powerful, woody scent.", representation: "Remembrance, loyalty, and unforgettable memories." },
    { name: "Sage Leaf", emoji: "🌱", description: "A soft, velvety leaf with a grayish-green hue.", representation: "Wisdom, long life, and clearing away negative energy." },
    { name: "Ash Leaf", emoji: "🌳", description: "A compound leaf composed of multiple leaflets arranged opposite each other.", representation: "Connection, universal harmony, and bridging the gap between worlds." },
    { name: "Elm Leaf", emoji: "🍃", description: "An asymmetrical leaf with a serrated edge.", representation: "Intuition, inner strength, and trusting your gut feeling." },
    { name: "Cedar Leaf", emoji: "🌲", description: "Scale-like leaves that form flat, aromatic sprays.", representation: "Healing, purification, and ancient wisdom." },
    { name: "Magnolia Leaf", emoji: "🌸", description: "A thick, glossy, leathery leaf with a rusty brown underside.", representation: "Nobility, perseverance, and a love of nature." },
    { name: "Poplar Leaf", emoji: "🍂", description: "A triangular leaf that flutters and shimmers in the slightest breeze.", representation: "Communication, whispering secrets, and staying attuned to the wind." },
    { name: "Cypress Leaf", emoji: "🌲", description: "Tiny, scale-like leaves covering rounded shoots.", representation: "Transition, mourning, and finding peace in change." },
    { name: "Alder Leaf", emoji: "🍃", description: "A rounded leaf with a serrated edge, often found near water.", representation: "Confidence, facing emotions, and embracing the flow of life." },
    { name: "Hazel Leaf", emoji: "🌰", description: "A soft, rounded leaf from a shrub known for its nuts and flexible wood.", representation: "Inspiration, creativity, and finding hidden knowledge." },
    { name: "Rowan Leaf", emoji: "🍒", description: "A pinnate leaf with many small, serrated leaflets.", representation: "Protection, courage, and warding off negativity." },
    { name: "Hawthorn Leaf", emoji: "🌿", description: "A deeply lobed leaf from a thorny shrub with beautiful spring blossoms.", representation: "Hope, protection, and the opening of the heart." },
    { name: "Apple Leaf", emoji: "🍎", description: "A simple, oval leaf with a finely toothed edge.", representation: "Love, healing, and the sweet fruits of hard work." },
    { name: "Cherry Leaf", emoji: "🍒", description: "A pointed, serrated leaf that turns beautiful colors in the autumn.", representation: "The fleeting nature of life and appreciating the present moment." },
    { name: "Walnut Leaf", emoji: "🌰", description: "A large compound leaf with an aromatic scent.", representation: "Mental clarity, hidden wisdom, and unlocking the mind." },
    { name: "Lemon Leaf", emoji: "🍋", description: "A glossy, dark green leaf with a subtle citrus scent.", representation: "Zest for life, cleansing energy, and a sunny disposition." },
    { name: "Cinnamon Leaf", emoji: "🍂", description: "A thick, leathery leaf from the tree that gives us a beloved spice.", representation: "Warmth, protection, and adding a little spice to life." },
    { name: "Patchouli Leaf", emoji: "🌿", description: "A member of the mint family with a strong, earthy, and musky scent.", representation: "Grounding, physical connection, and earthy passion." },
    { name: "Lavender Leaf", emoji: "🪻", description: "A narrow, silvery-green leaf from a plant famous for its calming purple flowers.", representation: "Tranquility, devotion, and bringing peace to the chaotic mind." },
    { name: "Dandelion Leaf", emoji: "🌼", description: "A deeply toothed leaf, often considered a weed but packed with nutrients.", representation: "Survival, stubborn resilience, and thriving wherever you land." },
    { name: "The Golden Leaf", emoji: "✨", description: "A mythical leaf said to fall from the highest branch of the World Tree.", representation: "Ultimate wisdom, rare destiny, and the realization of one's full potential." },
    { name: "The Cosmic Leaf", emoji: "🌌", description: "A leaf formed from stardust, drifting through the vacuum of space.", representation: "Infinite possibilities, vast imagination, and seeing the bigger picture." },
    { name: "The Crystal Leaf", emoji: "💎", description: "A delicate, transparent leaf carved from a single, flawless gemstone.", representation: "Clarity of purpose, unbreakable resolve, and reflecting the truth." },
    { name: "The Shadow Leaf", emoji: "🌑", description: "A leaf that absorbs light, found only in the deepest, oldest forests.", representation: "Mystery, embracing the unknown, and finding comfort in the quiet." },
    { name: "The Rainbow Leaf", emoji: "🌈", description: "A legendary leaf that shimmers with every color of the spectrum.", representation: "Diversity, harmony, and the beautiful culmination of all things." }
];

function getLeafOfTheDay() {
    const today = new Date();
    // Seed string based on the date so it's the exact same for everyone on the planet
    const seedStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % leavesDB.length;
    return leavesDB[index];
}

async function renderLeafOfTheDay() {
    const leaf = getLeafOfTheDay();
    document.getElementById('lotd-name').textContent = leaf.name;
    document.getElementById('lotd-desc').textContent = leaf.description;
    document.getElementById('lotd-rep').textContent = leaf.representation;
    
    const emojiEl = document.getElementById('lotd-emoji');
    const imgEl = document.getElementById('lotd-image');
    
    // Set emoji as default
    emojiEl.textContent = leaf.emoji;
    emojiEl.style.display = 'block';
    imgEl.style.display = 'none';
    
    // Skip real image search for mythical leaves
    if (leaf.name.includes("The ") && leaf.name.includes(" Leaf")) return;
    
    try {
        // Strip out the word "Leaf" to get better search results on Wikimedia Commons
        const coreName = leaf.name.replace(" Leaf", "");
        // Append filetype:bitmap to strictly prevent it from returning PDFs or text documents
        const searchTerm = encodeURIComponent(coreName + ' filetype:bitmap');
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${searchTerm}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json&origin=*`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data && data.query && data.query.pages) {
            const pages = data.query.pages;
            const firstPageId = Object.keys(pages)[0];
            const imageUrl = pages[firstPageId].imageinfo[0].url;
            
            if (imageUrl) {
                imgEl.src = imageUrl;
                imgEl.onload = () => {
                    emojiEl.style.display = 'none';
                    imgEl.style.display = 'block';
                };
            }
        }
    } catch(err) {
        console.error("Could not fetch real image for leaf:", err);
    }
}

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
                
                const sheetMembers = [];
                const sheetPosts = [];
                const sheetStories = [];
                const sheetAdmins = [];
                
                rows.forEach(row => {
                    let timestamp = row[0] ? row[0].trim() : "";
                    let name = row[1] ? row[1].trim() : "";
                    let info = row[2] ? row[2].trim() : "";
                    
                    if (name.startsWith("POST: ")) {
                        sheetPosts.push({
                            title: name.substring(6),
                            content: info,
                            timestamp: timestamp
                        });
                    } else if (name.startsWith("STORY: ")) {
                        sheetStories.push({
                            title: name.substring(7),
                            content: info,
                            timestamp: timestamp
                        });
                    } else if (name.startsWith("ADMIN: ")) {
                        sheetAdmins.push(name.substring(7).trim().toLowerCase());
                    } else if (name !== "") {
                        sheetMembers.push({ name, info });
                    }
                });
                
                members = [...sheetMembers];
                posts = [...sheetPosts];
                stories = [...sheetStories];
                admins = [...sheetAdmins];
                
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
                
                // Auto-sync any local community posts
                let localPosts = JSON.parse(localStorage.getItem('leafPosts')) || [];
                let pendingPosts = [];
                
                localPosts.forEach(localPost => {
                    const exists = sheetPosts.find(sp => sp.title === localPost.title && sp.content === localPost.content);
                    if (!exists) {
                        submitToGoogleForm("POST: " + localPost.title, localPost.content);
                        posts.push(localPost);
                        pendingPosts.push(localPost);
                    }
                });
                
                localStorage.setItem('leafPosts', JSON.stringify(pendingPosts));
                
                // Auto-sync any local stories
                let localStories = JSON.parse(localStorage.getItem('leafStories')) || [];
                let pendingStories = [];
                
                localStories.forEach(localStory => {
                    const exists = sheetStories.find(ss => ss.title === localStory.title && ss.content === localStory.content);
                    if (!exists) {
                        submitToGoogleForm("STORY: " + localStory.title, localStory.content);
                        stories.push(localStory);
                        pendingStories.push(localStory);
                    }
                });
                
                localStorage.setItem('leafStories', JSON.stringify(pendingStories));
                
                renderMembers();
                renderPosts();
                renderStoryOfTheDay();
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
        const date = typeof post.timestamp === 'number' ? new Date(post.timestamp).toLocaleString() : post.timestamp;
        div.innerHTML = `
            <h4>${escapeHTML(post.title)}</h4>
            <div class="post-meta">Posted on ${date}</div>
            <p>${escapeHTML(post.content).replace(/\n/g, '<br>')}</p>
        `;
        postsList.appendChild(div);
    });
}

// Render Story Of The Day
function renderStoryOfTheDay() {
    const titleEl = document.getElementById('story-title');
    const dateEl = document.getElementById('story-date');
    const contentEl = document.getElementById('story-content');
    
    if (stories.length === 0) {
        titleEl.textContent = "No stories yet!";
        dateEl.textContent = "";
        contentEl.textContent = "Check back soon for our first daily story.";
        return;
    }
    
    // Grab the most recently submitted story
    const latestStory = stories[stories.length - 1];
    const date = typeof latestStory.timestamp === 'number' ? new Date(latestStory.timestamp).toLocaleDateString() : latestStory.timestamp;
    
    titleEl.textContent = latestStory.title;
    dateEl.textContent = "Posted on " + date;
    contentEl.innerHTML = escapeHTML(latestStory.content).replace(/\n/g, '<br>');
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
        const newPost = { title, content, timestamp: Date.now() };
        posts.push(newPost);
        renderPosts();
        
        let localPosts = JSON.parse(localStorage.getItem('leafPosts')) || [];
        localPosts.push(newPost);
        localStorage.setItem('leafPosts', JSON.stringify(localPosts));
        
        submitToGoogleForm("POST: " + title, content);
        
        document.getElementById('postForm').reset();
        alert('Your post has been globally synced to the Community Board!');
    }
});

document.getElementById('adminLoginBtn').addEventListener('click', () => {
    const adminName = prompt("Please enter your exact Name to verify Admin access:");
    if (adminName && admins.includes(adminName.trim().toLowerCase())) {
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('adminLoginBtn').style.display = 'none';
    } else if (adminName !== null) {
        alert("Sorry, that name is not listed as an Admin in the Google Sheet. Ask the owner to add 'ADMIN: Your Name' to the sheet.");
    }
});

document.getElementById('storyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('storyTitleInput').value;
    const content = document.getElementById('storyContentInput').value;
    
    if (title && content) {
        const newStory = { title, content, timestamp: Date.now() };
        stories.push(newStory);
        renderStoryOfTheDay();
        
        let localStories = JSON.parse(localStorage.getItem('leafStories')) || [];
        localStories.push(newStory);
        localStorage.setItem('leafStories', JSON.stringify(localStories));
        
        submitToGoogleForm("STORY: " + title, content);
        
        document.getElementById('storyForm').reset();
        alert('The new Story of the Day has been published globally!');
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
renderStoryOfTheDay();
renderLeafOfTheDay();
