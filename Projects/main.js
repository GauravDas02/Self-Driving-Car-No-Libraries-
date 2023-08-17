const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas=document.getElementById("networkCanvas");
carCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2, carCanvas.width*0.9);  //Center is at half the length of canvas width and the allotted width for the canvas is the whole width
//const car = new Car(road.getLaneCenter(1),100,30,50,"AI");     //X coordinate of car, y coordinate of car, width of car and height of car respectively
                                                          //All the values are in pixel
const N=1000;
const cars = generateCars(N);

let bestCar = cars[0];

if(localStorage.getItem("bestBrain")){
    for(let i=0; i<cars.length; i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));              //we are parsing the JSON string because the local storage only works with strings
    
        if(i!=0){                       //since the bestBrain is stored at index 0
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(1),-750,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY", 2),
];

//car.draw(ctx);

animate();

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain))
}

function discard(){
    localStorage.removeItem("bestCar.brain");
}

function generateCars(N){
    const cars=[];

    for(let i=1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){                     //'time' value comes from requestAnimationFrame(animate); towards the bottom of this code/function block
    for(let i=0; i<traffic.length; i++){    //to go through all the cars in our traffic
        traffic[i].update(road.borders, []);    //and to make each of them aware of the borders
    }

    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders, traffic);
    }

    bestCar=cars.find(                      //fitness function
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );

    carCanvas.height=window.innerHeight;   //moving it here from the header part helps us to fill the canvas completely to the size of the page as written
                                        //by the code; and it also helps to clear the previous canvas's so that we don't see the history of the car(here)
    
    networkCanvas.height=window.innerHeight;
    
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    road.draw(carCtx);
    
    for(let i=0; i<traffic.length; i++){    
        traffic[i].draw(carCtx, "red");    
    }
    
    carCtx.globalAlpha=0.2;
    for(let i=0; i<cars.length; i++){
        cars[i].draw(carCtx, "blue");                      //So that the road comes first before the car is brought into the canvas
                                        //Calls the animate method again and again, many times per second and gives the illusion
                                        //of movement that we want/coded here
    }

    carCtx.globalAlpha=1;
    bestCar.draw(carCtx, "blue",true);             

    carCtx.restore();
    
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    
    requestAnimationFrame(animate);     
}