import { SingleComment } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";

export default function SingleBlogPage() {
  return (
    <main className="mx-auto max-w-[820px] p-5">
      <h4 className="w-fit rounded-md bg-gradient-to-br from-primary-light to-primary px-4 py-2 text-sm font-medium leading-5 text-base-0">
        WASH PROJECT
      </h4>
      <h1 className="mt-4 text-3xl font-semibold leading-10 text-base-400 md:text-4xl">
        Installation of water pump in Rangpur Update and Brefing
      </h1>
      <div className="mt-6 flex items-center gap-2">
        <IconUserCircle size={28} className="rounded-full text-base-300" />
        <div className="flex items-center gap-6">
          <h5 className="text-sm font-medium leading-5 text-base-300">
            Riadul Islam
          </h5>
          <h5 className="text-sm font-medium leading-5 text-base-300">
            August 23, 2024
          </h5>
        </div>
      </div>

      {/* image section  */}
      <Image
        src="/images/blog-image.png"
        alt="blog image"
        width={800}
        height={420}
        className="mt-6 h-fit w-full"
      />

      {/* blog text  */}
      <p className="mt-8 text-base font-normal leading-8 text-base-400 md:text-lg">
        Traveling is an enriching experience that opens up new horizons, exposes
        us to different cultures, and creates memories that last a lifetime.
        However, traveling can also be stressful and overwhelming, especially if
        you dont plan and prepare adequately. In this blog article, well explore
        tips and tricks for a memorable journey and how to make the most of your
        travels. One of the most rewarding aspects of traveling is immersing
        yourself in the local culture and customs. This includes trying local
        cuisine, attending cultural events and festivals, and interacting with
        locals. Learning a few phrases in the local language can also go a long
        way in making connections and showing respect.
      </p>

      {/* others text section here  */}

      {/* comments section - auth required to comment */}
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
    </main>
  );
}
