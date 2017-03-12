  const neural = require('./simple/Network.js');
  const network = new neural.Network();

  network.addLayer(10, 40);
  network.addLayer(4);

  const zero = [
    0, 1, 1, 0,
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
    0, 1, 1, 0
  ];

  const one = [
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0
  ];

  const two = [
    0, 1, 1, 0,
    1, 0, 0, 1,
    0, 0, 1, 0,
    0, 1, 0, 0,
    1, 1, 1, 1
  ];

  const three = [
    1, 1, 1, 1,
    0, 0, 0, 1,
    0, 1, 1, 1,
    0, 0, 0, 1,
    1, 1, 1, 1
  ];

  network.train([
    [  zero,    [0, 0, 0, 0]  ],
    [  one,     [0, 0, 0, 1]  ],
    [  two,     [0, 0, 1, 0]  ],
    [  three,   [0, 0, 1, 1]  ],
  ]);


  // Querying the network
  const outputs = network.process([
    1, 1, 1, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 1, 1, 0
  ]);
  // outputs === [~0, ~0]

  // Convert the output to binary (base 2) and then to decimal (base 10).
  const binary  = outputs.map(item => Math.round(item)).join("");
  const decimal = parseInt(binary, 2);

  console.log("Recognized", decimal, outputs);
