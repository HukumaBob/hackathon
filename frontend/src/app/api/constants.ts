// Базовый URL для всех запросов к API
// export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const BASE_URL = "http://localhost:8000/";

// Эндпоинты API
export const LOGIN_API_ENDPOINT = "auth/jwt/create/"; // Эндпоинт для аутентификации пользователя
export const USERS_API_ENDPOINT = "auth/users/"; // Эндпоинт для регистрации пользователя
export const RESET_PASSWORD_API_ENDPOINT = "auth/users/reset_password/"; // Эндпоинт для сброса пароля пользователя
export const USER_PROFILES_API_ENDPOINT = "api/v1/userprofiles/"; // Эндпоинт для работы с профилями пользователей
export const USER_PROFILE_GET_AND_PATCH_API_ENDPOINT = "api/v1/userprofiles/me/"; // Эндпоинт для получения и изменения конкретного пользователя
export const LIST_COUNTRY_GET_API_ENDPOINT = "api/v1/countries/"; // Эндпоинт для получения списка стран
export const EVENTS_API_ENDPOINT = "api/v1/events"; // Эндпоинт для работы с ивентами
export const REGISTER_AND_APPLY_API_ENDPOINT = "api/v1/register_and_apply/"; // Эндпоинт для регистрации и подачи заявки на участие в ивенте
export const REMOVE_EVENT_FROM_FAVORITE_API_ENDPOINT =
  "api/v1/remove_event_from_favorite/"; // Эндпоинт для удаления ивента из избранного
export const SUBMIT_APPLICATION_API_ENDPOINT = "api/v1/submit_application/"; // Эндпоинт для подачи заявки на участие в ивенте
export const LIST_EVENT_VIEW_STAFF_API_ENDPOINT =
  "api/v1/list_event_viev_staff/"; // Эндпоинт для просмотра списка ивентов персоналом
export const USER_EVENT_STATUS_API_ENDPOINT = "api/v1/user_event_status/"; // Эндпоинт для проверки статуса участия пользователя в ивенте
export const FETCH_UPDATEURL = `${BASE_URL}${USER_PROFILE_GET_AND_PATCH_API_ENDPOINT}`; // для PATH запроса обновления данных профиля
export const CITIES = 'api/v1/cities/'
export const SPECIALIZATIONS = 'api/v1/specialization/'

// Количество элементов на странице
export const PAGE_SIZE = 15; // Количество элементов, отображаемых на одной странице

// Ошибка при загрузке аватара из файла с компьютера
export const errorDownloadImage = "Анализ изображения не прошел";