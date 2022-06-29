import { ControlsMap } from "./ControlsMap.type";

/**
 * Represents a group of nested {@link Control}. May also hold nested {@link ControlGroup}.
 *
 * @since 0.1.0
 */
export class ControlGroup {

    //#region Attributes
    /**
     * Map of controls by name
     */
    controls: ControlsMap;
    /**
     * Flag that indicates if the control is valid.
     */
    isValid: boolean;
    //#endregion

    //#region Event Handlers
    /**
     * Updates the validity of the control group.
     */
    readonly updateValidity: () => void;
    /**
     * Sets a parent for this control. Will propagate any value change and validation status.
     */
    readonly setParent: (parent: ControlGroup) => void;
    //#endregion

    //#region Constructor
    constructor(controls: ControlsMap,
                updateValidity: () => void,
                setParent: (parent: ControlGroup) => void) {
        this.controls = controls;
        this.isValid = false;

        this.updateValidity = updateValidity;
        this.setParent = setParent;
    }
    //#endregion
}


