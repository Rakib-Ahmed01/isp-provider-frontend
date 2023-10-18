'use client';

import classes from '@/styles/dashboardnavbar.module.css';
import { Flex } from '@mantine/core';
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
      <Flex align="center" gap={3}>
        <span className="w-4 h-4 rounded-full inline-block mr-3 mb-2">
          <item.icon className={classes.linkIcon} stroke={1.5} />
        </span>
        <span className=" truncate">{item.label}</span>
      </Flex>
    </Link>
  ));

  return (
    <div className={`${classes.navbar} border sm:w-12 hidden`}>
      <div className={classes.navbarMain}>{links}</div>
    </div>
  );
}
