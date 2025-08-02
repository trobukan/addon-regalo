		import { world, Vector3 } from "@minecraft/server";
import * as utils from "../utils/areaCheck";

type TeleportArea = {
    name: string;
    areaStart: Vector3;
    areaEnd: Vector3;
    end: Vector3;
    minVelocity: number;
};

const teleporters: TeleportArea[] = [
    {
        name: "spawnIntro",
        areaStart: { x: 8, y: -58, z: -46 },
        areaEnd: { x: 9, y: -56, z: -45 },
        end: { x: 0, y: -60, z: 0 },
        minVelocity: 0.26,
    },
];

export function checkTeleports(): void {
    for (const player of world.getPlayers()) {
        let velocity: Vector3 = player.getVelocity();
        let speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);

        for (const tp of teleporters) {
            const isMovingEnough: boolean = speed > tp.minVelocity;
            const isInArea: boolean = utils.isPlayerInArea(player.location, tp.areaStart, tp.areaEnd);

            if (isInArea && isMovingEnough) {
                try {
                    player.teleport(tp.end);
                } catch (error) {
                    console.warn(`[ERRO] failed on running the cmd: ${error}`);
                };

            };
        };
    };
};