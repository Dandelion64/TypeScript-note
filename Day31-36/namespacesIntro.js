var MyMath;
(function (MyMath) {
    MyMath.PI = Math.PI;
    MyMath.AreaOfCircle = (radius) => {
        return MyMath.PI * Math.pow(radius, 2);
    };
    MyMath.AreaOfRectangle = (width, height) => {
        return width * height;
    };
    MyMath.CircumferenceOfCircle = (radius) => {
        return 2 * MyMath.PI * radius;
    };
    MyMath.CircumferenceOfRectangle = (width, height) => {
        return 2 * (width + height);
    };
})(MyMath || (MyMath = {}));
console.log(MyMath.PI);
console.log(MyMath.AreaOfCircle(100));
console.log(MyMath.CircumferenceOfRectangle(50, 100));
