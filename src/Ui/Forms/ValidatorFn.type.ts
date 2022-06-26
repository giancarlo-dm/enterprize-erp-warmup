import { ValidatorResult } from "./ValidatorResult.type";

export type ValidatorFn = (current: string) => ValidatorResult;
