import { useCallback, useEffect, useRef, useState } from "react";

import { ControlGroup } from "./ControlGroup";
import { ControlsMap } from "./ControlsMap.type";

/**
 * Hook to create a group of nested controls. Helps determine if an entire form is valid or not.
 *
 * @example
 * // To access the child controls and bind to a form element use.
 * <InputText control={controlGroup.controls.controlName} />
 *
 * @param controlsMap The named controls map to be nested in this group.
 * @return A {@link ControlGroup} instance with all the nested controls ready to be used.
 *
 * @since 0.1.0
 */
export function useControlGroup(controlsMap: ControlsMap) {

    //#region Initialization
    const [isValid, setIsValid] = useState<undefined|boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [parentState, setParentState] = useState<null|ControlGroup>(null);
    //#endregion

    //#region Event Handlers
    /**
     * {@link ControlGroup.updateValidity}
     */
    const updateValidity = useCallback( (): void => {
        let valid: undefined|boolean = true;

        for (let controlKey in controlsMap) {
            if (!controlsMap[controlKey].isValid) {
                valid = controlsMap[controlKey].isValid;
                break;
            }
        }

        setIsValid(valid);
        },
        [controlsMap]
    );

    /**
     * {@link ControlGroup.updateValidity}
     */
    const setParent = useCallback(
        (parent: ControlGroup): void => {
            setParentState(parent);
        }, []
    );

    /**
     * {@link ControlGroup.markSubmitted}
     */
    const markSubmitted = useCallback(
        () => {
            setIsSubmitted(true);
            for (let controlKey in controlsMap) {
                controlsMap[controlKey].markSubmitted();
            }
        },
        [controlsMap]
    );

    /**
     * {@link ControlGroup.markRetracted}
     */
    const markRetracted = useCallback(
        () => {
            setIsSubmitted(false);
            for (let controlKey in controlsMap) {
                controlsMap[controlKey].markRetracted();
            }
        },
        [controlsMap]
    );
    //#endregion

    //#region Refs
    /**
     * ControlGroup never changes, only its contents. Re-Render is triggered normally because of
     * setState.
     */
    const controlGroup = useRef(new ControlGroup(
        controlsMap,
        updateValidity,
        setParent,
        markSubmitted,
        markRetracted
    ));
    //#endregion

    //#region Effects
    // Sets this control group as the parent of each control on hook startup
    useEffect(
        () => {
            for (let controlKey in controlsMap) {
                controlsMap[controlKey].setParent(controlGroup.current);
            }
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

     // Updates parent validity
     useEffect(
        () => {
            if (parentState != null) {
                parentState.updateValidity();
            }
        },
        [isValid, parentState]
    );
    //#endregion

    //#region Hook Return
    controlGroup.current.isValid = isValid;
    controlGroup.current.isSubmitted = isSubmitted;

    return controlGroup.current;
    //#endregion
}
