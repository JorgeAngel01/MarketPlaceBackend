"use client";
import { Tabs, Tab } from "@nextui-org/react";

export default function PageTabs({ key, type, tab1, tab2, tab3 }) {
  return (
    <Tabs variant="underlined">
      <Tab key={key} title={type}>
        {tab1}
      </Tab>
      <Tab key="ordenes" title="Ordenes">
        {tab2}
      </Tab>
      {/* <Tab key="perfil" title="Perfil">
        {tab3}
      </Tab> */}
    </Tabs>
  );
}
