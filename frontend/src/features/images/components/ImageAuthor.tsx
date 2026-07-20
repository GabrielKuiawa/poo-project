import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ImageAuthor as ImageAuthorData } from "../types";

type ImageAuthorProps = {
  author: ImageAuthorData;
};

export function ImageAuthor({ author }: ImageAuthorProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-11">
        <AvatarImage src={author.pathImageUser} alt="" />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="font-semibold">{author.name}</span>
    </div>
  );
}
