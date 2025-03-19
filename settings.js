document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    const lucide = window.lucide; // Access lucide from the window object
    lucide.createIcons({
        attrs: {
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
        }
    });

    // Add specific icons
    const downloadIcon = document.getElementById('download-icon');
    downloadIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
    `;

    const bellIcon = document.getElementById('bell-icon');
    bellIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
    `;

    // Initialize the map if the map element exists
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Coordinates for Trosnant, UK (approximate)
        const trosnantCoordinates = [50.8539, -1.0300]; // Latitude, Longitude
        
        // Initialize the map with Trosnant as the center
        const map = L.map('map').setView(trosnantCoordinates, 15);
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add a marker for Trosnant
        const marker = L.marker(trosnantCoordinates).addTo(map);
        marker.bindPopup("<b>Trosnant</b><br>Protected location").openPopup();
        
        // Add a circle to represent the geofenced area
        const circle = L.circle(trosnantCoordinates, {
            color: '#1A56DB',
            fillColor: '#1A56DB',
            fillOpacity: 0.2,
            radius: 1000 // 1km radius
        }).addTo(map);
        
        // Handle window resize to make the map responsive
        window.addEventListener('resize', function() {
            map.invalidateSize();
        });
        
        // Make sure map is properly sized on initial load
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    }
    
    // Add functionality to the settings options
    const settingsOptions = document.querySelectorAll('.bg-blue-600 .py-3');
    settingsOptions.forEach(option => {
        option.addEventListener('click', function() {
            // For demonstration purposes, we'll just show an alert
            const optionText = this.querySelector('p').textContent;
            alert(`${optionText} option selected. This would open the corresponding settings panel.`);
        });
    });
});