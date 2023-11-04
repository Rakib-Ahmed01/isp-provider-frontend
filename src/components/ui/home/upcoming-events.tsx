import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Text, Title } from '@mantine/core';
import { FC } from 'react';

interface UpcomingEventsProps {}

const events = [
  {
    title: 'Tech Expo 2023',
    description:
      'Join us at the Tech Expo 2023, where you can explore the latest advancements in technology. Discover innovative products, attend insightful workshops, and connect with industry experts.',
  },
  {
    title: 'Internet Speed Contest',
    description:
      "Compete in our Internet Speed Contest and test your internet connection's performance. Win exciting prizes and bragging rights as the fastest surfer on the web!",
  },
  {
    title: 'Remote Work Symposium',
    description:
      'Learn the best practices for remote work at our Remote Work Symposium. Gain insights into productivity, collaboration tools, and creating a seamless virtual workspace.',
  },
  {
    title: 'Fiber Optic Revolution',
    description:
      "Witness the Fiber Optic Revolution with QuickNet. We're expanding our fiber network to deliver lightning-fast internet to more areas. Stay tuned for the launch event.",
  },
];

const UpcomingEvents: FC<UpcomingEventsProps> = () => {
  return (
    <Box component="section" mt={'100'}>
      <Title order={1} className="text-center" my={25}>
        Upcoming Events
      </Title>
      <Carousel loop withIndicators height={250}>
        {events.map((event) => {
          return (
            <CarouselSlide
              key={event.title}
              className="flex flex-col justify-center items-center gap-3"
            >
              <Title>{event.title}</Title>
              <Text className="max-w-4xl mx-auto text-center" c={'dimmed'}>
                {event.description}
              </Text>
            </CarouselSlide>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default UpcomingEvents;
