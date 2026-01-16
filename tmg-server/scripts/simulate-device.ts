/**
 * Script: simulate-device.ts
 * Purpose: Simulates a physical IoT device sending telemetry to the TMG API.
 */

const API_URL = "http://localhost:3000/api/telemetry";
const ASSET_ID = "451a292c-a46d-4eec-9b49-b13813cf3e69";

async function sendData(value: number) {
  const payload = [
    {
      time: new Date().toISOString(),
      assetId: ASSET_ID,
      propertyName: "temperature",
      value: value,
    },
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[SENT] Value: ${value} - Status: ${response.status}`);
    } else {
      const err = await response.json();
      console.error(`[ERROR] ${response.status}:`, err);
    }
  } catch (error) {
    console.error("[CONNECTION FAILED]", error);
  }
}

// [STUDENT TASK]
// 1. Create a loop or interval that runs every 5 seconds.
// 2. Inside the loop, generate a random value.
//    - Most of the time, send a "Safe" value (e.g., between 40 and 60).
//    - Every 5th iteration, send a "Breach" value (e.g., 120) to trigger an Alert.
// 3. Call sendData(value).

console.log("Starting Device Simulation...");

let count = 0;

setInterval(() => {
  count++;
  
  // Default: Safe range (40 - 60)
  let value = 40 + Math.random() * 20;

  // Every 5th tick: Breach range (120 - 150)
  if (count % 5 === 0) {
    console.log("Injecting FAULT condition...");
    value = 120 + Math.random() * 30;
  }

  sendData(value);
}, 5000);
