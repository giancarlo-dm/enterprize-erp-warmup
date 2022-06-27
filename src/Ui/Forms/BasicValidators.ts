import { ValidatorFn } from "./ValidatorFn.type";

/**
 * Convenience static class with some common validators to be used in controls.
 *
 * @since v0.1.0
 */
export class BasicValidators {

    //#region Private Static Constants
    /**
     * Email regular expression
     * @private
     */
    static readonly #EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //#endregion

    //#region Public Methods
    /**
     * Checks if the value is set.
     */
    static required(): ValidatorFn {

        return (current: any) => {
            if (current == null
                || (typeof current === "string" && current.trim().length === 0)
                || (current instanceof Array && current.length === 0)) {
                return {required: true};
            }

            return null;
        };
    }

    /**
     * Validates an e-mail.
     */
    static email(): ValidatorFn {
        return (current: string) => {
            if (current == null || current.trim().length === 0) {
                return null;
            }

            return BasicValidators.#EMAIL_REGEXP.test(current) ? null : {email: true};
        };
    }
    //#endregion
}
