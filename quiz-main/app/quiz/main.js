const manager = new Manager();
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

const questionArea = new QuestionArea('question', manager);
const answersArea = new AnswersArea('answer-area', manager);