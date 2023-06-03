import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar';
import { AppProvider } from './providers/app.provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Funny movies',
  description: 'Funny movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <div className='container'>{children}</div>
        </AppProvider>
      </body>
    </html>
  )
}
