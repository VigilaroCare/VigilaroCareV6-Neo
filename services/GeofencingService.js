import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const GEOFENCING_TASK = 'VIGILARO_GEOFENCING';
const GEOFENCING_RADIUS_METERS = 100;
const STORAGE_KEY_HOME = '@vigilaro_home_location';
const STORAGE_KEY_IS_ACTIVE = '@vigilaro_geofencing_active';

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType, region }, error }) => {
    if (error) return;
    if (eventType === Location.GeofencingEventType.Exit) {
        console.log("ALERTA: Usuário SAIU da zona segura!");
        // Em um app real, disparar notificação push local aqui via expo-notifications
    }
});

class GeofencingService {
    constructor() {
        this.homeLocation = null;
        this.isActive = false;
    }

    async init() {
        const storedHome = await AsyncStorage.getItem(STORAGE_KEY_HOME);
        if (storedHome) this.homeLocation = JSON.parse(storedHome);
        const storedActive = await AsyncStorage.getItem(STORAGE_KEY_IS_ACTIVE);
        if (storedActive === 'true') {
            this.isActive = true;
            this.startMonitoring();
        }
    }

    async setHomeLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return false;
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        this.homeLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        await AsyncStorage.setItem(STORAGE_KEY_HOME, JSON.stringify(this.homeLocation));
        return true;
    }

    async startMonitoring() {
        if (!this.homeLocation) return;
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') return;

        await Location.startGeofencingAsync(GEOFENCING_TASK, [{
            identifier: 'HOME_ZONE',
            latitude: this.homeLocation.latitude,
            longitude: this.homeLocation.longitude,
            radius: GEOFENCING_RADIUS_METERS,
            notifyOnExit: true,
            notifyOnEnter: true,
        }]);
    }

    async stopMonitoring() {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCING_TASK);
        if (isRegistered) await Location.stopGeofencingAsync(GEOFENCING_TASK);
    }
}

export default new GeofencingService();
