//JavaScript es un lenguaje q sirve para dar funciones a botones o cosas para una pagina hecha con html y css
//Se pueden usar algunas etiquetas de html como <br>, <b></b> (para poner negrita)

																//CAPITULO 1 (DALTO)
																//VARIABLES
//Las variables son al igual q en python, lugares donde se almacenan datos

//TIPOS DE DATOS

string = "cadenas de texto" //Texto
number = 5 //Numero
bool = true false //Solo estos 2 valores

var vaso = "agua"; //Si le damos var significa q todo el bloque va a poder usar esta variable
let vaso = "agua"; //Solo el bloque donde la definimos va a poder usarla (adentro de un if, etc..)  (Scope)
const vaso = "agua"; //Const significa q la variable va a ser constante, mas adelante no la vamos a poder cambiar
//Podemos primero declarar la variable simplemente poniendo var vaso; y despues darle el valor poniendo vaso = "agua";
//Podemos declarar varias variables a la vez separandolas por una , ej: let vaso = "agua", vaso2 = "jugo"

let nombre = prompt("Decime tu nombre") //Es como un imput, pide un dato al usuario y lo guarda en la variable

alert("Hola") //Muestra en pantalla una ventana q dice "Hola"

document.write(vaso) //Escribe en pantalla

																//OPERADORES
//operadores de asignacion
let numero = 10;

numero += 5; //suma
numero -= 5; //resta
numero *= 5; //multiplicacion
numero /= 5; //division
numero %= 5; //resto
numero **= 5; //potencia

//operadores aritmeticos

// + - * / ** %. son los mismos pero se usan de otra forma. Tenes 2 variables, despues creas otra variable q sea resultado = num1 + num2;

																//CONCATENACION
//Es como en python 
//Otra manera es:

let nombre = "juanjo";
let 	frase = `soy ${nombre} y estoy caminando`;
// Es importante poner `` con comillas no funciona
document.write(frase);

																//OPERADORES RELACIONALES/COMPARACION
/*
< Menor que
> Mayor que
== Igual a
!= Es diferente
<= Menor o igual a
>= Mayor o igual a
*/

																// OPERADORES LOGICOS
/*
Conjuncion. and %% . Si no se cumplen las 2 no se ejecuta.
Disyuncion. or || . Se tiene q cumplir una o las 2 condiciones para que se ejecute
Negacion. not ! . Si la condicion NO se cuple se ejecuta
*/

																//CAMEL CASE
//Es de la forma q trabaja javaScript. La primer palabra de algo va todo en minuscula y las demas palabras van con la primer letra mayus.
// holaComoEstas, Ej

																//CONDICIONALES
//Funciona igual q en python pero tiene otra estructura

let altura = prompt("Cuanto medis");

if (altura < 180) {
	document.write("Sos bajo");
}
else if (altura >= 180); {
	document.write("Sos alto")
}
else {
	document.write("Valor incorrecto")
}

//No existe elif (Es else if). despues del condicional se pone {}

parseInt(altura); //Convierte a numero


																//CAPITULO 2 (DALTO)
																//ARRAYS
//Son contenedores que pueden contener varios tipos de datos, con diferentes propiedades. Parecido a una variable

let frutas = ["manzana","banana","pera"];

document.write(frutas); //Muestra todo el array (lista en python)
document.write(frutas[1]); //Muestra "banana"

let pc = {
	procesador = "intel",
	ram = "16GB",
	espacio = "1TB",
	GPU = "RTX 2080",
};

document.write(pc[ram]); //Es otra manera de hacer arrays pero le ponemos nombres a los indices 


																//BUCLES
														//WHILE
//Como un condicional que se repite hasta que la condicion sea falsa. (esta en python. es facil)

let num = 0;

while (num < 5) {
	document.write(num);
	num = num + 1;
}

														//DO WHILE
//Primero ejecuta las instrucciones y despues verifica si se cumple la condicion para seguir ejecutandolas instrucciones

let num = 5;

do {
	document.write(num);
}

while (num < 5);

//Por mas de que la condicion no se cumpla se va a ejecutar 1 vez

												//BREAK

let i = 1;

while (i < 6) {
	document.write(i);
	i = i++ // +1
	if (i == 3) {
		break
	}
}	
//Corta el bucle donde le digamos

												//CONTINUE
let i = 0;

while (i < 6) {
	i += 1
	if (i == 3) {
		continue
	}
}
//Se saltea el 3


														//FOR
//Muy parecido a while pero con otra estructura

for (let i = 0; i < 6; i++) { //Primero creamos una variable, despues la condicion 
	document.write(i + "<br>")
}

														//FOR IN / FOR OF
//Se usan para listas. IN nos muestra la posicion en la que estan los items. OFF nos muestra el item.

let animales = ["perro", "gato", "loro", "caballo"];

for (animal in animales) {
	document.write(animal + "<br>"); //Va a mostrar: 0 1 2 3 (en vertical)
}


for (animal of animales) {
	document.write(animal + "<br>"); //Va a mostrar: perro gato loro caballo (en vertical)
}

														//LABEL
//Nos permite asociar un bucle a un nombre

array1 = ["juanjo", "ginola"];
array2 = ["mirkins", "chirito", array1, "tomito"];

forAston: //Este es el nombre q le asociamos
for (let array in array2) {
	if (array == 2) {

		for (let array of array1) {
			document.write(array + "<br>");
			break forAston; // Este break corta todo el bucle, si no tiene nombre corta solamente el bucle chiquito
		}

	}
	else {
		document.write(array2[array] + "<br>");
	}
}

																//FUNCIONES
//Es un bloque de codigo que sirve para no tener q repetir muchas veces  las mismas lineas de codigo

function saludar() {
	let resp = prompt("Hola, como estas?");
	if (resp == "bien") {
		alert("Me alegro");
	}
	else {
		alert("Una lastima");
	}
}
// ^^^ Definimos la funcion
saludar();
//^^^ Ejecutamos la funcion

//RETURN. Cuando nosotros ejecutamos la funcion simplemente estamos haciendo q haga cosas pero eso no tiene ningun resultado
//El return lo q hace es dar un valor a esa funcion. si queremos q nos devuelva un resultado o cualquier cosa

//PARAMETROS

function suma(num1,num2) {
	resultado = num1 + num2;
	return resultado;
}

suma(5,10); 

//FUNCIONES FLECHA
//Lo unico q cambia es q en vez de poner function suma() {}. Se pone:

const suma = ()=> {} //Se le pone => 



																//CAPITULO 3 (DALTO)
																//OBJETOS / POO (Programacion Orientada a Objetos)
			//Conceptos:
//CLASE: Crea el objeto
//OBJETO: Lo que crea la clase
//ATRIBUTOS: Caracteristicas que tiene el objeto
//METODOS: Hacen que nuestro objeto funcione
//CONSTRUCTOR: Funcion obligatoria, construye las propiedades del objeto
//INSTANCIACION: Es cuando el objeto ya esta creado

class Animal { //creamos la clase
	constructor(especie, edad, color) { //Ponemos entre los parentesis 
		this.especie = especie; //El this hace referencia al objeto (no tiene q si o si llamarse igual)
		this.edad = edad; 
		this.color = color;
		this.info = `Soy un ${this.especie}, tengo ${this.edad} años, y soy de color ${this.color}.`;
	}
	verInfo() {
		document.write(this.info + <br>); //El "this" solamente sirve adentro de la clase, afuera hay q poner el nombre de ese this ej: perro
	}
}

const perro = new Animal("perro", 5, "marron") //Creamos una variable llamada perro q tiene las propiedades q le damos
const gato = new Animal("gato", 3, "negro") //Las clases siempre se definen con "const"
const pajaro = new Animal("pajaro", 2, "verde")


// document.write(perro.info + <br>); . Estamos diciendo q nos muestre la info del perro (se le puede pedir cualquier otra propiedad), para esto es el "this"
// document.write(gato.info + <br>);
// document.write(pajaro.info + <br>);
//Una manera mas facil de mostrar todo esto es con un "metodo", que es una funcion adentro de una clase


perro.verInfo();
gato.verInfo();
pajaro.verInfo();


			//CARACTERISITCAS
//Abstraccion: Es cuando hacemos el objeto lo mas simple posible (tenemos solo lo mas importante)
//Modularidad: Es cuando separamos un problema grande en varias partes
//Encapsulamiento: Es hacer que todos los datos sean privados, que el usuario no pueda acceder tan facil al codigo
//Polimorfismo: Es como cada objeto se comporta de diferente manera ante el mismo metodo 

			//HERENCIA
//Tenemos una clase llamada Animal, pero queremos agregarle unas propiedades solamente a un objeto de esa clase. Creamos otra clase:

class Perro extends Animal {
	constructor(especie, edad, color, raza) {
		super(especie, edad, color); //En esta linea hereda los valores de la clase "Animal"
		this.raza = raza;
	}
	ladrar() {
		alert("waw"); //Este metodo solamente lo va a poder utilizar el perro
	}
}


						//METODOS
		//Estaticos
//No necesita q la clase se defina para poder ejecutar un metodo

class Perro extends Animal {
	static ladrar() {
		alert("Waw");
	}
}
Perro.ladrar();
//Esto va a funcionar por mas q no se hayan definido las propiedades

		//GETTER & SETTER
//SET, se usa para definir o modificar un valor
//GET, se usa para obtener un valor

class { //todo lo q sigue
	constructor(nombre) {
		this.nombre = "";
	}
	set setName(newName) {
		this.nombre = newName;
	}
	get getName() {
		 return this.nombre;
	}
}

clase.setName = "Juanjo";
document.write(clase.getName);


																//CAPITULO 4 (DALTO)
																//METODOS DE CADENAS / STRING
//Son metodos que se usan para modificar cadenas de texto / strings

let cadena1 = "cadena de prueba";
let cadena2 = "cadena 2";

resultado = cadena.metodo();

// cadena1.metodo(cadena2)

/*
concat(): junta 2 o mas cadenas y genera una nueva

startsWith(): si una cadena comienza con los caracteres de otra cadena muestra true
endWith(): si una cadena termina con los caracteres de otra cadena muestra true
includes(): busca si una cadena se encuentra adentro de otra, si es asi muestra true
indexOf(): busca si una cadena se encuentra adentro de otra, si es asi nos muestra en que posicion esta la primer letra, sino muestra -1
lastIndexOf(): ^^^^^^ muestra la posicion de la primer letra de la ultima palabra que esta adentro de esa cadena

padStart(5, "j"): la longitud de la cadena va a ser de 5 caracteres, si hay menos de 5 pone al principio la cantidad de "j" que falten  
padEnd(5, "j"): la longitud de la cadena va a ser de 5 caracteres, si hay menos de 5 pone al final la cantidad de "j" que falten 
repeat(2): repite la cadena la cantidad de veces que le digamos


split(" "): divide la cadena cada vez q haya un " ", y crea un array
substring("0,2"): muestra los caracteres de la cadena que le digamos
toLowerCase(): convierte la cadena a minusculas
toUpperCase(): convierte la cadena a mayusculas
toString(): convierte a string
trim(): elimina los espacios vacios al principio y al final
trimEnd(): elimina los espacios vacios del final
trimStart(): elimina los espacios vacios del principio
*/

																//METODOS DE ARRAYS
//Son como los metodos de cadenas / strings, pero se aplican a arrays

let nombres = ["juanjo", "pedro", "carlos", "roberto", "rodrigo"]

let resultado = nombres.metodo();

/*
.pop(): Elimina el ultimo item del array. Si ponemos document.write(resultado), nos muestra solo el q borro, si ponemos document.write(nombres), nos muestra los otros 2 q todavia estan
.shift(): Elimina el primer item del array.  ^^^^^^^^ 
.push("jorge"): Agrega uno o mas items al final de la lista.
.unshift("jorge"): Agrega uno o mas items al principio de la lista.
.reverse(): Invierte el orden de los items de la lista. No hace falta agregarlo a una variable.
.sort(): Ordena los items de la lista alfabeticamente, si son numero los ordena de menor a mayor.
.splice(1, 3, "jorge"): Elimina los items de las posiciones que le digamos y los reemplaza por otro que agreguemos (no es obligatorio agregarlo).


.join( - ): Convierte el array a string, y entre cada item lo separa con lo que pongamos entre los parentesis.
.slice(0, 2): Crea un nuevo array con los elementos de las posiciones que le digamos.
Algunos metodos de cadena tambien sirven.


.filter(): Es como un bucle. Va recorriendo toda la lista y muestra los items que cumplen una condicion, por ejemlo los q tienen mas de 4 letras, etc..
*/

																//OBJETO MATH
//Metodos de matematicas

let numero = Math.metodo();

/*
.sqrt(25); Muestra la raiz cuadrada de 25.
.cbrt(27); Muestra la raiz cubica de 27.
.max(); Devuelve el numero mas grande que pongamos en los parentesis.
.min(); Devuelve el numero mas chico que pongamos en los parentesis.
.random(); Tira un numero random entre 0 y 1.
.round(); Redondea el numero, si es menor a .5 para abajo, si es = o mayor para arriba.
.floor(); Redondea el numero para abajo.
.fround(); Muestra el numero con 15 decimales redondeados (no se usa casi nunca). 
.trunc(); Trunca el numero, le saca los decimales y muestra el num entero (sin redondear).


.PI; Muestra pi, 3,1415....
*/

																//CAPITULO 5 (DALTO)
																//CONSOLA DE JS
														//METODOS QUE FUNCIONAN EN LA CONSOLA

//Se puede escribir el codigo en el editor o abrir la consola en google inspeccionando la pagina (creo q mejor)

console.metodo();

								//FUNCIONES DE REGISTRO
/*
.assert(3==4); Si la afirmacion que esta en los parentesis es verdadera no pasa nada, si es falsa muestra un mensaje en consola de que esta mal (No se recomienda usarlo)
.clear(); Limpia la consola
.error("Hay un error"); Muestra en la consola con el formato de error "Hay un error"
.info("Muestra un mensaje"); Se usa mas .log
.log("Igual a info, pero hay una minima diferencia"); Se usa mas este
.table([1,2,3,3,4,5,4]); Muestra en la consola una tabla donde dice en q posicion se encuentra cada elemento del array y del otro lado que elemento es, Importante poner un array
.warn("Cuidado"); Es parecido al .error pero lo muestra en forma de advertencia
.dir([2,3,3,12]); Es parecido a info y log pero muestra los resultados de otra manera
*/

								//FUNCIONES DE CONTEO

/*
.count(); Sirve para llevar una cuenta de cuantas veces hicimos algo por ejemplo, cada vez q se ejecute este metodo va a sumarse 1 al total
.countReset(); Resetea el count
*/

								//FUNCIONES DE AGRUPACION

/*
.group("funciones"); crea como un grupo llamado "funciones", y todo lo q escribamos despues va a estar adentro de este grupo, si ponemos devuelta .group(), crea un "subgrupo" adentro de este mas grande
.groupEnd(); Cierra el grupo en donde escribamos esto, si lo escribimos en el mas chiquito cierra solo este y seguimos escribiendo en el anterior
.groupCollapsed(); Igual que .group pero collapsed crea el grupo con la flechita para la derecha, osea no podemos ver lo q hay adentro hasta que lo abrimos
*/

								//FUNCIONES DE TEMPORIZACION

/*
.time(); Inicia un temporizador
.timeLog(); Muestra cuanto tiempo paso desde q se empezo el temporizadior
.timeEnd(); Termina el temporizador
*/

//Cuando escribis algo se le puede dar estilo en CSS tambien
console.log("%cHola","background:black; color:#fff; border:2px solid red");


																//CAPITULO 6 (DALTO)
																//DOM (Document Object Model)
/*
Con esto empezamos a hacer dinamica la pagina web, vamos a decirle q hacer a cada cosa que programamos previamente en HTML

NODOS: Estos son TODOS los elementos del HTML que estan programados, es como una especie de arbol donde el primer elemento es el 
DOM, de este sale una flecha hacia HTML, de HTML salen 2, Head y Body, en el Head encontramos tittle, meta, etc..; 
en el body podemos encontrar muchas mas cosas como, scripts, h1, forms, inputs, etc...

	TIPOS DE NODOS
Document_Node: Es el nodo raiz, del cual derivan todos los demas, Es como el mas grande
Element_Node: Son los nodos que representan algo de HTML, h1, div.
Text_Node: Son los nodos que estan adentro de un element, por ejemplo, tenemos un h1 que seria un element, lo que este adentro de ese h1 es text
Attribute_Node: Serian los atributos, src, charset, etc..
Comment_Node: Son los comentarios y doctype.
*/


				//METODOS PARA SELECCIONAR UN ELEMENTO PARA MODIFICAR
document.metodo();

/*
.getElementById("ID"): Selecciona el elemento por ID, entre parentesis ponemos el ID del elemento que queremos modificar
.getElementsByTagName("Tag"): Selecciona el elemento por Tag, por ejemplo si ponemos entre parentesis "p" selecciona todos los p que hay en el archivo HTMl
.querySelector(".class"): Selecciona el elemento dependiendo de que selector usemos en el parentesis, son los mismos q en CSS
.querySelectorAll(".class"): Selecciona todos los elementos del selector
*/
//Cuando usamos getElementByTagName("") y querySelectorAll, para especificar a q elemento nos estamos refiriendo se usa:

let parrafo = getElementByTagName("p");
document.write(parrafo[0]);

				//METODOS PARA DEFINIR, AGREGAR O ELIMINAR ATRIBUTOS
// Es importante primero para seleccionar un elemento HTML hacer una variable que la seleccione para despues poder modificarla

let rango = document.querySelector(".rango");
rango.metodo("");

/*
.setAttribute("type", "text"): Esto lo q hace es reemplazar un input de tipo rango que teniamos en HTML por uno de text, 
.getAttribute("type"): Muestra que tipo de input es
.removeAttribute("type"): Elimina el atributo "type"
*/

				//ATRIBUTOS GLOBALES (Se pueden aplicar a cualquier elemento)
//Atributos que se pueden usar con setAttribute
//Tenemos un h1 en HTML con la class "titulo"

let titulo = document.querySelector(".titulo");

titulo.setAttribute("<atributo>", "<valor>");

/*
("contentEditable", "true"): El titulo se hace parecido a un input text, osea se puede editar, si es "false" no se puede editar
("dir", "ltr, rtl"): Establece la direccion del texto, LeftToRight, RightToLeft. No se recomienda porq se hace con CSS
("hidden", ""): No importa el valor, si esta el atributo el texto no se muestra, forma parte del DOM pero no es visible en la pagina
("tabindex", "0"): Permite q el texto se pueda focusear (seleccionar como un input text). Si tenemos varios le podemos dar diferentes valores numericos para despues cuando apretamos el "TAB" se seleccionen en ese orden
("title", "Algo"): Es lo q se muestra cuando pasamos el mouse por arriba (como una descripcion)
HAY MUCHISIMOS MAS (BUSCAR EN GOOGLE)
*/

				//ATRIBUTOS DE INPUTS (Solo se aplican a inputs)
//Tenemos un input text en HTML con la class "input1"

let input = document.querySelector(".input1");

document.write(input.<atributo>);
		O
input.<atributo>

/*
input.className: Muestra en pantalla el nombre de la class
input.value: Nos muestra el value del input (Se usa bastante)
input.type="numer": Muestra el type del input y se puede modificar tambien
input.accept = "image/png": Esto sirve para inputs type file y solamente va a aceptar el formato que pongamos, ej aca acepta solamente imagenes en .png
input.form = "<ID>": Sirve para cuando tenemos un boton para enviar informacion afuera de la etiqueta form de la info q queremos enviar, la etiqueta form tiene q tener un Id y es el q ponemos de valor
input.minLength = 4: Es la minima cantidad de caracteres que tiene q tener el input para que se pueda enviar
*/

										//CLASES, CLASSLISTS Y METODOS
//Tenemos un h1 en HTML con la class "titulo"

let titulo = document.querySelector(".titulo");

titulo.classLists.metodo();

		//METODOS
/*
.add("algo"): Agrega una clase
.remove("algo"): Elimina la clase
.item(1): Esto sirve para cuando tenemos varias clases nos muestra cual es
.contain(): Si la clase esta muestra true, si no muestra false
.toggle("algo", true): Si la clase existe la elimina, si no existe la agrega, el true fuerza a que si la clase existe la deja, si le damos false no va a agregar la clase si no existe
.replace("algo", "nada"): Reemplaza la clase "algo", por la clase "nada"
*/

							//OBTENCION Y MODIFICACION DE ELEMENTOS
//Tenemos un parrafo en HTML, con otras etiquetas (<b> negrita), y estilos

const parrafo = document.querySelector(".parrafo");

let resultado = parrafo.atributo;

/*
.textContent: Muestra todo el texto, pero sin ningun estilo ni otra etiqueta q tenga (sin negrita)
.innerHTML: Muestra lo que este adentro de la etiqueta <p>, incluyendo la etiqueta de negrita
.outerHTML: Muestra toda la etiqueta <p>, esta incluida
*/

							//CREACION DE ELEMENTOS
//Esto sirve para agregar un elemento al HTML
//Creo q es mas facil agragarlo directamente en el codigo HTML que aca pero bueno lo explico igual

//Tenemos un div con la class "contenedor" en el codigo HTML y queremos agregarle mas cosas adentro

const contenedor = document.querySelector(".contenedor");

const item = document.createElement("LI"); //Creamos un elemento "li" (una lista), es importante poner todo en mayuscula. <li></li>

//

const texto = document.createTextNode("Item de la lista"); //Creamos un nodo de tipo texto.
item.appendChild(texto); //Agregamos a la lista (variable "item"), el texto (variable "texto"). 	<li>Item de la lista</li>

//Esta es una manera, otra manera es:

item.innerHTML = "Item de la lista"

//

contenedor.appendChild(item); //Agregamos al contenedor la lista.		 <div class="contenedor"><li>Item de la lista</li><div/>

// Esto es lo que hay q hacer para crear una etiqueta "li" y agregarle 1 item (por eso creo q es mas facil agregarlo directamente en HTML)
// Para agregar varios elementos es diferente

const contenedor = document.querySelector(".contenedor");

const fragmento = document.createDocumentFragment(); //Estamos creando un fragmento

for (i = 0; i < 10; i++){
	const item = document.createElement("LI");
	const texto = document.createTextNode("Item de la lista");
	item.appendChild(texto);
	fragmento.appendChild(item); //Agregamos la etiqueta "li" y su contenido al fragmento 
}

// Esto hace que adentro del fragmento (que es como un grupo) se creen 10 listas con el mismo contenido adentro

contenedor.appendChild(fragmento); //Agregamos al contenedor el fragmento con la lista adentro

//Se hace de esta manera para no usar tantos recursos


						//OBTENCION Y MODIFICACION DE CHILDS (HIJOS)	
//Hay un div con un h2 un h4 y un parrafo en HTML

const contenedor = document.querySelector(".contenedor")

const variableParaElHijo = contenedor.metodo;

/*
.firstChild; //Aca esta tomando el valor de lo primero que encuentre en el contenedor, si hay un espacio es considerado texto asi q toma eso.
.lastChild; //Igual que ^^^ pero el ultimo
.firstElementChild; //Esto toma el valor del primer elemento, no hay q preocuparnos por los espacios
.lastElementChild; //Igual que ^^^ pero el ultimo
.childNodes; //Esto crea una NodeList con todos los elementos hijos de el contenedor, incluyendo los espacios (text)
.children; //Crea una colectionHTML que muestra solo los hijos, SIN LOS ESPACIOS
*/

						//METODOS DE CHILDS
//Hay un div con un h2 un h4 y un parrafo en HTML

const contenedor = document.querySelector(".contenedor");

const h2_viejo = document.querySelector(".h2");
const h2_nuevo = document.createElement("H2");
h2_nuevo.innerHTML = "Titulo";

contenedor.metodo();

/*
.replaceChild(h2_nuevo, h2_viejo); Sirve para reemplazar
.remove(h2_viejo); Elimina el "h2_viejo"
.hasChildNodes; Verifica si tiene hijos o no
/*

						//PROPIEDADES DE PARENTS (PADRES)
//La estructura es igual que en las propiedades de childs

/*
parentElement; Selecciona el padre de un elemento
parentNode; Es lo mismo ^^^, pero si el padre no es un elemento HTML se usa este
*/


						//PROPIEDADES DE SIBLINGS (HERMANOS)
//La estructura es igual que en las propiedades de childs

//Son los q estan en el mismo "rango". Ej los q estan adentro de head, o los q estan adentro de un div

/*
nextSibling; //Aca esta tomando el valor del siguiente hermano q aparezca, si hay un espacio es considerado texto asi q toma eso.
previousSibling; //Toma el valor del anterior hermano 
nextElementSibling; //Toma el valor del siguiente elemento hermano
previousElementSibling; //Toma el valor del anterior elemento hermano
*/

						//UNA PROPIEDAD DE NODOS
/*
closest(""); Se usa para mostrar el elemento ascendente (padre) mas cercano de un elemento, entre parentesis va un selector
*/








