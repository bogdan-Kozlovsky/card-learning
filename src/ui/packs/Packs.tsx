import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {addPacksTC, getPacksTC, PackType, setCurrentPageAC} from "../../bll/reducers/packs-reducer";
import {Pack} from "./pack/Pack";
import style from './packs.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";
import {Paginator} from "../common/Paginator/Paginator";
import {SuperButton} from "../common/SuperButton/SuperButton";

export const Packs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])

    const packsPerPage = useSelector<AppRootStateType, number>(state => state.packs.params.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / packsPerPage)

    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
        dispatch(getPacksTC())
    };

    const handlerNewPacks = () => {
        dispatch(addPacksTC())
    }

    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
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
                        <SuperInput className={style.packsInputSearch} placeholder={'Search...'}/>
                        <SuperButton onClick={handlerNewPacks} name={'Add'} className={style.packsBtnSearch}/>
                    </div>

                    <ul className={style.packsList}>
                        <li className={style.packsItem}>Name</li>
                        <li className={style.packsItem}>Cards</li>
                        <li className={style.packsItem}>Last Updated</li>
                        <li className={style.packsItem}>Actions</li>
                    </ul>

                    {pack.map(e => {
                        return (
                            <Pack key={e._id} name={fixLengthText(e.name)} cards={e.cardsCount} lastUpdated={e.created}
                                  author={fixLengthText(e.user_id)}
                                  userId={e.user_id} packId={e._id}/>
                        )
                    })}
                    <Paginator handlePageChange={handlePageChange} totalPages={totalPages}/>
                </div>
            </div>
        </div>

    );
};

