// Parking Space Selector
const selectedSpaceElement = document.getElementById('selected-space');
const noneTextElement = selectedSpaceElement.querySelector('.selected-text');
noneTextElement.innerHTML = 'None';
noneTextElement.style.color = 'var(--main-color)';

const spaceElements = document.querySelectorAll('.space');

spaceElements.forEach((space) => {
    space.addEventListener('click', () => {
        // Check if the space has a car
        const hasCar = space.getAttribute('data-has-car') === 'true';

        // Only allow spaces without a car to be selected
        if (!hasCar) {
            spaceElements.forEach((el) => {
                el.classList.remove('clicked');
            });

            space.classList.add('clicked');

            // Get the number of selected space
            const selectedText = space.querySelector('h6').textContent;

            // Update selected  text
            noneTextElement.style.color = 'var(--main-color)';
            noneTextElement.innerHTML = selectedText;
        }
    });
});
