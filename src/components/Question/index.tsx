import { ReactNode } from "react";
import "./style.scss";

type QuestionProps = {
  content: string;
  author: {
    avatar: string;
    name: string;
  };
  isHighLighted?: boolean;
  isAnswered?: boolean;
  children: ReactNode;
};

export function Question({
  content,
  author,
  children,
  isHighLighted,
  isAnswered,
}: QuestionProps) {
  return (
    <div
      className={`question ${isHighLighted && isAnswered === false ? "highlighted" : ""} ${isAnswered ? "answered" : ""}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="user-actions">{children}</div>
      </footer>
    </div>
  );
}
