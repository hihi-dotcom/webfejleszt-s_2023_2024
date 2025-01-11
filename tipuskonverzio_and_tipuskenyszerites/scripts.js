

//Ez a típuskonverzió

const InputYear = `2007`; //Az eredeti érték nem lett konvertálva(string maradt)
console.log(Number(InputYear)); //itt csak az InputYear egy konvertált verzióját kapjuk meg
console.log(Number(InputYear) + 18);

console.log(Number(`Ádám`));//Nan(Not a Number = érvénytelen szám) értéket kapunk, mivel lehetetlen ezt a stringet inté átkonvertálni

console.log(typeof NaN);// a NaN érték is számtípusú(number), így ténylegesen érvénytelen számot(invalid numbert) jelent


//típuskényszerítés

console.log('I am ' + 17 + ' years old') //Ez a típuskényszerítés miatt működik,(2 string és egy számból egy string lesz) mivel a plusz operátor kivált egy kényszerítést stringgé

console.log('23' - '10' - 3); // Ebben az esetben, a JS strngeket konvertált át számmá, mivel az eredmény 10 lett. Ha +-t használnánk az utolsó 3-as értéket stringgé konvertálnánk át és a három string egymás mögé kerülne: 23103

console.log('23' * '2'); //Itt az eredmény 46 lesz, mivel mindkét string érték számmá lesz át konvertálva a JS által.

//Mi lesz a kimenet?

let n = '1' + 1 // string: 11
n = n - 1//mivel itt - operátor van a 11 számmá(intté) lesz konvertálva, amiből kivonunk 1-et, és ezért lesz 10 az eredményünk
console.log(n)

let a = 2 + 3 + 4 + "5"; //Itt a 2+3+4-ből lesz kilenc, sima számok összeadásával, majd mivel + operátort használunk, a 9 stringgé lesz konvertálva és a "9" és az "5" egymás mellé kerül és, így lesz egy string: "95"
console.log(a);

let b = '10' - '2' - '3' - 1 + '4'; //Itt a '10' - '2' - '3' - 1, eredménye 4(int) lesz szám típusként a - operátorok miatt, mivel utána egy + operátor van és egy '4' string ezért a 4(int) érték is stringgé lesz konvertálva a JS által és egymás mellé kerülnek és ezért lesz az eredményünk: "44"(string)
console.log(b);
