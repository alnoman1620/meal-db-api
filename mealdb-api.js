const searchFood = () =>{
    const getInput = document.getElementById('search-field');
    const searchText = getInput.value;
    //clear data
    getInput.value = '';
    const div = document.getElementById('error')
    if(searchText == ''){
      div.innerHTML = `<p class="error">There is No Search Result</p>`;
    }
    else{
      div.innerHTML = '';
// load data
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
  .then(data => displaySearchResults(data.meals))
    }



}

const displaySearchResults = (meals) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    
  //text content
    meals.forEach(meal => {
        //show in website
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
            </div>
          </div>
        `
        searchResult.appendChild(div);
    }) 
}

const loadMealDetail = mealId => {
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
fetch(url)
.then(res => res.json())
.then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
  console.log(meal)
  const mealDetails = document.getElementById('meal-details')
  mealDetails.textContent = ''
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = ` 
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0,250)}.</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Add to Cart</a>
  </div>`
 
  mealDetails.appendChild(div)
}