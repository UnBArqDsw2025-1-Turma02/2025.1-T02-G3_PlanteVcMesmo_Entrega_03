<script setup lang="ts">
import { ref } from 'vue';

import type { CalendarPlant, LLMAutoResponse } from '@/types/models/calendar';
import { CalendarPeriods } from '@/types/models/calendar';
import { Button } from '@/components/ui/button';
import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import { Icon } from '@iconify/vue';
import ApiService from '@/api/ApiService';
import ApiRoutes from '@/api/ApiRoutes';

const result = ref<string | null>(null);
const isAutomatic = ref(true);
const plant = ref<CalendarPlant>({
  plantName: '',
  speciesName: '',
  isOutdoor: false,
  isIlluminated: false,
  state: '',
});

const periods = Object.values(CalendarPeriods);

const handleSubmit = async () => {
  try {
    const payload = {
      strategyType: isAutomatic.value ? 'AUTOMATIC' : 'MANUAL',
      plant: {
        plantName: plant.value.plantName,
        speciesName: plant.value.speciesName,
        isOutdoor: plant.value.isOutdoor,
        isIlluminated: plant.value.isIlluminated,
        state: plant.value.state,
        ...(isAutomatic.value ? {} : {
          period: plant.value.period,
          timesPerPeriod: plant.value.timesPerPeriod,
        })
      }
    };

    const response = await ApiService.post(ApiRoutes.plant.root, payload);
    if (response?.ok) {
      const data: LLMAutoResponse = await response.json();

      result.value = `Período: ${data.period}, Vezes por período: ${data.timesPerPeriod}`;
    }
  } catch (error) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar os dados da planta');
  }
};
</script>

<template>
  <Header class="flex flex-col gap-2 p-7 pt-18">
    <div class="font-thin text-white text-2xl flex items-center gap-2">
      <Icon icon="solar:calendar-linear" class="w-6 h-6" />
      Calendário de Cuidados
    </div>
  </Header>
  <Main class="overflow-auto">
    <section class="flex items-center justify-center h-auto w-full">
      <div class="flex flex-col justify-start items-center gap-6 w-[85%] p-6">
        <form @submit.prevent="handleSubmit" class="w-full space-y-6">
          <div class="space-y-4 pb-2">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Planta</label>
              <div class="relative">
                <Icon icon="ph:plant-light" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="plant.plantName"
                  type="text"
                  class="pl-10 mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-green focus:ring focus:ring-primary-green/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
              <div class="relative">
                <Icon icon="ph:leaf-light" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="plant.speciesName"
                  type="text"
                  class="pl-10 mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-green focus:ring focus:ring-primary-green/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div class="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl">
              <label class="text-sm font-medium text-gray-700">Ambiente</label>
              <div class="flex space-x-4">
                <label class="flex gap-2 items-center">
                  <input
                    v-model="plant.isOutdoor"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                  />
                  <span class="text-sm text-gray-700">Ambiente Externo</span>
                </label>

                <label class="flex gap-2 items-center">
                  <input
                    v-model="plant.isIlluminated"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                  />
                  <span class="text-sm text-gray-700">Iluminação Natural</span>
                </label>
              </div>
            </div>

            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <div class="relative">
                <Icon icon="ph:heart-light" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="plant.state"
                  type="text"
                  class="pl-10 mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-green focus:ring focus:ring-primary-green/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div class="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl">
              <label class="text-sm font-medium text-gray-700">Tipo de Configuração</label>
              <div class="flex gap-3 space-x-6">
                <label class="inline-flex items-center">
                  <input
                    v-model="isAutomatic"
                    :value="true"
                    type="radio"
                    class="form-radio text-primary-green focus:ring-primary-green"
                    name="configuration-type"
                  />
                  <span class="ml-2">Automático</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="isAutomatic"
                    :value="false"
                    type="radio"
                    class="form-radio text-primary-green focus:ring-primary-green"
                    name="configuration-type"
                  />
                  <span class="ml-2">Manual</span>
                </label>
              </div>
            </div>

            <div v-if="!isAutomatic" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Período</label>
                <div class="relative">
                  <Icon icon="ph:clock-light" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    v-model="plant.period"
                    class="pl-10 mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-green focus:ring focus:ring-primary-green/20 transition-all duration-200"
                  >
                    <option v-for="period in periods" :key="period" :value="period">
                      {{ period }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Vezes por Período</label>
                <div class="relative">
                  <Icon icon="ph:repeat-light" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    v-model="plant.timesPerPeriod"
                    type="number"
                    min="1"
                    class="pl-10 mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-green focus:ring focus:ring-primary-green/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            class="w-full bg-primary-green hover:bg-darker-green text-white font-medium rounded-xl h-12 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon icon="ph:check-circle-light" class="w-5 h-5" />
            Salvar Calendário
          </Button>
        </form>
        <div v-if="result" class="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl w-full text-sm">
            <strong>Recomendações:</strong> {{ result }}
        </div>
      </div>
    </section>
  </Main>
</template>
