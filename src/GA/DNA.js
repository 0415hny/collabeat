const rows = 7;
const cols = 16;
const total = rows * cols;

export default function DNA(genes) {
  this.fitness = 0.0;
  this.genes = genes ? genes : populateMatrix();
  console.log({ genes: this.genes });

  this.calculateFitness = (target) => {
    let score = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // if similar to our targets, increase score
        if (this.genes[i][j] === target[i][j]) score++;
      }
    }

    this.fitness = score / total;
  };

  this.crossover = (partner) => {
    let child = populateMatrix();
    //now child should have randome genes
    //iterate thorugh each row of the matrix and populate child
    //with some genes from this and some from partner
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let midpoint = Math.floor(Math.random() * Math.floor(16)); //[0,15]
        if (j > midpoint) child[i][j] = this.genes[i][j];
        else child[i][j] = partner[i][j];
      }
    }
    return new DNA(child);
  };

  this.mutate = (mutationRate) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() < mutationRate) {
          this.genes[i][j] = Math.floor(Math.random() * Math.floor(2));
        }
      }
    }
  };
}

export const populateMatrix = () => {
  // empty matrix with 0s
  let genes = Array.from({ length: rows }, (x) =>
    Array.from({ length: cols }, (x) => 0)
  );
  // fill in with random genes (0 or 1)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      genes[i][j] = Math.floor(Math.random() * Math.floor(2)); //randint [0,1]
    }
  }
  return genes;
};
