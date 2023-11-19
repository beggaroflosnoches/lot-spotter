// Parking Space Selector
const selectedSpaceElement = document.getElementById('selected-space');
const noneTextElement = selectedSpaceElement.querySelector('.selected-text');
noneTextElement.innerHTML = 'None';
noneTextElement.style.color = 'var(--secondary-color)';

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
            noneTextElement.style.color = 'var(--secondary-color)';
            noneTextElement.innerHTML = selectedText;
        }
    });
});

// Retrieve data from database
// const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

// const dbClient = new DynamoDBClient({ region: 'us-east-2' });

// const param = {
//     TableName: 'lot1',
// };

// const command = new ScanCommand(param);

// dbClient.send(command)
//     .then((data) => {
//         const items = data.Items;
//         items.forEach((item, index) => {
//             const id = item.space_id.N;
//             const hasCar = item.is_full.B;

//             console.log(`${id},${hasCar}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Error retrieving items:", error);
//     });

// Example data
const databaseData = [
    { id: 0, hasCar: true },
    { id: 3, hasCar: true },
    { id: 4, hasCar: true },
];

// Function to update HTML elements based on databaseData
function updateHTMLFromDatabase() {
    databaseData.forEach((item) => {
        const id = item.id; 
        const hasCar = item.hasCar;

        // Match id
        const targetSpaceElement = document.querySelector(`.space[data-space-id="${id}"]`);

        if (targetSpaceElement) {
            // Update data-has-car attribute
            targetSpaceElement.setAttribute('data-has-car', hasCar);

            const carImg = targetSpaceElement.querySelector('img');
            const lotHeader = targetSpaceElement.querySelector('h6');

            // Update display
            if (hasCar) {
                carImg.style.display = 'block'; // Show car
                lotHeader.style.display = 'none'; // Hide text
            } else {
                carImg.style.display = 'none'; // Hide car
                lotHeader.style.display = 'block'; // Show text
            }
        }
    });
}

// Call function
updateHTMLFromDatabase();
