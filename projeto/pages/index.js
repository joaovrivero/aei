import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  useColorModeValue,
  Button,
  chakra,
  List,
  ListItem,
  Icon,
  Link
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Image from 'next/image'
import { IoLogoInstagram, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          p={3}
          mb={6}
          textAlign="center"
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Hello, I&apos;m a full-stack software developer based in Brazil!
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              João Rivero
            </Heading>
            <Paragraph>
              Digital Artisan ( Developer / Writer / Problem Solver ){' '}
            </Paragraph>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/images/profile.jpg"
                alt="Profile image"
                borderRadius="full"
                width="100"
                height="100"
              />
            </Box>
          </Box>
        </Box>
        <Section delay={0.1}>
          <Box align="center" my={4}>
            <Button
              as={NextLink}
              href="/works"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              My Portfolio
            </Button>
          </Box>
          <Heading as="h3" variant="section-title">
            Introduction
          </Heading>
          <Paragraph>
            Rivero is a full-stack developer based in Pelotas with a passion for
            building digital services/stuff he wants. He has a knack for all
            things launching products, from planning and designing all the way
            to solving real-life problems with code. When not online, he loves
            to get lost in the wonderful world of books. Currently, he is
            graduating in Internet Systems at IFSUL
          </Paragraph>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1998</BioYear>
            Born in Pelotas , Brazil.
          </BioSection>
          <BioSection>
            <BioYear>2019 to 2022</BioYear>
            Worked at Appen Limited. with translation/transcription, data
            collection and training for social media marketing.
          </BioSection>
          <BioSection>
            <BioYear>2024</BioYear>
            Internship on Compass.uol with AWS cloud engineering.
          </BioSection>
          <BioSection>
            <BioYear>2025</BioYear>
            Completed the Graduate School of Internet Systems at Pelotas Federal
            Institute of Science and Technology (IFSUL).
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>
            <Link href="https://letterboxd.com/joaovrivero/" target="_blank">
              Movies
            </Link>
            , Music, Japanese Culture
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/joaovrivero" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @joaovrivero
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://instagram.com/joaovrivero" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoInstagram} />}
                >
                  @joaovrivero
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://twitter.com/joaovrivero" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoTwitter} />}
                >
                  @joaovrivero
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
export { getServerSideProps } from '../components/chakra'
