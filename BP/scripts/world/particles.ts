import { world } from "@minecraft/server";
import * as utils from "../utils/player";
import { PARTICLES } from "../vanilla/particles";

export function spawnTrainSmoking(position): void {
    if (!utils.isPlayerNearby(position, 80)) return;
    try {
        world.getDimension("overworld").spawnParticle(PARTICLES.CAMPFIRE_SMOKE, position)
    } catch {
        return;
    }

}
