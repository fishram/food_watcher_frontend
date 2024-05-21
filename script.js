document.addEventListener('DOMContentLoaded', () => {
    // Get references to the relevant elements

    const addFoodScreen = document.querySelector('.add-food-screen');
    const foodListScreen = document.querySelector('.food-list-screen');
    const addFoodButton = document.querySelector('.add-food-button');
    const addFoodForm = document.querySelector('.add-food-form');

    // Show the add food form when the "Add Food" button is clicked
    addFoodButton.addEventListener('click', () => {
        foodListScreen.classList.add('hidden');
        addFoodScreen.classList.remove('hidden');
    });

    // Handle form submission
    addFoodForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the form data
        const itemName = document.getElementById('item-name').value;
        const quantity = document.getElementById('quantity').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const location = document.getElementById('location').value;
        const selectedIcon = `${itemName}.svg`;

        // Create an object to hold the food item data
        const foodItem = {
            name: itemName,
            quantity: quantity,
            expiryDate: expiryDate,
            location: location,
            icon: selectedIcon
        };

        // Get the existing food list from local storage or create a new array if it doesn't exist
        let foodList = JSON.parse(localStorage.getItem('foodList')) || [];

        // Add the new food item to the list
        foodList.push(foodItem);

        // Save the updated food list back to local storage
        localStorage.setItem('foodList', JSON.stringify(foodList));

        // Clear the form
        addFoodForm.reset();

        // Show the food list screen again
        addFoodScreen.classList.add('hidden');
        foodListScreen.classList.remove('hidden');

        // Update the displayed food list
        displayFoodList();
    });

    // Function to display the food list on the screen
    function displayFoodList() {
        // Get the existing food list from local storage
        const foodList = JSON.parse(localStorage.getItem('foodList')) || [];

        // Get the element where the food list should be displayed
        const foodListContainer = document.querySelector('.food-list-screen');

        // Clear any existing content
        foodListContainer.innerHTML = '<h1>Food List</h1><button class="add-food-button">Add Food</button><div class="food-cards-container"></div>';

        // Get the container for the food cards
        const foodCardsContainer = document.querySelector('.food-cards-container');

        // Create and append the food cards
        foodList.forEach((foodItem) => {
            const foodCard = document.createElement('div');
            foodCard.classList.add('food-card');
            foodCard.innerHTML = `
                <div class="food-card-content">
                    <div class="food-card-left">
                        <h2 class="food-name">${foodItem.name}</h2>
                        <p class="food-detail"><strong>Expiration Date:</strong><br> ${foodItem.expiryDate}</p>
                        <p class="food-detail"><strong>Quantity:</strong> ${foodItem.quantity}</p>
                    </div>
                    <div class="food-card-right">
                        <img src="icons/${foodItem.icon}" class="food-icon" alt="${foodItem.name}">
                        <p class="food-detail"><strong>Location:</strong> ${foodItem.location}</p>
                    </div>
                </div>
            `;

            foodCardsContainer.appendChild(foodCard);
        });

        // Re-attach the event listener for the add food button
        document.querySelector('.add-food-button').addEventListener('click', () => {
            foodListScreen.classList.add('hidden');
            addFoodScreen.classList.remove('hidden');
        });
    }

    // Function to suggest icons based on user input
    function suggestIcons() {
        const itemName = document.getElementById('item-name').value.toLowerCase();
        const iconSuggestions = document.getElementById('icon-suggestions');
        
        // Clear previous suggestions
        iconSuggestions.innerHTML = '';
        
        // List of available icons
        const availableIcons = [
            'apple', 'avocado', 'bacon', 'banana', 'beans', 'bell-pepper', 'bread', 'broccoli', 'burger', 'butter',
            'cake', 'candy', 'carrot', 'cereal', 'cheese', 'cherry', 'chicken', 'chips', 'chocolate', 'cookie',
            'corn', 'cucumber', 'donut', 'egg', 'fish', 'garlic', 'hotdog', 'ice-cream', 'kale', 'lemon', 'lettuce',
            'lime', 'milk', 'mushroom', 'nuts', 'onion', 'orange', 'pasta', 'peas', 'pepper-shaker', 'pepper',
            'pineapple', 'pizza', 'popcorn', 'raspberry', 'rice', 'salad', 'sandwich', 'spinach', 'steak',
            'strawberry', 'sub', 'tomato', 'watermelon', 'yogurt'
        ];
        
        // Filter icons based on user input
        const filteredIcons = availableIcons.filter(icon => icon.includes(itemName));
        
        // Display suggestions
        filteredIcons.forEach(icon => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('icon-suggestion');
            suggestion.innerHTML = `<img src="icons/${icon}.svg" alt="${icon}">`;
            suggestion.addEventListener('click', () => selectIcon(icon));
            iconSuggestions.appendChild(suggestion);
        });
    }

    // Function to select an icon
    function selectIcon(icon) {
        const itemNameInput = document.getElementById('item-name');
        itemNameInput.value = icon;
        
        // Clear suggestions after selection
        document.getElementById('icon-suggestions').innerHTML = '';
    }

    // Attach the suggestIcons function to the item name input
    document.getElementById('item-name').addEventListener('input', suggestIcons);

    // Display the food list when the page loads
    displayFoodList();
});
