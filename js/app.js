'use strict';

//global variables
var allProducts = [];
var imgId = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var productImg1 = document.getElementById('productImg1');
var productImg2 = document.getElementById('productImg2');
var productImg3 = document.getElementById('productImg3');
var canvasChart = document.getElementById('chart');
var productImgs = [productImg1, productImg2, productImg3];
canvasChart.style.display = 'none';
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
pic1.style.display = 'block';
pic2.style.display = 'block';
pic3.style.display = 'block';

//Constructor to make new product objects and push to product array
function BusProduct(name){
    this.filepath = `img/${name}.jpg`;
    this.name = name;
    this.shows = 0;
    this.clicks = 0;
    allProducts.push(this);
}

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
// var num1 = allProducts.length + 1;
// var num2 = allProducts.length + 1;
// var num3 = allProducts.length + 1;
var oldRandoms = [];
function populateDummy(){
    for(var i=0; i<productImgs.length; i++){
        oldRandoms.push(-1);
    }
}
populateDummy();

//Function to create new random index
function createRandoms(){
    var newRandoms = [];
    while(newRandoms.length < oldRandoms.length){
        var randomNum = getRandomNum();
        if(newRandoms.indexOf(randomNum) === -1 && oldRandoms.indexOf(randomNum) === -1){
            newRandoms.unshift(randomNum);
        }
    }
    oldRandoms = newRandoms;
}

//Show (3) random, non duplicate products
function showRandomProducts(){
    createRandoms();
    for(var k=0; k<oldRandoms.length; k++){
        productImgs[k].src = allProducts[oldRandoms[k]].filepath;
        productImgs[k].alt = allProducts[oldRandoms[k]].name;
        productImgs[k].name = allProducts[oldRandoms[k]].name;
        allProducts[oldRandoms[k]].shows++;
    }

    // var randomNum = getRandomNum();
    // while(randomNum === num1 || randomNum === num2 || randomNum === num3){
    //     randomNum = getRandomNum();
    // }
    // num1 = randomNum;
    // productImg1.src = allProducts[num1].filepath;
    // productImg1.alt = allProducts[num1].name;
    // productImg1.name = allProducts[num1].name;
    // allProducts[num1].shows++;

    // var randomNum2 = getRandomNum();
    // while(randomNum2 === num1 || randomNum2 === num2 || randomNum2 === num3){
    //     randomNum2 = getRandomNum();
    // }
    // num2 = randomNum2;
    // productImg2.src = allProducts[num2].filepath;
    // productImg2.alt = allProducts[num2].name;
    // productImg2.name = allProducts[num2].name;
    // allProducts[num2].shows++;

    // var randomNum3 = getRandomNum();
    // while(randomNum3 === num1 || randomNum3 === num2 || randomNum3 === num3){
    //     randomNum3 = getRandomNum();
    // }
    // num3 = randomNum3;
    // productImg3.src = allProducts[num3].filepath;
    // productImg3.alt = allProducts[num3].name;
    // productImg3.name = allProducts[num3].name;
    // allProducts[num3].shows++;
}
showRandomProducts();


//Create click handler function
var totalClicks = 0;
function handleClick(event){
    var product = event.target.name;
    console.log(event.target.name);
    for(var i=0; i<allProducts.length; i++){
        if(allProducts[i].name === product){
            allProducts[i].clicks++;
        }
    }
    totalClicks++;
    if(totalClicks === 25){
        productImg1.removeEventListener('click', handleClick);
        productImg2.removeEventListener('click', handleClick);
        productImg3.removeEventListener('click', handleClick);
        totalClicks = 0;
        canvasChart.style.display='block';
        pic1.style.display='none';
        pic2.style.display='none';
        pic3.style.display='none';
    }

    updateChart();
    drawChart();
    showRandomProducts();
}

//Create event listener and handler function
productImg1.addEventListener('click', handleClick);
productImg2.addEventListener('click', handleClick);
productImg3.addEventListener('click', handleClick);

//Function to update chart with new click data
function updateChart(){
    for(var i=0; i<allProducts.length; i++){
        clickArray[i]=allProducts[i].clicks;
        productArray[i]=allProducts[i].name;
    }
}


//Create chart data
var clickArray=[];
var productArray=[];

//Data list for chart function input
var data = {
    labels: productArray, // titles array we declared earlier
    datasets: [
        {
            data: clickArray, // votes array we declared earlier
            backgroundColor: [
                'bisque',
                'darkgray',
                'burlywood',
                'lightblue',
                'navy',
                'bisque',
                'darkgray',
                'burlywood',
                'lightblue',
                'navy',
                'bisque',
                'darkgray',
                'burlywood',
                'lightblue',
                'navy',
                'navy',
                'bisque',
                'darkgray',
                'burlywood',
                'lightblue',
                'navy',
            ],
            borderColor: [
                'black'
            ],
        }]
};


//Create function to draw chart using options and data lists
function drawChart(){
    var ctx = document.getElementById('productChart').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: data,

        options: {
            tooltips:{
                xLabel: 'Number of Votes' 
            },
            legend:{
                display: false
            },
            layout:{
                padding:{
                    top: 0,
                    left: 100,
                    right: 100,
                    bottom: 25
                }
            },
            title:{
                display: true,
                text: 'Product Popularity by Votes',
                fontSize: 24
            },
            scales: {
                xAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Number of Votes',
                        fontSize: 14
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1.0
                    }
                }]
            }
        }
    });
}
