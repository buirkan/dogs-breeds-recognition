const Brain = require('brain.js')
const network = new Brain.NeuralNetwork()

/* Training the network example */
network.train(
    [
        { input: [0, 0], output: [0] },
        { input: [0, 1], output: [1] },
        { input: [1, 0], output: [1] },
        { input: [1, 1], output: [0] },
    ]
)

const networkOutput = network.run()