<template>
  <div class="max-w-3xl mx-auto p-6 bg-white">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Hi, Jez!</h1>
        <p class="text-gray-600 text-lg">How are you doing today?</p>
      </div>
      <div class="flex items-center gap-4">
        <button 
          class="bg-green-50 text-emerald-500 border-none flex items-center gap-2 px-6 py-5 rounded-full"
        >
          <UploadIcon class="h-5 w-5 rotate-180" />
          DOWNLOAD APP
        </button>
        <button class="rounded-full p-2">
          <BellIcon class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Main Card -->
    <div class="bg-[#1E5AF6] text-white p-6 rounded-2xl mb-6">
      <div class="flex justify-between mb-2">
        <div>
          <h2 class="text-5xl font-bold mb-2">₹68,511.00</h2>
          <p class="text-blue-100 text-xl">Transactions actively monitored</p>
        </div>
        <div class="flex items-start">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 5L5 45H30L55 5L30 45L5 5H55" stroke="white" stroke-width="4" fill="none" />
          </svg>
        </div>
      </div>

      <div class="flex mt-10 gap-12">
        <div>
          <span class="text-5xl font-bold">17</span>
          <span class="text-xl ml-3 text-blue-100">Sites Checked</span>
        </div>
        <div>
          <span class="text-5xl font-bold">2</span>
          <span class="text-xl ml-3 text-blue-100">Gateways Blocked</span>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="flex gap-6">
      <!-- Chart Card -->
      <div class="border border-gray-200 rounded-2xl p-4 flex-grow">
        <canvas ref="chartCanvas" class="w-full h-[300px]"></canvas>
      </div>

      <!-- Quick Settings Card -->
      <div class="bg-[#1E5AF6] text-white p-6 rounded-2xl w-64">
        <h3 class="text-2xl font-bold mb-6">Quick Settings</h3>
        <div class="space-y-4">
          <p class="text-lg">ACCOUNT</p>
          <p class="text-lg">GEOBLOCK</p>
          <p class="text-lg">LIMITS</p>
          <p class="text-lg">MULTIFACTOR</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BellIcon, UploadIcon } from 'lucide-vue-next';

const chartCanvas = ref(null);

onMounted(() => {
  const canvas = chartCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas dimensions with higher resolution for retina displays
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  // Data points (approximated from the image)
  const dataPoints = [500, 950, 1750, 1300, 2200, 2000, 950, 1800];
  
  // Chart dimensions
  const chartWidth = rect.width - 40;
  const chartHeight = rect.height - 40;
  const padding = { top: 20, right: 20, bottom: 20, left: 20 };
  
  // Calculate scales
  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);
  const yScale = chartHeight / (maxValue - minValue);
  const xScale = chartWidth / (dataPoints.length - 1);
  
  // Draw grid lines
  ctx.beginPath();
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding.top + (chartHeight - (chartHeight / 5) * i);
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    
    // Add y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    const label = Math.round(minValue + (maxValue - minValue) * (i / 5));
    ctx.fillText(label.toString(), padding.left - 5, y + 4);
  }
  
  ctx.stroke();
  
  // Draw the line
  ctx.beginPath();
  ctx.strokeStyle = '#4FD1C5';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  
  dataPoints.forEach((point, index) => {
    const x = padding.left + index * xScale;
    const y = padding.top + chartHeight - (point - minValue) * yScale;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw points
  dataPoints.forEach((point, index) => {
    const x = padding.left + index * xScale;
    const y = padding.top + chartHeight - (point - minValue) * yScale;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4FD1C5';
    ctx.fill();
  });
});
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>

