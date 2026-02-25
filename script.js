const firebaseConfig = {
    apiKey: "AIzaSyAZ1EwPZMQjprqncxo04DUPG4BL0srvlms",
    authDomain: "town-planning-offices-in-ogun.firebaseapp.com",
    databaseURL: "https://town-planning-offices-in-ogun-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "town-planning-offices-in-ogun",
    storageBucket: "town-planning-offices-in-ogun.firebasestorage.app",
    messagingSenderId: "1049699052908",
    appId: "1:1049699052908:web:9eceede5cb2f2b2bb05749",
    measurementId: "G-L312BQD5FL"
};

// Initialize Firebase using the Compat SDK (works without modules) if available
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    try {
        firebase.analytics();
    } catch (e) {
        console.warn("Analytics blocked or failing in local environment.", e);
    }
} else {
    console.log("Firebase SDK not detected. Some features may be disabled.");
}

// List of Town Planning Offices in Ogun State
const offices = [
    {
        name: "Ministry of Physical Planning & Urban Development",
        address: "Behind Block D, State Secretariat, Oke-Mosan, Abeokuta, Ogun State",
        phone: "+234 803 376 2396",
        email: "info@mppud.og.gov.ng"
    },
    {
        name: "OGPDPA Zonal Office - Abeokuta",
        address: "Ibara Housing Estate, Abeokuta, Ogun State",
        phone: "+234 803 123 4567",
        email: "abeokuta.zonal@ogpdpa.og.gov.ng"
    },
    {
        name: "Sango Ota Area Planning Office",
        address: "Ijana Qtrs / Oke Oyinbo, Sango Ota, Ogun State",
        phone: "+234 805 555 1122",
        email: "ota.area@ogpdpa.og.gov.ng"
    },
    {
        name: "Ijebu Ode Zonal Planning Office",
        address: "Old Ibadan Road, Ijebu Ode, Ogun State",
        phone: "+234 802 987 6543",
        email: "ijebuode.zonal@ogpdpa.og.gov.ng"
    },
    {
        name: "Sagamu Area Planning Office",
        address: "Behind LG Secretariat, Sagamu, Ogun State",
        phone: "+234 809 333 2211",
        email: "sagamu.area@ogpdpa.og.gov.ng"
    },
    {
        name: "Ilaro Zonal Planning Office",
        address: "Leslie Road, Ilaro, Yewa South, Ogun State",
        phone: "+234 810 444 5566",
        email: "ilaro.zonal@ogpdpa.og.gov.ng"
    },
    {
        name: "NITP Ogun State Chapter",
        address: "Waheed Kadiri House, NITP Secretariat, Ijeun Lukosi, Abeokuta",
        phone: "+234 803 332 8590",
        email: "nitpogunchapter@gmail.com"
    },
    {
        name: "Ijebu-Igbo Area Planning Office",
        address: "Station Road, Ijebu-Igbo, Ijebu North, Ogun State",
        phone: "+234 807 111 2233",
        email: "ijebuigbo.area@ogpdpa.og.gov.ng"
    },
    {
        name: "Ifo Zonal Planning Office",
        address: "Along Lagos-Abeokuta Expressway, Ifo, Ogun State",
        phone: "+234 812 777 8899",
        email: "ifo.zonal@ogpdpa.og.gov.ng"
    },
    {
        name: "Aiyetoro Area Planning Office",
        address: "Abeokuta Road, Aiyetoro, Yewa North, Ogun State",
        phone: "+234 806 666 4455",
        email: "aiyetoro.area@ogpdpa.og.gov.ng"
    },
    {
        name: "Wasinmi Area Planning Office",
        address: "Wasinmi Town, Ewekoro LGA, Ogun State",
        phone: "+234 703 222 1100",
        email: "wasinmi.area@ogpdpa.og.gov.ng"
    }
];

// Display list
function showOffices() {
    const container = document.getElementById("officeList");
    if (!container) return;
    container.innerHTML = "";

    offices.forEach(off => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(off.name + " " + off.address)}`;
        container.innerHTML += `
            <div class="office-card">
                <h2>${off.name}</h2>
                <p><strong>Address:</strong> 
                    <a href="${mapUrl}" target="_blank" class="map-link">
                        ${off.address} 📍
                    </a>
                </p>
                <p><strong>Phone:</strong> ${off.phone}</p>
                <p><strong>Email:</strong> ${off.email}</p>
            </div>
        `;
    });
}

// Filter function attached to global scope
window.filterOffices = function () {
    const searchInput = document.getElementById("searchBar");
    const searchText = searchInput.value.trim().toLowerCase();
    const container = document.getElementById("officeList");

    // Clear previous results/messages
    container.innerHTML = "";

    // Validation: Check if input is empty
    if (searchText === "") {
        container.innerHTML = `
            <div class="error-message">
                <span class="icon">⚠️</span>
                <p>Please enter a town or office name to search.</p>
            </div>
        `;
        searchInput.focus();
        return;
    }

    const filtered = offices.filter(off =>
        off.name.toLowerCase().includes(searchText) ||
        off.address.toLowerCase().includes(searchText)
    );

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="error-message">
                <span class="icon">🔍</span>
                <p>No offices found for "${searchInput.value}". Please try a different town.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(off => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(off.name + " " + off.address)}`;
        container.innerHTML += `
            <div class="office-card">
                <h2>${off.name}</h2>
                <p><strong>Address:</strong> 
                    <a href="${mapUrl}" target="_blank" class="map-link">
                        ${off.address} 📍
                    </a>
                </p>
                <p><strong>Phone:</strong> ${off.phone}</p>
                <p><strong>Email:</strong> ${off.email}</p>
            </div>
        `;
    });
}

// Initialize
// document.addEventListener("DOMContentLoaded", showOffices); // Removed to hide cards on home page

// Initialize Realtime Database only if the SDK is present
let db;
try {
    if (firebase.database) {
        db = firebase.database();
    }
} catch (e) {
    console.log("Database SDK not loaded on this page.");
}

const REVIEWS_NODE = 'reviews';

window.loadReviews = function () {
    if (!db) return;
    const container = document.getElementById('reviewsList');
    if (!container) return;

    // Timeout Safety: If DB doesn't respond in 6 seconds
    const timeoutTimer = setTimeout(() => {
        if (container.innerHTML === "" || container.innerHTML.includes("Loading")) {
            console.warn("Database load timeout.");
            container.innerHTML = `
                <div class="info-card" style="text-align: center;">
                    <p>🕒 The cloud connection is taking longer than expected.</p>
                    <p style="font-size: 0.8rem; opacity: 0.8;">Please ensure your internet is stable and your Firebase Rules are set to Public.</p>
                    <button onclick="location.reload()" class="download-btn" style="margin-top: 10px; padding: 5px 15px;">Retry Connection</button>
                </div>
            `;
        }
    }, 6000);

    // Real-time listener from Realtime Database
    db.ref(REVIEWS_NODE)
        .orderByKey()
        .limitToLast(20)
        .on('value', (snapshot) => {
            clearTimeout(timeoutTimer); // Connection successful, clear timeout
            container.innerHTML = "";

            if (!snapshot.exists()) {
                container.innerHTML = `<div class="info-card" style="text-align: center;"><p>No reviews yet. Be the first to share your experience!</p></div>`;
                return;
            }

            const reviewsList = [];
            snapshot.forEach((childSnapshot) => {
                reviewsList.push(childSnapshot.val());
            });

            reviewsList.reverse().forEach((rev) => {
                const stars = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
                container.innerHTML += `
                    <div class="review-card">
                        <h4>${rev.name}</h4>
                        <p class="category">${rev.category}</p>
                        <div class="rating-display">${stars}</div>
                        <p class="comment">"${rev.comment}"</p>
                        <p class="date">${rev.date}</p>
                    </div>
                `;
            });
        }, (error) => {
            clearTimeout(timeoutTimer);
            console.error("Database connection error:", error);
            container.innerHTML = `
                <div class="error-message">
                    <span class="icon">⚠️</span>
                    <p>Connection Error: Make sure your Firebase Rules permit read/write access.</p>
                </div>
            `;
        });
};

const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('reviewerName').value;
        const category = document.getElementById('practiceCategory').value;
        const comment = document.getElementById('reviewText').value;
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const status = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitReviewBtn');

        if (!ratingInput) {
            status.style.color = "red";
            status.innerText = "Please select a star rating.";
            return;
        }

        const newReview = {
            name: name,
            category: category,
            comment: comment,
            rating: parseInt(ratingInput.value),
            date: new Date().toISOString().split('T')[0],
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        submitBtn.disabled = true;
        status.style.color = "#FFD700";
        status.innerText = "☁️ Connecting to Google Cloud...";

        // Submission Timeout
        const submitTimeout = setTimeout(() => {
            if (submitBtn.disabled) {
                submitBtn.disabled = false;
                status.style.color = "#ff6b6b";
                status.innerText = "❌ Connection timed out. Please check your internet or Firebase Rules.";
            }
        }, 8000);

        // Save to Realtime Database
        db.ref(REVIEWS_NODE).push(newReview)
            .then(() => {
                clearTimeout(submitTimeout);
                status.style.color = "#FFD700";
                status.innerText = "✅ Review posted successfully!";
                reviewForm.reset();
                submitBtn.disabled = false;

                const emailBody = `New Review Received!\n\nName: ${newReview.name}\nCategory: ${newReview.category}\nRating: ${newReview.rating} Stars\nReview: ${newReview.comment}\n\nDate: ${newReview.date}`;
                const mailtoLink = `mailto:bankolegabriel91@yahoo.com?subject=New Town Planning Review from ${newReview.name}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
            })
            .catch((error) => {
                clearTimeout(submitTimeout);
                console.error("Error adding review: ", error);
                status.style.color = "#ff6b6b";
                status.innerText = "❌ Database Error. Verify your Rules in Firebase Console.";
                submitBtn.disabled = false;
            });
    });
}

// Initialize if on reviews page
if (document.getElementById('reviewsList')) {
    loadReviews();
}

// Register Service Worker for PWA (Installable App)
let deferredPrompt;
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.log('Service Worker registration failed: ', err));
    });

    // Handle the install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Show the install banner
        const installBanner = document.getElementById('installBanner');
        if (installBanner) installBanner.style.display = 'block';
    });

    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            // Hide the banner
            document.getElementById('installBanner').style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
}

// Mobile menu toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
