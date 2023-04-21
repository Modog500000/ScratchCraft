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
            opcode: 'returnWS',
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
            text: 'Send [DATA] to websocket',
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'return turtle.forward()',
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
        ws.send(args.DATA)
        connected = true
        console.log('Established Websocket Connection')
        return true;
      }
    }
    sendWS(args) {
      ws.send(args.DATA)
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
    }
    returnWS(args) {
      const ws = new WebSocket(args.URL)
      ws.onopen = function(e) {
        let string1 = ""
        ws.send(''.concat('return ', args.DATA))
        console.log('Established Websocket Connection')
        connected = true
        return true;
      }
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
