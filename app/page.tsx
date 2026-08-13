import { Hero } from "@/components/home/Hero";
import { TechStack } from "@/components/home/TechStack";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TechStack />
    </main>
  );
}
