import { Hero } from "@/components/hero";
import { SequentialVsSpatial } from "@/components/sequential-vs-spatial";
import { IntroSequence } from "@/components/intro-sequence";
import { ArchitectureComparison } from "@/components/architecture-comparison";
import { CoreMath } from "@/components/core-math";
import { UnrolledView } from "@/components/unrolled-view";
import { GradientFlow } from "@/components/gradient-flow";
import { ApplicationsGrid } from "@/components/applications-grid";
import { ProsCons } from "@/components/pros-cons";
import { LiveDemo } from "@/components/live-demo/demo-interface";
// Import other components as they are created

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Hero />
      <SequentialVsSpatial />
      <IntroSequence />
      <ArchitectureComparison />
      <CoreMath />
      <UnrolledView />
      <GradientFlow />
      <ApplicationsGrid />
      <ProsCons />
      <LiveDemo />
      {/* <UnrolledView /> */}
      {/* <GradientFlow /> */}
      {/* <Applications /> */}
      {/* <ProsCons /> */}
      {/* <LiveDemo /> */}
    </main>
  );
}
