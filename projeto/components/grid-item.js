import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from './temp-ui'

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box className="w-full text-center">
    <LinkBox className="cursor-pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail rounded-xl"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text className="mt-2">{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({
  children,
  category = 'works',
  id,
  title,
  thumbnail
}) => (
  <Box className="w-full text-center">
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      className="cursor-pointer block"
    >
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail rounded-xl"
        placeholder="blur"
      />
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text className="mt-2 text-xl">
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <style jsx global>{`
    .grid-item-thumbnail {
      border-radius: 12px;
    }
  `}</style>
)