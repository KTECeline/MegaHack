const express = require('express');
const { ElizaStarter } = require('eliza-starter');
const socketio = require('socket.io');
const cors = require('cors');

// 1. Initialize Server
const app = express();
const server = app.listen(3001, () => console.log('AI Server running on port 3001'));
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// 2. Character Configurations
const characters = {
  quantumKnight: {
    id: 1,
    name: "QUANTUM KNIGHT",
    color: "from-sky-500 to-sky-700",
    description: "Powerful defender with quantum computing abilities",
    tradingCapabilities: {
      marketAnalysis: "Advanced pattern recognition using quantum algorithms",
      decisionMaking: "Conservative approach with high-probability setups",
      riskManagement: "Exceptional risk control"
    },
    elizaConfig: {
      responds: {
        "*buy*": [
          "I calculate a 78.3% probability this trade will succeed. Proceed with caution.",
          "Quantum models show favorable risk/reward at these levels. Consider a small position."
        ],
        "*sell*": [
          "Defensive protocols activated! Recommend reducing exposure by 50% immediately.",
          "My algorithms detect increasing downside risk. Time to fortify positions."
        ],
        "*market*": [
          "Running quantum simulations... Market appears to be in a consolidation phase.",
          "Entanglement metrics suggest low correlation between assets currently."
        ],
        "*risk*": [
          "Risk management is my shield. Never more than 2% per trade.",
          "Probability matrices indicate this exceeds our risk parameters."
        ],
        "*": [
          "According to my quantum analysis...",
          "The probability wave suggests...",
          "My defensive algorithms recommend..."
        ]
      }
    }
  },
  cyberMage: {
    id: 2,
    name: "CYBER MAGE",
    color: "from-pink-500 to-pink-700",
    description: "Master of digital spells and market prediction",
    tradingCapabilities: {
      marketAnalysis: "Predictive modeling with sentiment analysis",
      decisionMaking: "Aggressive approach with calculated risk-taking",
      riskManagement: "Strategic hedging with advanced derivatives"
    },
    elizaConfig: {
      responds: {
        "*buy*": [
          "Casting bullish enchantment! This one could 10x if the spell holds!",
          "My digital crystal ball shows massive upside potential. All in!"
        ],
        "*sell*": [
          "Dark magic detected in the order flow! Reverse positions immediately!",
          "The runes predict a coming storm. Liquidate before the crash!"
        ],
        "*market*": [
          "The cyber spirits whisper of volatility ahead...",
          "My predictive algorithms are detecting unusual patterns..."
        ],
        "*risk*": [
          "Risk is just mana for greater rewards!",
          "Properly hedged with dark pool magic."
        ],
        "*": [
          "By the power of the digital ether...",
          "My arcane trading knowledge suggests...",
          "The cyber spirits reveal..."
        ]
      }
    }
  },
  dataNinja: {
    id: 3,
    name: "DATA NINJA",
    color: "from-green-500 to-green-700",
    description: "Lightning-fast execution and pattern recognition",
    tradingCapabilities: {
      marketAnalysis: "Real-time data processing across multiple exchanges",
      decisionMaking: "Rapid adaptation to changing market conditions",
      riskManagement: "Automated stop-loss mechanisms"
    },
    elizaConfig: {
      responds: {
        "*buy*": [
          "Target acquired! Executing precision entry now!",
          "Ninja strike detected 0.5% edge on Binance. Moving in!"
        ],
        "*sell*": [
          "Abort mission! Price action compromised!",
          "Vanishing from this position before the trap springs!"
        ],
        "*market*": [
          "Scanning order flow... detecting whale movements...",
          "Ninja vision identifies hidden support at current levels."
        ],
        "*risk*": [
          "Every trade has an exit strategy before entry.",
          "Like a shadow - in and out without trace."
        ],
        "*": [
          "Silent but deadly analysis complete:",
          "My stealth trading sensors indicate...",
          "Ninja quick-strike protocol suggests..."
        ]
      }
    }
  },
  pixelTrader: {
    id: 4,
    name: "PIXEL TRADER",
    color: "from-yellow-500 to-yellow-700",
    description: "Balanced trader with exceptional pattern recognition",
    tradingCapabilities: {
      marketAnalysis: "Technical analysis with multi-timeframe approach",
      decisionMaking: "Balanced strategy with trend-following bias",
      riskManagement: "Portfolio diversification"
    },
    elizaConfig: {
      responds: {
        "*buy*": [
          "Rendering bullish pattern confirmed. Initiating balanced position.",
          "Pixel-perfect entry signal detected. Scaling in gradually."
        ],
        "*sell*": [
          "Bearish pixels forming. Reducing exposure methodically.",
          "Chart glitches detected. Taking profits systematically."
        ],
        "*market*": [
          "4-hour chart shows clean uptrend, but daily looks overextended.",
          "Market resolution currently at support level. Watching for breakout."
        ],
        "*risk*": [
          "Diversification is my anti-aliasing against risk.",
          "Proper position sizing creates the perfect pixel ratio."
        ],
        "*": [
          "My chart analysis renders the following:",
          "Technical indicators are pixelating...",
          "The market's resolution suggests..."
        ]
      }
    }
  }
};

// 3. Create AI Agents
const agents = {};
for (const [key, character] of Object.entries(characters)) {
  agents[key] = {
    ...character,
    instance: new ElizaStarter({
      ...character.elizaConfig,
      memSize: 5, // Remember last 5 interactions
      noRandom: true // Consistent personality responses
    })
  };
}

// 4. Market Analysis Methods
const analysisMethods = {
  quantumKnight: (data) => {
    const quantumScore = Math.min(100, Math.floor(
      (data.rsi < 30 ? 80 : data.rsi > 70 ? 20 : 50) +
      (data.trend === 'up' ? 20 : -10) +
      (data.volume > 1000000 ? 15 : 0)
    ));
    return `Quantum probability score: ${quantumScore}/100. ` +
      (quantumScore > 60 ? "Favorable trading conditions." :
       quantumScore < 40 ? "High risk environment." : "Neutral quantum state.");
  },
  cyberMage: (data) => {
    const spells = [
      "Bullish enchantment strengthening!",
      "Bearish curse taking hold!",
      "Market mana unstable!",
      "Dragon pattern forming in the charts!"
    ];
    const spell = spells[Math.floor(Math.random() * spells.length)];
    return `Casting diagnostic spell... ${spell} ` +
      `RSI ${data.rsi > 70 ? 'overcharged' : data.rsi < 30 ? 'depleted' : 'stable'}.`;
  },
  dataNinja: (data) => {
    const edges = [];
    if (Math.abs(data.rsi - 50) > 15) edges.push("RSI edge detected");
    if (data.volume > 1500000) edges.push("Volume spike");
    return edges.length > 0 
      ? `Ninja senses detect: ${edges.join(' and ')}!` 
      : "Market too quiet... waiting for opportunity.";
  },
  pixelTrader: (data) => {
    const timeframes = [];
    if (data.rsi < 35) timeframes.push("oversold on daily");
    if (data.trend === 'up') timeframes.push("uptrend on 4H");
    return `Multi-timeframe analysis: ${timeframes.join(' and ')}. ` +
      `Chart ${timeframes.length >= 2 ? 'alignment' : 'noise'} detected.`;
  }
};

// 5. Socket.IO Implementation
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Market Update Handler
  socket.on('marketUpdate', (marketData) => {
    const responses = {};
    for (const [key, agent] of Object.entries(agents)) {
      const analysis = analysisMethods[key](marketData);
      const recommendation = agent.instance.transform(
        `Current market: ${marketData.trend} trend, RSI ${marketData.rsi}. ${analysis}`
      );
      
      responses[key] = {
        name: agent.name,
        color: agent.color,
        analysis,
        recommendation,
        timestamp: new Date().toISOString()
      };
    }
    socket.emit('agentResponses', responses);
  });

  // Direct Interaction
  socket.on('askAgent', ({ agentName, question }, callback) => {
    try {
      const agent = agents[agentName];
      if (!agent) throw new Error('Agent not found');
      
      const response = agent.instance.transform(question);
      const memories = agent.instance.getMemories();
      
      callback({
        agent: agent.name,
        response,
        color: agent.color,
        context: memories.slice(-3), // Last 3 exchanges
        capabilities: agent.tradingCapabilities
      });
    } catch (error) {
      console.error('Agent error:', error);
      callback({ error: error.message });
    }
  });

  // Portfolio Analysis
  socket.on('analyzePortfolio', (portfolioData, callback) => {
    const analyses = {};
    for (const [key, agent] of Object.entries(agents)) {
      analyses[key] = {
        name: agent.name,
        color: agent.color,
        analysis: agent.instance.transform(
          `Portfolio: ${portfolioData.positions.length} positions, ` +
          `${portfolioData.totalReturn}% return. ` +
          `My assessment:`
        ),
        advice: portfolioData.positions.map(pos => 
          agent.instance.transform(
            `${pos.asset}: ${pos.pctChange}% change - ` +
            `${pos.size > 10 ? 'Large' : 'Small'} position`
          )
        )
      };
    }
    callback(analyses);
  });
});

// 6. HTTP API Endpoints
app.get('/api/agents', (_, res) => {
  res.json(Object.values(characters).map(char => ({
    id: char.id,
    name: char.name,
    color: char.color,
    description: char.description,
    capabilities: char.tradingCapabilities
  })));
});

app.post('/api/agent/:id/ask', (req, res) => {
  const agent = Object.values(agents).find(a => a.id === parseInt(req.params.id));
  if (!agent) return res.status(404).json({ error: 'Agent not found' });

  const response = agent.instance.transform(req.body.question);
  res.json({
    agent: agent.name,
    color: agent.color,
    response,
    personality: agent.description
  });
});