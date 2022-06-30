import { FC, FormEvent, PropsWithChildren } from "react";
import { classList } from "../../Helpers";
import { ControlGroup } from "../ControlGroup";

/**
 * Represents a form. Needs to be attached to a {@link ControlGroup}. Provides functionality like
 * setting the <code>submitted</code> flag on its controls when form is submitted, which allows for
 * immediately showing the validation messages. As convenience, it calls
 * <code>preventDefault()</code> on submit.
 *
 * @since 0.1.0
 */
export const Form: FC<PropsWithChildren<Props>> = (props) => {

    //#region Initialization
    /**
     * Makes all props as required since we have defaults. Used for TypeScript type check.
     */
    const requiredProps: Required<PropsWithChildren<Props>> = props as any;
    //#endregion

    //#region Event Handlers
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        requiredProps.controlGroup.markSubmitted();
        requiredProps.onSubmit();
    };
    //#endregion

    //#region Render
    return (
        <form className={classList({
                submitted: requiredProps.controlGroup.isSubmitted
            },
            requiredProps.className)}
              noValidate
              onSubmit={submitHandler}>
            {requiredProps.children}
        </form>
    );
    //#endregion
};

Form.defaultProps = {
    className: undefined,
    onSubmit: () => void 0
};

type Props = {
    controlGroup: ControlGroup;
    className?: string;
    onSubmit(): void|Promise<void>;
}
