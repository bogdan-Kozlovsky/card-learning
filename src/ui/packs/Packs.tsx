import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {
    addPacksTC,
    doubleRangeAC,
    getPacksTC,
    getUserIdAC,
    PacksParamsType,
    PackType,
    setCurrentPageAC,
    setSearchAC,
    setSortPacksAC
} from "../../bll/reducers/packs-reducer";
import {Pack} from "./pack/Pack";
import style from './packs.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";
import {Paginator} from "../common/Paginator/Paginator";
import {SuperButton} from "../common/SuperButton/SuperButton";
import Slider from "@material-ui/core/Slider";
import useDebounce from "../common/hook/hook";
import {SuperModal} from "../common/SuperModal/SuperModal";
import {CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../error/Error";


export const Packs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [overlay, setOverlay] = useState(false);
    const [title, setTitle] = useState<string>('')

    const {
        page,
        sortPacks,
        user_id,
        packName, min, max
    } = useSelector<AppRootStateType, PacksParamsType>(state => state.packs.params)
    const myId = useSelector<AppRootStateType, null | string>(state => state.profile.profile._id)
    const [activeBtn, setActiveBtn] = useState<string>('all')

    const debounceMin = useDebounce(min, 700)
    const debounceMax = useDebounce(max, 700)

    //search
    const [value, setValue] = useState('')
    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const setSearch = useDebounce(value, 800)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, sortPacks, user_id, packName, debounceMin, debounceMax])

    useEffect(() => {
        dispatch(setSearchAC(value))
    }, [setSearch])

    //pagination
    const {pageCount} = useSelector<AppRootStateType, PacksParamsType>(state => state.packs.params)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / pageCount)
    const pack = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
    };

    //add Packs
    const handlerNewPacks = () => {
        dispatch(addPacksTC(title))
        closeModal()
    }

    // sorting between own and shared Packs
    const myPacks = () => {
        setActiveBtn('own')
        dispatch(getUserIdAC(myId))
    }
    const allPacks = () => {
        setActiveBtn('all')
        dispatch(getUserIdAC(null))
    }

    //sort
    const requestForSorting = (num: number) => {
        const sortPacks = `${num}cardsCount`
        dispatch(setSortPacksAC(sortPacks))
    }
    //add show modal
    const showModal = () => {
        setOverlay(true)
    }

    const closeModal = () => {
        setOverlay(false)
    }

    // get new name pack
    const getNewNamePackChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // double Range
    const onChangeRange = (value: number | [number, number]) => {
        if (Array.isArray(value)) {
            dispatch(doubleRangeAC(value[0], value[1]))
        }
    }
    const onChangeHandler = (event: ChangeEvent<{}>, value: (number[] | number)) => {
        onChangeRange && onChangeRange(value as number)
    }

    // learn Card

    const getLearnCard = (learnId:string) => {
        dispatch(getCardsTC(learnId))
        navigate('/packs_list/link')
    }



    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
    return (
        <div className='container'>
            <ErrorSnackbar/>
            <div className={style.packsBox}>
                <div className={style.packsBoxLeft}>
                    <h3 className={style.packsLeftTitle}>Show packs cards</h3>
                    <div className={overlay ? `overlay_shown` : `overlay_hidden`}>
                        <SuperModal closeModal={closeModal} valueTitle={title} titleName={'Add new pack'}>
                            <input onChange={getNewNamePackChange} className='inputModal' placeholder={packName}
                                   value={title}/>
                            <button onClick={handlerNewPacks} className='successBtn'>Save</button>
                        </SuperModal>
                    </div>
                    <div>
                        <div className={style.packsButtonsBox}>
                            <button onClick={myPacks}
                                    className={`${style.packsBtn} ${activeBtn === 'own' ? style.packsBtnActive : style.packsBtn}`}>My
                            </button>
                            <button onClick={allPacks}
                                    className={`${style.packsBtn} ${activeBtn === 'all' ? style.packsBtnActive : style.packsBtn}`}>All
                            </button>
                        </div>

                        <div className={style.sliderDescriptionBox}>
                            <p className={style.sliderDescription}>{min}</p>
                            <p className={style.sliderDescription}>{max}</p>
                        </div>

                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={[min, max]}
                            onChange={onChangeHandler}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                        />
                    </div>

                </div>

                <div className={style.packsBoxRight}>
                    <h2 className={style.packsBoxRightTitle}>Packs list</h2>
                    <div className={style.packsBoxSearch}>
                        <SuperInput value={value} onChange={onSearchHandler} className={style.packsInputSearch}
                                    placeholder={'Search...'}/>
                        <SuperButton onClick={showModal} name={'Add'} className={style.packsBtnSearch}/>
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

                    {pack.map(e => {
                        return (
                            <Pack key={e._id} name={fixLengthText(e.name)} cardsCount={e.cardsCount}
                                  lastUpdated={e.created}
                                  author={fixLengthText(e.user_id)}
                                  userId={e.more_id} packId={e._id} ourUserId={myId} getLearnCard={getLearnCard}/>
                        )
                    })}

                    <Paginator handlePageChange={handlePageChange} totalPages={totalPages}/>
                </div>
            </div>
        </div>

    );
};

