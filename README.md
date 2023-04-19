# ScratchCraft
![logo](https://github.com/Modog500000/ScratchCraft/blob/main/src/resources/scratchcraft.png?raw=true)
ScratchCraft is an extension for adacraft. It adds the ability to send commands from scratch into minecraft with the Computer Craft Mod.
It should work in other scratch mods as well.


### Links

[Adacraft](https://adacraft.org)

[Example project in Adacraft](https://adacraft.org/studio/?project=a8c3a082&extension=https%3A%2F%2Fscratchcraft.modog500000.repl.co%2Fbeta.js)

[CC Tweaked](https://tweaked.cc)


### Geting Started

First things first you will need three things, a scratch project with the extension, a server, and minecraft with CC Tweaked installed.

1. Open a compatible scratch mod, some of these include:
  Adacraft
  Turbowarp

2. Click add extensions, scroll to the bottom and click custom extension, then put in the link "https://scratchcraft.modog500000.repl.co/beta.js"

3. Go to [replit](https://replit.com) and create a new replit, you need to make an account if you dont have one. Make it a Node.Js project. Create
or edit a file named index.js and add the code from server index.

4. Launch minecraft with CC Tweaked installed, put down a computer and run "pastebin run 7keUMF7p" then the computer will restart. Click terminate in the
top left, then run "edit startup" then in the startup the second line will say " local web = "" " put in the webview link in the quotation marks and replace https with wss. Ex: local web = "wss://scratchcraft.modog500000.repl.co"

5. In scratch grab the Send data to block and in the link area put in your websocket "wss://scratchcraft.modog500000.repl.co" then any text must have return before it then any code in lua and it will run it. Do NOT send empty data or your script on the computer will crash. If it crashes then restart
the computer.

### Blocks
Send data to WebSocket block 

![block](https://github.com/Modog500000/ScratchCraft/blob/main/src/resources/image_2023-04-18_194947656.png?raw=true)

Block that tells you whether or not you are connected to a WebSocket, Will be more usefull when Send and Connect block are added.

![block](https://github.com/Modog500000/ScratchCraft/blob/main/src/resources/block2.png?raw=true)

### Credits
Most of this extension was made by peicing parts together and bugtesting.

Rixxyx- Used their extension as a reference for making extensions

ogadaki and other contibuters to Adacraft- for the amazing platform that this extension was made for!
