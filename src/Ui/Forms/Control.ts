import { ValidatorFn } from "./ValidatorFn.type";
import { ValidatorResult } from "./ValidatorResult.type";

/**
 * Represents a control of a form. May be used with any form input element or custom elements that
 * requires a control. Provides methods for events dispatching.
 *
 * @since v0.1.0
 */
export class Control<T> {

    //#region Attributes
    /**
     * Current control value
     */
    value: T;
    /**
     * Flag that indicates if the control was touched by the user (i.e. focus followed by blur).
     */
    isTouched: boolean;
    /**
     * Flag that indicates if the control value was modified by the user.
     */
    isDirty: boolean;
    /**
     * Flag that indicates if the control is valid.
     */
    isValid: boolean;
    /**
     * Error map with error keys returned by validators or null if valid.
     */
    errors: ValidatorResult;
    /**
     * List of validators currently assigned to this control.
     */
    validators: Array<ValidatorFn>;
    //#endregion

    //#region Event Handlers
    /**
     * Change event handler to be invoked when value needs to be updated.
     */
    readonly change: (value: T) => void;
    /**
     * Blur event handler to signal that a blur event occurred.
     */
    readonly blur: () => void;
    /**
     * Reset event handler to reset the controls value to the initial value. Re-runs validators.
     */
    readonly reset: () => void;
    /**
     * Overrides the current sync validators.
     */
    readonly setValidators: (validators: Array<ValidatorFn>) => void;
    /**
     * Adds a set of validators the current list of validators.
     */
    readonly addValidators: (...validators: Array<ValidatorFn>) => void;
    /**
     * Removes a set of validator the current list of validators.
     */
    readonly removeValidators: (...validators: Array<ValidatorFn>) => void;
    //#endregion

    //#region Constructor
    constructor(value: T, isTouched: boolean, isDirty: boolean, isValid: boolean,
                errors: ValidatorResult, validators: Array<ValidatorFn>,
                change: (value: T) => void,
                blur: () => void,
                reset: () => void,
                setValidators: (validators: Array<ValidatorFn>) => void,
                addValidators: (...validators: Array<ValidatorFn>) => void,
                removeValidators: (...validators: Array<ValidatorFn>) => void ) {
        this.value = value;
        this.isTouched = isTouched;
        this.isDirty = isDirty;
        this.isValid = isValid;
        this.errors = errors;
        this.validators = validators;

        this.change = change;
        this.blur = blur;
        this.reset = reset;
        this.setValidators = setValidators;
        this.addValidators = addValidators;
        this.removeValidators = removeValidators;
    }
    //#endregion
}
