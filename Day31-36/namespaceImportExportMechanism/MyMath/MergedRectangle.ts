namespace MyMath {
    export namespace Rectangle {
        export const area = (width: number, height: number) => {
            return width * height;
        };

        export const circumference = (width: number, height: number) => {
            return 2 * (width + height);
        };
    }
}
