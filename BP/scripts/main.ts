console.warn("main.ts loaded")

import { world, system, Vector3 } from "@minecraft/server";

import { teleporters, TeleportArea } from "./teleporters";
import * as utils from "./utils/areaCheck";

// function playerVelocityDebug(): void {
//     for (const player of world.getPlayers()) {
//         if (player.hasTag("debug")) {
//             let velocity = player.getVelocity()
//             player.sendMessage(`${velocity.x.toFixed(3)} ${velocity.z.toFixed(3)}`)
//         };
//     };
// };

function checkTeleports(): void {
    for (const player of world.getPlayers()) {
        let velocity: Vector3 = player.getVelocity()

        for (const tp of teleporters) {
            const isMovingEnough: boolean = Math.abs(velocity.x) > tp.minVelocity || Math.abs(velocity.z) > tp.minVelocity;
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
    //playerVelocityDebug();
}, 1);



