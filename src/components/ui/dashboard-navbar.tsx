'use client';

import classes from '@/styles/dashboardnavbar.module.css';
import { TablerIconsProps } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export type DashboardSidebarProps = {
  data: {
    link: string;
    label: string;
    icon: (props: TablerIconsProps) => JSX.Element;
  }[];
  initialActive: string;
};

export function DashboardSidebar({
  initialActive,
  data,
}: DashboardSidebarProps) {
  const [active, setActive] = useState(initialActive);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span className=" truncate">{item.label}</span>
    </Link>
  ));

  return (
    <div className={`${classes.navbar} border sm:w-12 hidden`}>
      <div className={classes.navbarMain}>{links}</div>
    </div>
  );
}
