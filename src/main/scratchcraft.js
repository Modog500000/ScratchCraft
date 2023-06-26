(function(Scratch) {
  'use strict'
  var connected = false
  var ws = ''
  var SCdata = '';

  class ScratchCraft {
    getInfo() {
      return {
        id: 'scratchcraft',
        name: 'ScratchCraft',
        color1: "#f79c25",
        color2: "#db9a2a",
        docsURI: 'https://github.com/Modog500000/ScratchCraft/wiki',
        blocks: [
          {
            opcode: 'connectPostHTTP',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Send WS To [URL] with data [DATA]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://',
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'return turtle.forward()',
              },
            },
          },
          {
            opcode: 'returnWSTo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Return [DATA] to [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://',
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'turtle.forward()',
              },
            },
          },
          {
            opcode: 'connectWS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Connect to [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://',
              },
            },
          },
          {
            opcode: 'sendWS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Send [DATA]',
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'return turtle.forward()',
              },
            },
          },
          {
            opcode: 'returnWS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Return [DATA]',
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'turtle.forward()',
              },
            },
          },
          {
            opcode: 'reciveWS',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Recive from [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://',
              },
            },
          },
          {
            opcode: 'disconnect',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Disconnect',
          },
          {
            opcode: 'getComState',
            blockType: "Boolean",
            text: 'Connected?',
          },
        ]
      };
    }
    connectWS(args) {
      ws = new WebSocket(args.URL)
      ws.onopen = function(e) {
        connected = true
        console.log('Established Websocket Connection')
        return true;
      }
      return false;
    }
    disconnect(args) {
      ws = ''
      connected = false
      return true;
    }
    sendWS(args) {
      ws.send(args.DATA)
      return true;
    }
    returnWS(args) {
        ws.send(''.concat('return ', args.DATA))
      return true;
    }
    connectPostHTTP(args) {
      const wso = new WebSocket(args.URL)
      wso.onopen = function(e) {
        wso.send(args.DATA)
        console.log('Established Websocket Connection')
        connected = true
        return true;
      }
      return false;
    }
    returnWSTo(args) {
      const wso = new WebSocket(args.URL)
      wso.onopen = function(e) {
        wso.send(''.concat('return ', args.DATA))
        console.log('Established Websocket Connection')
        connected = true
        return true;
      }
      return false;
    }
    reciveWS(args) {
      const ws = new WebSocket(args.URL)
      ws.onopen = function(e) {
        ws.onmessage = function(event) {
          SCdata = (`${event.data}`)
          connected = true
          return SCdata;
        }
      }
      return SCdata;
    }
    getComState(args) {
      return connected;
    }
    onClose() {
        ws.onclose = function(e2) {
          connected = false;
      }
    }
  }
  Scratch.extensions.register(new ScratchCraft());
})(Scratch);
