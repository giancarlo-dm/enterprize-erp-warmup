import { Control } from "./Control";
import { ControlGroup } from "./ControlGroup";

/**
 * Map of named controls to be used in a {@link ControlGroup}.
 *
 * @since 0.1.0
 */
export type ControlsMap = {
    [controlName: string]: ControlGroup|Control<any>;
}
