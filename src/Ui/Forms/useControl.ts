import { useCallback, useMemo, useReducer, useRef, useState } from "react";

import { Control } from "./Control";
import { ValidatorFn } from "./ValidatorFn.type";
import { ValidatorResult } from "./ValidatorResult.type";

/**
 * Reducer actions for the control.
 */
enum ControlActions {
    INPUT = "INPUT",
    BLUR = "BLUR",
    RESET = "RESET"
}

/**
 * Hook to create controls instances to later be bound to form components that requires controls.
 * @param initialValue The initial value of the control.
 * @param validators The list of custom validators to be used.
 * @param options Customize the behavior of this control.
 * @return A {@link Control} instance ready to be bound to form components.
 */
export function useControl<T = any>(initialValue: T,
                                    validators: Array<ValidatorFn> = [],
                                    options: ControlOptions = {}): Control<T> {

    //#region Initialization
    options.runAllSyncValidators = options.runAllSyncValidators ?? false;

    const controlReducer = useMemo(() => buildControlReducer(initialValue), [initialValue]);
    const [controlState, controlDispatch] = useReducer(controlReducer.reducer, controlReducer.initialState);
    const [controlValidators, setControlValidators] = useState(validators);

    /**
     * Validation result.
     */
    const validationResult: ValidatorResult = useMemo(
        () => runSyncValidators(controlState.value, controlValidators, options.runAllSyncValidators),
        [controlState.value, controlValidators, options.runAllSyncValidators]
    );
    //#endregion

    //#region Event Handlers
    /**
     * {@link Control.change}
     */
    const change = useCallback(
        (value: T) => {
            controlDispatch({type: ControlActions.INPUT, value: value});
        },
        []
    );

    /**
     * {@link Control.blur}
     */
    const blur = useCallback(
        (): void => {
            controlDispatch({type: ControlActions.BLUR});
        },
        []
    );

    /**
     * {@link Control.reset}
     */
    const reset = useCallback(
        (): void => {
            controlDispatch({type: ControlActions.RESET});
        }, []
    );

    /**
     * {@link Control.setValidators}
     */
    const setValidators = useCallback(
        (validators: Array<ValidatorFn>): void => {
            setControlValidators(validators);
        }, []
    );

    /**
     * {@link Control.addValidators}
     */
    const addValidators = useCallback(
        (...validators: Array<ValidatorFn>): void => {
            setControlValidators(prevState => [...prevState, ...validators]);
        }, []
    );

    /**
     * {@link Control.removeValidators}
     */
    const removeValidators = useCallback(
        (...validators: Array<ValidatorFn>): void => {
            setControlValidators(prevState => {
                const newValidators = [...prevState];
                for (let validator of validators) {
                    const index = newValidators.indexOf(validator);
                    if (index !== -1) {
                        newValidators.splice(index, 1);
                    }
                }

                return newValidators;
            });
        }, []
    );
    //#endregion

    //#region Hook Return
    // Control never changes, only its contents. Re-Render is triggered normally because of setState.
    const control = useRef(new Control(
        initialValue,
        false,
        false,
        false,
        null,
        [],
        change,
        blur,
        reset,
        setValidators,
        addValidators,
        removeValidators
    ));

    control.current.value = controlState.value;
    control.current.isTouched = controlState.isTouched;
    control.current.isDirty = controlState.isDirty;
    control.current.isValid = validationResult == null;
    control.current.errors = validationResult;
    control.current.validators = controlValidators;

    return control.current;
    //#endregion
}

/**
 *
 */
export type ControlOptions = {
    /**
     * Flag to run all sync validators and not stop on first error.
     * @default false
     */
    runAllSyncValidators?: boolean;
}

//--------------------------------------------------------------------------------------------------
// Helpers

/**
 * Builds the control reducer.
 * @param initialValue The initial value to be set on the control.
 */
function buildControlReducer<T = any>(initialValue: T): Reducer<ControlReducerState<T>, ControlActions, T> {

    const initialState: ControlReducerState<T> = {
        value: initialValue,
        isTouched: false,
        isDirty: false
    };

    return {
        initialState: initialState,
        reducer: (state: ControlReducerState<T>, action: ControlReducerActions<T>) => {
            switch (action.type) {
                case ControlActions.INPUT:
                    return {...state, value: action.value, isDirty: true};
                case ControlActions.BLUR:
                    return {...state, isTouched: true};
                case ControlActions.RESET:
                    return initialState;
            }
        }
    };
}

/**
 * Runs the synchronous validators against the specified values return the errors or null if valid.
 * @param value The value to be used on the validators.
 * @param validators The list of validators.
 * @param runAllSyncValidators Flag to run all validators and not stop on first error.
 */
function runSyncValidators<T>(value: T,
                              validators: Array<ValidatorFn>,
                              runAllSyncValidators: boolean = false): ValidatorResult {
    if (validators.length === 0) {
        return null;
    }

    let totalResult: ValidatorResult = {};

    for (let validator of validators) {
        const result: ValidatorResult = validator(value);
        if (result != null) {
            totalResult = {...totalResult, ...result};
            if (!runAllSyncValidators) {
                break;
            }
        }
    }

    if (Reflect.ownKeys(totalResult).length > 0) {
        return totalResult;
    }

    return null;
}

/**
 * Control state inside reducer
 */
type ControlReducerState<T> = {
    /**
     * {@link Control.value}
     */
    value: T;
    /**
     * {@link Control.isTouched}
     */
    isTouched: boolean;
    /**
     * {@link Control.isDirty}
     */
    isDirty: boolean;
}

/**
 * List of actions that the control's dispatcher can dispatch.
 */
type ControlReducerActions<T> = { type: ControlActions.INPUT, value: T }
    | { type: ControlActions.BLUR }
    | { type: ControlActions.RESET }

/**
 * Reducer interface
 */
type Reducer<S, A, V> = {
    initialState: S;
    reducer(state: S, action: { type: A, value?: V }): S;
}
