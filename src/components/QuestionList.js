import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((resp) => setQuestions(resp))
  }, []
  )
  const questionsToDisplay = questions;

  function handleDeleteQuestion(deletedQuestion) {
    console.log(deletedQuestion)
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  function updateAnswerChange(updatedQuestionID) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestionID) {
        return questions[updatedQuestionID - 1];
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions)
  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToDisplay.map((question) => {
        return <QuestionItem key={question.id} question={question} handleDeleteQuestion={handleDeleteQuestion} updateAnswerChange={updateAnswerChange} />
      }
      )}</ul>
    </section>
  );
}

export default QuestionList;
