// app/page.tsx
// Remove the import for Header and any div with styles.container or styles.pageContent
// from this file, as the layout will handle it.

export default function Home() {
  return (
    <>
      {/* Your unique home page content goes here */}
      <h1>Welcome to the Home Page</h1>
      <p>This content is now rendered within the shared layout!</p>
      <p>You can add more content, components, or even nested layouts here.</p>
    </>
  );
}
