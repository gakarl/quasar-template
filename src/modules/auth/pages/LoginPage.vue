<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div class="row q-ml-sm q-mt-sm">
          <div class="col-12 fredoka text-subtitle1">
            <router-link class="text-white" style="text-decoration: none" to="/"
              >Boka16Q
            </router-link>
          </div>
        </div>
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              Willkommen!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Geben Sie Name und Passwort für's Login ein!
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 fredoka text-subtitle1">
            <router-link
              class="text-primary"
              style="text-decoration: none"
              to="/"
            >
              Boka16Q
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Login
                  </div>
                </div>
              </div>
              <q-form class="q-gutter-md" @submit="submitForm">
                <q-input
                  v-model="user.username"
                  :rules="[rules.required]"
                  label="Nutzername"
                  lazy-rules
                  name="username"
                  v-bind="$input"
                />
                <q-input
                  v-model="user.password"
                  :rules="[rules.required, rules.minLength(6)]"
                  label="Passwort"
                  lazy-rules
                  name="password"
                  type="password"
                  v-bind="$input"
                />
                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Enter"
                    rounded
                    type="submit"
                  ></q-btn>
                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Sie haben noch kein Konto?
                      <router-link class="text-primary" to="/login"
                        >Registrieren</router-link
                      >
                    </div>
                    <div class="q-mt-sm">
                      Passwort vergessen? Klicken Sie
                      <router-link class="text-primary" to="/forgot-password"
                        >Hier!</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "src/support/rules/fieldRules";
import { handleErros } from "src/support/errors/handleErros";
import { useAuthStore, useCommonStore } from "stores/all";

const $authStore = useAuthStore();
const $commonStore = useCommonStore();
const $router = useRouter();
const $route = useRoute();

const user = reactive({});

const userLogged = computed(() => $authStore.getUser);
const loading = computed(() => $commonStore.isLoading);

const submitForm = async () => {
  try {
    $commonStore.ADD_REQUEST();
    await $authStore.DO_LOGIN(user);
    const to = $route.query.to?.toString();
    $router.push(to || "/admin");
  } catch (error) {
    $commonStore.REMOVE_REQUEST();
    handleErros(error);
  }
};
</script>
