# WeatherApp

WeatherApp es una aplicación desarrollada con React Native y Expo que permite a los usuarios consultar el clima actual de diferentes ciudades, agregar ciudades a una lista de favoritos y ver un historial de búsquedas recientes.

## Características principales

- **Consulta del clima**: Obtén información detallada sobre el clima actual, incluyendo temperatura, condiciones climáticas, velocidad del viento, humedad y hora local.
- **Favoritos**: Agrega o elimina ciudades de tu lista de favoritos para un acceso rápido.
- **Historial de búsquedas**: Visualiza las últimas 5 ciudades buscadas.

## Requisitos previos

- Node.js (versión 14 o superior)
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Un dispositivo físico o emulador para probar la aplicación

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd weatherapp
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=<TU_SUPABASE_URL>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<TU_SUPABASE_ANON_KEY>
   EXPO_PUBLIC_WEATHER_API_KEY=<TU_API_KEY_DE_WEATHERAPI>
   ```

## Uso

1. Inicia la aplicación:

   ```bash
   npx expo start
   ```

2. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o utiliza un emulador para abrir la aplicación.

3. Escribe el nombre de una ciudad en el campo de búsqueda para consultar el clima actual.

4. Agrega ciudades a favoritos tocando el ícono de estrella o elimínalas tocando el ícono de papelera.

5. Selecciona una ciudad del historial de búsquedas para consultar nuevamente su clima.

## Estructura del proyecto

- **app/**: Contiene las pantallas principales de la aplicación.
- **componts/**: Componentes reutilizables como `AutocompleteInput`, `SearchHistory` y `WeatherInfo`.
- **utils/**: Funciones auxiliares para interactuar con Supabase y la API de Weather.
- **assets/**: Recursos estáticos como imágenes y fuentes.

## Tecnologías utilizadas

- React Native
- Expo
- Supabase
- WeatherAPI

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.
