import { Player } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"
import { EventHandler } from "./core/handlerTypes"

export const debugHandlers: EventHandler = {
    "debug:menu": (player, message) => {
        openDebugMenu(player)
    }
}

function openDebugMenu(player: Player) {
    // TODO
}