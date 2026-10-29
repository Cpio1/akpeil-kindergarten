"use client";

import { Website } from "../website/Website";
import { MobileWebsite } from "../mobile-website/MobileWebsite";
import { useIsDesktop } from "./hooks";

/**
 * Один адрес — две версии интерфейса. До гидратации сервер отдаёт обе, а лишнюю
 * скрывает CSS (без мерцания). После загрузки в DOM остаётся только нужная версия,
 * поэтому якоря и H1 не дублируются; при повороте/изменении окна версия меняется сама.
 */
export function ResponsiveSite() {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) {
    return (
      <>
        <div className="hidden lg:block">
          <Website />
        </div>
        <div className="lg:hidden">
          <MobileWebsite />
        </div>
      </>
    );
  }

  return isDesktop ? <Website /> : <MobileWebsite />;
}
