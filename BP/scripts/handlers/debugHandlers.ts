import { Player } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { dataHandlers } from "./dataHandlers"
import { EventHandler } from "./core/handlerTypes"

export const debugHandlers: EventHandler = {
    "debug:menu": (player, message) => {
        openDataMenu(player)
    }
};

function openDataMenu(player: Player): void {
    const form = new ActionFormData()
        .title("Debug Painel")
        .button("Get property")
        .button("Get all property")
        .button("Set property")
        .button("Remove property")
        .button("Reset properties");

    form.show(player).then(res => {
        if (res.canceled) return;

        switch (res.selection) {
            case 0:
                inputGet(player);
                break;
            case 1:
                dataHandlers["data:getAll"](player, "");
                break;
            case 2:
                inputSet(player);
                break;
            case 3:
                inputRemove(player);
                break;
            case 4:
                dataHandlers["data:reset"](player, "");
                break;
        }
    });
}

function inputGet(player: Player): void {
    const form = new ModalFormData()
        .title("Get property")
        .textField("name", "e.g.: quest:progress");

    form.show(player).then(res => {
        if (res.canceled) return;
        const prop = res.formValues[0]?.toString().trim();
        if (prop) dataHandlers["data:get"](player, prop);
    });
}

function inputSet(player: Player): void {
    const form = new ModalFormData()
        .title("Set property")
        .textField("Name", "e.g.: quest:progress")
        .textField("Value", "e.g.: 5");

    form.show(player).then(res => {
        if (res.canceled) return;
        const key = res.formValues[0]?.toString().trim();
        const value = res.formValues[1]?.toString().trim();
        if (key && value) dataHandlers["data:set"](player, `${key} ${value}`);
    });
}

function inputRemove(player: Player): void {
    const form = new ModalFormData()
        .title("Remove property")
        .textField("Name", "e.g.: quest:progress");

    form.show(player).then(res => {
        if (res.canceled) return;
        const prop = res.formValues[0]?.toString().trim();
        if (prop) dataHandlers["data:remove"](player, prop);
    });
}