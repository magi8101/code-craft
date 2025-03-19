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
    const uploadIcon = document.getElementById('upload-icon');
    uploadIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform rotate-180">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
    `;

    const bellIcon = document.getElementById('bell-icon');
    bellIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
    `;

    const triangleIcon = document.getElementById('triangle-icon');
    triangleIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 20h18L12 4z"></path>
        </svg>
    `;

    // Chart.js configuration for the activity chart
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    // Sample data to match the chart in the image
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Activity',
            data: [500, 950, 1750, 1300, 2200, 2000, 950, 1800],
            borderColor: '#4FD1C5',
            backgroundColor: 'rgba(79, 209, 197, 0.1)',
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#4FD1C5',
            tension: 0.4,
            fill: false
        }]
    };
    
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 2500,
                    ticks: {
                        stepSize: 500
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1A56DB',
                    titleColor: 'white',
                    bodyColor: 'white',
                    displayColors: false,
                    caretSize: 6,
                    padding: 10
                }
            }
        }
    };
    
    // Create the chart
    new Chart(ctx, chartConfig);
});