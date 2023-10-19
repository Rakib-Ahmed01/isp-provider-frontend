import classes from '@/styles/footer.module.css';
import { ActionIcon, Anchor, Group, rem } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Link from 'next/link';

type Link = {
  link: string;
  label: string;
};

const links: Link[] = [
  { link: '/plans', label: 'Plans' },
  { link: '/faqs', label: 'FAQs' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/feedback', label: 'Feedback' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      component={Link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={`${classes.footer} mt-5`}>
      <div className={classes.inner}>
        <MantineLogo size={28} />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
