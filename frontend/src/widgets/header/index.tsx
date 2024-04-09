import React, { useState } from "react";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/logo_black.svg";
import avatar from "../../app/assets/icons/avatar.svg";
import { SearchInput } from "../../shared/inputs/searchInput";
import { Link } from "react-router-dom";
import { useDispatch } from "../../app/types/hooks";
import { setOpenModal } from "../../app/services/slices/authorization";
export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(setOpenModal(true));
  };
  return (
    <header className={style.container}>
      <div className={style.main} onClick={handleOpenModal}>
        <div className={style.logo}>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <SearchInput />
        <div className={style.avatar} onClick={handleClick}>
          <img src={avatar} alt='avatar' />
          {open ? (
            <ul className={style.dropMenu}>
              <li className={style.dropMenu_avatar}>
                <span>Владимир Белоголовцев</span>
                <img src={avatar} alt='avatar' />
              </li>
              <li>Управление аккаунтом</li>
              <li>
                <Link to='/myEvent'>Мои мероприятия</Link>
              </li>
              <li>Помощь</li>
              <li>Выйти</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};
