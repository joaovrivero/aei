import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  Button,
  List,
  ListItem,
  Icon,
  Link
} from '../components/temp-ui'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Image from 'next/image'
import { IoLogoInstagram, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5'

// Ícone de seta para direita (substitui ChevronRightIcon)
const ChevronRightIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
  </svg>
)

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box className="rounded-lg backdrop-blur-glass p-3 mb-6 text-center">
          Hello, I&apos;m a full-stack software developer based in Brazil!
        </Box>

        <Box className="md:flex">
          <Box className="flex-grow">
            <Heading as="h2" variant="page-title">
              João Rivero
            </Heading>
            <Paragraph>
              Digital Artisan ( Developer / Writer / Problem Solver ){' '}
            </Paragraph>
          </Box>
          <Box className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 text-center">
            <Box className="border-2 border-white/80 w-[100px] h-[100px] inline-block rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Profile image"
                className="rounded-full"
                width="100"
                height="100"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Box className="text-center my-4">
            <Button
              as={NextLink}
              href="/works"
              className="inline-flex items-center"
              rightIcon={<ChevronRightIcon />}
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
