import { questHandlers } from "../questHandlers";
import { dataHandlers } from "../dataHandlers";
import { debugHandlers } from "../debugHandlers"

export const eventHandlers = {
    ...dataHandlers,
    ...questHandlers,
    ...debugHandlers
};

