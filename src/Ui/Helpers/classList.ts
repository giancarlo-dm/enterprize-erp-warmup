import { ClassMap } from "./ClassMap.type";

/**
 * Helper function to compile list of classes, give it be a string or a map to apply classes
 * conditionally.
 *
 * @since v0.1.0
 */
export function classList(...classes: Array<string|ClassMap>): string {

    const compiledClasses: Array<string> = [];

    for (let clazz of classes) {
        if (typeof clazz === "string") {
           compiledClasses.push(clazz);
        }
        else {
            const classKeys: Array<string|symbol> = Reflect.ownKeys(clazz);
            for (let classKey of classKeys) {
                if (Reflect.get(clazz, classKey)) {
                    compiledClasses.push(classKey.toString());
                }
            }
        }
    }

    return compiledClasses.join(" ");
}
