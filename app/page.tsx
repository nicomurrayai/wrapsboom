import { HeroSlider } from "@/components/hero/HeroSlider";
import { WrapBoomLanding } from "@/components/landing/WrapBoomLanding";
import { Navbar } from "@/components/navbar/Navbar";
import { OrderFab } from "@/components/ui/OrderFab";
import { getLacartaMenuData } from "@/lib/lacarta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { menuData } = await getLacartaMenuData();

  return (
    <main>
      <Navbar />
      <HeroSlider />
      <WrapBoomLanding menuData={menuData} />
      <OrderFab />
    </main>
  );
}
