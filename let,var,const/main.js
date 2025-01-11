//let, const, var
let age = 30; // a let tökéletes, amikor később felülírjuk az értékét a deklarált változónak, (mutáljuk a változót)
age = 35;

let year; //deklarálunk egy üres let változót
year = 2007; //utána pedig, adunk neki egy értéket, erre is tökéletes a let típusú változó

const BirthYear = 1983;//nem lehet felülírni a const változó értékét
//BirthYear = 2007; ez itt hibát eredményez

//const job; ez is hibát eredményez, mivel kötelező kezdeti értéket megadni a const változóknak 

var job = 'programozó'; //megengedi, a JS, hogy felülírjuk a kezdeti értékét a változónak
job = 'Informatika tanár';

