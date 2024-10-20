// Select the .card element
const card = document.querySelector('.card');

let isDragging = false;
let offsetX, offsetY;  // To store the offset between the click point and card position

// Mouse down event to start dragging
card.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Get the current mouse position relative to the card
    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;
    card.style.cursor = 'grabbing';  // Change cursor to grabbing during drag
});

// Mouse up event to stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
    card.style.cursor = 'grab';  // Restore the cursor after dragging
});

// Mouse move event to drag the card
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // Move the card to follow the mouse, offset by initial click position
        card.style.left = `${e.clientX - offsetX}px`;
        card.style.top = `${e.clientY - offsetY}px`;
    }
});
