import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  userAvatar: string;
  userName: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  userAvatar,
  userName,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!content.trim()}>
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
