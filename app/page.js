import Hero from "@/components/Hero";
import ReportCrimeInfoSection from "@/components/ReportCrimeInfoSection";
import SafetyInfoSection from "@/components/SafetyInfoSection";
import ContactUsSection from "@/components/ContactUsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SafetyInfoSection />
      <ReportCrimeInfoSection />
      <ContactUsSection />
    </main>
  );
}
