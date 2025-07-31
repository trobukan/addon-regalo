import { Vector3 } from "@minecraft/server";

export function isPlayerInArea(location: Vector3, start: Vector3, end: Vector3): boolean {
    const roundedLoc = {
        x: Math.floor(location.x),
        y: Math.floor(location.y),
        z: Math.floor(location.z)
    };

    return (
        roundedLoc.x >= Math.min(start.x, end.x) &&
        roundedLoc.x <= Math.max(start.x, end.x) &&
        roundedLoc.y >= Math.min(start.y, end.y) &&
        roundedLoc.y <= Math.max(start.y, end.y) &&
        roundedLoc.z >= Math.min(start.z, end.z) &&
        roundedLoc.z <= Math.max(start.z, end.z)
    );
}
