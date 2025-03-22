const manager = new Manager();// A mainben csináltunk egy manager példányt
Gomszab.addFileUploader(fileResultString => {
  const fileLines = fileResultString.split('\n');
  for(const line of fileLines){
    const fields = line.split(';');
    const answers = [
      fields[1],
      fields[2],
      fields[3],
      fields[4]
    ]
    const rightAnswer = fields[5].trim();
    const question = new Question(fields[0], answers, rightAnswer);
    manager.add(question)
  }
  manager.start();
})

const questionArea = new QuestionArea('question', manager); //csináltam egy questionArea példányt is a két bemeneti paraméterrel, ugye a második paraméterünknek egy Managernek kell lennie, ezért lesz ott manager példányunk
const answersArea = new AnswersArea('answer-area', manager);//illetve csináltam egy answersArea példányt is a két bemeneti paraméterrel,ugye a második paraméterünknek egy Managernek kell lennie, ezért lesz ott manager példányunk