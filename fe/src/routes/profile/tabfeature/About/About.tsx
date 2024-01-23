import Slibar from "@components/Slidebar";
import { dataStringKeyForAboutI18n } from "./dataabout";
import { useState } from "react";
import { AboutPropsSlidbar } from "./type";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router";

function About() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [items] = useState<AboutPropsSlidbar[]>(
    dataStringKeyForAboutI18n.map((item) => ({
      label: t(`profile.about.${item}`),
      href:
        item.toString() === "1"
          ? "/" + id + "/about"
          : "/" +
            id +
            "/about" +
            "/" +
            t(`profile.about.${item}`)
              .toString()
              .split(" ")
              .join("_")
              .toLowerCase(),
    }))
  );
  return (
    <div className="h-fit min-h-[50vh] w-[70vw] mb-12">
      <div className="rounded-md border border-solid border-primary-200 shadow-md grid grid-cols-[30%_60%]">
        <div className="border-r border-t-0 border-b-0 p-6 border-l-0 border-primary-200 border-solid flex flex-col gap-4">
          <h3 className="m-0 px-2 font-bold">About</h3>
          <Slibar items={items!} className="w-full aspect-square" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default About;
