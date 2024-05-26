const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const ProjectTemplate = path.resolve("./src/templates/ProjectTemplate.js")

  const result = await graphql(`
    {
      allContentfulProjekt {
        nodes {
          id
          titel
          spaceId
          slug
          text {
            raw
          }
          internal {
            type
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(
      "There was an error loading your Contentful projects",
      result.errors
    )
    return
  }
  console.log(result.data)

  const projects = result.data.allContentfulProjekt.nodes
  console.log("projects", projects)
  projects.forEach(project => {
    const { slug, text } = project
    const rawText = text && text.raw ? text.raw : ""
    createPage({
      path: `/projekt/${slug}`,
      component: ProjectTemplate,
      context: {
        slug: slug,
        rawText: rawText,
      },
    })
  })
}
