document.addEventListener('DOMContentLoaded', function() {
    const addFoodButton = document.querySelector('.add-food-button');
    const addFoodScreen = document.querySelector('.add-food-screen');
    const foodListScreen = document.querySelector('.food-list-screen');

    addFoodButton.addEventListener('click', function() {
        addFoodScreen.classList.toggle('hidden');
        foodListScreen.classList.toggle('hidden');
    });
});
