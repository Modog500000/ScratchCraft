os.loadAPI("json")
local web = ""
local ws,err = http.websocket(web)
if ws then
    while true do
        local msg = ws.receive()
        local obj = json.decode(msg)
        local func = loadstring(obj["func"])
        func()
    end
end
 
