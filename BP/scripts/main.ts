import { world, system, Player } from "@minecraft/server";

import * as playerData from "./player/data";
import { checkTeleports } from "./system/teleporters";
import { debugPlayers } from "./utils/debug";
import { eventHandlers } from "./handlers/core/index";

world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) return;
    playerData.init(event.player);

})

system.runInterval(() => {
    checkTeleports();
    debugPlayers();
}, 1);


system.afterEvents.scriptEventReceive.subscribe((event) => {
    const id = event.sourceEntity.id;
    const player = world.getPlayers().find(player => player.id === id)
    const message = event.message;
    const handler = eventHandlers[event.id];

    if (!player) {
        console.warn(`No player found with id: ${id}`)
    };

    if (!handler) {
        console.warn(`Unknown ID:${event.id}`)
    };

    try {
        handler(player, message);
    } catch (err) {
        console.error(`Error handling "${event.id}":`, err);
    };
})

