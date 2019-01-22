'use strict'

//global variables
var allProducts = [];
var imgId = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var productImg1 = document.getElementById('productImg1');
var productImg2 = document.getElementById('productImg2');
var productImg3 = document.getElementById('productImg3');

//Constructor to make new product objects and push to product array
function BusProduct(name){
    this.filepath = `img/${name}.jpg`;
    this.name = name;
    this.shows = 0;
    this.clicks = 0;
    allProducts.push(this);
};

//Build all products in img folder
function buildProducts(){
    for(var i =0; i < imgId.length; i++){
        new BusProduct(imgId[i]);
    }
}
buildProducts();


//Generic random number generator
function getRandomNum(){
    return (Math.floor(Math.random() * allProducts.length));
}

//Initialize dummy variables for duplicate checks
var num1 = allProducts.length + 1;
var num2 = allProducts.length + 1;
var num3 = allProducts.length + 1;

//Show (3) random, non duplicate products
function showRandomProducts(){
    var randomNum = getRandomNum();
    while(randomNum === num1 || randomNum === num2 || randomNum === num3){
        var randomNum = getRandomNum();
    }
    num1 = randomNum;
    productImg1.src = allProducts[randomNum].filepath;
    productImg1.alt = allProducts[randomNum].name;
    productImg1.name = allProducts[randomNum].name;
    allProducts[randomNum].shows++;
    
    var randomNum2 = getRandomNum();
    while(randomNum2 === randomNum || randomNum2 === num2 || randomNum2 === num3){
        randomNum2 = getRandomNum();
    }
    num2 = randomNum2;
    productImg2.src = allProducts[randomNum2].filepath;
    productImg2.alt = allProducts[randomNum2].name;
    productImg2.name = allProducts[randomNum2].name;
    allProducts[randomNum2].shows++;

    var randomNum3 = getRandomNum();
    while(randomNum3 === randomNum || randomNum3 === randomNum2 || randomNum3 === num3){
        randomNum3 = getRandomNum();
    }
    num3 = randomNum3;
    productImg3.src = allProducts[randomNum3].filepath;
    productImg3.alt = allProducts[randomNum3].name;
    productImg3.name = allProducts[randomNum3].name;
    allProducts[randomNum3].shows++;
}
showRandomProducts();


function handleClick(event){
    var product = event.target.name;
    console.log(event.target.name);
    for(var i=0; i<allProducts.length; i++){
        if(allProducts[i].name === product){
            allProducts[i].clicks++;
        }
    }
    showRandomProducts();
}

//Create event listener and handler function
productImg1.addEventListener('click', handleClick);
productImg2.addEventListener('click', handleClick);
productImg3.addEventListener('click', handleClick);

