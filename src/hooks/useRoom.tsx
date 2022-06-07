import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
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
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth()
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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like ]) => like.authorId === user?.id)?.[0]
          };
        }
      );
      setQuestions(newFirebaseQuestions);
      setTitleRoom(roomInfo.title);
    });

    return () => roomRef.off('value')
    
  }, [roomId, user?.id]);
  

  return { questions, titleRoom };
}
 