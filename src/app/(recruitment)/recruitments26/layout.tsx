export const metadata = {
  title: 'Welcome | ADS!',
  description: 'Your journey to becoming a part of Alexa Developers SRM starts here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
