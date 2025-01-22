import Image from "next/image";
import { SingleComment } from "../../custom/SingleComment";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function BlogComments() {
  return (
    <section className="mx-auto mt-[60px] max-w-[662px]">
      <div className="flex items-center gap-2">
        <Image
          src="/images/blog-image.png"
          alt="blog image"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full ring-2 ring-blue-600 ring-offset-2"
        />
        <form className="flex flex-1 items-center gap-2 rounded-full border border-[#B4B7C9] bg-[#F3F3F3] p-2">
          <Input
            type="text"
            className="border-none shadow-none focus-visible:ring-0"
            placeholder="Add a comment"
          />
          <Button
            type="submit"
            className="rounded-full from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
          >
            Post
          </Button>
        </form>
      </div>

      <div className="mt-6">
        <SingleComment
          image="/images/blog-image.png"
          name="Ralph Edwards"
          date="Aug 19, 2021"
          comment="In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique"
        />
      </div>
    </section>
  );
}
