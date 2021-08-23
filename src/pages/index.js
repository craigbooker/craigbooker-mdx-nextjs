import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
// import Hero from '../components/Hero'
import StyledHero from '../components/StyledHero'
import HeroBanner from '../components/HeroBanner'
// import Posts from '../components/Posts'
import RecentPosts from '../components/Home/RecentPosts'
import RecentSeries from '../components/Home/RecentSeries'

import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data

  const {
    seriesEdges: { nodes: series },
  } = data

  return (
    <Layout>
      <SEO title="Home " />
      {/* <Hero showPerson /> */}
      <StyledHero>
        <HeroBanner title="Hello & Welcome!" info="" />
      </StyledHero>
      {/* <Posts posts={posts} title="recently published" /> */}
      {/* <RecentPosts posts={posts} title="recently published" /> */}
      <main>
        <RecentSeries series={series} title="articles by series" />

        <br />
        <RecentPosts posts={posts} title="latest articles" />
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(
      limit: 3
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        excerpt
        frontmatter {
          title
          author
          category
          date(formatString: "MMMM, Do YYYY")
          slug
          cover {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }

    seriesEdges: allMdx(
      limit: 3
      filter: { fileAbsolutePath: { regex: "/series/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          path
          title
          tags
          author
          category
          date(formatString: "MMMM, Do YYYY")
          slug
          cover {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default IndexPage
