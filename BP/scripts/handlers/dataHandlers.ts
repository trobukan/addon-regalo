import { Player } from "@minecraft/server";
import { EventHandler } from "./core/handlerTypes"
import * as data from "../player/data"

export const dataHandlers: EventHandler = {
    "data:init": (player, message, target) => {
        data.init(target, true);
    },
    "data:get": (player, message, target) => {
        player.sendMessage(`§b${message}: §f${target.getDynamicProperty(message)}`)
    },
    "data:getAll": (player, message, target) => {

        if (target.getDynamicPropertyIds().length >= 1) {
            target.getDynamicPropertyIds().forEach((id) => {
                const value = player.getDynamicProperty(id);
                player.sendMessage(`§b${id}: §f${value}`)
            })
        } else {
            player.sendMessage(`${target.name} have no dynamic properties`)
        }

    },
    "data:remove": (player, message, target) => {
        target.setDynamicProperty(message, undefined)
        player.sendMessage(`§b${message} §bfrom ${target.name} §fhas been removed`)
    },
    "data:clean": (player, message, target) => {
        target.clearDynamicProperties()

    },
    "data:set": (player, message, target) => {
        const arg = message.split(" ")
        target.setDynamicProperty(arg[0], arg[1])
    },

};
