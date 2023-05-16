

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const runtimeConfig = useRuntimeConfig()
  const data  = await $fetch('https://redbrickmedia.atlassian.net/rest/api/2/search?jql=project=OneLaunch%20AND%20fixVersion='+query.version+'&fields=key,summary,fixVersions', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        runtimeConfig.jiraSecret
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    return {
        data
    }
  })

  