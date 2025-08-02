import { world, Player } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { EventHandler } from "./core/handlerTypes"
import { dataHandlers } from "./dataHandlers"

export const debugHandlers: EventHandler = {
    "debug:menu": (player, message) => {
        openDataMenu(player)
    }
};

function openDataMenu(player: Player): void {
    const form = new ActionFormData()
        .title("Debug Painel")
        .button("Init properties")
        .button("Get property")
        .button("Get all property")
        .button("Set property")
        .button("Remove property")
        .button("Clean properties");

    form.show(player).then(res => {
        if (res.canceled) return;

        switch (res.selection) {
            case 0:
                inputInit(player);
                break
            case 1:
                inputGet(player);
                break;
            case 2:
                inputGetAll(player)
                break;
            case 3:
                inputSet(player);
                break;
            case 4:
                inputRemove(player);
                break;
            case 5:
                inputClean(player);
                break;
        }
    });
}

function inputInit(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Init property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex })

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex]
        const targetPlayer = players.find(p => p.name === selectedName);

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        dataHandlers["data:init"](player, "", targetPlayer);
    })
}

function inputGet(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Get property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex })
        .textField("Value", "e.g.: story:progress");

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex];
        const targetPlayer = players.find(p => p.name === selectedName);

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        const prop = res.formValues[1]?.toString().trim();
        if (prop) {
            dataHandlers["data:get"](player, prop, targetPlayer);
        } else {
            player.sendMessage("§cValue field is missing .");
        }
    });
};

function inputGetAll(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Get all property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex })

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex];
        const targetPlayer = players.find(p => p.name === selectedName);

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        dataHandlers["data:getAll"](player, "", targetPlayer);
    });
};

function inputSet(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Set property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex })
        .textField("Name", "e.g.: story:progress")
        .textField("Value", "e.g.: 5");

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex];
        const targetPlayer = players.find(p => p.name === selectedName);

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        const key = res.formValues[1]?.toString().trim();
        const value = res.formValues[2]?.toString().trim();
        if (key && value) {
            dataHandlers["data:set"](player, `${key} ${value}`, targetPlayer);
        } else {
            player.sendMessage("§cEither key or value field is missing.");
        }
    });
}

function inputRemove(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Remove property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex })
        .textField("Value", "e.g.: story:progress");

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex];
        const targetPlayer = players.find(p => p.name === selectedName);

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        const prop = res.formValues[1]?.toString().trim();
        if (prop) {
            dataHandlers["data:remove"](player, prop, targetPlayer);
        } else {
            player.sendMessage("§cValue field is missing");
        }
    });
}

function inputClean(player: Player): void {
    const { players, playerNames, defaultIndex } = getPlayerDropdownData(player);

    const form = new ModalFormData()
        .title("Init property")
        .dropdown("Target", playerNames, { defaultValueIndex: defaultIndex });

    form.show(player).then(res => {
        if (res.canceled) return;

        const selectedIndex = res.formValues[0] as number;
        const selectedName = playerNames[selectedIndex]
        const targetPlayer = players.find(p => p.name === selectedName)

        if (!targetPlayer) {
            player.sendMessage(`§cCould not find player "${selectedName}".`);
            return;
        };

        dataHandlers["data:clean"](player, "", targetPlayer);
    })
}

function getPlayerDropdownData(current: Player) {
    const players = world.getPlayers();
    const playerNames = players.map(p => p.name);
    const defaultIndex = playerNames.indexOf(current.name);
    return { players, playerNames, defaultIndex };
}


world.afterEvents.itemUse.subscribe((event) => {
    const player = event.source;
    const item = event.itemStack;

    if (!player || item.typeId !== "debug:stick") return;

    const handler = debugHandlers["debug:menu"];
    if (handler) handler(player);
})