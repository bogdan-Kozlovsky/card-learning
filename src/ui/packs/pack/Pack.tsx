import React from 'react';
import deleteIcon from '../../assets/images/deleteIcon.svg'
import updatePackName from '../../assets/images/updatePackName.svg'
import {deletePackTC, updatePackNameTC} from "../../../bll/reducers/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import style from './pack.module.css'
import {AppRootStateType} from "../../../bll/store";
import {CardsType, getCardsTC} from "../../../bll/reducers/cards-reducer";

type propsType = {
    name: string | null
    cardsCount: number | null
    lastUpdated: Date | null
    author: any
    userId: string | null
    packId: string
    ourUserId: string | null
}
export const Pack = (props: propsType) => {
    const {
        name,
        cardsCount,
        lastUpdated,
        author,
        userId,
        packId,
        ourUserId,
    } = props


    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)

    const getCard = (cards: CardsType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log(cards[res.id + 1])
        return cards[res.id + 1];
    }
    // const a = () => {
    //     dispatch(getCardsTC(getCard(cards).cardsPack_id))
    // }

    const dispatch = useDispatch()
    const handlerDeletePack = () => {
        dispatch(deletePackTC(packId))
    }
    const handlerUpdatePackName = () => {
        dispatch(updatePackNameTC(packId))
    }
    const time = lastUpdated && lastUpdated.toString().slice(0, 10)

    return (
        <div>
            <ul className={style.packBox}>
                <li className={style.packItem}>
                    <NavLink to={`/packs_list_cards/${packId}`} className={style.packName}>{name}</NavLink>
                </li>
                <li className={style.packItem}>
                    <p>{cardsCount}</p>
                </li>
                <li className={style.packItem}>
                    <p>{time}</p>
                </li>
                <li className={style.packItem}>
                    <p>{author}</p>
                </li>
                <li>
                    {ourUserId === userId
                        &&
                        <div className={`boxBtn`}>
                            <img className={`btn btnUpdate`} onClick={handlerDeletePack}
                                 src={deleteIcon}
                                 alt="deleteIcon"/>
                            <img className={`btn btnDelete`} onClick={handlerUpdatePackName}
                                 src={updatePackName}
                                 alt="updatePackName"/>
                        </div>

                    }
                    {/*{cardsCount && <NavLink onClick={a} to={`/packs_list/link`}>Learn</NavLink>}*/}
                    {/*{cardsCount && <button onClick={a}>Learn</button>}*/}
                </li>
            </ul>

        </div>
    );
};

