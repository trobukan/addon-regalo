import { Vector3 } from "@minecraft/server";

export type TeleportArea = {
    name: string;
    areaStart: Vector3;
    areaEnd: Vector3;
    end: Vector3;
    minVelocity: number;
};

export const teleporters: TeleportArea[] = [
    {
        name: "spawnIntro",
        areaStart: { x: 8, y: -58, z: -46 },
        areaEnd: { x: 9, y: -56, z: -45 },
        end: { x: 0, y: -60, z: 0 },
        minVelocity: 0.24,
    },
];
