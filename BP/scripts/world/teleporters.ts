import { system, world, Vector3, Vector2 } from "@minecraft/server";
import { SOUNDS } from "../vanilla/sounds"
import { EFFECTS } from "../vanilla/effects"
import * as utils from "../utils/player";

const debounceMap = new Map<string, boolean>();

function canTeleport(playerId: string): boolean {
    return debounceMap.get(playerId) !== true;
}

function setDebounce(playerId: string, value: boolean) {
    debounceMap.set(playerId, value);
}

const teleporters = [
    {
        name: "passage_to_934",
        areaStart: { x: 8, y: -58, z: -46 },
        areaEnd: { x: 9, y: -56, z: -45 },
        end: { x: -59.5, y: -58, z: -45 },
        minVelocity: 0.26,
        rotation: { x: 0, y: 90 },

        addEffect: (player) => {
            const duration = 30;
            player.addEffect(EFFECTS.BLINDNESS, duration, {
                showParticles: false
            })
        }
    },
    {
        name: "passage_to_10",
        areaStart: { x: -60, y: -58, z: -46 },
        areaEnd: { x: -60, y: -56, z: -45 },
        end: { x: 8.5, y: -58, z: -45 },
        minVelocity: 0.26,
        rotation: { x: 0, y: 90 },

        addEffect: (player) => {
            const duration = 30;
            player.addEffect(EFFECTS.BLINDNESS, duration, {
                showParticles: false
            });
        }
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

                tp.addEffect(player)

                player.teleport(
                    tp.end, {
                    rotation: tp.rotation,
                    dimension: world.getDimension("overworld"),

                });
                system.runTimeout(() => {
                    world.getDimension("overworld").playSound(
                        SOUNDS.RANDOM_ORB,
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