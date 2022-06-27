import React, { ChangeEvent } from "react";

import { classList } from "../../Helpers";
import { If } from "../../Structural";
import { BasicValidators } from "../BasicValidators";
import { ControlState } from "../ControlState.type";
import { Messages } from "../Messages/Messages";
import { ValidationMessages } from "../ValidationMessages.type";
import { ValidatorFn } from "../ValidatorFn.type";
import { ValidatorResult } from "../ValidatorResult.type";

/**
 * InputText control. Allows the user to input text data with validation.
 *
 * @since v0.1.0
 */
export class InputText extends React.Component<Props, ControlState> {

    //#region Default Props
    static defaultProps = {
        type: "text",
        required: false,
        runAll: false,
        value: "",
        onChange: () => void 0
    };
    //#endregion

    //#region Private Attributes
    /**
     * Set of validators to be used with this input.
     * @private
     */
    #validators: Set<ValidatorFn>;
    //#endregion

    //#region Constructor
    constructor(props: Props) {
        super(props);

        this.state = {
            value: props.value ?? "",
            errors: null,
            isValid: true,
            isTouched: false,
            isDirty: false
        };

        this.#validators = this.#generateValidators();
    }

    //#endregion

    //#region Lifecycle Hooks
    /**
     * @inheritDoc
     */
    componentDidMount(): void {
        this.#updateValidity();
    }

    /**
     * @inheritDoc
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<ControlState>, snapshot?: any): void {
        if (prevProps.required !== this.props.required
            || prevProps.validators !== this.props.validators) {
            this.#validators = this.#generateValidators();
            this.#updateValidity();
        }

        if (this.props.value !== prevProps.value) {
            this.#updateState({value: this.props.value});
        }
    }

    //#endregion

    //#region Event Handlers
    /**
     * Handles input value change. Updates state, run validators if define and emit onChange event.
     * @param event Change event of the input
     */
    changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        this.#updateState({value: event.target.value});
    };

    /**
     * Handles blur event on input. Set isTouched to true.
     */
    blurHandler = () => {
        this.#updateState({isTouched: true});
    };
    //#endregion

    //#region Render
    /**
     * @inheritDoc
     */
    render(): React.ReactNode {
        return (
            <div className={classList({
                invalid: this.state.errors != null && this.state.isTouched,
                large: this.props.size === "large",
                small: this.props.size === "small"
            }, "control")}>
                <label htmlFor={this.props.name}
                       className={classList({
                           required: this.props.required ?? false
                       })}>
                    {this.props.label}
                </label>
                <input id={this.props.name} type={this.props.type} name={this.props.name}
                       required={this.props.required}
                       value={this.state.value}
                       onChange={this.changeHandler}
                       onBlur={this.blurHandler} />
                <If expression={this.state.isTouched}>
                    <Messages errors={this.state.errors}
                              errorMessages={this.props.errorMessages}
                              success={this.props.successMessage}/>
                </If>
            </div>
        );
    }
    //#endregion

    //#region Private Methods
    /**
     * Updates the state by a given update payload. Will recalculate the validation status and set
     * the flag isDirty. Also emits onChange with the control status.
     * @param update
     * @private
     */
    #updateState(update: Partial<Pick<ControlState, "value" | "isTouched">>): void {
        this.setState(previous => {
            const state = {...previous};

            if (update.value != null) {
                state.value = update.value;
                state.errors = this.#runValidators(update.value);
                state.isValid = state.errors == null;
                state.isDirty = true;
            }
            if (update.isTouched != null) {
                state.isTouched = update.isTouched;
            }

            setTimeout(() => {
                this.props.onChange!(state);
            });

            return state;
        });
    }

    /**
     * Recalculates the control's validity status, updating the state. Also emits onChange with the
     * control status.
     * @private
     */
    #updateValidity(): void {
        this.setState(previous => {
            const state = {...previous};
            state.errors = this.#runValidators(previous.value);
            state.isValid = state.errors == null;

            setTimeout(() => {
                this.props.onChange!(state);
            });

            return state;
        });
    }

    /**
     * Helper function to initialize the {@link #validators} Set to be used. Adds additional
     * validators when {@link Props.required} is <code>>true</code> and {@link Props.type} is
     * <code>email</code>;
     * @return A {@link Set} with the current validators to be run.
     * @private
     */
    #generateValidators(): Set<ValidatorFn> {
        const validators: Set<ValidatorFn> = new Set();

        if (this.props.required) {
            validators.add(BasicValidators.required());
        }
        if (this.props.type === "email") {
            validators.add(BasicValidators.email());
        }
        if (this.props.validators != null) {
            for (let validator of this.props.validators) {
                validators.add(validator);
            }
        }

        return validators;
    }

    /**
     * Run the {@link #validators} and returns the validation result returned by the first validator
     * that emits it or null if al validators passed. In other words, will only run until the first
     * validator returns an result different than null, thus signaling and invalid input.
     * @param value The value to be validated against
     * @private
     */
    #runValidators(value: string): ValidatorResult {

        let totalResult: ValidatorResult = {};

        for (let validator of this.#validators) {
            const result: ValidatorResult = validator(value);
            if (result != null) {
                totalResult = {...totalResult, ...result};
                if (!this.props.runAll) {
                    break;
                }
            }
        }

        if (Reflect.ownKeys(totalResult).length > 0) {
            return totalResult;
        }

        return null;
    }

    //#endregion
}

type Props = {
    /**
     * The label to present.
     */
    label: string;
    /**
     * The name of the input. Used as name property and ID.
     */
    name: string;
    /**
     * Type of the input. If email type is used, the {@link BasicValidators.email} validator will be
     * automatically added.
     * @default text
     */
    type?: "text" | "password" | "email";
    /**
     * The size of the input. If none is passed, a "normal" size is used.
     * @default undefined
     */
    size?: "small" | "large";
    /**
     * Informs if a value is required. Adds a star and also the {@link BasicValidators.required}
     * validator.
     * @default false
     */
    required?: boolean;
    /**
     * Set of validators to be used. Each validator must comply with the {@link ValidatorFn}
     * signature.
     */
    validators?: Array<ValidatorFn>;
    /**
     * Flag to run all validators and not stop on first error.
     * @default false.
     */
    runAll?: boolean;
    /**
     * Map of error messages to be matched agains the error keys emitted by the {@link validators}.
     */
    errorMessages?: ValidationMessages;
    /**
     * Message to show when control holds a valid value.
     */
    successMessage?: string;
    /**
     * Initial value.
     * @default ""
     */
    value?: string;
    /**
     * Event emitter that emits event when the input value changes. Includes a payload with the
     * control's state.
     * @param state The controls state.
     */
    onChange?: (state: ControlState) => void;
};
