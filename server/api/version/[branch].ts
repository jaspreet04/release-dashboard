import { Octokit } from "octokit"

async function getFileData (url: string) {
   const data = await fetch(url)
   .then(function(response) {
     return response.json();
   })
   .then(function(myJson) {
       return myJson
   });

   return data
}

async function getVersion (branch: string) {
  console.log('caliing version: ' + branch)
  const runtimeConfig = useRuntimeConfig()

  const octokit = new Octokit({
    auth: runtimeConfig.githubSecret
  })

  let response = {}

  try {
    response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'redbrickmedia',
      repo: 'products-onelaunch',
      path: 'version.json',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      ref: branch
    })
  } catch(e) {
    console.log(e)
  }

  return response
}

export default defineEventHandler(async (event) => {
  const branch = `${event.context.params.branch}`
  const response = await getVersion(branch)
  const version = await getFileData(response?.data?.download_url)

  return {
    version
  }
})
