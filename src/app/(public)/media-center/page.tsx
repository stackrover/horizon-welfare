import { Banner, BlogCard, NewsCard, NewsletterSection } from "@/components";
import { Button } from "@/components/ui/button";
import { blogData } from "@/constants/blogData";

export default function MediaCenter() {
  return (
    <main>
      {/* top news section  */}
      <section className="bg-[#CEF4FF] py-[80px]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4">
          <div>
            <h4 className="mb-6 text-base font-bold leading-[18px] text-base-400">
              TOP NEWS
            </h4>
            <h1 className="mb-10 text-[56px] font-bold leading-[68px] text-base-400">
              Our goal is to provide inclusive care for children with special
              needs
            </h1>
            <p className="mb-4 text-base leading-[26px] text-base-300">
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
              Nunc ut sem vitae risus tristique posuere.
            </p>
            <Button className="rounded-sm">Read More</Button>
          </div>
          <div className="flex flex-col gap-y-6 rounded-[20px] bg-base-0 p-6">
            <NewsCard
              title="Autism care day"
              date="15th Nov 2022"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim"
              image="/images/media-center-1.png"
            />
            <NewsCard
              title="Down syndrome outreach"
              date="15th Nov 2022"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim"
              image="/images/media-center-2.png"
            />
            <NewsCard
              title="Caring for children with cerebral palsy"
              date="15th Nov 2022"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim"
              image="/images/media-center-3.png"
            />
          </div>
        </div>
      </section>
      {/* top news section end */}

      {/* banner section  */}
      <section className="p-6">
        <Banner className="overflow-hidden rounded-lg" />
      </section>
      {/* banner section end */}

      {/* newsletter subscription section  */}
      <section className="relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-[url('/images/join-us.png')] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']">
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
