const review = {
  text: "I delegated our AI agent logs to Neatlogs so they take care of our trace tracking.",
  name: "Harkirat Singh",
  role: "Engineering Lead",
  imageUrl:
    "https://preview.redd.it/hello-r-jee-im-harkirat-singh-air-658-in-jee-iit-roorkee-v0-b369l2auvabd1.jpg?width=960&format=pjpg&auto=webp&s=1f89b2b36725a0079320eb15574b821178df81c6",
};

export const Reviews = () => {
  return (
    <section className="w-full bg-[#FAFAFA] border-t border-zinc-900/5 px-6 py-24 sm:py-28 lg:py-32 flex flex-col items-center">
      <span
        translate="no"
        className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
        style={{ color: "#E9462E" }}
      >
        What teams are saying
      </span>

      <div className="mt-6 sm:mt-8 flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-ui text-balance text-[clamp(22px,3.4vw,34px)] font-medium leading-[1.25] tracking-tight text-zinc-950 max-w-2xl">
          &ldquo;{review.text}&rdquo;
        </p>
        <p className="mt-6 text-[15px] font-semibold text-zinc-900">
          {review.name}
        </p>
        <p className="mt-1 text-[13px] text-zinc-500">{review.role}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.imageUrl}
          alt={review.name}
          className="mt-3 size-11 rounded-full object-cover ring-1 ring-zinc-900/10 shadow-[0_2px_8px_-2px_rgba(12,20,40,0.12)]"
        />
      </div>
    </section>
  );
};
