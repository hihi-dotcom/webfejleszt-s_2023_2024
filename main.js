const InputYear = `2007`; //Az eredeti érték nem lett konvertálva(string maradt)
console.log(Number(InputYear)); //itt csak az InputYear egy konvertált verzióját kapjuk meg
console.log(Number(InputYear) + 18);

console.log(Number(`Ádám`));//Nan(Not a Number = érvénytelen szám) értéket kapunk, mivel lehetetlen ezt a stringet inté átkonvertálni

console.log(typeof NaN);// a NaN érték is számtípusú(number), így ténylegesen érvénytelen számot(invalid numbert) jelent