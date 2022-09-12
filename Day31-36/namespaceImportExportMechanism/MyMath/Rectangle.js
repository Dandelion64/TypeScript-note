var Rectangle;
(function (Rectangle) {
    Rectangle.area = (width, height) => {
        return width * height;
    };
    Rectangle.circumference = (width, height) => {
        return 2 * (width + height);
    };
})(Rectangle || (Rectangle = {}));
