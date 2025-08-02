import { EventHandler } from "./core/handlerTypes"

export const storyHandlers: EventHandler = {
    "story:reward": (player, message) => {
        player.runCommand(`give @s ${message} 1`);
    },
    "story:next": (player, message) => {
        let progress = player.getDynamicProperty("story:progress");
        if (progress === undefined) progress = 0;
        if (typeof progress !== "number") return;
        progress++

        player.setDynamicProperty("story:progress", progress);
    }
};
