import { Octokit } from "octokit"

async function getReleaseBranches () {
  const runtimeConfig = useRuntimeConfig()

  const octokit = new Octokit({
    auth: runtimeConfig.githubSecret
  })

  console.log('runtimeconfig: ' + runtimeConfig.githubSecret)

  let response = {}

  try {
    response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner: 'redbrickmedia',
      repo: 'products-onelaunch',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      per_page: 100,
      protected: true
    })
  } catch(e) {
    console.log(e)
  }

  console.log(response)

  return response
}

export default defineEventHandler(async (event) => {
  const branches = await getReleaseBranches();
  return {
    branches
  }
})

