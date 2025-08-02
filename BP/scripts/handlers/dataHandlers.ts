	import { Player } from "@minecraft/server";
import { EventHandler } from "./core/handlerTypes"

export const dataHandlers: EventHandler = {
    "data:get": (player, message) => {
        player.sendMessage(`§b${message}: §f${player.getDynamicProperty(message)}`)
    },
    "data:getAll": (player, message) => {
        player.getDynamicPropertyIds().forEach((id) => {
            const value = player.getDynamicProperty(id);
            player.sendMessage(`§b${id}: §f${value}`)
        })
    },
    "data:remove": (player, message) => {
        player.setDynamicProperty(message)
        player.sendMessage(`§b${message} §fhas been removed`)
    },
    "data:reset": (player, message) => {
        player.clearDynamicProperties()
    },
    "data:set": (player, message) => {
        const arg = message.split(" ")
        player.setDynamicProperty(arg[0], arg[1])
    },

};
