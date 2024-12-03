<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <nav aria-label="breadcrumb" class="hidden mr-auto -intro-x sm:flex">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'side-menu-home' }">Home</router-link>
        </li>
        <template v-for="breadcrumb in breadcrumbs">
          <li
            class="breadcrumb-item"
            :class="{
              active: breadcrumbs[breadcrumbs.length - 1] === breadcrumb,
              'cursor-pointer':
                breadcrumbs[breadcrumbs.length - 1] !== breadcrumb,
            }"
          >
            <a @click="$router.push(breadcrumb.link)">{{ breadcrumb.name }}</a>
          </li>
        </template>
      </ol>
    </nav>
    <!-- END: Breadcrumb -->
    <!-- BEGIN: Search -->
    <div class="relative mr-3 intro-x sm:mr-6">
      <div class="hidden search sm:block">
        <input
          type="text"
          class="border-transparent search__input form-control"
          placeholder="Search..."
          @focus="showSearchDropdown"
          @blur="hideSearchDropdown"
        />
        <SearchIcon class="search__icon dark:text-slate-500" />
      </div>
      <a class="notification sm:hidden" href="">
        <SearchIcon class="notification__icon dark:text-slate-500" />
      </a>
      <div class="search-result" :class="{ show: searchDropdown }">
        <div class="search-result__content">
          <div class="search-result__content__title">Pages</div>
          <div class="mb-5">
            <a href="" class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
              >
                <InboxIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Mail Settings</div>
            </a>
            <a href="" class="flex items-center mt-2">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending"
              >
                <UsersIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Users & Permissions</div>
            </a>
            <a href="" class="flex items-center mt-2">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80"
              >
                <CreditCardIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Transactions Report</div>
            </a>
          </div>
          <div class="search-result__content__title">Users</div>
          <div class="mb-5">
            <a
              v-for="(faker, fakerKey) in $_.take($f(), 4)"
              :key="fakerKey"
              href
              class="flex items-center mt-2"
            >
              <div class="w-8 h-8 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.photos[0]"
                />
              </div>
              <div class="ml-3">{{ faker.users[0].name }}</div>
              <div
                class="w-48 ml-auto text-xs text-right truncate text-slate-500"
              >
                {{ faker.users[0].email }}
              </div>
            </a>
          </div>
          <div class="search-result__content__title">Products</div>
          <a
            v-for="(faker, fakerKey) in $_.take($f(), 4)"
            :key="fakerKey"
            href
            class="flex items-center mt-2"
          >
            <div class="w-8 h-8 image-fit">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="faker.images[0]"
              />
            </div>
            <div class="ml-3">{{ faker.products[0].name }}</div>
            <div
              class="w-48 ml-auto text-xs text-right truncate text-slate-500"
            >
              {{ faker.products[0].category }}
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- END: Search -->
    <!-- BEGIN: Notifications -->
    <Dropdown class="mr-auto intro-x sm:mr-6">
      <DropdownToggle
        tag="div"
        role="button"
        class="cursor-pointer notification notification--bullet"
      >
        <BellIcon class="notification__icon dark:text-slate-500" />
      </DropdownToggle>
      <DropdownMenu class="pt-2 notification-content">
        <DropdownContent tag="div" class="notification-content__box">
          <div class="notification-content__title">Notifications</div>
          <div
            v-for="(faker, fakerKey) in $_.take($f(), 5)"
            :key="fakerKey"
            class="relative flex items-center cursor-pointer"
            :class="{ 'mt-5': fakerKey }"
          >
            <div class="flex-none w-12 h-12 mr-1 image-fit">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="faker.photos[0]"
              />
              <div
                class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"
              ></div>
            </div>
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="javascript:;" class="mr-5 font-medium truncate">{{
                  faker.users[0].name
                }}</a>
                <div class="ml-auto text-xs text-slate-400 whitespace-nowrap">
                  {{ faker.times[0] }}
                </div>
              </div>
              <div class="w-full truncate text-slate-500 mt-0.5">
                {{ faker.news[0].shortContent }}
              </div>
            </div>
          </div>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Notifications -->
    <!-- BEGIN: Account Menu -->
    <Dropdown class="w-8 h-8 intro-x">
      <DropdownToggle
        tag="div"
        role="button"
        class="w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in"
      >
        <img
          alt="Midone Tailwind HTML Admin Template"
          :src="$f()[9].photos[0]"
        />
      </DropdownToggle>
      <DropdownMenu class="w-56">
        <DropdownContent class="text-white bg-primary">
          <DropdownHeader tag="div" class="!font-normal">
            <div class="font-medium">{{ $f()[0].users[0].name }}</div>
            <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              {{ $f()[0].jobs[0] }}
            </div>
          </DropdownHeader>
          <DropdownDivider class="border-white/[0.08]" />
          <DropdownItem class="hover:bg-white/5">
            <UserIcon class="w-4 h-4 mr-2" /> Profile
          </DropdownItem>
          <DropdownItem class="hover:bg-white/5">
            <EditIcon class="w-4 h-4 mr-2" /> Add Account
          </DropdownItem>
          <DropdownItem class="hover:bg-white/5">
            <LockIcon class="w-4 h-4 mr-2" /> Reset Password
          </DropdownItem>
          <DropdownItem class="hover:bg-white/5">
            <HelpCircleIcon class="w-4 h-4 mr-2" /> Help
          </DropdownItem>
          <DropdownDivider class="border-white/[0.08]" />
          <DropdownItem @click="onClickLogout" class="hover:bg-white/5">
            <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { useRouter } from "vue-router";

const router = useRouter();

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const breadcrumbStore = useBreadcrumbStore();
const breadcrumbs = computed(() => breadcrumbStore.breadcrumbs);

const onClickLogout = () => {
  router.push({ name: "login" });
};
</script>
