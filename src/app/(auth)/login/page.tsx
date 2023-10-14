'use client';

import {
  LoginUserType,
  loginUserZodSchema,
} from '@/lib/validations/auth-validators';
import { useLoginMutation } from '@/redux/features/auth/authApi';
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

export default function Login(props: PaperProps) {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginUserType) => {
    try {
      const { email, password } = loginUserZodSchema.parse(values);

      const res = await login({
        email,
        password,
      }).unwrap();

      toast.success('Successfully logged in');
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }
      toast.error('Something went wrong');
    }
  };

  return (
    <Container size={'xs'} mt={'xl'}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Login Now
        </Text>

        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack>
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
            <Anchor component={Link} href={'/register'} c="dimmed" size="xs">
              {"Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={isLoading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
