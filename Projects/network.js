class NeuralNetwork{
    constructor(neuronCounts){       //neuronCounts is the number of neurons in each level
        this.levels=[];

        for(let i=0;i<neuronCounts.length-1;i++){       //specifying the input and output (neuron) count
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs,network){
        let outputs = Level.feedForward(
            givenInputs,network.levels[0]
        );

        for(let i=1; i<network.levels.length; i++){
            outputs=Level.feedForward(
                outputs,network.levels[i]       //using the previous output for the input of the new level
            );
        }

        return outputs;
    }

    static mutate(network,amount=1){         //amount=1 or 100% randomizes everything in the network, whereas a value like 10% gives a network close to the bestBrain network
        network.levels.forEach(level => {
            for(let i=0; i<level.biases.length; i++){
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                );
            }
            for(let i=0; i<level.weights.length; i++){
                for(let j=0; j<level.weights[i].length; j++){
                    level.weights[i][j]=lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    );
                }
            }
        });
    }
}

class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i=0; i<inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){   //we define it with a 'static' because we serialize functions/methods
        for(let i=0; i<level.inputs.length; i++)
        {
            for(let j=0; j<level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2-1;
            }
        }

        for(let i=0; i<level.biases.length; i++)
        {
            level.biases[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs, level){
        for(let i=0; i<level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        for(let i=0; i<level.outputs.length; i++){
            let sum = 0;
            for(let j=0; j<level.inputs.length;j++)     //to loop through the inputs
            {
                sum+=level.inputs[j]*level.weights[j][i];
            }

            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }
            
            else{
                level.outputs[i]=0;
            }
        }
        return level.outputs;
    }
}