<template>
  <Nav />
  <ul class="divide-y divide-gray-200">
    <li v-for="branch in release_branches" :key="branch.name" class="py-4 flex">
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">{{ branch.name }}</p>
        <p class="text-sm text-gray-500">{{ branch.commit.sha }}</p>
        <ul class="divide-y divide-gray-200">
          <li v-for="index in branch.patch" :key="branch" class="py-4 flex" style="cursor: pointer">
            <div class="ml-3" @click="toggle(branch.name + '.' + (branch.patch - index))">
              <p class="text-sm font-medium text-gray-900">{{ branch.name + '.' + (branch.patch - index) }}</p>
              <ul class="tickets divide-y divide-gray-200" :class="branch.name + '.' + (branch.patch - index)">
              <li v-for="ticket in branch.tickets" :key="ticket.key" class="py-4 flex">
                <div class="ml-3">
                  <a :href="`https://redbrickmedia.atlassian.net/browse/${ticket.key}`" class="text-sm font-medium text-gray-900">{{ ticket.key + ' ' + ticket.fields.summary }}</a>
                </div>
              </li>
            </ul>
            </div>
          </li>
        </ul>

      </div>
      <div>
        <button class="commit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Release</button>
      </div>
    </li>
  </ul>
</template>

<script setup>
const { data } = await useFetch('/api/branches', { initialCache: false})
const branches = data?._value.branches.data

let patches = []
let release_branches = []

var i =0
for (i = 0; i < branches?.length; i++) {
  const regex = /^release-v(\d+\.\d+)$/;
  const match = branches[i].name.match(regex);
  if (match) {
    const version = match[1];
    console.log(`Version: ${version}`);
    const { data: v } = await useFetch('/api/version/' + branches[i].name, { initialCache: false});
    console.log(v?._value?.version?.patch)
    branches[i]['patch']= v?._value?.version?.patch
    var j = 0
    for (j = 0; j < branches[i]['patch']; j++) {
      var patch = ''
      if (j !== 0) {
        patch = '.' + j
      }
      console.log(v?._value?.version?.major + '.' + v?._value?.version?.minor + patch)
      const { data } = await useFetch(() => `/api/jira/issues?version=app-` + v?._value?.version?.major + '.' + v?._value?.version?.minor + patch, {initialCache: false} )
      console.log(data?._value?.data.issues)
      branches[i]['tickets'] = data?._value?.data.issues
    }
    release_branches.push(branches[i])
  }
}

function toggle (name) {
  var e = document.getElementsByClassName(name)
  console.log(e)
  if (e[0].style.display === 'none') {
    e[0].style.display = 'block'
  } else {
    e[0].style.display = 'none'
  }
}

</script>

<style>
.tickets {
  display: none;
  cursor: pointer;
}

.commit-button {
  float: right
}
</style>