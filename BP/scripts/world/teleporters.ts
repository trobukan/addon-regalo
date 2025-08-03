import { system, world, Vector3, Vector2 } from "@minecraft/server";
import * as utils from "../utils/areaCheck";

type TeleportArea = {
    name: string;
    areaStart: Vector3;
    areaEnd: Vector3;
    end: Vector3;
    minVelocity: number;
    rotation: Vector2,
};

const debounceMap = new Map<string, boolean>();

function canTeleport(playerId: string): boolean {
    return debounceMap.get(playerId) !== true;
}

function setDebounce(playerId: string, value: boolean) {
    debounceMap.set(playerId, value);
}

const teleporters: TeleportArea[] = [
    {
        name: "passage_to_934",
        areaStart: { x: 8, y: -58, z: -46 },
        areaEnd: { x: 9, y: -56, z: -45 },
        end: { x: -139.5, y: -58, z: -55 },
        minVelocity: 0.26,
        rotation: { x: 0, y: 90 }
    },
    {
        name: "passage_to_10",
        areaStart: { x: -140, y: -58, z: -56 },
        areaEnd: { x: -140, y: -56, z: -55 },
        end: { x: 8.5, y: -58, z: -45 },
        minVelocity: 0.26,
        rotation: { x: 0, y: 90 }
    }
];

export function checkTeleports(): void {
    for (const player of world.getPlayers()) {
        let velocity: Vector3 = player.getVelocity();
        let speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);

        for (const tp of teleporters) {
            const isMovingEnough: boolean = speed > tp.minVelocity;
            const isInArea: boolean = utils.isPlayerInArea(player.location, tp.areaStart, tp.areaEnd);

            if (isInArea && isMovingEnough && canTeleport(player.id)) {
                setDebounce(player.id, true);

                player.teleport(
                    tp.end, {
                    rotation: tp.rotation,
                    dimension: world.getDimension("overworld"),

                });
                system.runTimeout(() => {
                    world.getDimension("overworld").playSound(
                        "random.orb",
                        player.location,
                        {
                            volume: 1,
                            pitch: 0.1
                        })
                }, 1)

                system.runTimeout(() => {
                    setDebounce(player.id, false);
                }, 20);

            };
        };
    };
};