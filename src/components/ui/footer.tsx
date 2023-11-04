import classes from '@/styles/footer.module.css';
import { ActionIcon, Anchor, Flex, Group, Text, rem } from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Link from 'next/link';
import Logo from './logo';

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
    <div className={`${classes.footer} mt-5 container mx-auto`}>
      <div className={classes.inner}>
        <Flex align={'center'}>
          <Logo />
          <Text fw={600}>QuickNet</Text>
        </Flex>

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
