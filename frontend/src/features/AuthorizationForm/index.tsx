import React from "react";
import { useNavigate } from 'react-router-dom';
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import useProfileState from '../../shared/useProfileState/index';
import closeIcon from "../../app/assets/icons/close_mini.svg";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import Preloader from "../../shared/Preloader";
import { getListCountry } from "../../app/api/api";
import {
  setAuth,
  setCheked,
  setError,
  setOk,
  setOpenModal,
  setOpenRegistration,
  setShowPassword,
} from "../../app/services/slices/authorization";
import { setUser } from "../../app/services/slices/profileSlice";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { TFormAuthorization } from "../../app/types/types";
import yandex from "../../app/assets/icons/Yandex.svg";
import eyeIcon from "../../app/assets/icons/eye.svg";
import eyeSlashedIcon from "../../app/assets/icons/eye-slashed.svg";
import {
  loginUser,
  registerUsers,
} from "../../app/services/actions/authorization";
import {
  receiveProfile,
  createProfile
} from "../../app/services/actions/profile";

export const AuthorizationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { handleChange } = useProfileState();

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setOpenRegistration(false));
    dispatch(setCheked(false));
    dispatch(setOk(false));
  };
  const {
    showPassword,
    openRegistration,
    checked,
    error,
    ok,
    data,
    authorizationUser
  } = useSelector((state) => state.authorization);
  const { receiveProfileUser } = useSelector((state) => state.profile);
  const handleClick = () => {
    dispatch(setShowPassword(!showPassword));
  };
  const handleOpenRegistration = () => {
    dispatch(setOpenRegistration(!openRegistration));
    dispatch(setError(null));
  };
  const handleCheked = () => {
    dispatch(setCheked(!checked));
  };
  const handleUserInfo = () => {
    const dataStorage = localStorage.getItem("updateInfo");
    const data = dataStorage ? JSON.parse(dataStorage) : {};
    if(dataStorage !== undefined && dataStorage !== null) {
      handleChange(data);
      handleRedirectProfile();
    }
  };
  const handleRedirectProfile = () => {
    setLoading(false);
    handleCloseModal();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormAuthorization>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormAuthorization) => {
    
    const formData = {
      ...data,
      agreement_required: checked,
    };
    if (openRegistration) {
      dispatch(
        registerUsers({
          email: formData.email,
          password: formData.password,
          agreement_required: formData.agreement_required,
        }),
      );
      reset();
    } else {
      setLoading(true);
      dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      )
      .then((item) => {
        getListCountry()
        .then((countries) => {
          localStorage.setItem('countries', JSON.stringify(countries.results));
        })
        .catch((err) => {
          console.log(err);
        });
        if(item.payload && authorizationUser) {
          dispatch(
            receiveProfile()
          )
          .then((data) => {
            if(data.payload && receiveProfileUser) {
              navigate("/account");
              handleUserInfo();
            } else {
              dispatch(
                createProfile()
              )
              .then((data) => {
                if(data.payload && receiveProfileUser) {
                  navigate("/account");
                  handleUserInfo();
                }
              })
              .catch((err) => {
                console.log(err)
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    }
  };

  return (
    <div className={`${ok ? style.containerCenter : style.container}`}>
      <section className={style.titleBlock}>
        <img
          src={closeIcon}
          alt='CloseIcon'
          className={style.icon}
          onClick={handleCloseModal}
        />
        <h2 className={style.title}>
          {openRegistration ? "Регистрация" : "Авторизация"}
        </h2>
      </section>
      {ok ? (
        <div className={style.registationTrue}>
          <span>
            Мы отправили письмо вам на почту. Перейдите по ссылке чтобы
            активировать аккаунт.
          </span>
          <p>
            <span>Письмо отправлено на</span>
            <span className={style.registationTrue_email}>{data.email}</span>
          </p>
          <div>
            <button className={style.button} onClick={handleCloseModal}>
              Готово
            </button>
            <button className={style.again}>Выслать еще раз</button>
          </div>
        </div>
      ) : (
        <>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputBlock}>
              <label>Email</label>
              <input
                className={`${errors.email ? style.errorInput : style.input}`}
                type='email'
                placeholder='ivan@ya.ru'
                {...register("email", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат почты",
                  },
                })}
              />
              <span className={style.error}>{error}</span>
              {errors.email?.message && (
                <span
                  className={`${errors.email ? style.error : style.message}`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className={style.inputBlock}>
              <label>Пароль</label>

              <label
                className={`${
                  errors.email || error ? style.eyeIconWithError : style.eyeIcon
                }`}
                onClick={handleClick}>
                {showPassword ? (
                  <img src={eyeSlashedIcon} alt='eyeSlashedIcon' />
                ) : (
                  <img src={eyeIcon} alt='eyeIcon' />
                )}
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                className={`${
                  errors.password ? style.errorInput : style.input
                }`}
                placeholder='********'
                {...register("password", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 8,
                    message: "Слишком короткий пароль",
                  },
                  pattern: {
                    value: /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d._%+-]{8,}$/i,
                    message:
                      "Пароль должен содержать минимум 1 цифру или букву",
                  },
                })}
              />
              {errors.password?.message && (
                <span
                  className={`${
                    errors.password ? style.error : style.message
                  }`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className={style.forgotPasswod}>
              <span>Не помню пароль</span>
            </div>
            <button
              type='submit'
              className={style.button}
              onClick={() => {
                dispatch(setAuth(true));
                dispatch(setUser(true));
              }}
              disabled={loading}>
              {loading === false ? (openRegistration ? "Зарегистрироваться" : "Войти")
              : <Preloader />
              }
            </button>
            {openRegistration && (
              <div className={style.element}>
                <div className={style.container_checkbox}>
                  <div className={style.customCheckBox} onClick={handleCheked}>
                    {checked ? <img src={checkIcon} alt='check' /> : ""}
                  </div>
                </div>
                <p className={style.agreement}>
                  Соглашаюсь с <span>Пользовательским соглашением</span> и 
                  <span>Политикой конфиденциальности</span>
                </p>
              </div>
            )}
          </form>
          <p className={style.lineBlock}>
            <span className={style.line}></span> или{" "}
            <span className={style.line}></span>{" "}
          </p>
          <div className={style.buttonBlock}>
            {openRegistration ? (
              <button
                type='button'
                className={style.buttonRegister}
                onClick={handleOpenRegistration}>
                Войти
              </button>
            ) : (
              <button type='button' className={style.buttonYandex}>
                <img src={yandex} alt='yandex' /> Войти с Яндекс ID
              </button>
            )}
            {openRegistration ? (
              <button type='button' className={style.buttonYandex}>
                <img src={yandex} alt='yandex' /> Войти с Яндекс ID
              </button>
            ) : (
              <button
                type='button'
                className={style.buttonRegister}
                onClick={handleOpenRegistration}>
                Зарегистрироваться
              </button>
            )}
          </div>
          <span className={style.loginProblem}>Проблемы со входом?</span>
        </>
      )}
    </div>
  );
};
