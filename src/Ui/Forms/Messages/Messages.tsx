import React, { FC } from "react";

import { defaultMessages } from "../dafaulMessages.constant";
import { ValidationMessages } from "../ValidationMessages.type";
import { ValidatorResult } from "../ValidatorResult.type";
import classes from "./Messages.module.scss";

type Props = {
    errors: ValidatorResult;
    errorMessages?: ValidationMessages;
};

export const Messages: FC<Props> = (props) => {

    //#region Render
    if (props.errors == null) {
        return null;
    }
    else {

        const firstErrorKey: string | symbol = Reflect.ownKeys(props.errors)[0];
        let message: string;

        if (props.errorMessages != null && Reflect.has(props.errorMessages, firstErrorKey)) {
            message = Reflect.get(props.errorMessages, firstErrorKey);
        }
        else if (Reflect.has(defaultMessages, firstErrorKey)) {
            message = Reflect.get(defaultMessages, firstErrorKey);
        }
        else {
            message = defaultMessages.default;
        }

        return (
            <div className={classes.invalidMessage}>{message}</div>
        );
    }
    //#endregion
};
