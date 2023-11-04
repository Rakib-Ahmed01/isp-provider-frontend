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
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login(props: PaperProps) {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(loginUserZodSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginUserType) => {
    try {
      const { email, password } = values;

      await login({
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
