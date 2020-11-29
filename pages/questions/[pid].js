import { useEffect, useState } from "react";
import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from 'next/router'

export default function Set({ questions }) {
  
  const [quest, setQuest] = useState('init')

  useEffect(() => {
    const id = setInterval(() => {
      setQuest(rndo(questions))
    }, 1000);
    return()=> clearInterval(id);
  })
  
  return (
    <div>
      <h1>Display This Question</h1>
  <h2 className="dyno">{quest.question}</h2>
      <ul>
        {questions.map((question) => (
          <li>
            <h2>{question.question}</h2>
            <h3>{question.answer}</h3>
            <p>{question.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function rndo(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getServerSideProps(context) {
  console.log("why does this not show", context.params);
  // const { pid } = router.query
  const { db } = await connectToDatabase();

  const questions = await db
    .collection("questions")
    .find({"set": context.params.pid})
    .sort({ score: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}