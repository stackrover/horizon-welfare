import { ContactUsForm } from "@/components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../../../public/icons";

export default function ContactUs() {
  return (
    <main>
      {/* contact us section  */}
      <section className="container mt-[80px] rounded-lg bg-gradient-to-r from-primary-light to-primary p-[100px]">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8">
          <div className="flex flex-col gap-y-8">
            <h5 className="text-base font-bold leading-[18px] text-base-0">
              CONTACT US
            </h5>
            <h5 className="text-[56px] font-bold leading-[68px] text-base-0">
              {"We'd love to hear from you"}
            </h5>
            <p className="text-xl font-normal leading-8 text-base-100">
              Have any question in mind or want to enquire? Please feel free to
              contact us through the form or the following details.
            </p>
          </div>

          <div className="flex flex-col gap-y-8">
            <div>
              <h3 className="mb-4 text-2xl font-bold leading-[38px] text-base-0">
                {"Let's talk!"}
              </h3>
              <div className="mb-4 flex items-center justify-between">
                <h5 className="text-base font-normal leading-7 text-base-0">
                  +01799999999
                </h5>
                <h5 className="text-base font-normal leading-7 text-base-0">
                  horizonwo1345@gmail.com
                </h5>
              </div>
              <Separator />
            </div>
            <div>
              <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                Head Office
              </h4>
              <h5 className="font-normal leading-[25px] text-base-100">
                8 Brewery Drive, Lagos, Nigeria.
              </h5>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                Branch Office
              </h4>
              <h5 className="font-normal leading-[25px] text-base-100">
                Opp Opolo round about, Yenagoa, Bayelsa, Nigeria
              </h5>
            </div>
            <div className="flex items-center gap-x-5">
              <Link href={"/"}>
                <FacebookIcon fill="#ffffff" />
              </Link>
              <Link href={"/"}>
                <TwitterIcon fill="#ffffff" />
              </Link>
              <Link href={"/"}>
                <LinkedinIcon fill="#ffffff" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* contact us section end   */}

      {/* contact form section  */}
      <section className="mx-auto mt-[100px] max-w-3xl">
        <ContactUsForm />
      </section>
      {/* contact form section end */}

      {/* join as volunteer section  */}
      <section className="relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-[url('/images/join-us.png')] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']">
        <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
          <h4 className="max-w-[900px] text-center text-5xl font-bold leading-[58px] text-base-0">
            You can contribute to provide a place for children with special
            needs!
          </h4>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="w-fit">Join As A Volunteer</Button>
            </Link>
            <Link href="/">
              <Button variant="light" className="w-fit">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* join as volunteer section end */}

      {/* map section  */}
      <section className="mt-[100px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.842555759898!2d90.4213865759517!3d23.824197085938167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c645092cd59f%3A0xb52d7cf5ebf4ca6!2s31%20Nazimuddin%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1727543456104!5m2!1sen!2sbd"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </section>
      {/* map section end */}
    </main>
  );
}
