import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {addPacksTC, getPacksTC, getUserIdAC, PackType, setCurrentPageAC} from "../../bll/reducers/packs-reducer";
import {Pack} from "./pack/Pack";
import style from './packs.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";
import {Paginator} from "../common/Paginator/Paginator";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {setIdProfileAC} from "../../bll/reducers/profile-reducer";

export const Packs = () => {
    const dispatch = useDispatch()
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const [activeBtn, setActiveBtn] = useState<string>('all')
    const myId = useSelector<AppRootStateType, null | string>(state => state.profile.profile._id)
    const user_id = useSelector<AppRootStateType, null | string>(state => state.packs.params.user_id)

    //search
    const [value, setValue] = useState('')
    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    //sort
    const [sortPacksNum, setSortPacksNum] = useState('1cardsCount')


    useEffect(() => {
        dispatch(getPacksTC(sortPacksNum))
    }, [page, myId, sortPacksNum,user_id])

    //pagination
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
    console.log(myId,'sdfsdgsdsdsdfsdfds')
    const myPacks = () => {
        setActiveBtn('own')
        dispatch(getUserIdAC(myId))

    }

    const allPacks = () => {
        setActiveBtn('all')
        dispatch(getUserIdAC(null))

    }


    const requestForSorting = (num: number) => {
        const sortPacks = `${num}cardsCount`
        setSortPacksNum(sortPacks)
    }


    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
    const pack = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    return (
        <div className='container'>
            <div className={style.packsBox}>
                <div className={style.packsBoxLeft}>
                    <h3 className={style.packsLeftTitle}>Show packs cards</h3>
                    <div className={style.packsButtonsBox}>
                        <button onClick={myPacks}
                                className={`${style.packsBtn} ${activeBtn === 'own' ? style.packsBtnActive : style.packsBtn}`}>My
                        </button>
                        <button onClick={allPacks}
                                className={`${style.packsBtn} ${activeBtn === 'all' ? style.packsBtnActive : style.packsBtn}`}>All
                        </button>
                    </div>
                </div>

                <div className={style.packsBoxRight}>
                    <h2 className={style.packsBoxRightTitle}>Packs list</h2>
                    <div className={style.packsBoxSearch}>
                        <SuperInput value={value} onChange={onSearchHandler} className={style.packsInputSearch}
                                    placeholder={'Search...'}/>
                        <SuperButton onClick={handlerNewPacks} name={'Add'} className={style.packsBtnSearch}/>
                    </div>

                    <ul className={style.packsList}>
                        <li className={style.packsItem}>Name</li>
                        <li className={style.packsItem}>Cards
                            <button onClick={() => requestForSorting(0)}>+</button>
                            <button onClick={() => requestForSorting(1)}>-</button>
                        </li>
                        <li className={style.packsItem}>Last Updated
                        </li>
                        <li className={style.packsItem}>Actions</li>
                    </ul>

                    {pack.filter(val => {
                        // @ts-ignore
                        return value === "" || val.name.toLowerCase().includes(value.toLowerCase())
                    }).map(e => {
                        return (
                            <Pack key={e._id} name={fixLengthText(e.name)} cards={e.cardsCount} lastUpdated={e.created}
                                  author={fixLengthText(e.user_id)}
                                  userId={e.more_id} packId={e._id} ourUserId={myId}/>
                        )
                    })}
                    <Paginator handlePageChange={handlePageChange} totalPages={totalPages}/>
                </div>
            </div>
        </div>

    );
};

