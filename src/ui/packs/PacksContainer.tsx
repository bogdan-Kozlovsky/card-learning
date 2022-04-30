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
import useDebounce, {useAppSelector} from "../common/hook/hook";
import {Navigate, useNavigate} from "react-router-dom";
import {
    selectPacksCardsPacksTotalCount,
    selectPacksParams,
    selectProfileProfileId,
    selectSignInisLogin
} from "../../bll/selectors";
import {Packs} from "./Packs";
import {PATH} from "../enums/paths";

export const PacksContainer = memo(() => {
    const myId = useAppSelector(selectProfileProfileId)
    const {page, sortPacks, user_id, packName, min, max} = useAppSelector(selectPacksParams)
    const isLogin = useAppSelector(selectSignInisLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [overlay, setOverlay] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [activeBtn, setActiveBtn] = useState<string>('all')

    const debounceMin = useDebounce(min, 700)
    const debounceMax = useDebounce(max, 700)

    //search
    const [value, setValue] = useState<string>('')
    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const closeHandler = () => {
        setValue('')
    }


    const setSearch = useDebounce(value, 800)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, sortPacks, user_id, packName, debounceMin, debounceMax])
    useEffect(() => {
        dispatch(setSearchAC(value))
    }, [setSearch])


    //pagination
    const {pageCount} = useAppSelector(selectPacksParams)
    const cardPacksTotalCount = useAppSelector(selectPacksCardsPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / pageCount)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
    };

    //add Packs
    const handlerNewPacks = () => {
        dispatch(addPacksTC(title))
        setOverlay(false)
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
        setOpen(!open)
    }
    const [open, setOpen] = useState<boolean>(false)

    //спросить у ментора много перерисовок
    console.log(open)
    /////////////////////////////////////////

    //add show modal
    const showModal = () => {
        setOverlay(true)
    }

    // get new name pack onChange
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
    const getLearnCard = (learnId: string | null) => {
        navigate(`${PATH.LEARN}/${learnId}`)
    }

    if (!isLogin) {
        navigate(`${PATH.LOGIN}`)
    }

    return (
        <>
            <Packs
                handlerNewPacks={handlerNewPacks}
                overlay={overlay}
                setOverlay={setOverlay}
                title={title}
                getNewNamePackChange={getNewNamePackChange}
                myPacks={myPacks}
                activeBtn={activeBtn}
                allPacks={allPacks}
                onChangeHandler={onChangeHandler}
                value={value}
                onSearchHandler={onSearchHandler}
                showModal={showModal}
                requestForSorting={requestForSorting}
                open={open}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                closeHandler={closeHandler}
                getLearnCard={getLearnCard}
            />
        </>

    );
})

