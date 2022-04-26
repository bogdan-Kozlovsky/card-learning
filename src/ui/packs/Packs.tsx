import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {
    addPacksTC,
    doubleRangeAC,
    getPacksTC,
    getUserIdAC,
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
import useDebounce, {useAppSelector} from "../common/hook/hook";
import {SuperModal} from "../common/SuperModal/SuperModal";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../error/Error";
import search from '../assets/images/icons/search.svg'
import {
    selectPacksCardsPacks,
    selectPacksCardsPacksTotalCount,
    selectPacksParams,
    selectProfileProfileId
} from "../../bll/selectors";
import arrowUp from '../assets/images/icons/upArrow.svg'
import arrowDown from '../assets/images/icons/downArrow.svg'
import {AddUpdateModal} from "../common/hook/AddUpdateModal";

type propsType = {
    handlerNewPacks: () => void
    myPacks: () => void
    allPacks: () => void
    showModal: () => void
    requestForSorting: (num: number) => void
    overlay: boolean
    open: boolean
    activeBtn: string
    value: string
    totalPages: number
    setOverlay: (overlay: boolean) => void
    title: string
    getNewNamePackChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSearchHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeHandler: (event: ChangeEvent<{}>, value: (number[] | number)) => void
    handlePageChange: (e: { selected: number }) => void
    getLearnCard: (learnId: string | null) => void
}
export const Packs = memo((props: propsType) => {
    const {
        handlerNewPacks,
        overlay,
        setOverlay,
        title,
        getNewNamePackChange,
        myPacks,
        activeBtn,
        allPacks,
        onChangeHandler,
        value,
        onSearchHandler,
        showModal,
        requestForSorting,
        open,
        handlePageChange,
        totalPages,
        getLearnCard,
    } = props

    const {min, max} = useAppSelector(selectPacksParams)
    const pack = useAppSelector(selectPacksCardsPacks)
    const myId = useAppSelector(selectProfileProfileId)
    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
    return (
        <div className='container'>
            <ErrorSnackbar/>
            <div className={style.packsBox}>
                <div className={style.packsBoxLeft}>
                    <h3 className={style.packsLeftTitle}>Show packs cards</h3>
                    <AddUpdateModal handlerUpdate={handlerNewPacks}
                                    overlayUpdate={overlay}
                                    setOverlayUpdate={setOverlay}
                                    updateName={title}
                                    updateNameChange={getNewNamePackChange}/>
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
                                    placeholder={'Search...'}>
                            <img className={style.inputIcons} src={search} alt="search"/>
                        </SuperInput>
                        <SuperButton onClick={showModal} name={'Add'} className={style.packsBtnSearch}/>
                    </div>

                    <ul className={style.packsList}>
                        <li className={style.packsItem}>Name</li>
                        <li className={style.packsItem}>Cards
                            {!open && <button onClick={() => requestForSorting(0)}>
                                <img style={{width: '15px'}} src={arrowDown} alt="arrowDown"/>
                            </button>}
                            {open && <button onClick={() => requestForSorting(1)}>
                                <img style={{width: '15px'}} src={arrowUp} alt="arrowUp"/>
                            </button>}
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
})

