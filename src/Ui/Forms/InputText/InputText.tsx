import React, { ChangeEvent, FC } from "react";

import { classList } from "../../Helpers";
import { If } from "../../Structural";
import { Control } from "../Control";
import { Messages } from "../Messages/Messages";
import { ValidationMessages } from "../ValidationMessages.type";
import { ValidatorFn } from "../ValidatorFn.type";

/**
 * InputText control. Allows the user to input text data with validation.
 *
 * @since 0.1.0
 */
export const InputText: FC<Props> = (props) => {

    //#region Event Handlers
    const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        props.control.change(event.target.value);
    };

    const blurHandler = (): void => {
        props.control.blur();
    };
    //#endregion

    //#region Render
    /**
     * @inheritDoc
     */
    return (
        <div className={classList("control", {
            invalid: !props.control.isValid && (props.control.isTouched || props.control.isSubmitted),
            large: props.size === "large",
            small: props.size === "small"
        })}>
            <label htmlFor={props.name}
                   className={classList({
                       required: props.required ?? false
                   })}>
                {props.label}
            </label>
            <input id={props.name} type={props.type} name={props.name}
                   required={props.required}
                   value={props.control.value}
                   onChange={changeHandler}
                   onBlur={blurHandler} />
            <If expression={props.control.isTouched || props.control.isSubmitted}>
                <Messages errors={props.control.errors}
                          errorMessages={props.errorMessages}
                          success={props.successMessage} />
            </If>
        </div>
    );
    //#endregion
};

InputText.defaultProps = {
    type: "text",
    required: false
};

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
     * Control to be used with this Input.
     */
    control: Control<string>;
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
     * Map of error messages to be matched agains the error keys emitted by the {@link validators}.
     */
    errorMessages?: ValidationMessages;
    /**
     * Message to show when control holds a valid value.
     */
    successMessage?: string;
};
