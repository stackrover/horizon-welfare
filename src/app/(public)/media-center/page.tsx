import {
  BlogCard,
  MediaCenterBannerSection,
  MediaCenterHeroSection,
  NewsletterSection,
} from "@/components";
import { blogData } from "@/constants/blogData";

export default function MediaCenter() {
  return (
    <main>
      {/* top news section  */}
      <MediaCenterHeroSection />
      {/* top news section end */}

      {/* banner section  */}
      <section className="p-6">
        <MediaCenterBannerSection className="overflow-hidden rounded-lg" />
      </section>
      {/* banner section end */}

      {/* newsletter subscription section  */}
      <section className="relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-[url('/images/joinUs.png')] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']">
        <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
          <h4 className="max-w-[900px] text-center text-5xl font-bold leading-[58px] text-base-0">
            SUBSCRIBE TO OUR NEWSLETTER TO GET NOTIFIED ON ALL OUR UPDATES
          </h4>
          <div className="mx-auto w-full max-w-[975px]">
            <NewsletterSection className="w-full" />
          </div>
        </div>
      </section>
      {/* newsletter subscription section end */}

      {/* blog post section  */}
      <section className="mx-10 mt-[100px] grid grid-cols-4 gap-x-6 gap-y-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <BlogCard key={index} cardData={blogData} />
        ))}
      </section>
      {/* blog post section end */}
    </main>
  );
}
