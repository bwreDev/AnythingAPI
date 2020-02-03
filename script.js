'use strict';


function displayRandomResults(responseJson) {
    $('#results-list').empty();
    const ingredients = [];
    for (let i = 0; i < responseJson.recipes[0].extendedIngredients.length; i++) {
        ingredients.push(`<li>${responseJson.recipes[0].extendedIngredients[i].original}</li>`);
    }
    $('#results-list').append(
        `<li><h2>${responseJson.recipes[0].title}</h2></li>
        <a href="${responseJson.recipes[0].sourceUrl}" target="_blank"><img src="${responseJson.recipes[0].image}" 
        alt="Photo of ${responseJson.recipes[0].title}"/><br>
        <span>*Click image for blog post*</span>
        </a>
        <ul>
        ${ingredients.join('')}
        </ul>
        <li><p>${responseJson.recipes[0].instructions}</p></li>`
    )
    $('#results').removeClass('hidden');
}

function displayCuisineResults(responseJson) {
    $('#results-list').empty();
    const ingredients = [];
    for (let i = 0; i < responseJson.extendedIngredients.length; i++) {
            ingredients.push(`<li>${responseJson.extendedIngredients[i].original}</li>`);
    }
    $('#results-list').append(
        `<li><h2>${responseJson.title}</h2></li>
        <a href="${responseJson.sourceUrl}" target="_blank"><img src="${responseJson.image}" 
        alt="Photo of ${responseJson.title}"/><span>*Click image for blog post*</span>
        </a>
        <ul>
        <p>Ingredients:</p>
        ${ingredients.join('')}
        </ul>
        <li><p>${responseJson.instructions}</p></li>`
    )
    $('#results').removeClass('hidden');
}

function watchCuisineButton() {
    $('section').on('click', '#cuisine-submit', event => {
        event.preventDefault();
        const searchTerm = $('#cuisine-input').val();
        fetch(`https://api.spoonacular.com/recipes/search?cuisine=${searchTerm}&apiKey=aa96834077e04f6a8ce4a44dc2cac362`)
            .then(response => response.json())
            .then(responseJson => getCuisineResults(responseJson))
            .catch(error => console.log('Cuisine went wrong'));
    });
}

function getCuisineResults(responseJson) {
    $('#results-list').empty();
    const i = Math.floor(Math.random() * 9);
    const recipeId = `${responseJson.results[i].id}`;
    getRecipeById(recipeId);
}

function getRecipeById(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=aa96834077e04f6a8ce4a44dc2cac362`)
        .then(response => response.json())
        .then(responseJson => displayCuisineResults(responseJson))
        .catch(error => console.log('Id went wrong'));
}

function watchRandomButton() {
    $('section').on('click', '#random-meal', event => {
        event.preventDefault();
        fetch('https://api.spoonacular.com/recipes/random?apiKey=aa96834077e04f6a8ce4a44dc2cac362')
            .then(response => response.json())
            .then(responseJson => displayRandomResults(responseJson))
            .catch(error => console.log('Something went wrong'));
    });
}

$(watchCuisineButton);
$(watchRandomButton);