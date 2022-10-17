
import * as admin from 'firebase-admin';
import { CreateRequest, UpdateRequest } from 'firebase-admin/lib/auth/auth-config';

export class IdentityPlatformService{
    
    readonly uid = "19008719-9";

    firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert('.credentials/identityPlatformKey.json')
    });

    async create(data: CreateRequest){
        return this.firebaseAdmin.auth().createUser(data);
    }

    async update(uid: string, data: UpdateRequest){
        return this.firebaseAdmin.auth().updateUser(uid, data);
    }

    async getUserData(uid: string){
        return this.firebaseAdmin.auth().getUser(uid);
    }

    async getToken(uid: string){
        return this.firebaseAdmin.auth().createCustomToken(uid);
    }

    async getVerifyEmail(email: string){
        return this.firebaseAdmin.auth().generateEmailVerificationLink(email);
    }

    async deleteUser(uid: string){
        return this.firebaseAdmin.auth().deleteUser(uid);
    }
}

