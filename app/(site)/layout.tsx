import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/content";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

  return (
    <div className="flex min-h-full flex-col">
      <Navbar
        brandName={settings.brandName}
        logo={settings.logo || undefined}
        ctaText={settings.navCtaText}
        ctaLink={settings.navCtaLink}
      />
      <main className="flex-1">{children}</main>
      <Footer
        brandName={settings.brandName}
        logo={settings.logo || undefined}
        blurb={settings.footerBlurb}
        ctaText={settings.footerCtaText}
        ctaLink={settings.footerCtaLink}
      />
    </div>
  );
}
