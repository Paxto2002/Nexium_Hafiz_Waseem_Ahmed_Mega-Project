import "./globals.css";

export const metadata = {
  title: "Moodistan",
  description:
    "Moodistan is a calm, inclusive mental health tracker that helps you reflect, grow, and heal — with optional Islamic wisdom for those who opt in.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
