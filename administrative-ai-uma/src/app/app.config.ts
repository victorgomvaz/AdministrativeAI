import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "administrative-ai", 
      appId: "1:1063300479938:web:f51f8c58d1491460d1b45b", 
      storageBucket: "administrative-ai.firebasestorage.app", 
      apiKey: "AIzaSyB94QLCBe5Yrxdk_2gqXt76oYgEtPLgbJ0", 
      authDomain: "administrative-ai.firebaseapp.com", 
      messagingSenderId: "1063300479938", 
      measurementId: "G-72CNHDVXZ2" 
    })), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};
