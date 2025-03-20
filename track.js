"use strict";

const mouseData = [];
let detectionTimeout = null;
const LOCAL_STORAGE_KEY = "mouseMovementData";

// Load previously stored mouse data from local storage.
function loadMouseData() {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing stored mouse data:", error);
    }
  }
  return [];
}

// Save the current mouseData array to local storage.
function saveMouseData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// Calculate metrics (average speed and standard deviation of speeds) from the mouse data.
function calculateMetrics(data) {
  if (data.length < 2) return { avgSpeed: 0, stdDev: 0 };

  const speeds = [];
  for (let i = 1; i < data.length; i++) {
    const dx = data[i].x - data[i - 1].x;
    const dy = data[i].y - data[i - 1].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const dt = (data[i].t - data[i - 1].t) / 1000; // Convert ms to seconds
    const speed = dt > 0 ? distance / dt : 0;
    speeds.push(speed);
  }

  const totalSpeed = speeds.reduce((sum, sp) => sum + sp, 0);
  const avgSpeed = speeds.length ? totalSpeed / speeds.length : 0;
  const variance = speeds.reduce((sum, sp) => sum + Math.pow(sp - avgSpeed, 2), 0) / speeds.length;
  const stdDev = Math.sqrt(variance);
  return { avgSpeed, stdDev, speeds };
}

// Evaluate the collected mouse data to classify the movement as human-like or bot-like.
// Logs "0" for human-like behavior and "1" for bot-like behavior.
function evaluateMouseData() {
  if (mouseData.length < 5) {
    console.log("Not enough data to classify. Data:", mouseData);
    return;
  }

  const { avgSpeed, stdDev } = calculateMetrics(mouseData);
  console.log("Mouse Data Metrics:");
  console.log("  Average Speed:", avgSpeed.toFixed(2), "pixels/sec");
  console.log("  Speed Standard Deviation:", stdDev.toFixed(2));

  // Heuristic for classification:
  // - Low variation in speed (stdDev < 10) or low overall speed (avgSpeed < 30) may indicate bot-like behavior.
  const classification = stdDev < 10 || avgSpeed < 30 ? 1 : 0;
  console.log("Classification:", classification); // 0 for human, 1 for bot
  console.log("Full Mouse Data:", mouseData);
}

// Handler function for tracking mouse movement events.
function trackMouse(e) {
  const now = Date.now();
  const dataPoint = { x: e.clientX, y: e.clientY, t: now };
  mouseData.push(dataPoint);
  console.log("Mouse moved to:", dataPoint);
  saveMouseData(mouseData);

  // Reset the inactivity timer to evaluate after a pause.
  if (detectionTimeout) clearTimeout(detectionTimeout);
  detectionTimeout = setTimeout(() => {
    evaluateMouseData();
    // Optionally clear the stored data for a new session.
    mouseData.length = 0;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, 2000);
}

// Initialize mouse tracking by loading any existing stored data and attaching the mousemove event listener.
function initMouseTracking() {
  const stored = loadMouseData();
  if (stored && Array.isArray(stored)) {
    mouseData.push(...stored);
  }
  document.addEventListener("mousemove", trackMouse);
}

// Start tracking mouse movements when the background script loads.
initMouseTracking();