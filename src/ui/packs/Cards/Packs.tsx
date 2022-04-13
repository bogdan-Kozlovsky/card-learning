import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {cardsTC, PackType} from "../../../bll/reducers/packs-reducer";
import {Pack} from "./Pack";

const Packs = () => {
    console.log('cards')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cardsTC())
    }, [dispatch])


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
        </div>
    );
};

export default Packs;