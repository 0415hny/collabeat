import DNA from "./DNA";
import { populateMatrix } from "./DNA";

export default function Selection() {
  // chosen constants
  this.mutationRate = 0.2;
  this.totalPopulation = 10;
  this.numGenerations = 5;

  // create a population with different DNAs
  this.population = Array.from(
    { length: this.totalPopulation },
    (x) => new DNA()
  );

  console.log({ pop: this.population });

  this.fittest = populateMatrix(); // fill it with random genes for now

  this.findFittest = (target) => {
    let maxFit = 0;
    for (let i = 0; i < this.totalPopulation; i++) {
      this.population[i].calculateFitness(target); //for each member calculate fitness
      if (this.population[i].fitness > maxFit) {
        maxFit = this.population[i].fitness;
        this.fittest = this.population[i].genes;
      }
    }
    return this.fittest;
  };

  this.matingPool = [];

  this.allowMating = () => {
    for (let i = 0; i < this.totalPopulation; i++) {
      let representationNum = this.population[i].fitness * 100; //based off of the fitness we are representing each population type in the mating pool
      for (let x = 0; x < representationNum; x++) {
        this.matingPool.push(this.population[i]);
      }
    }

    for (let i = 0; i < this.population; i++) {
      let indexA = Math.floor(
        Math.random() * Math.floor(this.matingPool.length())
      ); //random int from the mating population
      let indexB = Math.floor(
        Math.random() * Math.floor(this.matingPool.length())
      );
      let parentA = this.matingPool[indexA];
      let parentB = this.matingPool[indexB];

      let child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      this.population[i] = child; //replace the gene population with the child
    }
  };

  this.repeatSelection = () => {
    for (let i = 0; i < this.numGenerations; i++) {
      this.allowMating();
    }
  };
}
