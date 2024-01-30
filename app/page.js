import Hero from "@/components/Hero";
import SafetyInfoSection from "@/components/SafetyInfoSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SafetyInfoSection />
    </main>
  );
}
