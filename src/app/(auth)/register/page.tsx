'use client';

import { useEdgeStore } from '@/lib/edgestore';
import {
  RegisterUserType,
  registerUserZodSchema,
} from '@/lib/validations/auth-validators';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import {
  Anchor,
  Button,
  Container,
  FileInput,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Register(props: PaperProps) {
  const [register, { isLoading }] = useRegisterMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const form = useForm({
    validate: zodResolver(registerUserZodSchema),
    initialValues: {
      email: '',
      name: '',
      password: '',
      profileImg: '' as unknown as File,
    },
  });

  const handleRegister = async (values: RegisterUserType) => {
    try {
      setIsImageUploading(true);
      const { email, name, password, profileImg } = values;
      const res = await edgestore.publicFiles.upload({
        file: profileImg,
      });
      await register({
        email,
        name,
        password,
        profileImg: res.url as unknown as File & string,
      }).unwrap();
      toast.success('Successfully registered. Login now...');
      router.push('/login');
    } catch (error: any) {
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }

      toast.error('Something went wrong');
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <Container size={'xs'}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Register Now
        </Text>

        <form onSubmit={form.onSubmit(handleRegister)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Your name"
              {...form.getInputProps('name')}
              radius="md"
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="yourname@example.com"
              {...form.getInputProps('email')}
              radius="md"
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
              radius="md"
            />
            <FileInput
              withAsterisk
              label="Profile image"
              placeholder="Profile image"
              {...form.getInputProps('profileImg')}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} href={'/login'} c="dimmed" size="xs">
              {'Already have an account? Login'}
            </Anchor>
            <Button
              type="submit"
              radius="xl"
              loading={isLoading || isImageUploading}
            >
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
