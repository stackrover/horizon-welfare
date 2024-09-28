import { Button } from "@/components/ui/button";
import { InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ContactUsForm({ className }: { className?: string }) {
  return (
    <form className={cn("grid grid-cols-2 gap-8", className)}>
      <div>
        <label htmlFor="first-name" className="font-semibold text-gray-400">
          First Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your first name"
          name="first-name"
          id="first-name"
          required
        />
      </div>
      <div>
        <label htmlFor="last-name" className="font-semibold text-gray-400">
          Last Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your last name"
          name="last-name"
          id="last-name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="font-semibold text-gray-400">
          Email
        </label>
        <FormInput
          type="email"
          placeholder="Type your email address"
          name="email"
          id="email"
          required
        />
      </div>
      <div>
        <label htmlFor="subject" className="font-semibold text-gray-400">
          Subject
        </label>
        <FormInput
          type="text"
          id="subject"
          placeholder="Type your subject"
          name="subject"
          required
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="message" className="font-semibold text-gray-400">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="shadow-none focus-visible:ring-primary"
        />
      </div>
      <div className="col-span-2 flex justify-center">
        <Button type="submit">Send Message</Button>
      </div>
    </form>
  );
}

const FormInput = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      {...props}
      className="h-10 w-full border-b bg-transparent outline-none transition-all focus:border-b focus:border-primary focus:outline-none active:outline-none"
    />
  );
};
