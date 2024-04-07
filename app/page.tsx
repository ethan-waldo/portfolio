import { ModeToggle } from "@/components/mode-toggle";
import { PortfolioCarousel } from "@/components/portfolio-carousel";

export default async function Home() {        
  return (
    <div className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(gray,transparent_1px)] [background-size:32px_32px]">
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-12">
      <div className="absolute top-0 right-0 m-2">
        <ModeToggle/>
      </div>
      <h1 className="font-black scroll-m-20 text-4xl tracking-tight lg:text-5xl">
        Ethan Waldo
      </h1>
      <PortfolioCarousel/>
    </main>
    </div>
  );
}
