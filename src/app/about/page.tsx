import type { Metadata } from "next";
import { PageHero } from "../(shared)/PageHero";
import { BackToHomeButton } from "@/components/BackToHomeButton";

export const metadata: Metadata = {
  title: "درباره",
  description: "درباره وبلاگ و نویسنده"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="درباره EN Hub"
        description="یک بلاگ مینیمال برای یادگیری زبان "
      />
      <article className="space-y-4 rounded-2xl border border-slate-200 bg-surface p-6 text-slate-600 shadow-card">
        <p className="leading-8">
          EN Hub فضایی برای یادگیری، اشتراک تجربه و رشد فردی در زمینه توسعه وب و
          یادگیری زبان است. ما تلاش می‌کنیم محتوا ساده، کاربردی و قابل فهم باشد
          تا هر سطحی از یادگیری بتواند از آن استفاده کند.
        </p>
        <p className="leading-8">
          ظاهر مینیمال باعث می‌شود تمرکز اصلی روی محتوا بماند و تجربه مطالعه روان و سازگار با زبان‌های راست‌به‌چپ فراهم شود.
        </p>
        <p className="leading-8">
          علاوه بر این، ما از LangAgent برای کمک به یادگیری زبان استفاده می‌کنیم؛
          سیستمی هوشمند که با ارائه مکالمه، تمرین و بازخورد، فرایند یادگیری را
          طبیعی‌تر و مؤثرتر می‌کند.
        </p>
        <p className="leading-8">
          ایده سایت از علاقه شخصی من به یادگیری زبان و توسعه وب نشأت گرفته است.
          امیدوارم این فضا برای شما مفید باشد و بتوانید در مسیر یادگیری خود
          پیشرفت کنید.
        </p>
        <p className="leading-10">Email :  
          <a
            href="mailto:langagent@proton.com"
            className="text-primary underline-offset-2 hover:underline"
          > langagent@proton.com</a>
        </p>

      </article>
      <BackToHomeButton className="mt-8" />
    </>
  );
}

