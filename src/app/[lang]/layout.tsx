
import { getTranslations } from '../../shared/translattion/translationCache';
import './globals.css'
import { Header } from '../components/layout/header';
import { getHeaderData } from '../../apis/header-apis';
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  , params: { lang: string }
}) {
  const translations = await getTranslations(params.lang)
  const headerData = await getHeaderData(params.lang)

  return (

    <html suppressHydrationWarning={true} lang={params?.lang} dir={params?.lang == 'ar' ? 'rtl' : 'ltr'}>
      <body suppressHydrationWarning={true}>
        <header className="flex min-h-[6rem] w-full items-center bg-white shadow print:hidden">

          <Header translations={translations} lang={params?.lang} headerData={headerData} />
        </header>
        {children}
      </body>
    </html>


  )
}
