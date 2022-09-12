var MyMath;
(function (MyMath) {
    let Rectangle;
    (function (Rectangle) {
        Rectangle.area = (width, height) => {
            return width * height;
        };
        Rectangle.circumference = (width, height) => {
            return 2 * (width + height);
        };
    })(Rectangle = MyMath.Rectangle || (MyMath.Rectangle = {}));
})(MyMath || (MyMath = {}));
