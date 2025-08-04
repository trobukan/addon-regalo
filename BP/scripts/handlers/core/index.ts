import { storyHandlers } from "../storyHandlers";
import { dataHandlers } from "../dataHandlers";
import { debugHandlers } from "../debugHandlers";

export const eventHandlers = {
    ...dataHandlers,
    ...storyHandlers,
    ...debugHandlers
};

