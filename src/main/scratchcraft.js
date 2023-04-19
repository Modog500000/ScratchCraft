var connected = false
var ws = ''
var socket = ''
(function(Scratch) {
  'use strict';

  class ScratchCraft {
    getInfo () {
      return {
        id: 'scratchcraft',
        name: 'ScratchCraft',
        color1: "#e6c71c",
        color2: "#c4ab1a",
        blocks: [
          {
            opcode: 'connectPostHTTP',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Post HTTP To [URL] with data [DATA]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://',
              },
            DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'return Lorem Ipsum',
              },
            },
            filter: [Scratch.TargetType.SPRITE],
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
                defaultValue: 'return Lorem Ipsum',
              },
            },
          },
          {
					 opcode: 'getComState',
					 blockType: "Boolean",
					 text: 'Connected?',
				  },
          {
            opcode: 'get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'GET [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/hello.txt'
              }
            }
          }
        ]
      };
    }

    get (args) {
      return Scratch.fetch(args.URL)
        .then(r => r.text())
        .catch(() => '');
    }
    connectWS (args) {
      let ws = new WebSocket(args.URL)
      ws.onopen = function(e) {
        ws.send('return sleep(0.05)')
        console.log('Established Websocket Connection & Sent Data')
        connected = true
        return true;
      }
    }
    sendWS (args) {
      socket.send(args.DATA)
      return true;
    }
    connectPostHTTP (args) {
      let ws = new WebSocket(args.URL)
      ws.onopen = function(e) {
        ws.send(args.DATA)
        console.log('Established Websocket Connection & Sent Data')
        connected = true
        return true;
      }
    }
    getComState (args) {
      return connected;
    }
  }
  Scratch.extensions.register(new ScratchCraft());
})(Scratch);
