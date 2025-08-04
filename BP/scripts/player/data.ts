import { Player } from "@minecraft/server";

type playerDataDefaults = {
    "story:progress": number,
    "player:initialized": boolean,
};

const defaultData: playerDataDefaults = {
    "story:progress": 0,
    "player:initialized": true,
};

export function init(player: Player, force?: boolean): void {
    const initialized = player.getDynamicProperty("player:initialized");
    if (initialized && !force) return;

    player.setDynamicProperties(defaultData);
};

