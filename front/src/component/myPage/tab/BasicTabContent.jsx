import { Tab } from "@headlessui/react";

export default function BasicTabContent({ children, styles }) {
  return (
    <Tab.Panel>
      <div className={`${styles}`}>{children}</div>
    </Tab.Panel>
  );
}
