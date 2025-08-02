import { Player } from "@minecraft/server";
import { EventHandler } from "./core/handlerTypes"

export const questHandlers: EventHandler = {
    "quest:reward": (player, message) => {
        player.runCommand(`give @s ${message} 1`);
    },
    "quest:next": (player, message) => {
        let number = player.getDynamicProperty("quest:progress");
        if (number === undefined) number = 0;
        if (typeof number !== "number") return;

        player.setDynamicProperty("quest:progress", number + 1);
    }
};
