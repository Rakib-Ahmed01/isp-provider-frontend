'use client';

import {
  RegisterUserType,
  registerUserZodSchema,
} from '@/lib/validations/auth-validators';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Register(props: PaperProps) {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleRegister = async (
    values: Omit<RegisterUserType, 'profileImg'>
  ) => {
    try {
      const { email, name, password } = registerUserZodSchema.parse(values);

      await register({
        email,
        name,
        password,
        profileImg: `${name}.jpg`,
      }).unwrap();

      toast.success('Successfully registered. Login now...');
      router.push('/login');
    } catch (error: any) {
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }

      toast.error('Something went wrong');
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
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} href={'/login'} c="dimmed" size="xs">
              {'Already have an account? Login'}
            </Anchor>
            <Button type="submit" radius="xl" loading={isLoading}>
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
