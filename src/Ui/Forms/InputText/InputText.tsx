import React, { ChangeEvent } from "react";

import { BasicValidators } from "../BasicValidators";
import { ControlState } from "../ControlState.type";
import { Messages } from "../Messages/Messages";
import { ValidationMessages } from "../ValidationMessages.type";
import { ValidatorFn } from "../ValidatorFn.type";
import { ValidatorResult } from "../ValidatorResult.type";

type Props = {
    /**
     * @default text
     */
    type?: "text" | "password"
    label: string;
    name: string;
    /**
     * @default normal
     */
    size?: "small" | "large";
    /**
     * @default false
     */
    required?: boolean;
    validators?: Array<(current: string) => null | { [key: string]: any }>;
    errorMessages?: ValidationMessages;

    value?: string;
    onChange?: (state: ControlState) => void;
};

export class InputText extends React.Component<Props, ControlState> {

    static defaultProps = {
        type: "text",
        required: false
    };

    #validators: Array<ValidatorFn>;

    constructor(props: Props) {
        super(props);

        this.state = {
            value: "",
            errors: null,
            isValid: true,
            isTouched: false,
            isDirty: false
        };

        this.#validators = this.#initValidators();
    }

    componentDidMount(): void {
        this.#updateState({value: this.props.value});
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<ControlState>, snapshot?: any): void {
        if (prevProps.required !== this.props.required
            || prevProps.validators !== this.props.validators) {
            this.#validators = this.#initValidators();
            this.#updateValidity();
        }

        if (this.props.value !== prevProps.value) {
            this.#updateState({value: this.props.value});
        }
    }

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

    render(): React.ReactNode {

        let controlClass: string = "control";
        if (this.props.size != null) {
            controlClass += ` ${this.props.size}`;
        }
        if (this.state.errors != null && this.state.isTouched) {
            controlClass += " invalid";
        }

        return (
            <div className={controlClass}>
                <label htmlFor={this.props.name}
                       className={this.props.required ? "required" : ""}>{this.props.label}</label>
                <input id={this.props.name} type={this.props.type} name={this.props.name}
                       required={this.props.required}
                       value={this.state.value}
                       onChange={this.changeHandler}
                       onBlur={this.blurHandler} />
                {this.state.isTouched ? <Messages errors={this.state.errors} errorMessages={this.props.errorMessages} /> : null }
            </div>
        );
    }

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
                if (this.props.onChange != null) {
                    this.props.onChange(state);
                }
            });

            return state;
        });
    }

    #updateValidity(): void {
        this.setState(previous => {
            const state = {...previous};
            state.errors = this.#runValidators(previous.value);
            state.isValid = state.errors == null;

            return state;
        });
    }

    #initValidators(): Array<ValidatorFn> {
        const validators: Array<ValidatorFn> = [];

        if (this.props.required) {
            validators.push(BasicValidators.required());
        }
        if (this.props.validators != null) {
            validators.push(...this.props.validators);
        }

        return validators;
    }

    #runValidators(value: string): ValidatorResult {
        for (let validator of this.#validators) {
            const result: ValidatorResult = validator(value);
            if (result != null) {
                return result;
            }
        }

        return null;
    }
}
