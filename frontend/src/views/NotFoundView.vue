<template>
  <main
    class='flex flex-col gap-1 items-center justify-center h-screen bg-secondary-green'
  >
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p>
      <router-link
        class='text-indigo-100 underline'
        to='/'
      >
        Click here to go back to the homepage
      </router-link>
    </p>
  </main>
</template>
