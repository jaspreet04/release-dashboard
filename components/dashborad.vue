<template>
  <Nav />
  <ul class="divide-y divide-gray-200">
    <li v-for="branch in release_branches" :key="branch.name" class="py-4 flex">
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">{{ branch.name }}</p>
        <p class="text-sm text-gray-500">{{ branch.commit.sha }}</p>
        <ul class="divide-y divide-gray-200">
          <li v-for="index in branch.patch" :key="branch" class="py-4 flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ branch.name + '.' + (branch.patch - index) }}</p>
            </div>
          </li>
        </ul>
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
    release_branches.push(branches[i])
  }
}
</script>