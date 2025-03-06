async function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    try {
        const basePath = await window.electron.getBasePath(); // Get base path from main process
        console.log(`Base Path: ${basePath}`); 

        console.log(`Updating time: ${hours}:${minutes}`);

        // Update the number images for each digit of the time
        document.getElementById("hour1").src = `${basePath}/Purple_Number_${hours[0]}.png`;
        document.getElementById("hour2").src = `${basePath}/Black_Number_${hours[1]}.png`;
        document.getElementById("minute1").src = `${basePath}/Purple_Number_${minutes[0]}.png`;
        document.getElementById("minute2").src = `${basePath}/Black_Number_${minutes[1]}.png`;
    } catch (error) {
        console.error('Error in updateClock:', error);
    }
}

// Update the clock every second
setInterval(() => {
    updateClock();
}, 1000);

// Call the updateClock function
updateClock();
