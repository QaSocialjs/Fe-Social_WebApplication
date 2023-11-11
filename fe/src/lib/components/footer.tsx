import React, { useContext, useState } from "react";
import { Language, cn } from "../utils/utils";
import { typeProps } from "../utils/typeProps";
import HeroIcon from "./Heroicon";
import SelectOption from "./selectOption";
import { LangContext } from "../context/languagecontex";
import { useTranslation } from "react-i18next";

type typeFooter = typeProps & {
  className?: string;
};

const FooterApp = ({ className }: typeFooter): React.ReactElement => {
  const [lang, setLang] = useState<Array<Language>>([
    { value: "English" },
    { value: "Vietnamese" },
  ]);

  const { t } = useTranslation();

  return (
    <footer>
      <div
        className={cn(
          "bg-white-100 border-t-2 flex gap-20 items-center justify-center h-[5rem]",
          className
        )}
      >
        <div className="flex items-center gap-3 w-fit">
          <HeroIcon
            solid={true}
            iconName="GlobeEuropeAfricaIcon"
            className="text-gray-950"
          />
          <SelectOption item={lang} />
        </div>

        <div className={cn("flex items-center text-xs text-black")}>
          <span className="text-lg">&copy;</span>
          <p>{t("footer.text")}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
