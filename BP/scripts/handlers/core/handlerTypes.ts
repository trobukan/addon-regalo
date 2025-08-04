import { Player } from "@minecraft/server";

export type EventHandler = Record<string, (player: Player, message?: string, target?: Player) => void>;

