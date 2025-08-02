import { Player } from "@minecraft/server"

type playerDataDefaults = {
    "quest:progress": number,
    "player:initialized": boolean
};

const defaultData: playerDataDefaults = {
    "quest:progress": 0,
    "player:initialized": true
};

export function init(player: Player): void {
    const initialized = player.getDynamicProperty("player:initialized")
    if (initialized) return;

    player.setDynamicProperties(defaultData)
};

