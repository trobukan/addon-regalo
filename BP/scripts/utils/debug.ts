import { world, Vector3 } from "@minecraft/server"

export function debugPlayers() {
    for (const player of world.getAllPlayers()) {
        const velocity: Vector3 = player.getVelocity()
        const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);

        if (player.hasTag("debug")) {

            const message = JSON.stringify({
                "rawtext": [
                    { "text": `> §bspeed: §f${speed.toFixed(3)}` },
                    { "text": `\n> §btags: §f${player.getTags()}` },
                    { "text": `\n> §bquest: §f${player.getDynamicProperty("quest:progress")}` }
                ]
            });
            try {
                player.runCommand(`titleraw @s actionbar ${message}`);

            } catch (error) {
                console.warn(`[ERROR] failed on running the cmd: ${error}`);
            }

        };
    };
};