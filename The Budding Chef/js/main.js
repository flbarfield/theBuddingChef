//TO DOs: 1) rename html and JS names to make more sense in regards to positioning. 2) Make the food list on the left side of the page clickable, so that it automatically brings up the recipe. 3) Fix scrollbox bug, thanks flexbox. 4) fix collpsing flexbox line when recipeingredients haven't been loaded yet, but the recipe list has.

ingedientButtonListener()
recipeButtonListener()

function ingedientButtonListener () {
    const ingButton = document.querySelectorAll('.ingredientButton')
    const ingredientTextField = document.querySelectorAll('.ingredientInput')

    ingButton.forEach(button => {
    button.addEventListener('click', getFood)
    })

    // checks if enter is used on ingredient inputs.
    ingredientTextField.forEach(textField => {
        textField.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 ){
                getFood()
            }
        })
    })
}

function recipeButtonListener () {
    const recipeButton = document.querySelector('.recipeButton')
    const recipeTextField = document.querySelector('.recipeInput')

    recipeButton.addEventListener('click', cookDirections)

    // checks if enter is used on recipe input
    recipeTextField.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 ){
            cookDirections()
        }
    })
}


function scrollChildCheck (){           
    //removes previous recipe list items if pre-populated.         
    let targetList = document.getElementById('recipeList')
    while (targetList.firstChild) {
        targetList.removeChild(targetList.lastChild)
    }
}

function recipeIngredientChildCheck () {
    //removes previous ingredients section was pre-populated
    let targetList = document.getElementById('recipeIngredients')
    while (targetList.firstChild) {
        targetList.removeChild(targetList.lastChild)
    }
}


function getFood () {
    // displays lower half of the page, scrolls user into to it
    document.getElementById('hideSection').classList.remove('hidden')
    document.getElementById('hideSection').scrollIntoView()

    let foodSearch = document.getElementById('ingredientInput').value
    if (foodSearch === '') {
        foodSearch = document.getElementById('hiddenIngredientInput').value
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodSearch}`)
    .then(res => res.json())
    .then(data => {
        scrollChildCheck()
        if(data.meals === null) {
            document.getElementById('resultNum').innerText = 'No items found! Try again with a different ingredient.'
        } else {
            document.getElementById('resultNum').innerText = `${data.meals.length} Items Found!`
            for (let i = 0; i < data.meals.length; i++) {
                let li = document.createElement('li')
                let mealName = data.meals[i].strMeal
                li.textContent += mealName
                document.getElementById('recipeList').appendChild(li)
            }
        }
        })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

function cookDirections () {
    // displays lower half of the page, scrolls user into to it
    document.getElementById('hideSection').classList.remove('hidden')
    document.getElementById('hideSection').scrollIntoView()
    const recipeTitle = document.getElementById('recipeTitle')
    let recipeSearch = document.getElementById('recipeSearch').value

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearch}`)
    .then(res => res.json())
    .then(data => {
        recipeIngredientChildCheck()
        document.getElementById('foodPic').src = data.meals[0].strMealThumb
        document.getElementById('videoLink').href = data.meals[0].strYoutube
        document.getElementById('videoLink').innerText = 'Prep Video'
        if (data.meals == null) {
            recipeTitle.innerText = 'Recipe Not Found! Try again.'
        } else {
            
            let ingredientString = ''
            let ingredientListDOM = document.getElementById('recipeIngredients')
            let p = document.getElementById('recipeDirections')
            let recMeal = data.meals[0] 
            recipeTitle.innerText = data.meals[0].strMeal
            
            ingredientString = 
            recMeal.strMeasure1 + ' ' + recMeal.strIngredient1 + '. ' + 
            recMeal.strMeasure2 + ' ' + recMeal.strIngredient2 + '. ' +
            recMeal.strMeasure3 + ' ' + recMeal.strIngredient3 + '. ' +
            recMeal.strMeasure4 + ' ' + recMeal.strIngredient4 + '. ' +
            recMeal.strMeasure5 + ' ' + recMeal.strIngredient5 + '. ' +
            recMeal.strMeasure6 + ' ' + recMeal.strIngredient6 + '. ' +
            recMeal.strMeasure7 + ' ' + recMeal.strIngredient7 + '. ' +
            recMeal.strMeasure8 + ' ' + recMeal.strIngredient8 + '. ' +
            recMeal.strMeasure9 + ' ' + recMeal.strIngredient9 + '. ' +
            recMeal.strMeasure10 + ' ' + recMeal.strIngredient10 + '. ' +
            recMeal.strMeasure11 + ' ' + recMeal.strIngredient11 + '. ' +
            recMeal.strMeasure12 + ' ' + recMeal.strIngredient12 + '. ' +
            recMeal.strMeasure13 + ' ' + recMeal.strIngredient13 + '. ' +
            recMeal.strMeasure14 + ' ' + recMeal.strIngredient14 + '. ' +
            recMeal.strMeasure15 + ' ' + recMeal.strIngredient15 + '. ' +
            recMeal.strMeasure16 + ' ' + recMeal.strIngredient16 + '. ' +
            recMeal.strMeasure17 + ' ' + recMeal.strIngredient17 + '. ' +
            recMeal.strMeasure18 + ' ' + recMeal.strIngredient18 + '. ' +
            recMeal.strMeasure19 + ' ' + recMeal.strIngredient19 + '. ' +
            recMeal.strMeasure20 + ' ' + recMeal.strIngredient20 + '. '

            ingredientString = ingredientString.replace(/null/g, '')
            ingredientListDOM.innerHTML = ingredientString

            p.innerText = data.meals[0].strInstructions
            


            // this is coming back with undefined. Need to figure out a way to append 1-20 to 'strIngredient' without type conflict...Until then, I'm going to do this a much less elegant way.

            // for (let i = 0; i < 21; i++) {
            //     if (data.meals.strInstructions[i] === null || data.meals.strInstructions[i] === '') {
            //         continue
            //     } else{
            //         let li = document.createElement('li')
                    
            //         let ingredient = data.meals[0].strIngredient[String(i)]
            //         li.textContent = ingredient
            //         document.ul.appendChild(li)
            //     }
        
            // }
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
        recipeTitle.innerText = 'Recipe Not Found! Try again.'
    })
}

//------for GET FOOD ----
// All data is within an array called meals. 
// strMeal = title of the meals
// strMealThumb = url picture of the meal

// -----for COOK DIRECTIONS -----
// all data is within an array called meals
// strMeal is the title of the meals

// could have strIngredients1-20, empty elements are either null or ""...These appear to be matched with strMeasure1-20

// strInstructions are the instructions for the dish

// may have an attached youtube url video on strYoutube