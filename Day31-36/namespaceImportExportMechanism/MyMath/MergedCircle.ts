namespace MyMath {
    export namespace Circle {
        export const PI = Math.PI;

        export function area(radius: number) {
            return PI * radius ** 2;
        }

        export function circumference(radius: number) {
            return 2 * PI * radius;
        }
    }
}
