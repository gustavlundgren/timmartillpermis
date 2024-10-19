// Set the date we're counting down to
const countdownDate = new Date("October 24, 2024 14:10:00").getTime();
let cope = 0;


// Function to update the countdown timer
function updateCountdown() {
    // Get the current time
    const now = new Date().getTime();
    
    // Calculate the difference between the countdown date and now
    if (cope===0){
        const distance = countSecondsToTarget([[]]);
    }else if (cope===1){
        const distance = countSecondsToTarget([[22,0,5,40]]);
    }
    
    
    // Calculate hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Create the formatted string for display
    let timeString = `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

    // Update the countdown timer element with the formatted string
    document.getElementById("timer").innerText = timeString;

    // If the countdown is over, display a message
    if (distance < 0) {
        document.getElementById("timer").innerHTML = "<h2>Countdown Finished!</h2>";
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);


function countSecondsToTarget(times) {
    const now = new Date(); // Current time

    // Target date: October 24th, 2024, 14:00 (2:00 PM)
    let targetDate = new Date(now.getFullYear(), 9, 24, 14, 0, 0); // Month is 0-based (October = 9)

    // If today is past October 24th, adjust to next year
    if (now > targetDate) {
        targetDate.setFullYear(now.getFullYear() + 1);
    }

    let totalSeconds = (targetDate - now) / 1000; // Total seconds until the target
    print(totalSeconds)
    if (times.length > 0) {
        // Subtract sleeping seconds from the total
        for (let time of times) {
            if (time) {
                totalSeconds -= calculateSleepingSeconds(time[0], time[1], time[2], time[3], targetDate);
            }
        }
    }

    return totalSeconds;
}

function calculateSleepingSeconds(aHour, aMinute, bHour, bMinute, endDate) {
    const now = new Date();

    // Define the sleep start and end times
    let sleepStart = new Date(now);
    sleepStart.setHours(aHour, aMinute, 0, 0);

    let sleepEnd = new Date(now);
    sleepEnd.setHours(bHour, bMinute, 0, 0);

    // If sleep start is later than sleep end, it means they sleep past midnight
    if (sleepStart > sleepEnd) {
        sleepEnd.setDate(sleepEnd.getDate() + 1); // Adjust sleep end to the next day
    }

    let sleepingSeconds = 0;
    const totalDays = Math.floor((endDate - now) / (1000 * 60 * 60 * 24)); // Total days until target date

    // Add sleep time for today
    if (now < sleepStart) {
        sleepingSeconds += (sleepEnd - sleepStart) / 1000;
    } else if (now > sleepEnd) {
        // If current time is after sleep time, do nothing
    } else {
        sleepingSeconds += (sleepEnd - now) / 1000; // We're in the sleep period today
    }

    // Add sleep time for all the full days between now and the end date
    const sleepDurationPerDay = (sleepEnd - sleepStart) / 1000; // Duration of sleep in seconds
    sleepingSeconds += totalDays * sleepDurationPerDay;

    // Add sleep time for the last partial day
    let sleepStartNextDay = new Date(sleepStart);
    sleepStartNextDay.setDate(sleepStartNextDay.getDate() + totalDays + 1);
    let sleepEndNextDay = new Date(sleepEnd);
    sleepEndNextDay.setDate(sleepEndNextDay.getDate() + totalDays + 1);

    if (sleepStartNextDay < endDate) {
        if (now < sleepStartNextDay) {
            sleepingSeconds += (sleepEndNextDay - sleepStartNextDay) / 1000;
        } else if (now > sleepEndNextDay) {
            sleepingSeconds += (endDate - sleepStartNextDay) / 1000;
        } else {
            sleepingSeconds += (endDate - now) / 1000;
        }
    }

    return sleepingSeconds;
}

function copeIncrease(){
    cope+=1
}

document.getElementById("calculate-time").addEventListener("click", copeIncrease);
