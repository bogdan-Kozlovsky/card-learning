import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {cardsTC, PackType} from "../../bll/reducers/packs-reducer";
import {Pack} from "./Pack";
import style from './packs.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";

export const Packs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cardsTC())
    }, [dispatch])


    const pack = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    return (
        <div className='container'>
            <div className={style.packsBox}>
                <div className={style.packsBoxLeft}>
                    <h3 className={style.packsLeftTitle}>Show packs cards</h3>
                    <div className={style.packsButtonsBox}>
                        <button className={`${style.packsBtnMy}  ${style.packsBtn}`}>My</button>
                        <button className={`${style.packsBtnActive}  ${style.packsBtn}`}>All</button>
                    </div>
                </div>

                <div className={style.packsBoxRight}>
                    <h2 className={style.packsBoxRightTitle}>Packs list</h2>
                    <div className={style.packsBoxSearch}>
                        {/*<input type="text"/>*/}
                        <SuperInput className={style.packsInputSearch}/>
                    </div>
                    {pack.map(e => {
                        return (
                            <Pack key={e._id} name={e.name} cards={e.cardsCount} lastUpdated={e.created}
                                  author={e.user_name}/>
                        )
                    })}
                </div>

            </div>
        </div>

    );
};

