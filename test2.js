const neural = require('./simple/Network.js');
const raw = [
  require('./digits/0.json').data,
  require('./digits/1.json').data,
  require('./digits/2.json').data,
  require('./digits/3.json').data,
  require('./digits/4.json').data,
  require('./digits/5.json').data,
  require('./digits/6.json').data,
  require('./digits/7.json').data,
  require('./digits/8.json').data,
  require('./digits/9.json').data
];


const network = new neural.Network();
network.addLayer(10, 40);
network.addLayer(4);

network.train([
  [  raw[0],    [0, 0, 0, 0]  ],
  [  raw[1],     [0, 0, 0, 1]  ],
  [  raw[2],     [0, 0, 1, 0]  ],
  [  raw[3],   [0, 0, 1, 1]  ],
]);

const outputs = network.process(raw[2]);
