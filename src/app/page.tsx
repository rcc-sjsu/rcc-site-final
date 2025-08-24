// app/page.tsx
// Remove the import for Header and any div with styles.container or styles.pageContent
// from this file, as the layout will handle it.
import Heading from "@/components/Heading";

export default function Home() {
  return (
    <>
      {/* Your unique home page content goes here */}

      <div className="w-20">
      <Heading align="left" headingTag="h1">
        Bigbig balls
      </Heading>
      </div>
    </>
  );
}
