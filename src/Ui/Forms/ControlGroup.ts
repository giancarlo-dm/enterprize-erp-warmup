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
     * Flag that indicates if the control is valid. If <code>undefined</code>, means that async
     * validators are still running.
     */
    isValid: undefined|boolean;
    /**
     * Flag that indicates if the form this control group is attached to was submitted.
     */
    isSubmitted: boolean;
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
    /**
     * Marks this control group and all its children controls as submitted. To clear, please use
     * {@link this.markRetracted}
     */
    readonly markSubmitted: () => void;
    /**
     * Marks this control group and all its children controls as not submitted.
     */
    readonly markRetracted: () => void;
    //#endregion

    //#region Constructor
    constructor(controls: ControlsMap,
                updateValidity: () => void,
                setParent: (parent: ControlGroup) => void,
                markSubmitted: () => void,
                markRetracted: () => void) {
        this.controls = controls;
        this.isValid = false;
        this.isSubmitted = false;

        this.updateValidity = updateValidity;
        this.setParent = setParent;
        this.markSubmitted = markSubmitted;
        this.markRetracted = markRetracted;
    }
    //#endregion
}


