import { world, system } from "@minecraft/server";
import { checkTeleports } from "./teleporters";

import { debugPlayers } from "./utils/debug"
import * as playerData from "./playerData"


world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) return;
    playerData.init(event.player)

})

system.runInterval(() => {
    checkTeleports();
    debugPlayers();
}, 1);


// data:reset
// data:remove
// data:set
// data:getAll
// quest:reward
// quest:next
system.afterEvents.scriptEventReceive.subscribe((event) => {
    console.warn(event.id, event.initiator.nameTag, event.message)
})


