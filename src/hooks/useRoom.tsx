import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseRoom = Record<
  string,
  {
    author: {
      avatar: string;
      name: string;
    };
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
  }
>;

type QuestionType = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
};

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [titleRoom, setTitleRoom] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const roomInfo = room.val();
      const firebaseQuestions: FirebaseRoom = roomInfo.questions ?? {};

      const newFirebaseQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            author: value.author,
            content: value.content,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setQuestions(newFirebaseQuestions);
      setTitleRoom(roomInfo.title);
    });
  }, [roomId]);

  return { questions, titleRoom }

}
