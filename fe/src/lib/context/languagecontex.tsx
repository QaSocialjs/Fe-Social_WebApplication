import { createContext, useEffect, useState } from "react";
import { typeProps } from "../utils/typeProps";
import { useTranslation } from "react-i18next";

type LangContextType = {
  lang: string | null;
  handleLang: (newlang: string | undefined) => void;
};
export const LangContext = createContext<LangContextType>({
  lang: "en",
  handleLang: () => {},
});

const LangProvider = ({ children }: typeProps): React.ReactElement => {
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem("lang") ||
      document.documentElement?.getAttribute("lang") ||
      "en"
  );
  const { i18n } = useTranslation();
  const handleLang = (newlang: string | undefined) => {
    if (newlang === "English") {
      setLang("en");
      localStorage.setItem("lang", "en");
      document.documentElement.setAttribute("lang", "en");
    } else {
      setLang("vi");
      localStorage.setItem("lang", "vi");
      document.documentElement.setAttribute("lang", "vi");
    }
  };
  const contextValue: LangContextType = {
    lang,
    handleLang,
  };

  useEffect(() => {
    if (lang !== null) {
      localStorage.setItem("lang", lang);
      i18n.changeLanguage(lang);
    }
  }, [lang]);
  return (
    <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>
  );
};

export default LangProvider;
