import { ClassMap } from "./ClassMap.type";

/**
 *
 */
export function classList(classMap: ClassMap, defaultClasses?: string): string {

    const classes: Array<string> = [];
    const classKeys: Array<string|symbol> = Reflect.ownKeys(classMap);

    for (let classKey of classKeys) {
        if (Reflect.get(classMap, classKey)) {
            classes.push(classKey.toString());
        }
    }

    return `${defaultClasses} ${classes.join(" ")}`;
}
