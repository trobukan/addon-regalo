import { world, Vector3 } from "@minecraft/server"

export function debugPlayers() {
    for (const player of world.getAllPlayers()) {
        let velocity: Vector3 = player.getVelocity()
        let speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)

        if (player.hasTag("debug")) {
            try {
                player.runCommand(`title @s actionbar ` +
                    `speed: ${Math.floor(speed * 1000)}` +
                    `\nname: ${player.name}`);
            } catch (error) {
                console.warn(`[ERRO] failed on running the cmd: ${error}`)
            }

        };
    };
};