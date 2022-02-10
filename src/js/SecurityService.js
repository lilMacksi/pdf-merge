/* eslint-disable */
import { UserManager, WebStorageStateStore } from 'oidc-client'
export default class AuthService {

    constructor() {

        const userStore = new WebStorageStateStore({
            store: window.localStorage
        });
        const settings = {
            userStore,
            authority: process.env.VUE_APP_AUTHORITY || 'https://sso-corproot-v2.scapp-services.swisscom.com/oauth/authorize',
            client_id: process.env.VUE_APP_CLIENT_ID || 'Qbs3OwTIc8TAVpRMVmLijCoUibU90Hem3zyZmf27L58i3NBnc8d3RjQzshKh3Rga',
            redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
            response_type: 'token',
            scope: 'openid,roles,user_attributes',
            accessTokenExpiringNotificationTime: 10,
            metadata: {
                authorization_endpoint: process.env.VUE_APP_AUTHORIZATION_ENDPOINT || 'https://sso-corproot-v2.scapp-services.swisscom.com/oauth/authorize',
                userinfo_endpoint: process.env.VUE_APP_USERINFO_ENDPOINT || 'https://sso-corproot-v2.scapp-services.swisscom.com/userinfo',
                jwks_uri: process.env.VUE_APP_JWKS_URI || 'https://sso-corproot-v2.scapp-services.swisscom.com/token_keys',
                end_session_endpoint: `${window.location.protocol}//${window.location.host}`
            }
        }
        this.userManager = new UserManager(settings);
    }

    static createInstance() {
        if (this.instance === undefined) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    async signIn() {
        this.userManager.signinRedirect();
    }

    async removeUser(){
        this.userManager.removeUser();
    }

    async signInCallback() {
        return this.userManager.signinRedirectCallback();
    }

    async getAccessToken() {
        let user = await this.userManager.getUser();
        if (!user) {
            this.userManager.signinRedirect();
            user = await this.userManager.getUser();
        }
        return user.access_token;
    }
}