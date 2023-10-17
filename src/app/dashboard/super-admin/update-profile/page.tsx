'use client';

import Spinner from '@/components/ui/spinner';
import { useEdgeStore } from '@/lib/edgestore';
import { updateUserZodSchema } from '@/lib/validations/user';
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from '@/redux/user/userApi';
import {
  Box,
  Button,
  Card,
  FileInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { upperFirst, useShallowEffect } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface UpdateProfileProps {}

const UpdateProfile: FC<UpdateProfileProps> = () => {
  const { data, isLoading } = useGetUserProfileQuery('');
  const form = useForm({
    validate: zodResolver(updateUserZodSchema),
    initialValues: {
      name: '',
      profileImg: '' as unknown as File | string | undefined,
    },
  });
  const [updateUser, { isLoading: isUserUpdating }] = useUpdateUserMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  useShallowEffect(() => {
    if (data) {
      form.setValues({
        name: data.name,
        profileImg: data.profileImg,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  const user = data as User;

  const handleUpdateProfile = async (values: any) => {
    const isImageNeedsUpdate = values?.profileImg instanceof File;
    try {
      setIsImageUploading(true);
      const { name, profileImg } = values;

      if (user.name === name && user.profileImg === profileImg) {
        router.push('/dashboard/super-admin');
        return;
      }

      if (isImageNeedsUpdate) {
        const res = await edgestore.publicFiles.upload({
          file: profileImg,
          options: {
            replaceTargetUrl: user.profileImg,
          },
        });
        await updateUser({
          ...user,
          name,
          profileImg: res.url as unknown as File & string,
        }).unwrap();
      } else {
        await updateUser({
          ...user,
          name,
          profileImg,
        }).unwrap();
      }

      toast.success('Successfully updated profile');
      router.push('/dashboard/super-admin');
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }

      toast.error('Something went wrong');
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <Box className="w-full mx-auto">
      <Title order={2} size="h1" fw={800} ta="center" mb={20}>
        Update Profile
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <Image
            alt={user.name}
            src={user.profileImg}
            width={100}
            height={100}
            className="mx-auto rounded-full"
            priority={true}
          />
          <form
            onSubmit={form.onSubmit(handleUpdateProfile)}
            className=" space-y-2"
          >
            <FileInput
              label="Update Profile Picture"
              placeholder="Upload new profile picture"
              {...form.getInputProps('profileImg')}
            />

            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              defaultValue={user.email}
              disabled
            />
            <TextInput
              label="Role"
              placeholder="Role"
              defaultValue={upperFirst(user.role)}
              disabled
            />
            <Button
              className="w-full"
              type="submit"
              loading={isUserUpdating || isImageUploading}
            >
              Save
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default UpdateProfile;
