import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {cardsTC, PackType, setCurrentPageAC} from "../../../bll/reducers/packs-reducer";
import {Pack} from "./Pack";
import {Paginator} from "../../common/Paginator/Paginator";

const Packs = () => {
    console.log('cards')
    const dispatch = useDispatch()

    const packsPerPage = useSelector<AppRootStateType, number>(state => state.packs.params.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / packsPerPage)

    useEffect(() => {
        dispatch(cardsTC())
    }, [dispatch])

    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
        dispatch(cardsTC())
    };

    const pack = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    console.log('pack', pack)
    return (
        <div>
            Cards
            {pack.map(e => {
                return (
                    <Pack name={e.name} cards={e.cardsCount} lastUpdated={e.created} author={e.user_name}/>
                )
            })}
            <Paginator handlePageChange={handlePageChange} totalPages={totalPages}/>
        </div>
    );
};

export default Packs;