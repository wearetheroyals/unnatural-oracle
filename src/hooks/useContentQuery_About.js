import { graphql, useStaticQuery } from 'gatsby';

const useContentQuery_About = () => {
  return useStaticQuery(graphql`
    query {
      data: markdownRemark(frontmatter: { handle: { eq: "about" } }) {
        frontmatter {
          title
        }
        html
      }
    }
  `);
};

export default useContentQuery_About;
