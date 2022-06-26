import { ValidatorResult } from "./ValidatorResult.type";

export type ControlState = {
    value: string;
    errors: ValidatorResult;
    isValid: boolean;
    isTouched: boolean;
    isDirty: boolean;
}
