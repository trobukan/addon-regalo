import { Player } from "@minecraft/server";

export const questHandlers: Record<string, (player: Player, message: string) => void> = {
    "quest:reward": (player, message) => {
        player.runCommand(`give @s ${message} 1`)
    },
    "quest:next": (player, message) => {
        let number = player.getDynamicProperty("quest:progress")

        if (number === undefined) number = 0;
        if (typeof number !== "number") return;

        player.setDynamicProperty("quest:progress", number + 1)
    }
};
