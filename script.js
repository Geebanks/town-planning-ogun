// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZ1EwPZMQjprqncxo04DUPG4BL0srvlms",
    authDomain: "town-planning-offices-in-ogun.firebaseapp.com",
    projectId: "town-planning-offices-in-ogun",
    storageBucket: "town-planning-offices-in-ogun.firebasestorage.app",
    messagingSenderId: "1049699052908",
    appId: "1:1049699052908:web:9eceede5cb2f2b2bb05749",
    measurementId: "G-L312BQD5FL"
};

// Initialize Firebase using the Compat SDK (works without modules)
firebase.initializeApp(firebaseConfig);

try {
    firebase.analytics();
} catch (e) {
    console.warn("Analytics blocked or failing in local environment.", e);
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
