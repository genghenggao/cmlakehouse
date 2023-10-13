<template>
  <div class="head-menu">
    <el-space wrap size="large">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img
            src="@/assets/images/icon/icons8-google-translate.svg"
            class="no-border-hover"
          />
        </span>
        <template #dropdown>
          <el-dropdown-menu class="header-new-drop">
            <el-dropdown-item command="zh" :disabled="currentLanguage == 'zh'">
              简体中文
            </el-dropdown-item>
            <el-dropdown-item command="en" :disabled="currentLanguage == 'en'">
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 消息  -->
      <el-popover trigger="hover" placement="bottom" :width="200">
        <template #reference>
          <el-badge type="danger" is-dot>
            <!-- <i class="el-icon-message" /> -->
            <el-icon><Message /></el-icon>
          </el-badge>
        </template>
        <div>消息待定</div>
      </el-popover>
      <!-- 通知  -->
      <el-popover trigger="hover" placement="bottom" :width="220">
        <template #reference>
          <el-badge type="danger" is-dot>
            <!-- <i class="el-icon-bell" /> -->
            <el-icon><Bell /></el-icon>
          </el-badge>
        </template>
        <div>
          <el-tabs v-model="tabsActive" @tab-click="onTab">
            <el-tab-pane label="通知" name="notice">
              <el-row
                v-for="(item, n) in state.notices"
                :key="n"
                @click="onManage(item.id)"
              >
                <el-col :span="6">
                  <el-avatar :icon="item.icon" :size="40"></el-avatar>
                </el-col>
                <el-col :span="18">
                  <div>{{ item.message }}</div>
                  <div>{{ item.dateTime }}</div>
                </el-col>
                <el-divider></el-divider>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="消息" name="news">
              <el-row v-for="(item, n) in state.news" :key="n" @click="onManage(item.id)">
                <el-col :span="6">
                  <el-avatar :icon="item.icon" :size="40"></el-avatar>
                </el-col>
                <el-col :span="18">
                  <div>{{ item.message }}</div>
                  <div>{{ item.dateTime }}</div>
                </el-col>
                <el-divider></el-divider>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="待办" name="untreated">
              <el-row
                v-for="(item, u) in state.untreateds"
                :key="u"
                @click="onManage(item.id)"
              >
                <el-col :span="6">
                  <el-avatar :icon="item.icon" :size="40"></el-avatar>
                </el-col>
                <el-col :span="18">
                  <div>{{ item.message }}</div>
                  <div>{{ item.dateTime }}</div>
                </el-col>
                <el-divider></el-divider>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-popover>
      <!-- 个人设置  -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <span>{{ username }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-switch-button" @click="logout"
              >退出</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-unlock" @click="onPassword"
              >修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  computed,
  onBeforeMount,
} from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { useStore } from "vuex";

let { proxy } = getCurrentInstance();
const router = useRouter();
const state = reactive({
  tabsActive: "notice",
  notices: [],
  news: [],
  untreateds: [],
  // username: "admin",
  username: proxy.$store.state.username,
});

onMounted(() => {
  state.notices = [
    {
      id: 1,
      icon: "el-icon-chat-dot-round",
      message: "通知通知通知通知通知",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 2,
      icon: "el-icon-chat-dot-round",
      message: "通知通知通知通知通知",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 3,
      icon: "el-icon-chat-dot-round",
      message: "通知通知通知通知通知",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 4,
      icon: "el-icon-chat-dot-round",
      message: "通知通知通知通知通知",
      dateTime: "2021-01-22 12:15:21",
    },
  ];

  state.news = [
    {
      id: 1,
      icon: "el-icon-chat-dot-round",
      message: "消息消息消息消息消息",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 2,
      icon: "el-icon-chat-dot-round",
      message: "消息消息消息消息",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 3,
      icon: "el-icon-chat-dot-round",
      message: "消息消息消息消息消息",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 4,
      icon: "el-icon-chat-dot-round",
      message: "消息消息消息消息消息消息",
      dateTime: "2021-01-22 12:15:21",
    },
  ];

  state.untreateds = [
    {
      id: 1,
      icon: "el-icon-chat-dot-round",
      message: "待办待办待办待办待办",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 2,
      icon: "el-icon-chat-dot-round",
      message: "待办待办待办待办待办待办",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 3,
      icon: "el-icon-chat-dot-round",
      message: "待办待办待办待办待办",
      dateTime: "2021-01-22 12:15:21",
    },
    {
      id: 4,
      icon: "el-icon-chat-dot-round",
      message: "待办待办待办待办待办待办",
      dateTime: "2021-01-22 12:15:21",
    },
  ];
});

const onManage = (id) => {
  console.log(id);
};

const onTab = (tab, event) => {
  console.log(tab, event);
};

const logout = () => {
  // 清除token
  localStorage.removeItem("token");
  router.push({ path: "login" });
};

const onPassword = () => {
  router.push({ path: "user-password" });
};

const currentLanguage = computed(() => locale.value);
const handleCommand = (locallanguage) => {
  locale.value = locallanguage;

  //  const {notices} = toRefs(state)
};
</script>

<style>
.head-menu {
  text-align: right;
  cursor: pointer;
  margin-right: -24px;
}
.no-border-hover {
  width: 25px;
  border: none; /* 鼠标悬停时去掉边框 */
  outline: none;
  &:hover {
    border: none; /* 鼠标悬停时去掉边框 */
    outline: none;
  }
}
.head-menu .el-badge__content.is-fixed.is-dot {
  top: 15px;
}
</style>
