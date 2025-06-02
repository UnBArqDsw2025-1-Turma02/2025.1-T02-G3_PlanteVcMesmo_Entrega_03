<template>
  <main
    class='flex flex-col gap-1 items-center justify-center h-screen bg-secondary-green'
  >
    <h1>404 - Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <p>
      <router-link
        class='text-indigo-100 underline'
        to='/'
      >
        Clique aqui para voltar à página inicial
      </router-link>
    </p>
  </main>
</template>
