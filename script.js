// 2. Declarar dos variables con la palabra reservada "var", imprimir el resultado de las operaciones de "Suma", "Resta", "Multiplicación" y "División" en la consola. Las variables pueden ser estáticas.
var x = 10;
var y = 23;
console.log("PROBLEMA 2");
console.log(`Suma: ${x + y}`);
console.log(`Resta: ${x - y}`);
console.log(`Multiplicación: ${x * y}`);
console.log(`División: ${x / y}`);

// 3. Declarar dos variables con la palabra reservada "let", imprimir la concatenación de ellas.
console.log("\nPROBLEMA 3");
let var1 = "hola";
let var2 = " mundo";
console.log(var1 + var2);

// 4.Declarar dos variables con la palabra reservada "const", imprimir cuál es el tipo de dato de esa variable.
console.log("\nPROBLEMA 4");
const reservada1 = "";
const reservada2 = 2;
console.log(typeof (reservada1));
console.log(typeof (reservada2));

// 5. Declarar una variable tipo Objeto, colocar 4 llaves dentro de él que contengan un number, un string, un booleano y un objeto vacío, en ese mismo orden.
console.log("\nPROBLEMA 5");
let almacenador = {
    numero: 2,
    cadena: "",
    booleano: true,
    objeto: {}
};
console.log(almacenador);

// 6. Escribir una función en JS que tome un número entero positivo como argumento y devuelva la suma de todos los números menores que sean múltiplos de 3 o 5. Por ejemplo: Si el número dado es 10, la función debería devolver la suma de 3, 5, 6 y 9, que es 23.
console.log("\nPROBLEMA 6");
function obtenerSuma(n) {
    let suma = 0;
    for (let i = 1; i < n; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            suma += i;
        }
    }
    return suma;
}
console.log(obtenerSuma(10));