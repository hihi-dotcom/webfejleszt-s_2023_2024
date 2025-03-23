const manager = new Manager();// A mainben csináltunk egy manager példányt
Gomszab.addFileUploader(fileResultString => {
  const fileLines = fileResultString.split('\n'); //eltároljuk a soronként letördelt stringünket egy const változóban ezek lesznek a sorai a fájlunknak
  for(const line of fileLines){//bejárjuk ezeket a sorokat egy for of ciklus segítségével
    const fields = line.split(';');//majd ezeket az aktuális ciklusváltozóra meghívott split segítségével tovább tördeljük a sorokat ;-ként és ezek lesznek a fieldjeink
    const answers = [// az egyes filedjeink lesznek az egyes elemek  az answers tömbben
      fields[1],
      fields[2],
      fields[3],
      fields[4]
    ]
    const rightAnswer = fields[5].trim();// a trim metódus segítségével az üres spaceket eltávolítjuk a helyes válaszról
    const question = new Question(fields[0], answers, rightAnswer);//példányosítjuk a megfelelő paraméterek megadásával a question osztályunkat, minden egyes ciklus iterációban
    manager.add(question);//a question példányokat hozzáadjuk egyesével a managerünkhöz minden iteráció során a manager példányunk add függvényének segítségével
  }
  manager.start();//miután végig értünk a fájlunk összes során meghívjuk a Manager osztályunk példányának start függvényét is. 
})

const questionArea = new QuestionArea('question', manager); //csináltam egy questionArea példányt is a két bemeneti paraméterrel, ugye a második paraméterünknek egy Managernek kell lennie, ezért lesz ott manager példányunk
const answersArea = new AnswersArea('answer-area', manager);//illetve csináltam egy answersArea példányt is a két bemeneti paraméterrel,ugye a második paraméterünknek egy Managernek kell lennie, ezért lesz ott manager példányunk