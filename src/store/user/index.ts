import { defineStore } from 'pinia';
import { UserState } from './types';
import pinia from '@/store';
import { refreshUserInfo, userLogin, LoginRequest } from '@/api/user';

export const useUserStoreHook = defineStore('UserInfo', {
    state: (): UserState => ({
        username: '大伟',
        accessToken: '',
        roles: ['common'],
    }),
    getters: {},
    actions: {
        add() {
            this.username = this.username + '大伟';
        },
        // 用于更新store数据
        // UserState为定义好的state类型
        updateInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },
        // 用户登录
        storeUserLogin(data: LoginRequest) {
            return userLogin(data).then((res) => {
                this.username = res.username;
                this.roles = res.roles;
                this.accessToken = res.accessToken;
                return res;
            });
        },
        // 刷新用户信息
        refreshUserInfo() {
            if (this.username == '大伟' && this.accessToken != '') {
                refreshUserInfo({
                    accessToken: this.accessToken,
                })
                    .then((res) => {
                        this.username = res.username;
                        this.roles = res.roles;
                        this.accessToken = res.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = '';
                    });
            }
        },
    },
    // 持久化保存 accessToken
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        pick: ['accessToken'],
    },
});

export function useUserStore() {
    return useUserStoreHook(pinia);
}