import { world, system, Vector3, Player } from "@minecraft/server";

import { teleporters, TeleportArea } from "./teleporters";
import * as utils from "./utils/areaCheck";
import { debugPlayers } from "./utils/debug"

function checkTeleports(): void {
    for (const player of world.getPlayers()) {
        let velocity: Vector3 = player.getVelocity()
        let speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)

        for (const tp of teleporters) {
            const isMovingEnough: boolean = speed > tp.minVelocity;
            const isInArea: boolean = utils.isPlayerInArea(player.location, tp.areaStart, tp.areaEnd);

            if (isInArea && isMovingEnough) {
                try {
                    player.teleport(tp.end);
                } catch (error) {
                    console.warn(`[ERRO] failed on running the cmd: ${error}`)
                };

            };
        };
    };
};

system.runInterval(() => {
    checkTeleports();
    debugPlayers();
}, 1);



