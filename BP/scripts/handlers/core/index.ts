import { questHandlers } from "../questHandlers";
import { dataHandlers } from "../dataHandlers";

export const eventHandlers = {
    ...dataHandlers,
    ...questHandlers,
};

